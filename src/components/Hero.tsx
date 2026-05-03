const RESERVATION_URL = "https://example.com";

export default function Hero() {
  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden">
      {/* Background image placeholder — replace src with actual photo */}
      <div
        className="absolute inset-0 img-placeholder"
        style={{
          background: "linear-gradient(160deg, #EDE8E3 0%, #DDD5CB 50%, #C9BDB4 100%)",
        }}
      >
        {/*
          実際の店舗写真に差し替えてください:
          <img src="/images/hero.jpg" alt="理容室 銀座 外観" className="w-full h-full object-cover" />
        */}
        <span className="absolute bottom-8 right-8 text-xs tracking-widest opacity-40">
          店舗写真をここに配置
        </span>
      </div>

      {/* Overlay for readability */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(250,248,244,0.55)" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-8 fade-in-up">
        <p
          className="section-label mb-6 tracking-[0.35em]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Since 1980
        </p>

        <h1
          className="text-5xl md:text-7xl font-bold mb-4 tracking-widest"
          style={{ fontFamily: "var(--font-serif)", color: "var(--text)" }}
        >
          銀座
        </h1>

        <p
          className="text-xs md:text-sm tracking-[0.3em] mb-2"
          style={{ color: "var(--text-muted)" }}
        >
          理容室
        </p>

        <div className="divider my-8" />

        <p
          className="text-sm md:text-base tracking-widest leading-loose mb-12"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-serif)" }}
        >
          また来たくなる、
          <br />
          あなたの理容室。
        </p>

        <a
          href={RESERVATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 text-xs tracking-[0.2em] text-white transition-opacity hover:opacity-80"
          style={{ background: "var(--brown)", borderRadius: "2px" }}
        >
          ご予約はこちら
        </a>

        <p className="mt-4 text-xs tracking-widest" style={{ color: "var(--text-light)" }}>
          お電話でも承ります
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs tracking-widest" style={{ color: "var(--text-light)" }}>
          scroll
        </span>
        <div
          className="w-px h-10"
          style={{
            background: "linear-gradient(to bottom, var(--brown-light), transparent)",
          }}
        />
      </div>
    </section>
  );
}
