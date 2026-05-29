export function generateEventId(prefix = "evt") {
  return `${prefix}_${crypto.randomUUID()}`;
}
