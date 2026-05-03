const MENU_ITEMS = [
  {
    category: "カット",
    items: [
      { name: "カット", price: "¥3,300" },
      { name: "カット + シャンプー", price: "¥4,400" },
      { name: "カット + シャンプー + 顔剃り", price: "¥5,500", popular: true },
    ],
  },
  {
    category: "顔剃り・シャンプー",
    items: [
      { name: "顔剃り", price: "¥2,200" },
      { name: "シャンプー", price: "¥1,100" },
      { name: "シャンプー + 顔剃り", price: "¥2,750" },
    ],
  },
  {
    category: "パーマ・カラー",
    items: [
      { name: "パーマ（カット込み）", price: "¥8,800〜" },
      { name: "カラー（カット込み）", price: "¥8,800〜" },
      { name: "ヘッドスパ", price: "¥3,300" },
    ],
  },
];

export default function Menu() {
  return (
    <section
      id="menu"
      className="py-24 md:py-32 px-6"
      style={{ background: "var(--cream-dark)" }}
    >
      <div className="max-w-2xl mx-auto">
        <p className="section-label text-center mb-3 tracking-[0.3em]">Menu & Price</p>
        <h2
          className="text-2xl md:text-3xl text-center tracking-wider mb-16"
          style={{ fontFamily: "var(--font-serif)", color: "var(--text)" }}
        >
          メニュー料金
        </h2>

        <div className="space-y-12">
          {MENU_ITEMS.map((category) => (
            <div key={category.category}>
              <p
                className="text-xs tracking-[0.25em] mb-5 pb-3"
                style={{
                  color: "var(--brown)",
                  borderBottom: "1px solid var(--border)",
                  fontFamily: "var(--font-serif)",
                }}
              >
                {category.category}
              </p>
              <div className="space-y-4">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between py-2 relative"
                  >
                    <div className="flex items-center gap-3">
                      {item.popular && (
                        <span
                          className="text-xs px-2 py-0.5 tracking-widest"
                          style={{
                            background: "var(--brown)",
                            color: "white",
                            borderRadius: "2px",
                            fontSize: "0.6rem",
                          }}
                        >
                          人気
                        </span>
                      )}
                      <span
                        className="text-sm tracking-wide"
                        style={{ color: "var(--text)" }}
                      >
                        {item.name}
                      </span>
                    </div>
                    <span
                      className="text-sm tracking-wider"
                      style={{
                        fontFamily: "var(--font-serif)",
                        color: "var(--brown-dark)",
                      }}
                    >
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p
          className="mt-12 text-center text-xs leading-relaxed tracking-wide"
          style={{ color: "var(--text-light)" }}
        >
          ※ 表示価格は税込みです
          <br />
          ※ メニューの詳細はお気軽にお問い合わせください
        </p>
      </div>
    </section>
  );
}
