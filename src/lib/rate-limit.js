const rateMap = new Map();
const CLEANUP_INTERVAL = 60_000;

const timers = new Set();

if (typeof globalThis !== "undefined" && !timers.has(globalThis)) {
  timers.add(globalThis);
  setInterval(() => {
    const now = Date.now();
    for (const [key, entries] of rateMap) {
      const active = entries.filter((t) => t > now);
      if (active.length === 0) {
        rateMap.delete(key);
      } else {
        rateMap.set(key, active);
      }
    }
  }, CLEANUP_INTERVAL);
}

export function rateLimit({ max = 5, windowMs = 60_000 } = {}) {
  return (ip) => {
    const now = Date.now();
    const cutoff = now - windowMs;

    if (!rateMap.has(ip)) {
      rateMap.set(ip, [now]);
      return { allowed: true };
    }

    const timestamps = rateMap.get(ip).filter((t) => t > cutoff);

    if (timestamps.length >= max) {
      const retryAfter = Math.ceil((timestamps[0] + windowMs - now) / 1000);
      return { allowed: false, retryAfter };
    }

    timestamps.push(now);
    rateMap.set(ip, timestamps);
    return { allowed: true };
  };
}
