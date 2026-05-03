const RESERVATION_URL = "https://example.com";

export default function ReservationCTA() {
  return (
    <section
      id="reservation"
      className="relative py-20 md:py-28 px-6 overflow-hidden"
      style={{ background: "var(--teal)" }}
    >
      {/* Barber stripe accent */}
      <div className="stripe-bar absolute top-0 left-0 right-0" />

      {/* BG circles */}
      <div
        className="absolute -right-16 -top-16 w-64 h-64 rounded-full opacity-15"
        style={{ background: "white" }}
      />
      <div
        className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full opacity-10"
        style={{ background: "var(--amber)" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">

        <p className="section-eyebrow mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>
          Reservation
        </p>

        <h2
          className="text-2xl md:text-3xl font-bold tracking-wider mb-4 text-white"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          ご予約・お問い合わせ
        </h2>

        <div className="w-10 h-0.5 mx-auto mb-8" style={{ background: "var(--amber-light)" }} />

        <p
          className="text-sm leading-[2.2] tracking-wide mb-10"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          はじめてのお客様も大歓迎です。
          <br />
          ご希望の日時・スタイルなど、
          <br />
          お気軽にご相談ください。
        </p>

        {/* CTA button */}
        <a
          href={RESERVATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-10 py-4 text-sm tracking-widest transition-all hover:opacity-85 active:scale-95 mb-6"
          style={{
            background: "var(--amber)",
            color: "white",
            borderRadius: "4px",
            boxShadow: "0 4px 20px rgba(212,130,26,0.5)",
            fontFamily: "var(--font-serif)",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          オンライン予約はこちら
        </a>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {[
            "✅ 24時間予約受付",
            "✅ 初めての方歓迎",
            "✅ 当日予約も相談可",
          ].map((item) => (
            <span
              key={item}
              className="text-xs tracking-wide px-3 py-1.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)" }}
            >
              {item}
            </span>
          ))}
        </div>

        <p className="mt-8 text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
          お電話でのご予約も承っています
        </p>
      </div>
    </section>
  );
}
