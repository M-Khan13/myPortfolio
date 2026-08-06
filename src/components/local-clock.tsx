"use client";

import { useEffect, useState } from "react";

import { describeSkew, formatTime } from "@/lib/time";

export function LocalClock({
  timeZone,
  label,
  initialTime,
}: {
  timeZone: string;
  label: string;
  /** Server-rendered value, so the row isn't blank before hydration. */
  initialTime: string;
}) {
  const [time, setTime] = useState(initialTime);
  // Depends on the viewer's own zone, so it's only knowable after mount.
  const [skew, setSkew] = useState<string | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const now = new Date();
      setTime(formatTime(now, timeZone));
      setSkew(describeSkew(now, timeZone));
      // Re-align to the top of the next minute rather than drifting.
      timeout = setTimeout(
        tick,
        60_000 - (now.getSeconds() * 1000 + now.getMilliseconds()),
      );
    };

    tick();
    return () => clearTimeout(timeout);
  }, [timeZone]);

  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-2">
      <span suppressHydrationWarning>
        <time>{time}</time> {label}
      </span>
      {skew ? (
        <span className="text-muted-foreground" suppressHydrationWarning>
          {"// "}
          {skew}
        </span>
      ) : null}
    </span>
  );
}
