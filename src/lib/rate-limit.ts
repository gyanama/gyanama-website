// Client-side rate limiter for form submissions
// Tracks submission timestamps in memory to prevent spam

export function createRateLimiter(maxAttempts: number, windowMs: number) {
  const timestamps: number[] = [];

  return {
    canProceed(): boolean {
      const now = Date.now();
      // Remove expired timestamps
      while (timestamps.length > 0 && timestamps[0] < now - windowMs) {
        timestamps.shift();
      }
      return timestamps.length < maxAttempts;
    },

    recordAttempt(): void {
      timestamps.push(Date.now());
    },

    get remainingAttempts(): number {
      const now = Date.now();
      const validTimestamps = timestamps.filter((t) => t >= now - windowMs);
      return Math.max(0, maxAttempts - validTimestamps.length);
    },

    get timeUntilReset(): number {
      if (timestamps.length === 0) return 0;
      const now = Date.now();
      const oldestValid = timestamps.find((t) => t >= now - windowMs);
      if (!oldestValid) return 0;
      return Math.max(0, oldestValid + windowMs - now);
    },
  };
}
