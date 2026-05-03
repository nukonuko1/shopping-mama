const RESERVATION_URL = "https://example.com";

export default function Hero() {
  return (
    <section className="relative min-h-dvh flex flex-col overflow-hidden">
      {/* Barber stripe top accent */}
      <div className="stripe-bar absolute top-0 left-0 right-0 z-20" />

      {/* Background — replace with actual store photo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #F5EDDC 0%, #EAD9C0 40%, #D9C8A8 100%)",
        }}
      >
        {/*
          店舗写真に差し替えてください:
          <img src="/images/hero.jpg" alt="理容室 銀座 外観" className="w-full h-full object-cover" />
        */}
      </div>

      {/* Warm overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(251,245,234,0.3) 0%, rgba(251,245,234,0.7) 60%, var(--cream) 100%)",
        }}
      />

      {/* Retro illustration area (top-right) */}
      <div
        className="absolute top-16 right-0 w-48 md:w-72 h-48 md:h-72 opacity-10"
        style={{
          background:
            "radial-gradient(circle, var(--amber) 0%, transparent 70%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-10">
        {/* Retro badge */}
        <div className="fade-in mb-8" style={{ animationDelay: "0.1s", opacity: 0 }}>
          <div
            className="oval-badge w-20 h-20 md:w-24 md:h-24 text-white float"
            style={{ background: "var(--teal)", fontSize: "0.55rem", letterSpacing: "0.05em" }}
          >
            <div className="text-center leading-tight">
              <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>銀</div>
              <div>理容室</div>
            </div>
          </div>
        </div>

        {/* Title block */}
        <div className="fade-in text-center" style={{ animationDelay: "0.2s", opacity: 0 }}>
          <p
            className="section-eyebrow mb-3"
            style={{ color: "var(--brown-mid)" }}
          >
            Since 1980 · Fukushima
          </p>

          <h1
            className="text-5xl md:text-7xl font-bold tracking-widest mb-3"
            style={{ fontFamily: "var(--font-serif)", color: "var(--brown)" }}
          >
            銀座
          </h1>
          <p
            className="text-xs md:text-sm tracking-[0.4em] mb-8"
            style={{ color: "var(--text-muted)" }}
          >
            HAIR SALON GINZA
          </p>
        </div>

        {/* Catch copy */}
        <div className="fade-in text-center" style={{ animationDelay: "0.35s", opacity: 0 }}>
          <div className="divider-warm mb-7" />
          <p
            className="text-base md:text-xl leading-[2] tracking-wider"
            style={{ fontFamily: "var(--font-serif)", color: "var(--text)" }}
          >
            たまたま入ったのに、
            <br />
            また来たくなる場所。
          </p>
          <div className="divider-warm mt-7 mb-10" />
        </div>

        {/* CTA */}
        <div className="fade-in flex flex-col items-center gap-3" style={{ animationDelay: "0.5s", opacity: 0 }}>
          <a
            href={RESERVATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-10 py-4 text-sm tracking-widest text-white transition-all hover:opacity-85 active:scale-95"
            style={{
              background: "var(--amber)",
              borderRadius: "4px",
              boxShadow: "0 4px 16px rgba(212,130,26,0.4)",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            ご予約はこちら
          </a>
          <p className="text-xs tracking-widest" style={{ color: "var(--text-light)" }}>
            お電話でも受け付けています
          </p>
        </div>
      </div>

      {/* Info strip */}
      <div
        className="relative z-10 px-6 py-4 flex justify-center gap-8 md:gap-16 text-center"
        style={{
          background: "var(--brown)",
          borderTop: "3px solid var(--amber)",
        }}
      >
        {[
          { label: "創業", value: "45年目" },
          { label: "営業時間", value: "8:30〜17:30" },
          { label: "定休日", value: "月曜日" },
        ].map((item) => (
          <div key={item.label}>
            <p className="text-xs tracking-widest mb-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
              {item.label}
            </p>
            <p
              className="text-sm tracking-wider text-white"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="w-px h-8"
          style={{
            background: "linear-gradient(to bottom, var(--amber-light), transparent)",
          }}
        />
      </div>
    </section>
  );
}
