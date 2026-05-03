const RESERVATION_URL = "https://example.com";

export default function ReservationCTA() {
  return (
    <section
      id="reservation"
      className="py-24 md:py-32 px-6 relative overflow-hidden"
      style={{ background: "var(--brown-dark)" }}
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <p
          className="section-label mb-6 tracking-[0.3em]"
          style={{ color: "var(--brown-light)" }}
        >
          Reservation
        </p>

        <h2
          className="text-2xl md:text-3xl tracking-wider mb-6"
          style={{ fontFamily: "var(--font-serif)", color: "white" }}
        >
          ご予約・お問い合わせ
        </h2>

        <div
          className="w-8 h-px mx-auto mb-8"
          style={{ background: "rgba(255,255,255,0.3)" }}
        />

        <p
          className="text-sm leading-loose tracking-wide mb-12"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          はじめてのお客様も大歓迎です。
          <br />
          ご希望の日時・スタイルをお気軽にご相談ください。
        </p>

        <a
          href={RESERVATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-12 py-4 text-sm tracking-[0.25em] transition-opacity hover:opacity-80 mb-8"
          style={{
            background: "white",
            color: "var(--brown-dark)",
            borderRadius: "2px",
            fontFamily: "var(--font-serif)",
          }}
        >
          オンライン予約はこちら
        </a>

        <p
          className="text-xs tracking-widest"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          ※ お電話でもご予約を承っています
        </p>
      </div>
    </section>
  );
}
