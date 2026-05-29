import { sendEmail } from "@/lib/mailer";
import { rateLimit } from "@/lib/rate-limit";
import { getSupabase } from "@/lib/supabase";
import { normalizeLeadData } from "@/lib/normalize";
import { classifyLead } from "@/lib/classify";
import { log } from "@/lib/logger";

const ALLOWED_SERVICES = ["Letreros 3D", "Fachada ACM", "Caja de Luz", "Rotulacion Vehicular", "Otro"];
const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://www.rosariographics.com",
  "https://rosariographics.com",
];

if (process.env.VERCEL_URL) {
  ALLOWED_ORIGINS.push(`https://${process.env.VERCEL_URL}`);
}
if (process.env.NEXT_PUBLIC_SITE_URL) {
  ALLOWED_ORIGINS.push(process.env.NEXT_PUBLIC_SITE_URL);
}
const MAX_BODY_BYTES = 10_240;

const checkRate = rateLimit({ max: 5, windowMs: 60_000 });

function getClientIp(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1"
  );
}

export async function POST(request) {
  const ip = getClientIp(request);
  const endpoint = "/api/quote";

  try {
    // ── Body size check ────────────────────────────────────────────────────
    const contentLength = parseInt(request.headers.get("content-length") || "0", 10);
    if (contentLength > MAX_BODY_BYTES) {
      log.warn("Payload too large", { endpoint, ip, contentLength, maxBytes: MAX_BODY_BYTES });
      return Response.json(
        { error: `Payload demasiado grande (máx ${MAX_BODY_BYTES} bytes)` },
        { status: 413 }
      );
    }

    // ── Rate limit ────────────────────────────────────────────────────────
    const { allowed, retryAfter } = checkRate(ip);
    if (!allowed) {
      log.warn("Rate limit exceeded", { endpoint, ip, retryAfter });
      return Response.json(
        { error: `Demasiadas solicitudes. Intenta de nuevo en ${retryAfter}s` },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }

    // ── Origin / Referer check ─────────────────────────────────────────────
    const origin = request.headers.get("origin") || request.headers.get("referer") || "";
    if (origin && !ALLOWED_ORIGINS.some((o) => origin.startsWith(o))) {
      log.warn("Origin not allowed", { endpoint, ip, origin });
      return Response.json({ error: "Origen no autorizado" }, { status: 403 });
    }

    // ── Parse body ────────────────────────────────────────────────────────
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      log.warn("Payload too large (after text read)", { endpoint, ip, length: raw.length });
      return Response.json(
        { error: `Payload demasiado grande (máx ${MAX_BODY_BYTES} bytes)` },
        { status: 413 }
      );
    }

    const body = JSON.parse(raw);
    const { tipo_letrero, turnstileToken, event_id } = body;

    // ── Normalize ──────────────────────────────────────────────────────────
    let normalized;
    try {
      normalized = normalizeLeadData(body);
    } catch (normErr) {
      log.warn("Normalization failed", { endpoint, ip, error: normErr.message });
      return Response.json({ error: normErr.message }, { status: 400 });
    }

    const { name, email, phone, ciudad, comentarios } = normalized;
    const session_id = normalized.session_id ?? null;
    const utm_source = normalized.utm_source ?? null;
    const utm_medium = normalized.utm_medium ?? null;
    const utm_campaign = normalized.utm_campaign ?? null;
    const utm_term = normalized.utm_term ?? null;
    const utm_content = normalized.utm_content ?? null;
    const gclid = normalized.gclid ?? null;
    const fbp = normalized.fbp ?? null;
    const fbc = normalized.fbc ?? null;
    const referrer = normalized.referrer ?? null;
    const device_type = normalized.device_type ?? null;
    const screen_resolution = normalized.screen_resolution ?? null;
    const user_agent = normalized.user_agent ?? null;
    const source_page = normalized.source_page ?? "WEB DIRECTA";
    const page_url = normalized.page_url ?? null;
    const browser_language = normalized.browser_language ?? null;
    const timezone = normalized.timezone ?? null;
    const form_open_time = normalized.form_open_time ?? null;
    const form_submit_time = normalized.form_submit_time ?? null;

    // ── Service validation ─────────────────────────────────────────────────
    if (!tipo_letrero || !ALLOWED_SERVICES.includes(tipo_letrero)) {
      log.warn("Invalid service", { endpoint, ip, tipo_letrero });
      return Response.json({ error: "Servicio inválido" }, { status: 400 });
    }

    // ── Turnstile ──────────────────────────────────────────────────────────
    if (!turnstileToken || typeof turnstileToken !== "string") {
      log.warn("Missing turnstile token", { endpoint, ip });
      return Response.json({ error: "Validación de seguridad requerida" }, { status: 403 });
    }

    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (!secretKey) {
      log.error("TURNSTILE_SECRET_KEY not configured");
      return Response.json({ error: "Error de configuración del servidor" }, { status: 500 });
    }

    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: secretKey, response: turnstileToken }),
    });
    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      log.warn("Turnstile verification failed", { endpoint, ip, turnstileError: verifyData["error-codes"] });
      return Response.json({ error: "Validación de seguridad fallida" }, { status: 403 });
    }

    // ── Anti-duplicado ─────────────────────────────────────────────────────
    let isDuplicate = false;
    let leadId = null;
    let leadNumber = null;

    const supabase = getSupabase();
    if (supabase) {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

      const { data: existing } = await supabase
        .from("leads")
        .select("id, lead_number")
        .eq("email", email)
        .eq("service", tipo_letrero)
        .gte("created_at", twentyFourHoursAgo)
        .limit(1)
        .maybeSingle();

      if (existing) {
        isDuplicate = true;
        leadId = existing.id;
        leadNumber = existing.lead_number;
        log.info("Duplicate lead detected", { endpoint, ip, leadNumber, email, service: tipo_letrero });
      }
    }

    // ── Clasificar lead ───────────────────────────────────────────────────
    const classification = classifyLead({
      service: tipo_letrero,
      utm_source,
      utm_medium,
      gclid,
      referrer,
      phone,
      ciudad,
      comentarios,
      name,
    });

    // ── Construir metadata JSONB ──────────────────────────────────────────
    const metadata = {
      ...classification,
      page_url,
      browser_language,
      timezone,
      form_fill_seconds:
        form_open_time && form_submit_time
          ? Math.round((Number(form_submit_time) - Number(form_open_time)) / 1000)
          : null,
    };
    const cleanMetadata = Object.fromEntries(
      Object.entries(metadata).filter(([, v]) => v !== null && v !== undefined)
    );

    // ── Insertar en Supabase ───────────────────────────────────────────────
    if (supabase && !isDuplicate) {
      const insertPayload = {
        name,
        email,
        phone,
        service: tipo_letrero,
        ciudad,
        comentarios,
        source_page,
        session_id,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content,
        gclid,
        fbp,
        fbc,
        referrer,
        device_type,
        screen_resolution,
        user_agent,
        ip_address: ip,
        event_id: event_id || null,
        lead_status: "new",
        metadata: Object.keys(cleanMetadata).length > 0 ? cleanMetadata : null,
      };

      const { data: inserted, error } = await supabase
        .from("leads")
        .insert(insertPayload)
        .select("id, lead_number")
        .single();

      if (!error && inserted) {
        leadId = inserted.id;
        leadNumber = inserted.lead_number;
        log.info("Lead inserted", { endpoint, ip, leadNumber, email, service: tipo_letrero });

      } else {
        log.error("Supabase insert failed", { endpoint, ip, error: error?.message, email });
      }
    }

    // ── Emails transaccionales ──────────────────────────────────────────
    const {
      leadConfirmationHtml,
    } = await import("@/emails/lead-confirmation");
    const {
      internalNotificationHtml,
    } = await import("@/emails/internal-notification");

    const emailTasks = [];

    // Confirmación al lead
    emailTasks.push(
      sendEmail({
        to: email,
        subject: "Rosario Graphics · Recibimos tu solicitud de cotización",
        html: leadConfirmationHtml({ name, service: tipo_letrero }),
      }).then((r) =>
        r.success
          ? log.info("Confirmation email sent to lead", { endpoint, ip, to: email, dev: r.dev })
          : log.error("Confirmation email failed", { endpoint, ip, to: email })
      )
    );

    // Notificación a ventas
    const contactEmail = process.env.CONTACT_EMAIL || "ventas@rosariographics.com";
    emailTasks.push(
      sendEmail({
        to: contactEmail,
        subject: `Nuevo Lead${isDuplicate ? " [DUPLICADO]" : ""} · ${name} · ${tipo_letrero}`,
        html: internalNotificationHtml({
          name,
          email,
          phone,
          service: tipo_letrero,
          ciudad,
          comentarios,
          sourcePage: source_page,
          leadNumber,
          isDuplicate,
          leadCategory: classification.lead_category,
          leadChannel: classification.lead_channel,
          leadScore: classification.lead_score,
          utmSource: utm_source,
          utmMedium: utm_medium,
          utmCampaign: utm_campaign,
        }),
        replyTo: email,
      }).then((r) =>
        r.success
          ? log.info("Internal notification sent", { endpoint, ip, to: contactEmail, dev: r.dev })
          : log.error("Internal notification failed", { endpoint, ip, to: contactEmail })
      )
    );

    // Fire both in parallel, never block the HTTP response
    Promise.allSettled(emailTasks).catch(() => {});

    // ── Meta CAPI (LeadForm) via /api/capi ────────────────────────────────
    if (event_id && typeof event_id === "string") {
      const { origin } = new URL(request.url);

      fetch(`${origin}/api/capi`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventName: "LeadForm",
          event_id,
          user_data: {
            em: [email],
            ph: [phone],
            fbp,
            fbc,
          },
          custom_data: {
            value: 0,
            currency: "DOP",
            service: tipo_letrero,
            ...(utm_source ? { utm_source } : {}),
            ...(utm_medium ? { utm_medium } : {}),
            ...(utm_campaign ? { utm_campaign } : {}),
          },
        }),
      })
        .then(async (res) => {
          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            log.error("Meta CAPI failed via proxy", { endpoint, ip, event_id, error: data.error });
          } else {
            log.info("Meta CAPI sent via proxy", { endpoint, ip, event_id, eventName: "LeadForm" });
          }
        })
        .catch((err) => log.error("Meta CAPI proxy error", { endpoint, ip, event_id, error: err.message }));
    }

    const response = {
      success: true,
      duplicate: isDuplicate,
      lead_id: leadId,
      lead_number: leadNumber,
    };

    log.info("Quote request completed", { endpoint, ip, leadNumber, duplicate: isDuplicate });

    return Response.json(response);
  } catch (error) {
    log.error("Unhandled error in /api/quote", { endpoint, ip, error: error.message, stack: error.stack });
    return Response.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
