"use client";

import { useSyncExternalStore } from "react";

import { greeting } from "@/lib/time";

/**
 * The wall clock is the external source here, so re-read it every minute. That
 * way a tab left open across 05:30 / 12:00 / 17:00 IST updates itself, and a
 * prerendered page that went stale corrects on load.
 */
const subscribeToMinute = (onChange: () => void) => {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
};

/**
 * Greets by Farzan's local time of day (IST), so every visitor sees the same
 * greeting regardless of where they are. `initial` is the server-rendered
 * value, which is also what shows with JS disabled.
 */
export function Greeting({
  initial,
  timeZone,
}: {
  initial: string;
  timeZone: string;
}) {
  const text = useSyncExternalStore(
    subscribeToMinute,
    () => greeting(new Date(), timeZone),
    () => initial,
  );

  return <span>{text}</span>;
}
