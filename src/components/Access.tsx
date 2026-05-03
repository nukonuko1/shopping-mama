export default function Access() {
  return (
    <section id="access" className="py-20 md:py-28 px-6">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-12">
          <p className="section-eyebrow mb-3">Access</p>
          <h2
            className="text-2xl md:text-3xl font-bold tracking-wider"
            style={{ fontFamily: "var(--font-serif)", color: "var(--brown)" }}
          >
            アクセス
          </h2>
          <div className="divider-warm mt-5" />
        </div>

        {/* Map embed */}
        <div
          className="w-full mb-8 overflow-hidden"
          style={{ borderRadius: "8px", border: "2px solid var(--border)", aspectRatio: "16/9" }}
        >
          {/*
            Google Mapsの埋め込みコードをここに貼り付けてください:
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
          <div className="w-full h-full img-placeholder" style={{ minHeight: "200px" }}>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
              style={{ background: "var(--amber-pale)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "var(--amber)" }}
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <span className="text-xs tracking-widest opacity-50">Google Mapをここに埋め込み</span>
          </div>
        </div>

        {/* Info card */}
        <div className="card-warm overflow-hidden mb-6">
          <div
            className="px-5 py-3 flex items-center gap-2"
            style={{ background: "var(--amber-pale)", borderBottom: "1px solid #F0C870" }}
          >
            <span>🏠</span>
            <span
              className="text-xs tracking-widest font-bold"
              style={{ color: "var(--amber)", fontFamily: "var(--font-serif)" }}
            >
              店舗情報
            </span>
          </div>

          <div className="divide-y" style={{ borderColor: "var(--border)" }}>
            {[
              { icon: "🏡", label: "店名", value: "理容室 銀座" },
              { icon: "📍", label: "住所", value: "福島県福島市〇〇" },
              { icon: "🕐", label: "営業時間", value: "8:30 〜 17:30" },
              { icon: "📅", label: "定休日", value: "月曜日" },
              { icon: "🚌", label: "アクセス", value: "バス停「〇〇」から徒歩1分" },
              { icon: "🚗", label: "駐車場", value: "あり（〇台）" },
            ].map((row) => (
              <div key={row.label} className="px-5 py-4 flex items-start gap-4">
                <span className="text-sm mt-0.5">{row.icon}</span>
                <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                  <span
                    className="text-xs tracking-widest shrink-0 w-16"
                    style={{ color: "var(--text-light)" }}
                  >
                    {row.label}
                  </span>
                  <span className="text-sm tracking-wide" style={{ color: "var(--text)" }}>
                    {row.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div
          className="rounded-lg px-5 py-4 flex items-start gap-3"
          style={{ background: "var(--cream-dark)", border: "1px solid var(--border)" }}
        >
          <span className="text-sm">💡</span>
          <p className="text-xs leading-loose tracking-wide" style={{ color: "var(--text-muted)" }}>
            はじめてのご来店も大歓迎です。
            <br />
            「どんなヘアスタイルにしたらいいかわからない」という方も、
            お気軽にご相談ください。
          </p>
        </div>
      </div>
    </section>
  );
}
