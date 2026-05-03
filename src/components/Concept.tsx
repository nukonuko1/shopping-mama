export default function Concept() {
  return (
    <section id="concept" className="py-24 md:py-32 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Label */}
        <p className="section-label text-center mb-12 tracking-[0.3em]">Concept</p>

        {/* Main copy */}
        <h2
          className="text-2xl md:text-3xl text-center leading-loose tracking-wider mb-16"
          style={{ fontFamily: "var(--font-serif)", color: "var(--text)" }}
        >
          たまたま入ったのに、
          <br />
          また来たくなる場所。
        </h2>

        <div className="divider mb-16" />

        {/* Story text */}
        <div
          className="text-sm leading-loose tracking-wide space-y-6 text-center"
          style={{ color: "var(--text-muted)" }}
        >
          <p>
            創業から45年。地域のみなさまに支えられながら、
            <br className="hidden md:block" />
            理容室銀座でひとつひとつの椅子を磨いてきました。
          </p>
          <p>
            あるお客様はこう言ってくれました。
            <br className="hidden md:block" />
            「バス停を降りたらたまたま銀座があって、
            <br className="hidden md:block" />
            接客が良くて顔剃りが気持ちよくて、
            <br className="hidden md:block" />
            気づいたらずっと通ってる」と。
          </p>
          <p>
            特別なことはしていません。
            <br className="hidden md:block" />
            ただ、目の前のお客様のことだけを考えて
            <br className="hidden md:block" />
            丁寧に向き合い続けてきました。
          </p>
        </div>

        {/* Three pillars */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {[
            {
              num: "01",
              title: "丁寧な顔剃り",
              desc: "熟練の技で、毛穴まで整える顔剃りはリピーター続出の一品。",
            },
            {
              num: "02",
              title: "聞き上手な接客",
              desc: "どんな仕上がりにしたいか、その日の気分まで引き出すカウンセリング。",
            },
            {
              num: "03",
              title: "地域に根ざした45年",
              desc: "20代から90代まで、世代を超えて愛される安心感。",
            },
          ].map((item) => (
            <div key={item.num} className="text-center">
              <p
                className="text-3xl mb-4"
                style={{ fontFamily: "var(--font-serif)", color: "var(--brown-light)" }}
              >
                {item.num}
              </p>
              <h3
                className="text-sm tracking-widest mb-3"
                style={{ fontFamily: "var(--font-serif)", color: "var(--text)" }}
              >
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
