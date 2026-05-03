const MENU_ITEMS = [
  {
    category: "カット",
    emoji: "✂️",
    items: [
      { name: "カット", price: "¥3,300" },
      { name: "カット + シャンプー", price: "¥4,400" },
      { name: "カット + シャンプー + 顔剃り", price: "¥5,500", popular: true },
    ],
  },
  {
    category: "顔剃り・シャンプー",
    emoji: "💆",
    items: [
      { name: "顔剃り", price: "¥2,200", popular: true },
      { name: "シャンプー", price: "¥1,100" },
      { name: "シャンプー + 顔剃り", price: "¥2,750" },
    ],
  },
  {
    category: "パーマ・カラー",
    emoji: "🎨",
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
      className="py-20 md:py-28 px-6"
      style={{ background: "var(--brown)", position: "relative", overflow: "hidden" }}
    >
      {/* BG decoration */}
      <div
        className="absolute -right-10 -top-10 w-48 h-48 rounded-full opacity-10"
        style={{ background: "var(--amber)" }}
      />
      <div
        className="absolute -left-10 bottom-10 w-32 h-32 rounded-full opacity-10"
        style={{ background: "var(--teal)" }}
      />

      <div className="max-w-2xl mx-auto relative z-10">

        <div className="text-center mb-12">
          <p className="section-eyebrow mb-3" style={{ color: "var(--amber-light)" }}>
            Menu & Price
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold tracking-wider"
            style={{ fontFamily: "var(--font-serif)", color: "white" }}
          >
            メニュー料金
          </h2>
          <div className="mt-5 w-10 h-0.5 mx-auto" style={{ background: "var(--amber)" }} />
        </div>

        <div className="space-y-6">
          {MENU_ITEMS.map((category) => (
            <div
              key={category.category}
              className="rounded-lg overflow-hidden"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              {/* Category header */}
              <div
                className="px-5 py-3 flex items-center gap-2"
                style={{ background: "rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
              >
                <span>{category.emoji}</span>
                <span
                  className="text-xs tracking-widest font-bold"
                  style={{ color: "var(--amber-light)", fontFamily: "var(--font-serif)" }}
                >
                  {category.category}
                </span>
              </div>

              {/* Items */}
              <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                {category.items.map((item) => (
                  <div key={item.name} className="px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.popular && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-bold tracking-wider"
                          style={{ background: "var(--amber)", color: "white", fontSize: "0.6rem" }}
                        >
                          人気
                        </span>
                      )}
                      <span className="text-sm tracking-wide" style={{ color: "rgba(255,255,255,0.9)" }}>
                        {item.name}
                      </span>
                    </div>
                    <span
                      className="text-sm font-bold tracking-wider"
                      style={{ fontFamily: "var(--font-serif)", color: "var(--amber-light)" }}
                    >
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs leading-loose tracking-wide" style={{ color: "rgba(255,255,255,0.4)" }}>
            ※ 表示価格は税込みです
            <br />
            ※ メニューの詳細はお気軽にご相談ください
          </p>
        </div>
      </div>
    </section>
  );
}
