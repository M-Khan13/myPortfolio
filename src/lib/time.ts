import { greetings } from "@/content";

/** Wall-clock time in `timeZone`, as HH:MM. Safe on both server and client. */
export function formatTime(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

/** Minutes that `timeZone` is offset from UTC at `date` (DST-aware). */
export function offsetMinutes(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date);

  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);

  const asIfUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second"),
  );

  // Drop milliseconds on both sides so the difference lands on a whole minute.
  return (asIfUtc - Math.floor(date.getTime() / 1000) * 1000) / 60_000;
}

/** "5h 30m ahead" / "2h behind" / "same time", relative to the viewer's zone. */
export function describeSkew(date: Date, timeZone: string): string {
  const delta = offsetMinutes(date, timeZone) - -date.getTimezoneOffset();
  if (delta === 0) return "same time";

  const total = Math.abs(delta);
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  const parts = [hours ? `${hours}h` : null, minutes ? `${minutes}m` : null].filter(
    Boolean,
  );

  return `${parts.join(" ")} ${delta > 0 ? "ahead" : "behind"}`;
}

/** Greeting boundaries, as minutes past midnight in `timeZone`. */
const MORNING_STARTS = 5 * 60 + 30; // 05:30
const AFTERNOON_STARTS = 12 * 60; // 12:00
const EVENING_STARTS = 17 * 60; // 17:00

/**
 * Greeting for the intro heading, keyed to the time of day in `timeZone` —
 * always Farzan's zone, not the viewer's, so everyone sees the same thing.
 * The wording lives in `greetings` in `src/content.ts`.
 */
export function greeting(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);

  const minutes = get("hour") * 60 + get("minute");

  if (minutes < MORNING_STARTS) return greetings.night;
  if (minutes < AFTERNOON_STARTS) return greetings.morning;
  if (minutes < EVENING_STARTS) return greetings.afternoon;
  return greetings.evening;
}
