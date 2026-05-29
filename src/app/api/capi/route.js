import { rateLimit } from "@/lib/rate-limit";
import { log } from "@/lib/logger";

const STATIC_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://www.rosariographics.com",
  "https://rosariographics.com",
];
const ALLOWED_EVENTS = ["LeadForm", "PageView", "LeadWhatsApp"];
const MAX_BODY_BYTES = 10_240;

const checkRate = rateLimit({ max: 10, windowMs: 60_000 });

function getClientIp(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1"
  );
}

function isOriginAllowed(origin) {
  if (!origin) return true;
  if (STATIC_ORIGINS.some((o) => origin.startsWith(o))) return true;
  if (origin.endsWith(".vercel.app")) return true;
  if (process.env.VERCEL_URL && origin === `https://${process.env.VERCEL_URL}`) return true;
  if (process.env.NEXT_PUBLIC_SITE_URL && origin === process.env.NEXT_PUBLIC_SITE_URL) return true;
  return false;
}

async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request) {
  const ip = getClientIp(request);
  const endpoint = "/api/capi";

  try {
    const contentLength = parseInt(request.headers.get("content-length") || "0", 10);
    if (contentLength > MAX_BODY_BYTES) {
      log.warn("Payload too large", { endpoint, ip, contentLength, maxBytes: MAX_BODY_BYTES });
      return Response.json(
        { error: `Payload demasiado grande (máx ${MAX_BODY_BYTES} bytes)` },
        { status: 413 }
      );
    }

    const { allowed, retryAfter } = checkRate(ip);
    if (!allowed) {
      log.warn("Rate limit exceeded", { endpoint, ip, retryAfter });
      return Response.json(
        { error: `Demasiadas solicitudes. Intenta de nuevo en ${retryAfter}s` },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }

    const origin = request.headers.get("origin") || request.headers.get("referer") || "";
    if (!isOriginAllowed(origin)) {
      log.warn("Origin not allowed", { endpoint, ip, origin });
      return Response.json({ error: "Origen no autorizado" }, { status: 403 });
    }

    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      log.warn("Payload too large (after text read)", { endpoint, ip, length: raw.length });
      return Response.json(
        { error: `Payload demasiado grande (máx ${MAX_BODY_BYTES} bytes)` },
        { status: 413 }
      );
    }

    const body = JSON.parse(raw);
    const { eventName, event_id, user_data = {}, custom_data = {} } = body;

    if (!eventName || typeof eventName !== "string" || !ALLOWED_EVENTS.includes(eventName)) {
      log.warn("Invalid or disallowed eventName", { endpoint, ip, eventName });
      return Response.json({ error: "eventName inválido o no permitido" }, { status: 400 });
    }

    if (!event_id || typeof event_id !== "string" || event_id.length < 10 || event_id.length > 100) {
      log.warn("Invalid event_id", { endpoint, ip, event_id });
      return Response.json({ error: "event_id inválido" }, { status: 400 });
    }

    const pixelId = process.env.META_CAPI_PIXEL_ID;
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

    if (!pixelId || !accessToken) {
      log.warn("Meta CAPI not configured", { endpoint, ip, event_id });
      return Response.json({ error: "CAPI no configurado" }, { status: 501 });
    }

    const userData = {
      client_ip_address: ip,
      client_user_agent: request.headers.get("user-agent") || "",
    };

    if (user_data.fbp && typeof user_data.fbp === "string") userData.fbp = user_data.fbp;
    if (user_data.fbc && typeof user_data.fbc === "string") userData.fbc = user_data.fbc;

    if (Array.isArray(user_data.em)) {
      userData.em = await Promise.all(
        user_data.em.map(async (email) => {
          const normalized = email.trim().toLowerCase();
          return sha256(normalized);
        })
      );
    }

    if (Array.isArray(user_data.ph)) {
      userData.ph = await Promise.all(
        user_data.ph.map(async (phone) => {
          const normalized = phone.replace(/[^0-9]/g, "");
          return sha256(normalized);
        })
      );
    }

    const eventPayload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id,
          action_source: "website",
          user_data: userData,
          custom_data,
        },
      ],
    };

    const fbRes = await fetch(`https://graph.facebook.com/v22.0/${pixelId}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(eventPayload),
    });

    const fbData = await fbRes.json();

    if (!fbRes.ok) {
      log.error("Meta CAPI returned error", { endpoint, ip, event_id, eventName, fbError: fbData });
      return Response.json(
        { error: "Error al enviar evento a Meta", details: fbData },
        { status: 502 }
      );
    }

    log.info("Meta CAPI event sent", { endpoint, ip, event_id, eventName });

    return Response.json({ success: true, fbResponse: fbData });
  } catch (error) {
    log.error("Unhandled error in /api/capi", { endpoint, ip, error: error.message, stack: error.stack });
    return Response.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
