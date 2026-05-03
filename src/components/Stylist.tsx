export default function Stylist() {
  return (
    <section id="stylist" className="py-20 md:py-28 px-6">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-12">
          <p className="section-eyebrow mb-3">Stylist</p>
          <h2
            className="text-2xl md:text-3xl font-bold tracking-wider"
            style={{ fontFamily: "var(--font-serif)", color: "var(--brown)" }}
          >
            スタイリスト紹介
          </h2>
          <div className="divider-warm mt-5" />
        </div>

        <div className="card-warm overflow-hidden">
          {/* Stripe top */}
          <div className="stripe-bar" />

          <div className="p-7 md:p-8 flex flex-col md:flex-row gap-8 items-start">
            {/* Photo */}
            <div className="w-full md:w-40 shrink-0">
              <div className="aspect-square img-placeholder rounded-lg overflow-hidden">
                {/*
                  写真に差し替えてください:
                  <img src="/images/stylist-01.jpg" alt="スタイリスト 山田〇〇" className="w-full h-full object-cover" />
                */}
                <span className="text-xs opacity-40 tracking-wider">スタッフ写真</span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs px-2 py-0.5 rounded-full text-white tracking-wider"
                  style={{ background: "var(--teal)", fontSize: "0.6rem" }}
                >
                  Owner Stylist
                </span>
              </div>

              <h3
                className="text-xl font-bold tracking-widest mb-1 mt-2"
                style={{ fontFamily: "var(--font-serif)", color: "var(--brown)" }}
              >
                山田 〇〇
              </h3>
              <p className="text-xs tracking-widest mb-5" style={{ color: "var(--text-light)" }}>
                Yamada ◯◯
              </p>

              <p
                className="text-sm leading-[2] tracking-wide mb-6"
                style={{ color: "var(--text-muted)" }}
              >
                とびきりポジティブで聞き上手。
                お客様の話をじっくり引き出しながら、
                「なりたい自分」を一緒に見つけていきます。
                <br /><br />
                顔剃りはとくにお任せください。
                ひとりひとりの肌質を丁寧に見極め、
                「気持ちよくてやみつきになる」と嬉しいお声をいただいています。
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {["顔剃り", "カウンセリング", "カット", "カラー", "パーマ"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full tracking-widest"
                    style={{
                      background: "var(--amber-pale)",
                      color: "var(--amber)",
                      border: "1px solid #F0C870",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom warm note */}
          <div
            className="px-7 py-4 flex items-center gap-2"
            style={{
              background: "var(--amber-pale)",
              borderTop: "1px solid #F0C870",
            }}
          >
            <span style={{ color: "var(--amber)" }}>💬</span>
            <p className="text-xs leading-relaxed tracking-wide" style={{ color: "var(--brown-mid)" }}>
              「どんな些細なことでも、気軽に話しかけてください。いつでもお待ちしています！」
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
