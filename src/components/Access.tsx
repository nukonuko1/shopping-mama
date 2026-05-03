const MAPS_SHARE_URL = "https://share.google/ubN93d7H2Jep8I8VD";
const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=福島県福島市瀬上町薬師前18-68&output=embed&hl=ja&z=16";

const INFO_ROWS = [
  { label: "店名", value: "理容室銀座" },
  { label: "住所", value: "〒960-0101 福島県福島市瀬上町薬師前１８－６８" },
  { label: "電話", value: "024-553-8640", tel: "0245538640" },
  { label: "営業時間", value: "8:30 〜 17:30" },
  { label: "定休日", value: "月曜日" },
];

export default function Access() {
  return (
    <section id="access" className="py-24 md:py-32 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="section-label text-center mb-3 tracking-[0.3em]">Access</p>
        <h2
          className="text-2xl md:text-3xl text-center tracking-wider mb-16"
          style={{ fontFamily: "var(--font-serif)", color: "var(--text)" }}
        >
          アクセス
        </h2>

        {/* Google Map embed */}
        <div
          className="w-full aspect-video mb-4 overflow-hidden"
          style={{ borderRadius: "4px", border: "1px solid var(--border)" }}
        >
          <iframe
            src={MAPS_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="理容室銀座 地図"
          />
        </div>

        {/* Open in Google Maps */}
        <div className="flex justify-end mb-10">
          <a
            href={MAPS_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest transition-opacity hover:opacity-70"
            style={{
              color: "var(--brown)",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            Google マップで開く →
          </a>
        </div>

        {/* Info table */}
        <div className="space-y-0">
          {INFO_ROWS.map((row, i) => (
            <div
              key={row.label}
              className="flex items-start gap-6 py-5"
              style={{
                borderTop: i === 0 ? "1px solid var(--border)" : "none",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span
                className="text-xs tracking-widest w-20 shrink-0 pt-0.5"
                style={{ color: "var(--text-light)" }}
              >
                {row.label}
              </span>
              {row.tel ? (
                <a
                  href={`tel:${row.tel}`}
                  className="text-sm tracking-wide transition-opacity hover:opacity-70"
                  style={{ color: "var(--brown)" }}
                >
                  {row.value}
                </a>
              ) : (
                <span className="text-sm tracking-wide" style={{ color: "var(--text)" }}>
                  {row.value}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Note */}
        <p
          className="mt-6 text-xs leading-relaxed tracking-wide"
          style={{ color: "var(--text-light)" }}
        >
          ※ バス停から徒歩圏内
          <br />
          ※ 駐車場あり
        </p>
      </div>
    </section>
  );
}
