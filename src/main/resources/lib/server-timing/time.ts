export const Instant = Java.type<Instant>("java.time.Instant");
export const Duration = Java.type<Duration>("java.time.Duration");

export interface Instant {
  now(): Instant;
}

export interface Duration {
  between(startInclusive: Instant, endExclusive: Instant): Duration;

  toMillis(): number;

  toMillisPart(): number;
}
