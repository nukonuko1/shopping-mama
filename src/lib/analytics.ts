"use client";

type EventName =
  | "area_selected"
  | "product_list_viewed"
  | "price_comparison_viewed"
  | "store_detail_viewed"
  | "price_submitted"
  | "search_executed"
  | "signup_completed"
  | "ranking_viewed";

interface AnalyticsEvent {
  event: EventName;
  timestamp: string;
  data?: Record<string, string | number>;
}

export function trackEvent(
  event: EventName,
  data?: Record<string, string | number>
) {
  const entry: AnalyticsEvent = {
    event,
    timestamp: new Date().toISOString(),
    data,
  };

  // Store in localStorage for MVP
  const existing = JSON.parse(localStorage.getItem("analytics") || "[]");
  existing.push(entry);
  // Keep last 500 events
  if (existing.length > 500) existing.splice(0, existing.length - 500);
  localStorage.setItem("analytics", JSON.stringify(existing));

  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", event, data);
  }
}
