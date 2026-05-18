"use client";

import { useDualClock } from "../hooks/useDualClock";

export function Clock() {
  const { blr, local, viewerCity, viewerIsBlr } = useDualClock();

  return (
    <span className="clock" title="Bangalore (Samrat) · Your local time">
      <span className="dim">Blr</span> {blr}
      {!viewerIsBlr && (
        <>
          <span className="dim sep">·</span>
          <span className="dim">{viewerCity}</span> {local}
        </>
      )}
    </span>
  );
}
