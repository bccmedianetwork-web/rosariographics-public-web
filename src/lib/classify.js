/**
 * Lead classification: categorize by service type and attribution channel.
 *
 * All functions are pure — no side effects, no dependencies.
 */

const SERVICE_CATEGORY = {
  "Letreros 3D": "branding",
  "Fachada ACM": "exterior",
  "Caja de Luz": "lighting",
  "Rotulacion Vehicular": "vehicle",
  Otro: "general",
};

function extractDomain(url) {
  if (!url || typeof url !== "string") return "";
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function classifyChannel({ utm_source, utm_medium, gclid, referrer }) {
  // Paid — Google Ads
  if (gclid) return "paid_search";

  // Paid — explicit UTM
  if (utm_source) {
    const src = utm_source.toLowerCase().trim();
    const medium = (utm_medium || "").toLowerCase().trim();

    if (medium === "cpc" || medium === "paid" || medium === "ppc") {
      return "paid_search";
    }

    if (["facebook", "fb", "instagram", "ig", "meta", "messenger"].includes(src)) {
      return "paid_social";
    }
    if (["linkedin", "li"].includes(src)) {
      return "paid_social";
    }
    if (["twitter", "x", "tiktok"].includes(src)) {
      return "paid_social";
    }
    if (src === "email" || src === "newsletter" || medium === "email") {
      return "email";
    }
    if (src === "whatsapp" || src === "wa") {
      return "whatsapp";
    }
    if (medium === "organic" || medium === "organic_search") {
      return "organic_search";
    }
    if (medium === "social" || medium === "organic_social") {
      return "organic_social";
    }
    if (medium === "referral") {
      return "referral";
    }

    // UTM source present but medium unknown → use source domain logic below
  }

  // Organic / referral by referrer domain
  if (referrer) {
    const domain = extractDomain(referrer);
    if (!domain) return "direct";

    if (/(^|\.)(google|bing|yahoo|duckduckgo|ask|baidu|yandex|ecosia)\./.test(domain)) {
      return "organic_search";
    }
    if (/(^|\.)(facebook|instagram|meta|linkedin|twitter|x\.com|tiktok|pinterest|snapchat|reddit|youtube)\./.test(domain)) {
      return "organic_social";
    }
    if (/(^|\.)(whatsapp|wa\.|telegram|signal)\./.test(domain)) {
      return "whatsapp";
    }

    return "referral";
  }

  return "direct";
}

function calculateScore({ phone, ciudad, comentarios, hasNombre }) {
  let score = 0;
  if (hasNombre) score += 5;
  if (phone && phone.length >= 10) score += 15;
  if (ciudad && ciudad.trim().length > 0) score += 5;
  if (comentarios && comentarios.trim().length > 5) score += 5;
  return score;
}

/**
 * Classify a lead and return enrichment fields.
 *
 * @param {object} lead  Raw lead data after normalization.
 * @returns {object}     { lead_category, lead_channel, lead_score }
 */
export function classifyLead(lead) {
  const category = SERVICE_CATEGORY[lead.service] || "general";

  const channel = classifyChannel({
    utm_source: lead.utm_source,
    utm_medium: lead.utm_medium,
    gclid: lead.gclid,
    referrer: lead.referrer,
  });

  const score = calculateScore({
    phone: lead.phone,
    ciudad: lead.ciudad,
    comentarios: lead.comentarios,
    hasNombre: Boolean(lead.name && lead.name.trim().length > 1),
  });

  return { lead_category: category, lead_channel: channel, lead_score: score };
}
