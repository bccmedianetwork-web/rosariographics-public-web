"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { persistTrackingData, readTrackingData } from "@/lib/tracking";

const TrackingContext = createContext({});

export function useTracking() {
  return useContext(TrackingContext);
}

function pushPageView() {
  if (typeof window === "undefined" || !window.dataLayer) return;

  window.dataLayer.push({
    event: "page_view",
    page_location: window.location.href,
    page_title: document.title,
    page_referrer: document.referrer || undefined,
  });
}

export default function TrackingProvider({ children }) {
  const pathname = usePathname();
  const [trackingData, setTrackingData] = useState({});

  useEffect(() => {
    persistTrackingData();
    setTrackingData(readTrackingData());
  }, []);

  useEffect(() => {
    pushPageView();
  }, [pathname]);

  return (
    <TrackingContext.Provider value={trackingData}>
      {children}
    </TrackingContext.Provider>
  );
}
