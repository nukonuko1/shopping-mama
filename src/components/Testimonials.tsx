const VOICES = [
  {
    id: 1,
    text: "バスを降りたらたまたま銀座があって、なんとなく入ってみたら顔剃りがめちゃくちゃ気持ちよくて。それからずっと通ってます。",
    name: "40代 男性",
    detail: "バス停の近くがたまたまご縁",
  },
  {
    id: 2,
    text: "お姉さんの明るい雰囲気が好きで来ています。話しやすいし、いつも「こういうのどう？」って提案してくれるのが嬉しい。",
    name: "60代 男性",
    detail: "20年以上通うリピーター",
  },
  {
    id: 3,
    text: "父が長年お世話になっていて、今は私も通うようになりました。シャンプーの仕方が気持ちよすぎて、ついうとうとしてしまいます。",
    name: "30代 女性",
    detail: "親子二世代でリピーター",
  },
];

export default function Testimonials() {
  return (
    <section
      className="py-20 md:py-28 px-6"
      style={{ background: "var(--cream-dark)" }}
    >
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-12">
          <p className="section-eyebrow mb-3">Customer Voice</p>
          <h2
            className="text-2xl md:text-3xl font-bold tracking-wider"
            style={{ fontFamily: "var(--font-serif)", color: "var(--brown)" }}
          >
            お客様の声
          </h2>
          <div className="divider-warm mt-5" />
        </div>

        <div className="space-y-5">
          {VOICES.map((voice) => (
            <div key={voice.id} className="card-warm p-7 relative overflow-hidden">
              {/* Amber left border accent */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ background: "var(--amber)" }}
              />

              <p className="quote-mark">&ldquo;</p>

              <p
                className="text-sm leading-[2] tracking-wide mb-5"
                style={{ color: "var(--text)" }}
              >
                {voice.text}
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
                  style={{ background: "var(--brown-light)" }}
                >
                  {voice.name.slice(0, 1)}
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wider" style={{ color: "var(--brown)" }}>
                    {voice.name}
                  </p>
                  <p className="text-xs tracking-wide" style={{ color: "var(--text-light)" }}>
                    {voice.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p
          className="mt-8 text-center text-xs leading-loose tracking-widest"
          style={{ color: "var(--text-light)" }}
        >
          ご来店いただいたお客様より（掲載許可済み・一部編集）
        </p>
      </div>
    </section>
  );
}
