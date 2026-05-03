const INSTAGRAM_URL = "https://instagram.com/example";
const RESERVATION_URL = "https://example.com";

export default function Footer() {
  return (
    <footer style={{ background: "var(--brown)" }}>
      {/* Stripe */}
      <div className="stripe-bar" />

      <div className="max-w-2xl mx-auto px-6 py-14">

        {/* Logo area */}
        <div className="flex flex-col items-center mb-10">
          <div
            className="oval-badge w-16 h-16 text-white mb-4"
            style={{ background: "var(--teal)", fontSize: "1rem" }}
          >
            <div className="text-center leading-tight">
              <div style={{ fontSize: "1.4rem", fontWeight: 700 }}>銀</div>
            </div>
          </div>
          <p
            className="text-xl font-bold tracking-widest text-white mb-1"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            銀座
          </p>
          <p className="text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
            HAIR SALON GINZA · Since 1980
          </p>
        </div>

        {/* Info */}
        <div
          className="rounded-lg p-5 mb-8 text-center space-y-2"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <p className="text-sm tracking-wider text-white">福島県福島市〇〇</p>
          <p className="text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>
            営業時間 8:30〜17:30 ／ 月曜定休
          </p>
        </div>

        {/* Nav links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
          {[
            { href: "#concept", label: "コンセプト" },
            { href: "#menu", label: "メニュー" },
            { href: "#stylist", label: "スタイリスト" },
            { href: "#gallery", label: "ギャラリー" },
            { href: "#access", label: "アクセス" },
            { href: RESERVATION_URL, label: "ご予約", external: true },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-xs tracking-widest transition-opacity hover:opacity-60"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Instagram */}
        <div className="text-center mb-8">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs tracking-widest transition-opacity hover:opacity-80"
            style={{ background: "rgba(225,48,108,0.9)", color: "white" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
            </svg>
            @ginza_barber
          </a>
        </div>

        <p className="text-center text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
          © 理容室 銀座. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
