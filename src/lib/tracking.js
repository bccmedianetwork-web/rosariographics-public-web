const STORAGE_PREFIX = "rg_";

function getWindow() {
  if (typeof window === "undefined") return null;
  return window;
}

function getDoc() {
  if (typeof document === "undefined") return null;
  return document;
}

function getStorage() {
  if (typeof sessionStorage === "undefined") return null;
  return sessionStorage;
}

// ── Session ID ──────────────────────────────────────────────────────────────

export function generateSessionId() {
  const storage = getStorage();
  if (!storage) return null;
  let sid = storage.getItem(`${STORAGE_PREFIX}session_id`);
  if (!sid) {
    sid = crypto.randomUUID();
    storage.setItem(`${STORAGE_PREFIX}session_id`, sid);
  }
  return sid;
}

// ── UTMs + GCLID ────────────────────────────────────────────────────────────

export function getUtmParams() {
  const win = getWindow();
  if (!win) return {};
  const params = new URLSearchParams(win.location.search);
  const utms = {};
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"];
  for (const key of keys) {
    const val = params.get(key);
    if (val) utms[key] = val;
  }
  return utms;
}

// ── FBP / FBC (Meta cookies) ────────────────────────────────────────────────

export function getFbpFbc() {
  const doc = getDoc();
  if (!doc) return {};
  const raw = doc.cookie || "";
  const entries = raw.split("; ").filter(Boolean).map((c) => {
    const idx = c.indexOf("=");
    return [c.slice(0, idx).trim(), c.slice(idx + 1)];
  });
  const cookies = Object.fromEntries(entries);
  return {
    fbp: cookies._fbp || undefined,
    fbc: cookies._fbc || undefined,
  };
}

// ── Referrer ────────────────────────────────────────────────────────────────

export function getReferrer() {
  const doc = getDoc();
  if (!doc) return undefined;
  return doc.referrer || undefined;
}

// ── Browser hints (page_url, language, timezone) ────────────────────────────

export function getBrowserHints() {
  const win = getWindow();
  if (!win) return {};
  return {
    page_url: win.location.href,
    browser_language: win.navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

// ── Device / Screen ─────────────────────────────────────────────────────────

export function getDeviceInfo() {
  const win = getWindow();
  if (!win) return {};
  const ua = win.navigator.userAgent;
  const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(ua);
  return {
    device_type: isMobile ? "mobile" : /iPad|Android(?!.*Mobile)/i.test(ua) ? "tablet" : "desktop",
    os: (ua.match(/(Windows NT|Mac OS X|Linux|Android|iOS|CrOS)/) || ["unknown"])[0],
    screen_resolution: `${win.screen.width}x${win.screen.height}`,
    user_agent: ua,
  };
}

// ── Persist all tracking data into sessionStorage ──────────────────────────

export function persistTrackingData() {
  const storage = getStorage();
  if (!storage) return {};

  const sid = generateSessionId();
  const utms = getUtmParams();
  const fb = getFbpFbc();
  const ref = getReferrer();
  const device = getDeviceInfo();
  const hints = getBrowserHints();

  const data = {
    session_id: sid,
    ...utms,
    ...fb,
    referrer: ref,
    ...device,
    ...hints,
  };

  for (const [key, val] of Object.entries(data)) {
    if (val !== undefined && val !== null) {
      try {
        storage.setItem(`${STORAGE_PREFIX}${key}`, String(val));
      } catch {
        // sessionStorage lleno o no disponible
      }
    }
  }

  return data;
}

// ── Read all tracking data from sessionStorage ─────────────────────────────

const TRACKING_KEYS = [
  "session_id",
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "gclid",
  "fbp", "fbc",
  "referrer",
  "device_type", "os", "screen_resolution", "user_agent",
  "page_url", "browser_language", "timezone",
];

export function readTrackingData() {
  const storage = getStorage();
  if (!storage) return {};
  const data = {};
  for (const key of TRACKING_KEYS) {
    try {
      const val = storage.getItem(`${STORAGE_PREFIX}${key}`);
      if (val) data[key] = val;
    } catch {
      // ignore
    }
  }
  return data;
}
