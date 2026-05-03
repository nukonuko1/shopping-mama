"use client";

import { useState, useEffect } from "react";

const RESERVATION_URL = "https://example.com";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
          background: scrolled ? "rgba(250,250,247,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
        }}
      >
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <a
            href="#"
            className="font-serif text-lg tracking-widest"
            style={{ fontFamily: "var(--font-serif)", color: "var(--text)" }}
          >
            銀座
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
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
              className="hidden md:inline-flex px-5 py-2 text-xs tracking-widest text-white transition-opacity hover:opacity-80"
              style={{ background: "var(--brown)", borderRadius: "2px" }}
            >
              ご予約
            </a>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="メニュー"
            >
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{
                  background: "var(--text)",
                  transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "",
                }}
              />
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{
                  background: "var(--text)",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{
                  background: "var(--text)",
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
          style={{ background: "rgba(0,0,0,0.3)" }}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className="absolute top-0 right-0 bottom-0 w-64 px-8 py-20 flex flex-col gap-6"
          style={{
            background: "var(--cream)",
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-widest"
              style={{ color: "var(--text-muted)" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={RESERVATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-center py-3 text-sm tracking-widest text-white"
            style={{ background: "var(--brown)", borderRadius: "2px" }}
          >
            ご予約はこちら
          </a>
        </div>
      </div>
    </>
  );
}
