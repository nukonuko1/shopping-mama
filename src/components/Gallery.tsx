const INSTAGRAM_URL = "https://instagram.com/example";

const GALLERY_ITEMS = [
  { id: 1, label: "店舗外観" },
  { id: 2, label: "スタイル01" },
  { id: 3, label: "店内" },
  { id: 4, label: "スタイル02" },
  { id: 5, label: "スタイル03" },
  { id: 6, label: "スタイル04" },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="py-24 md:py-32 px-6"
      style={{ background: "var(--cream-dark)" }}
    >
      <div className="max-w-2xl mx-auto">
        <p className="section-label text-center mb-3 tracking-[0.3em]">Gallery</p>
        <h2
          className="text-2xl md:text-3xl text-center tracking-wider mb-4"
          style={{ fontFamily: "var(--font-serif)", color: "var(--text)" }}
        >
          ギャラリー
        </h2>
        <p
          className="text-center text-xs tracking-widest mb-16"
          style={{ color: "var(--text-light)" }}
        >
          ※ 実際の写真に差し替えてください
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="aspect-square img-placeholder overflow-hidden"
              style={{
                background:
                  item.id % 3 === 0
                    ? "linear-gradient(135deg, #E8E0D7, #D0C4B8)"
                    : item.id % 3 === 1
                    ? "linear-gradient(135deg, #EDE8E3, #DDD5CB)"
                    : "linear-gradient(135deg, #E5DDD5, #D6CCBf)",
              }}
            >
              {/*
                各セルを実際の画像に差し替えてください:
                <img src={`/images/gallery-${item.id}.jpg`} alt={item.label} className="w-full h-full object-cover" />
              */}
              <span className="text-xs tracking-widest opacity-30">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Instagram link */}
        <div className="mt-12 text-center">
          <p className="text-xs tracking-widest mb-4" style={{ color: "var(--text-light)" }}>
            最新スタイルはInstagramでチェック
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 text-xs tracking-widest transition-opacity hover:opacity-70"
            style={{
              border: "1px solid var(--brown-light)",
              color: "var(--brown)",
              borderRadius: "2px",
            }}
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
            Instagram を見る
          </a>
        </div>
      </div>
    </section>
  );
}
