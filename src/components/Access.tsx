export default function Access() {
  return (
    <section id="access" className="py-24 md:py-32 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="section-label text-center mb-3 tracking-[0.3em]">Access</p>
        <h2
          className="text-2xl md:text-3xl text-center tracking-wider mb-16"
          style={{ fontFamily: "var(--font-serif)", color: "var(--text)" }}
        >
          アクセス
        </h2>

        {/* Google Map embed */}
        <div
          className="w-full aspect-video mb-12 overflow-hidden"
          style={{ borderRadius: "4px", border: "1px solid var(--border)" }}
        >
          {/*
            Google Maps埋め込みコードをここに貼り付けてください:
            <iframe
              src="https://www.google.com/maps/embed?pb=..."
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          */}
          <div
            className="w-full h-full img-placeholder flex flex-col gap-2"
            style={{ background: "linear-gradient(135deg, #EDE8E3, #D8D0C8)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "var(--brown-light)" }}
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-xs tracking-widest opacity-50">
              Google Mapをここに埋め込み
            </span>
          </div>
        </div>

        {/* Info table */}
        <div className="space-y-0">
          {[
            { label: "店名", value: "理容室 銀座" },
            { label: "住所", value: "福島県福島市〇〇" },
            { label: "営業時間", value: "8:30 〜 17:30" },
            { label: "定休日", value: "月曜日" },
            { label: "電話", value: "---" },
          ].map((row, i) => (
            <div
              key={row.label}
              className="flex items-start gap-6 py-5"
              style={{
                borderTop: i === 0 ? "1px solid var(--border)" : "none",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span
                className="text-xs tracking-widest w-20 shrink-0 pt-0.5"
                style={{ color: "var(--text-light)" }}
              >
                {row.label}
              </span>
              <span className="text-sm tracking-wide" style={{ color: "var(--text)" }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Note */}
        <p
          className="mt-6 text-xs leading-relaxed tracking-wide"
          style={{ color: "var(--text-light)" }}
        >
          ※ バス停「〇〇」から徒歩1分
          <br />
          ※ 駐車場あり（〇台）
        </p>
      </div>
    </section>
  );
}
