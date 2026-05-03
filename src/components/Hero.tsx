const RESERVATION_URL = "https://example.com";
const TEL = "024-553-8640";

const BRICK_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Crect x='1' y='1' width='118' height='26' rx='1' fill='%23f7f2ea' stroke='%23cfc0aa' stroke-width='1.2'/%3E%3Crect x='-59' y='31' width='118' height='26' rx='1' fill='%23f7f2ea' stroke='%23cfc0aa' stroke-width='1.2'/%3E%3Crect x='61' y='31' width='118' height='26' rx='1' fill='%23f7f2ea' stroke='%23cfc0aa' stroke-width='1.2'/%3E%3C/svg%3E")`;

function Scissors({ size = 24, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  );
}

function Comb({ size = 24, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 14" fill={color}>
      <rect x="0" y="0" width="24" height="5" rx="1.5" />
      <rect x="1.5" y="5" width="2.5" height="9" rx="1" />
      <rect x="5.5" y="5" width="2.5" height="7" rx="1" />
      <rect x="9.5" y="5" width="2.5" height="9" rx="1" />
      <rect x="13.5" y="5" width="2.5" height="7" rx="1" />
      <rect x="17.5" y="5" width="2.5" height="9" rx="1" />
      <rect x="21" y="5" width="2.5" height="7" rx="1" />
    </svg>
  );
}

/* Man silhouette — body faces slightly right, hair short */
function ManSilhouette({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 56 96" fill={color} xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <ellipse cx="28" cy="14" rx="13" ry="13" />
      {/* Body — shoulders broader */}
      <path d="M14 27 Q4 33 4 44 L4 90 H52 L52 44 Q52 33 42 27 Z" />
      {/* Left arm */}
      <path d="M4 44 L0 72 Q-1 77 3 76 L6 58 L6 44 Z" />
      {/* Right arm */}
      <path d="M52 44 L56 72 Q57 77 53 76 L50 58 L50 44 Z" />
    </svg>
  );
}

/* Woman silhouette — A-line dress, hair bun, faces slightly left via scaleX */
function WomanSilhouette({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 56 96"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: "scaleX(-1)" }}
    >
      {/* Head */}
      <ellipse cx="28" cy="13" rx="12" ry="12" />
      {/* Hair bun at top */}
      <ellipse cx="34" cy="4" rx="7" ry="6" />
      {/* A-line dress — widens toward hem */}
      <path d="M17 25 Q8 31 6 42 L0 90 H56 L50 42 Q48 31 39 25 Z" />
      {/* Left arm (slender) */}
      <path d="M6 42 L2 67 Q1 71 5 70 L8 54 L8 42 Z" />
      {/* Right arm (slender) */}
      <path d="M50 42 L54 67 Q55 71 51 70 L48 54 L48 42 Z" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      className="relative min-h-dvh flex flex-col items-center justify-center pt-16 pb-16 overflow-hidden"
      style={{
        backgroundColor: "#ede8df",
        backgroundImage: BRICK_BG,
      }}
    >
      <div className="relative z-10 w-full max-w-xl mx-auto px-4">
        {/* ── Main signboard ── */}
        <div
          className="w-full fade-in-up"
          style={{
            border: "3px solid #1a1410",
            boxShadow: "7px 7px 0 #1a1410",
          }}
        >
          <div style={{ border: "1px solid rgba(26,20,16,0.25)", margin: "4px" }}>

            {/* ── Black header bar ── */}
            <div className="py-5 px-4 text-center" style={{ background: "#1a1410" }}>
              <div className="flex items-center justify-center gap-3 mb-2">
                <Scissors size={18} color="#C4A832" />
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[0.2em]"
                  style={{ fontFamily: 'Georgia, "Noto Serif JP", serif', color: "#f7f2ea" }}
                >
                  HAIR SALON
                </h1>
                <Scissors size={18} color="#C4A832" />
              </div>
              <p className="text-xs tracking-[0.5em]" style={{ color: "#C4A832" }}>
                ── 理容室 銀座 · Since 1980 ──
              </p>
            </div>

            {/* ── Service badge row ── */}
            <div
              className="flex items-center justify-center gap-0"
              style={{ borderTop: "2px solid #1a1410" }}
            >
              <div
                className="flex-1 py-3 text-center text-xs font-bold tracking-widest"
                style={{ background: "#1648A0", color: "white" }}
              >
                理容室
              </div>
              <div
                className="px-4 py-3 text-center text-xs tracking-[0.25em]"
                style={{ background: "#f0e9dc", color: "#1a1410" }}
              >
                ＆
              </div>
              <div
                className="flex-1 py-3 text-center text-xs font-bold tracking-widest"
                style={{ background: "#B01830", color: "white" }}
              >
                美容室
              </div>
            </div>

            {/* ── Unified silhouette panel ── */}
            <div
              className="px-6 pt-8 pb-6 text-center"
              style={{ background: "linear-gradient(180deg, #f0e9dc 0%, #f7f2ea 100%)" }}
            >
              {/* Silhouettes facing each other + icons in center */}
              <div className="flex items-end justify-center gap-4 mb-6">
                {/* Man — left side */}
                <div className="w-[60px] h-[76px] sm:w-[72px] sm:h-[90px] shrink-0">
                  <ManSilhouette color="#1648A0" />
                </div>

                {/* Center: comb + scissors stacked */}
                <div className="flex flex-col items-center gap-3 pb-1 shrink-0">
                  <Comb size={22} color="#8B7355" />
                  <Scissors size={22} color="#8B7355" />
                </div>

                {/* Woman — right side (scaleX mirror = faces left → faces man) */}
                <div className="w-[60px] h-[76px] sm:w-[72px] sm:h-[90px] shrink-0">
                  <WomanSilhouette color="#B01830" />
                </div>
              </div>

              {/* "For everyone" message */}
              <p
                className="text-sm md:text-base font-bold tracking-widest mb-2"
                style={{ fontFamily: "var(--font-serif)", color: "#1a1410" }}
              >
                男女問わず、お気軽にどうぞ
              </p>
              <p className="text-xs tracking-wider" style={{ color: "#8B7355" }}>
                カット・カラー・顔剃り・パーマ　どなたでも大歓迎
              </p>
            </div>

            {/* ── Bottom CTA ── */}
            <div
              className="py-6 px-6 text-center"
              style={{ background: "#f9f5ee", borderTop: "2px solid #1a1410" }}
            >
              <p
                className="text-xs md:text-sm tracking-widest leading-loose mb-5"
                style={{ color: "#6B5744", fontFamily: "var(--font-serif)" }}
              >
                また来たくなる、あなたのヘアサロン。
              </p>
              <a
                href={RESERVATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 text-xs tracking-[0.2em] text-white transition-opacity hover:opacity-80"
                style={{ background: "#1a1410", borderRadius: "2px" }}
              >
                ご予約はこちら
              </a>
              <p className="mt-3 text-xs tracking-widest" style={{ color: "var(--text-light)" }}>
                お電話&nbsp;
                <a
                  href={`tel:${TEL.replace(/-/g, "")}`}
                  className="transition-opacity hover:opacity-70"
                  style={{ color: "var(--brown)" }}
                >
                  {TEL}
                </a>
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs tracking-widest" style={{ color: "#8B7355" }}>scroll</span>
        <div
          className="w-px h-10"
          style={{ background: "linear-gradient(to bottom, #8B7355, transparent)" }}
        />
      </div>
    </section>
  );
}
