/**
 * High-performance sliding-window in-memory rate limiter.
 * Designed for high concurrency and heavy usage.
 * Automatically cleans up expired IP buckets to prevent memory leaks.
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

class MemoryRateLimiter {
  private store: Map<string, RateLimitRecord> = new Map();
  private lastCleanup: number = Date.now();
  private readonly cleanupIntervalMs: number = 60 * 1000; // 1 minute

  /**
   * Check if a client key (e.g. IP) is allowed.
   * @param key Identifier (IP or hash)
   * @param limit Max allowed requests within window
   * @param windowMs Time window in milliseconds
   */
  public check(
    key: string,
    limit: number = 5,
    windowMs: number = 10 * 60 * 1000 // 10 minutes default
  ): { success: boolean; remaining: number; resetInSeconds: number } {
    const now = Date.now();

    // Trigger cleanup periodically
    if (now - this.lastCleanup > this.cleanupIntervalMs) {
      this.cleanup(now);
      this.lastCleanup = now;
    }

    const record = this.store.get(key);

    if (!record || now > record.resetTime) {
      // First request or window expired
      this.store.set(key, {
        count: 1,
        resetTime: now + windowMs,
      });
      return {
        success: true,
        remaining: limit - 1,
        resetInSeconds: Math.ceil(windowMs / 1000),
      };
    }

    if (record.count >= limit) {
      const resetInSeconds = Math.max(0, Math.ceil((record.resetTime - now) / 1000));
      return {
        success: false,
        remaining: 0,
        resetInSeconds,
      };
    }

    record.count += 1;
    const resetInSeconds = Math.max(0, Math.ceil((record.resetTime - now) / 1000));
    return {
      success: true,
      remaining: limit - record.count,
      resetInSeconds,
    };
  }

  /**
   * Remove expired buckets from memory to prevent memory bloat under heavy traffic
   */
  private cleanup(now: number): void {
    for (const [key, record] of this.store.entries()) {
      if (now > record.resetTime) {
        this.store.delete(key);
      }
    }
  }
}

// Global singleton instance
export const rateLimiter = new MemoryRateLimiter();
