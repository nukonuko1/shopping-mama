export default function Concept() {
  return (
    <section id="concept" className="py-20 md:py-28 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="section-eyebrow mb-3">Our Story</p>
          <h2
            className="text-2xl md:text-3xl font-bold tracking-wider leading-snug"
            style={{ fontFamily: "var(--font-serif)", color: "var(--brown)" }}
          >
            創業45年。
            <br />
            ずっと、この街と一緒に。
          </h2>
          <div className="divider-warm mt-6" />
        </div>

        {/* Main narrative */}
        <div
          className="card-warm p-8 mb-10 relative overflow-hidden"
        >
          {/* decorative corner */}
          <div
            className="absolute top-0 right-0 w-16 h-16 opacity-10"
            style={{
              background: "var(--amber)",
              borderRadius: "0 8px 0 100%",
            }}
          />
          <p
            className="text-sm leading-[2.2] tracking-wide"
            style={{ color: "var(--text-muted)" }}
          >
            1980年の創業以来、地域のみなさんに支えられながら歩んできた理容室・銀座。
            <br /><br />
            若いお客様も、ご年配のお客様も、気軽に立ち寄れる「町の理容室」でありたいと、
            毎日ひとりひとりのお客様と向き合ってきました。
          </p>
        </div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 gap-5 mb-12">
          {[
            {
              icon: "✂️",
              title: "熟練の顔剃り",
              desc: "やみつきになると評判の顔剃り。毛穴まですっきり、お肌もつるつる。「これが目当てで来てる」というお客様も。",
              color: "var(--amber)",
            },
            {
              icon: "💬",
              title: "聞き上手なカウンセリング",
              desc: "どんな仕上がりにしたいか、その日の気分はどうか。話しながらぴったりのスタイルを一緒に見つけていきます。",
              color: "var(--teal)",
            },
            {
              icon: "🏡",
              title: "地域に根ざした45年",
              desc: "20代から90代まで幅広いお客様が通う、福島の「かかりつけ理容室」。初めての方もすぐ常連さんになってしまうかも。",
              color: "var(--brown-mid)",
            },
          ].map((item) => (
            <div key={item.title} className="card-warm p-6 flex gap-5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-lg"
                style={{ background: `${item.color}18` }}
              >
                {item.icon}
              </div>
              <div>
                <h3
                  className="text-sm font-bold tracking-wider mb-2"
                  style={{ fontFamily: "var(--font-serif)", color: item.color }}
                >
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Shop info strip */}
        <div
          className="rounded-lg p-5 flex flex-wrap justify-center gap-x-10 gap-y-3 text-center"
          style={{ background: "var(--amber-pale)", border: "1px solid #F0C870" }}
        >
          {[
            { label: "営業時間", value: "8:30 〜 17:30" },
            { label: "定休日", value: "月曜日" },
            { label: "住所", value: "福島県福島市〇〇" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs tracking-wider mb-0.5" style={{ color: "var(--amber)" }}>
                {item.label}
              </p>
              <p className="text-sm font-bold tracking-wide" style={{ color: "var(--brown)" }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
