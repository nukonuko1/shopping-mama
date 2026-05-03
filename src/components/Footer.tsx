const INSTAGRAM_URL = "https://instagram.com/example";
const RESERVATION_URL = "https://example.com";

export default function Footer() {
  return (
    <footer className="py-16 px-6" style={{ background: "var(--text)" }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p
            className="text-2xl tracking-widest mb-2"
            style={{ fontFamily: "var(--font-serif)", color: "white" }}
          >
            銀座
          </p>
          <p className="text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
            理容室
          </p>
        </div>

        <div
          className="w-8 h-px mx-auto mb-10"
          style={{ background: "rgba(255,255,255,0.15)" }}
        />

        <div className="flex justify-center gap-8 mb-10">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest transition-opacity hover:opacity-60"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Instagram
          </a>
          <a
            href={RESERVATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest transition-opacity hover:opacity-60"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            ご予約
          </a>
          <a
            href="#access"
            className="text-xs tracking-widest transition-opacity hover:opacity-60"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            アクセス
          </a>
        </div>

        <p
          className="text-center text-xs tracking-widest"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          © 理容室 銀座. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
