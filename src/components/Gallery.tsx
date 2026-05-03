const INSTAGRAM_URL = "https://instagram.com/example";

const GALLERY_ITEMS = [
  { id: 1, label: "店舗外観", bg: "#EDE4D5" },
  { id: 2, label: "スタイル01", bg: "#D9CCBA" },
  { id: 3, label: "店内", bg: "#E5D9C8" },
  { id: 4, label: "スタイル02", bg: "#D6CBBB" },
  { id: 5, label: "スタイル03", bg: "#EAE0D0" },
  { id: 6, label: "スタイル04", bg: "#DDD3C2" },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="py-20 md:py-28 px-6"
      style={{ background: "var(--cream-dark)" }}
    >
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-12">
          <p className="section-eyebrow mb-3">Gallery</p>
          <h2
            className="text-2xl md:text-3xl font-bold tracking-wider"
            style={{ fontFamily: "var(--font-serif)", color: "var(--brown)" }}
          >
            ギャラリー
          </h2>
          <div className="divider-warm mt-5" />
          <p className="mt-4 text-xs tracking-widest" style={{ color: "var(--text-light)" }}>
            実際のスタイルや店内の様子
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className="relative overflow-hidden"
              style={{ borderRadius: "6px" }}
            >
              <div
                className="aspect-square img-placeholder"
                style={{ background: `linear-gradient(135deg, ${item.bg}, #C8BBAB)` }}
              >
                {/*
                  実際の画像に差し替えてください:
                  <img src={`/images/gallery-${item.id}.jpg`} alt={item.label} className="w-full h-full object-cover" />
                */}
                <span className="text-xs opacity-30 tracking-wider">{item.label}</span>
              </div>
              {/* Hover label */}
              {index === 0 && (
                <div
                  className="absolute top-2 left-2 text-xs px-2 py-1 rounded-full text-white tracking-wider"
                  style={{ background: "var(--amber)", fontSize: "0.6rem" }}
                >
                  店舗外観
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="mt-10 card-warm p-6 flex flex-col md:flex-row items-center gap-4 justify-between">
          <div>
            <p className="text-sm font-bold tracking-wider mb-1" style={{ color: "var(--brown)" }}>
              最新スタイルはInstagramで
            </p>
            <p className="text-xs tracking-wide" style={{ color: "var(--text-light)" }}>
              毎週スタイル写真を更新中。フォローお待ちしています！
            </p>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 text-xs tracking-widest text-white transition-opacity hover:opacity-80"
            style={{ background: "#E1306C", borderRadius: "4px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
            Instagramを見る
          </a>
        </div>
      </div>
    </section>
  );
}
