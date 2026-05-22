"use client";

import { useDualClock } from "../hooks/useDualClock";

export function Clock() {
  const { local, viewerCity } = useDualClock();

  return (
    <span className="clock" title="Your local time">
      <span className="dim">{viewerCity}</span> {local}
    </span>
  );
}
