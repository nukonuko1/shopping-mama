export default function Stylist() {
  return (
    <section id="stylist" className="py-24 md:py-32 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="section-label text-center mb-3 tracking-[0.3em]">Stylist</p>
        <h2
          className="text-2xl md:text-3xl text-center tracking-wider mb-16"
          style={{ fontFamily: "var(--font-serif)", color: "var(--text)" }}
        >
          スタイリスト紹介
        </h2>

        {/* Main stylist card */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
          {/* Photo */}
          <div className="w-full md:w-48 shrink-0">
            <div
              className="aspect-square img-placeholder rounded-sm overflow-hidden"
              style={{ background: "linear-gradient(135deg, #EDE8E3, #D6CCBf)" }}
            >
              {/*
                スタイリスト写真に差し替えてください:
                <img src="/images/stylist-01.jpg" alt="スタイリスト" className="w-full h-full object-cover" />
              */}
              <span className="text-xs tracking-widest opacity-40">スタッフ写真</span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <p
              className="text-xs tracking-[0.2em] mb-1"
              style={{ color: "var(--brown)" }}
            >
              Owner Stylist
            </p>
            <h3
              className="text-xl tracking-widest mb-1"
              style={{ fontFamily: "var(--font-serif)", color: "var(--text)" }}
            >
              山田 〇〇
            </h3>
            <p className="text-xs tracking-widest mb-6" style={{ color: "var(--text-light)" }}>
              Yamada ◯◯
            </p>

            <div
              className="w-8 h-px mb-6"
              style={{ background: "var(--brown-light)" }}
            />

            <p
              className="text-sm leading-loose tracking-wide mb-6"
              style={{ color: "var(--text-muted)" }}
            >
              とびきりポジティブで、聞き上手。
              <br />
              お客様の話をじっくり引き出しながら、
              <br />
              「なりたい自分」を一緒に見つけていきます。
            </p>

            <p
              className="text-sm leading-loose tracking-wide"
              style={{ color: "var(--text-muted)" }}
            >
              顔剃りはお任せください。
              <br />
              ひとりひとりの肌質を見極めた丁寧な仕上がりに、
              <br />
              「気持ちよくてやみつきになる」と喜んでいただいています。
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {["顔剃り", "カウンセリング", "カット", "カラー"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 tracking-widest"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                    borderRadius: "2px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
