const RESERVATION_URL = "https://example.com";

const BRICK_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Crect x='1' y='1' width='118' height='26' rx='1' fill='%23f7f2ea' stroke='%23cfc0aa' stroke-width='1.2'/%3E%3Crect x='-59' y='31' width='118' height='26' rx='1' fill='%23f7f2ea' stroke='%23cfc0aa' stroke-width='1.2'/%3E%3Crect x='61' y='31' width='118' height='26' rx='1' fill='%23f7f2ea' stroke='%23cfc0aa' stroke-width='1.2'/%3E%3C/svg%3E")`;

function Scissors({ size = 24, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
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

function MaleSilhouette() {
  return (
    <svg viewBox="0 0 60 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="30" cy="14" r="12" />
      {/* Body — broad shoulders, tapers slightly */}
      <path d="M18 25 Q8 30 6 42 L6 92 H54 L54 42 Q52 30 42 25 Z" />
      {/* Left arm */}
      <path d="M6 42 L2 74 Q1 79 5 78 L8 58 L8 42 Z" />
      {/* Right arm */}
      <path d="M54 42 L58 74 Q59 79 55 78 L52 58 L52 42 Z" />
    </svg>
  );
}

function FemaleSilhouette() {
  return (
    <svg viewBox="0 0 60 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <ellipse cx="30" cy="13" rx="11" ry="12" />
      {/* Hair (bun silhouette on top) */}
      <path d="M19 13 Q18 2 30 1 Q42 2 41 13 Q37 7 30 7 Q23 7 19 13 Z" />
      {/* Body — A-line dress, widens toward hem */}
      <path d="M20 25 Q12 30 10 40 L4 92 H56 L50 40 Q48 30 40 25 Z" />
      {/* Left arm (slender) */}
      <path d="M10 40 L6 68 Q5 72 9 71 L12 54 L12 40 Z" />
      {/* Right arm (slender) */}
      <path d="M50 40 L54 68 Q55 72 51 71 L48 54 L48 40 Z" />
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
          {/* Inner double-line frame */}
          <div style={{ border: "1px solid rgba(26,20,16,0.25)", margin: "4px" }}>

            {/* ── Black header bar ── */}
            <div
              className="py-5 px-4 text-center"
              style={{ background: "#1a1410" }}
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <Scissors size={18} color="#C4A832" />
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[0.25em]"
                  style={{ fontFamily: 'Georgia, "Noto Serif JP", serif', color: "#f7f2ea" }}
                >
                  HAIR SALON
                </h1>
                <Scissors size={18} color="#C4A832" />
              </div>
              <p
                className="text-xs tracking-[0.5em]"
                style={{ color: "#C4A832", fontFamily: "Georgia, serif" }}
              >
                ── 銀座 · Since 1980 ──
              </p>
            </div>

            {/* ── Blue / Red two-column ── */}
            <div
              className="grid grid-cols-2"
              style={{ borderTop: "2px solid #1a1410" }}
            >
              {/* Blue — 理容室 */}
              <div
                className="flex flex-col items-center justify-between py-8 px-3 gap-4"
                style={{
                  background: "linear-gradient(180deg, #deeaf8 0%, #f7f2ea 100%)",
                  borderRight: "2px solid #1a1410",
                }}
              >
                <div className="text-center">
                  <p
                    className="text-base md:text-xl font-bold tracking-[0.2em]"
                    style={{ color: "#1648A0", fontFamily: "var(--font-serif)" }}
                  >
                    理容室
                  </p>
                  <p
                    className="text-xs tracking-[0.3em] mt-0.5"
                    style={{ color: "#1648A0", opacity: 0.65 }}
                  >
                    BARBER
                  </p>
                </div>

                <div className="w-14 h-[72px] sm:w-18 sm:h-24" style={{ color: "#1648A0" }}>
                  <MaleSilhouette />
                </div>

                <div className="flex flex-col items-center gap-1.5">
                  <Comb size={20} color="#1648A0" />
                  <p
                    className="text-xs text-center tracking-wide"
                    style={{ color: "#1648A0", opacity: 0.7 }}
                  >
                    カット・顔剃り
                  </p>
                </div>
              </div>

              {/* Red — 美容室 */}
              <div
                className="flex flex-col items-center justify-between py-8 px-3 gap-4"
                style={{
                  background: "linear-gradient(180deg, #f8dede 0%, #f7f2ea 100%)",
                }}
              >
                <div className="text-center">
                  <p
                    className="text-base md:text-xl font-bold tracking-[0.2em]"
                    style={{ color: "#B01830", fontFamily: "var(--font-serif)" }}
                  >
                    美容室
                  </p>
                  <p
                    className="text-xs tracking-[0.3em] mt-0.5"
                    style={{ color: "#B01830", opacity: 0.65 }}
                  >
                    BEAUTY
                  </p>
                </div>

                <div className="w-14 h-[72px] sm:w-18 sm:h-24" style={{ color: "#B01830" }}>
                  <FemaleSilhouette />
                </div>

                <div className="flex flex-col items-center gap-1.5">
                  <Scissors size={20} color="#B01830" />
                  <p
                    className="text-xs text-center tracking-wide"
                    style={{ color: "#B01830", opacity: 0.7 }}
                  >
                    カット・カラー
                  </p>
                </div>
              </div>
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
              <p
                className="mt-3 text-xs tracking-widest"
                style={{ color: "var(--text-light)" }}
              >
                お電話でも承ります
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs tracking-widest" style={{ color: "#8B7355" }}>
          scroll
        </span>
        <div
          className="w-px h-10"
          style={{ background: "linear-gradient(to bottom, #8B7355, transparent)" }}
        />
      </div>
    </section>
  );
}
