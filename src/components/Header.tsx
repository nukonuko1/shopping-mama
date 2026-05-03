"use client";

import { useState } from "react";

const RESERVATION_URL = "https://example.com";

const NAV_LINKS = [
  { href: "#concept", label: "コンセプト" },
  { href: "#menu", label: "メニュー" },
  { href: "#stylist", label: "スタイリスト" },
  { href: "#gallery", label: "ギャラリー" },
  { href: "#access", label: "アクセス" },
];

/* Miniature barber-pole stripe column */
function BarberPole() {
  const stripes = ["#1648A0", "#f7f2ea", "#B01830", "#1648A0", "#f7f2ea", "#B01830"];
  return (
    <div
      style={{
        width: 5,
        height: 26,
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      {stripes.map((c, i) => (
        <div key={i} style={{ flex: 1, background: c }} />
      ))}
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ── Main header — shop-sign exterior look ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "linear-gradient(180deg, #1a1410 0%, #251c14 100%)",
          borderBottom: "3px solid #8B6914",
          boxShadow: "0 3px 16px rgba(0,0,0,0.55)",
        }}
      >
        {/* Gold accent line at very top */}
        <div
          style={{
            height: 2,
            background: "linear-gradient(90deg, transparent 0%, #C4A832 30%, #C4A832 70%, transparent 100%)",
          }}
        />

        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <BarberPole />
            <div>
              <span
                className="block text-base font-bold tracking-[0.35em] leading-tight"
                style={{ fontFamily: 'Georgia, "Noto Serif JP", serif', color: "#E8D5A0" }}
              >
                銀座
              </span>
              <span
                className="block tracking-[0.25em] leading-tight"
                style={{ color: "rgba(232,213,160,0.5)", fontSize: "0.55rem" }}
              >
                HAIR SALON
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs tracking-widest transition-opacity hover:opacity-70"
                style={{ color: "rgba(232,213,160,0.72)" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={RESERVATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex px-4 py-1.5 text-xs tracking-widest transition-opacity hover:opacity-75"
              style={{
                border: "1px solid #C4A832",
                color: "#E8D5A0",
                borderRadius: "2px",
              }}
            >
              ご予約
            </a>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="メニューを開く"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block w-5 h-px transition-all duration-300"
                  style={{
                    background: "#E8D5A0",
                    transform:
                      menuOpen
                        ? i === 0
                          ? "rotate(45deg) translate(3px, 3px)"
                          : i === 2
                          ? "rotate(-45deg) translate(3px, -3px)"
                          : ""
                        : "",
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Second gold rule below nav */}
        <div
          style={{
            height: 1,
            background: "linear-gradient(90deg, transparent 0%, rgba(196,168,50,0.35) 30%, rgba(196,168,50,0.35) 70%, transparent 100%)",
          }}
        />
      </header>

      {/* ── Mobile drawer ── */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-300"
        style={{
          pointerEvents: menuOpen ? "auto" : "none",
          opacity: menuOpen ? 1 : 0,
        }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.55)" }}
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className="absolute top-0 right-0 bottom-0 w-64 px-8 py-20 flex flex-col gap-6"
          style={{
            background: "#1a1410",
            borderLeft: "2px solid #8B6914",
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease",
          }}
        >
          {/* Gold top rule */}
          <div
            className="absolute top-16 left-8 right-8 h-px"
            style={{ background: "rgba(196,168,50,0.3)" }}
          />

          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-widest transition-opacity hover:opacity-70"
              style={{ color: "rgba(232,213,160,0.75)" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <a
            href={RESERVATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-center py-3 text-sm tracking-widest transition-opacity hover:opacity-75"
            style={{
              border: "1px solid #C4A832",
              color: "#E8D5A0",
              borderRadius: "2px",
            }}
          >
            ご予約はこちら
          </a>
        </div>
      </div>
    </>
  );
}
