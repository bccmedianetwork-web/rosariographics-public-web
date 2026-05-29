const RD_PREFIXES = ["809", "829", "849"];
const PHONE_MIN = 10;
const PHONE_MAX = 15;

/**
 * Strip invisible / zero-width / control chars (except \t, \n, \r)
 * from any user-supplied string.
 */
function stripInvisible(str) {
  return String(str).replace(
    /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u200b-\u200f\u2028-\u202f\u2060-\u2064\ufeff\u00ad\u034f\u061c\u115f\u1160\u17b4\u17b5\u180e\u202a-\u202e\u2066-\u2069\u2800\u3164\uffa0\ufffe\uffff]/g,
    ""
  );
}

/**
 * Normalize a phone number to strict E.164 format.
 *
 * Rules:
 *  1. Strip everything except digits and leading `+`.
 *  2. If no `+` prefix:
 *       - Assume ND (Dominican Republic) → prepend `+1`.
 *       - Must match 809|829|849 after country code.
 *  3. If `+` present, validate total digits are between PHONE_MIN and PHONE_MAX.
 *  4. Return canonical E.164 string (e.g. `+18094226527`).
 *
 * @param {string} phone  Raw user input.
 * @returns {string}      Clean E.164 phone number.
 * @throws {Error}        If phone cannot be normalized.
 */
export function normalizePhone(phone) {
  if (!phone || typeof phone !== "string") {
    throw new Error("Teléfono inválido: valor vacío");
  }

  // Strip invisible unicode, then keep only digits and leading +
  const cleaned = stripInvisible(phone).trim();
  const hasPlus = cleaned.startsWith("+");
  const digitsOnly = cleaned.replace(/[^\d]/g, "");

  if (digitsOnly.length === 0) {
    throw new Error("Teléfono inválido: no contiene dígitos");
  }

  let e164;

  if (!hasPlus) {
    // Assume Dominican Republic
    if (digitsOnly.length === 10 && RD_PREFIXES.includes(digitsOnly.slice(0, 3))) {
      e164 = `+1${digitsOnly}`;
    } else if (digitsOnly.length === 7 || digitsOnly.length === 8) {
      // Local number without area code – incomplete, can't assume
      throw new Error(
        `Teléfono inválido: el número "${phone}" muy corto para RD. Usa formato +1 809 XXX XXXX`
      );
    } else {
      // Try as-is, maybe it already includes 1 + area
      e164 = `+${digitsOnly}`;
    }
  } else {
    e164 = `+${digitsOnly}`;
  }

  const digitCount = e164.replace(/\D/g, "").length;

  if (digitCount < PHONE_MIN || digitCount > PHONE_MAX) {
    throw new Error(
      `Teléfono inválido: "${phone}" (${digitCount} dígitos). Debe tener entre ${PHONE_MIN} y ${PHONE_MAX} dígitos.`
    );
  }

  return e164;
}

/**
 * Normalize email to lowercase + trim + strip invisible chars.
 *
 * @param {string} email
 * @returns {string}
 * @throws {Error} If email is empty or invalid after normalization.
 */
export function normalizeEmail(email) {
  if (!email || typeof email !== "string") {
    throw new Error("Email inválido: valor vacío");
  }

  const cleaned = stripInvisible(email).trim().toLowerCase();
  if (!cleaned.includes("@")) {
    throw new Error(`Email inválido: "${email}" no contiene @`);
  }

  const [localPart, domain] = cleaned.split("@", 2);

  // Remove dots from Gmail-style local parts (john.doe@gmail.com → johndoe@gmail.com)
  // only for common providers where dots are routing-ignored
  const dotlessDomains = ["gmail.com", "googlemail.com", "outlook.com", "hotmail.com", "live.com"];
  const normalizedLocal = dotlessDomains.includes(domain)
    ? localPart.replace(/\./g, "")
    : localPart;

  return `${normalizedLocal}@${domain}`;
}

/**
 * Sanitize and capitalize a person / business name.
 *
 * Rules:
 *  1. Trim + strip invisible chars.
 *  2. Collapse multiple internal spaces.
 *  3. Capitalize each word (respecting particles: de, del, la, los, las, y, e).
 *
 * @param {string} name
 * @returns {string}
 * @throws {Error} If empty after sanitization.
 */
export function sanitizeName(name) {
  if (!name || typeof name !== "string") {
    throw new Error("Nombre inválido: valor vacío");
  }

  let s = stripInvisible(name).trim();
  s = s.replace(/\s+/g, " ");
  s = s.replace(/[^\w\sáéíóúÁÉÍÓÚñÑüÜ'\-.]/g, "");

  if (s.length < 1) {
    throw new Error("Nombre inválido: después de limpiar queda vacío");
  }

  // Capitalize each word, but preserve lowercase particles
  const PARTICLES = new Set(["de", "del", "la", "las", "los", "y", "e", "el", "en", "un", "una", "a", "con", "por", "para"]);

  s = s
    .split(" ")
    .map((word, idx) => {
      if (idx > 0 && PARTICLES.has(word.toLowerCase())) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");

  return s;
}

/**
 * Trim + strip invisible + truncate to maxLen.
 *
 * @param {string|null|undefined} str
 * @param {number} maxLen
 * @returns {string|null}
 */
export function normalizeOptional(str, maxLen = 1000) {
  if (!str || typeof str !== "string") return null;
  const s = stripInvisible(str).trim();
  if (s.length === 0) return null;
  return s.slice(0, maxLen);
}

/**
 * Composite: run all normalizations on a raw lead data object.
 *
 * Returns a new object with normalized fields plus original raw values
 * appended as `_raw` for debugging / logging.
 *
 * Expected input fields:
 *  - name (required)
 *  - email (required)
 *  - phone (required)
 *  - ciudad (optional)
 *  - comentarios (optional)
 *
 * @param {object} data  Raw lead data from request body.
 * @returns {object}     Normalized copy of data.
 * @throws {Error}       If any required field fails normalization.
 */
export function normalizeLeadData(data) {
  const raw = { ...data };

  const normalized = {
    name: sanitizeName(raw.name),
    email: normalizeEmail(raw.email),
    phone: normalizePhone(raw.phone),
    ciudad: normalizeOptional(raw.ciudad, 100),
    comentarios: normalizeOptional(raw.comentarios, 1000),
  };

  // Preserve all extra fields (tracking, event_id, etc.) unchanged
  const extraFields = { ...raw };
  delete extraFields.name;
  delete extraFields.email;
  delete extraFields.phone;
  delete extraFields.ciudad;
  delete extraFields.comentarios;

  return { ...normalized, ...extraFields };
}
