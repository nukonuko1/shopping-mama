"use client";

import { useState, useEffect } from "react";

const RESERVATION_URL = "https://example.com";

export default function FloatingReservation() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <a
        href={RESERVATION_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-float flex items-center gap-2 px-5 py-3 text-xs tracking-widest text-white transition-opacity hover:opacity-80"
        style={{
          background: "var(--brown)",
          borderRadius: "40px",
          boxShadow: "0 4px 20px rgba(139,105,84,0.4)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        ご予約
      </a>
    </div>
  );
}
