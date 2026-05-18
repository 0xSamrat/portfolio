"use client";

import { useEffect, useState } from "react";

interface ClockState {
  blr: string;
  local: string;
  viewerCity: string;
  viewerIsBlr: boolean;
}

const EMPTY: ClockState = {
  blr: "00:00",
  local: "00:00",
  viewerCity: "",
  viewerIsBlr: true,
};

export function useDualClock() {
  const [state, setState] = useState<ClockState>(EMPTY);

  useEffect(() => {
    const istFmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const viewerTz =
      Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    const viewerCity = (viewerTz.split("/").pop() || viewerTz).replace(
      /_/g,
      " ",
    );
    const viewerIsBlr =
      viewerTz === "Asia/Kolkata" || viewerTz === "Asia/Calcutta";
    const viewerFmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const tick = () => {
      const now = new Date();
      setState({
        blr: istFmt.format(now),
        local: viewerFmt.format(now),
        viewerCity,
        viewerIsBlr,
      });
    };

    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return state;
}
