import Image from "next/image";

const RESERVATION_URL = "https://example.com";

export default function Hero() {
  return (
    <section className="relative min-h-dvh flex flex-col overflow-hidden">
      {/* ===== STOREFRONT PHOTO — FULL BLEED ===== */}
      <div className="absolute inset-0">
        <Image
          src="/images/storefront.jpg"
          alt="理容室 銀座 外観"
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
        {/* Multi-layer overlay: keeps top bright (photo visible), darkens bottom for text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 40%, rgba(30,16,6,0.72) 72%, rgba(30,16,6,0.92) 100%)",
          }}
        />
      </div>

      {/* ===== CONTENT — bottom-anchored ===== */}
      <div className="relative z-10 flex-1 flex flex-col justify-end px-6 pb-10 pt-24">
        {/* Badge */}
        <div className="mb-5">
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs tracking-widest rounded-full"
            style={{
              background: "rgba(27,94,139,0.85)",
              color: "white",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--amber-light)" }}
            />
            福島市の理容室 · 創業45年
          </span>
        </div>

        {/* Main title */}
        <h1
          className="text-6xl md:text-8xl font-bold tracking-widest text-white mb-2"
          style={{
            fontFamily: "var(--font-serif)",
            textShadow: "0 2px 20px rgba(0,0,0,0.4)",
          }}
        >
          銀座
        </h1>
        <p
          className="text-sm md:text-base tracking-[0.45em] mb-6"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          HAIR SALON GINZA
        </p>

        {/* Catch copy */}
        <p
          className="text-lg md:text-2xl leading-[1.9] tracking-wider text-white mb-10"
          style={{
            fontFamily: "var(--font-serif)",
            textShadow: "0 1px 12px rgba(0,0,0,0.5)",
          }}
        >
          たまたま入ったのに、
          <br />
          また来たくなる場所。
        </p>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <a
            href={RESERVATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm tracking-widest text-white transition-all hover:opacity-85 active:scale-95"
            style={{
              background: "var(--amber)",
              borderRadius: "4px",
              boxShadow: "0 4px 24px rgba(212,130,26,0.55)",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            ご予約はこちら
          </a>

          <a
            href="#concept"
            className="inline-flex items-center gap-2 px-6 py-4 text-sm tracking-widest transition-all hover:opacity-85"
            style={{
              color: "white",
              border: "1px solid rgba(255,255,255,0.4)",
              borderRadius: "4px",
            }}
          >
            銀座について →
          </a>
        </div>

        {/* Quick info strip */}
        <div
          className="mt-10 flex gap-6 flex-wrap"
          style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "1.25rem" }}
        >
          {[
            { label: "営業時間", value: "8:30〜17:30" },
            { label: "定休日", value: "月曜日" },
            { label: "所在地", value: "福島県福島市" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="text-xs tracking-wider" style={{ color: "rgba(255,255,255,0.45)" }}>
                {item.label}
              </span>
              <span className="text-xs tracking-wider text-white font-medium">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
