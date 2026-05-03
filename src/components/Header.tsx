"use client";

import { useState, useEffect } from "react";

const RESERVATION_URL = "https://example.com";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#concept", label: "コンセプト" },
    { href: "#menu", label: "メニュー" },
    { href: "#stylist", label: "スタイリスト" },
    { href: "#gallery", label: "ギャラリー" },
    { href: "#access", label: "アクセス" },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(251,245,234,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
          boxShadow: scrolled ? "0 2px 16px rgba(90,50,20,0.08)" : "none",
        }}
      >
        {/* Stripe bar — only when scrolled */}
        {scrolled && <div className="stripe-bar" style={{ height: "3px" }} />}

        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div
              className="oval-badge w-7 h-7 text-white"
              style={{ background: "var(--teal)", fontSize: "0.6rem" }}
            >
              銀
            </div>
            <span
              className="text-base tracking-widest font-bold"
              style={{ fontFamily: "var(--font-serif)", color: "var(--brown)" }}
            >
              銀座
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs tracking-widest hover:opacity-60 transition-opacity"
                style={{ color: "var(--text-muted)" }}
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
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-xs tracking-widest text-white transition-opacity hover:opacity-80"
              style={{ background: "var(--amber)", borderRadius: "4px" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              ご予約
            </a>

            <button
              className="md:hidden p-2 flex flex-col gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="メニュー"
            >
              <span
                className="block w-5 h-0.5 rounded transition-all duration-300"
                style={{
                  background: "var(--brown)",
                  transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "",
                }}
              />
              <span
                className="block w-5 h-0.5 rounded transition-all duration-300"
                style={{ background: "var(--brown)", opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-5 h-0.5 rounded transition-all duration-300"
                style={{
                  background: "var(--brown)",
                  transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "",
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-300"
        style={{
          pointerEvents: menuOpen ? "auto" : "none",
          opacity: menuOpen ? 1 : 0,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "rgba(42,26,13,0.4)" }}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className="absolute top-0 right-0 bottom-0 w-72 flex flex-col"
          style={{
            background: "var(--cream)",
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease",
          }}
        >
          {/* Stripe top */}
          <div className="stripe-bar" />

          <div className="px-8 py-16 flex flex-col gap-1">
            <div className="flex items-center gap-3 mb-8">
              <div
                className="oval-badge w-10 h-10 text-white"
                style={{ background: "var(--teal)", fontSize: "0.65rem" }}
              >
                銀
              </div>
              <div>
                <p className="font-bold tracking-widest" style={{ fontFamily: "var(--font-serif)", color: "var(--brown)" }}>
                  銀座
                </p>
                <p className="text-xs" style={{ color: "var(--text-light)" }}>HAIR SALON</p>
              </div>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-3 text-sm tracking-widest border-b transition-opacity hover:opacity-60"
                style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}

            <a
              href={RESERVATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 text-center py-4 text-sm tracking-widest text-white"
              style={{ background: "var(--amber)", borderRadius: "4px" }}
            >
              ご予約はこちら
            </a>

            <div className="mt-8 text-center">
              <p className="text-xs tracking-widest" style={{ color: "var(--text-light)" }}>
                営業 8:30〜17:30 ／ 月曜定休
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
