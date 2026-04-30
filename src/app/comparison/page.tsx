'use client';

import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';

const drinkSide = [
  { icon: '💴', text: 'お金が減る' },
  { icon: '🌙', text: '睡眠が浅くなる' },
  { icon: '🍔', text: '食欲が増え、太る' },
  { icon: '😵', text: '翌日だるい・頭重い' },
  { icon: '😞', text: '自己嫌悪が残る' },
  { icon: '⏳', text: '時間が溶ける' },
  { icon: '📉', text: '副業・勉強が進まない' },
];

const soberSide = [
  { icon: '💰', text: 'お金が残る' },
  { icon: '☀️', text: '明日スッキリ起きられる' },
  { icon: '📖', text: '30分勉強できる' },
  { icon: '💪', text: '体型改善に近づく' },
  { icon: '😊', text: '自己肯定感が上がる' },
  { icon: '🚀', text: '副業アイデアが出る' },
  { icon: '👨‍👩‍👧', text: '家族と向き合える' },
];

export default function ComparisonPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-dvh pb-24">
      {/* Header */}
      <div className="px-5 pt-10 pb-6 animate-in">
        <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'var(--red-light)' }}>
          COMPARISON
        </p>
        <h1 className="text-2xl font-black">飲む vs 飲まない</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
          今夜の選択が、明日をつくる。
        </p>
      </div>

      {/* Comparison cards */}
      <div className="px-4 flex gap-3 flex-1 animate-in-delay-1">
        {/* Drink side */}
        <div
          className="flex-1 rounded-2xl p-4 flex flex-col"
          style={{
            background: 'var(--bg-card)',
            borderTop: '3px solid var(--red)',
          }}
        >
          <div className="text-center mb-4">
            <span className="text-3xl">🍺</span>
            <p className="text-sm font-black mt-1" style={{ color: 'var(--red-light)' }}>
              飲む未来
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {drinkSide.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-lg leading-none flex-shrink-0">{item.icon}</span>
                <p className="text-xs leading-snug" style={{ color: 'var(--text-muted)' }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sober side */}
        <div
          className="flex-1 rounded-2xl p-4 flex flex-col"
          style={{
            background: 'var(--bg-card)',
            borderTop: '3px solid var(--green-light)',
          }}
        >
          <div className="text-center mb-4">
            <span className="text-3xl">💧</span>
            <p className="text-sm font-black mt-1" style={{ color: 'var(--green-light)' }}>
              飲まない未来
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {soberSide.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-lg leading-none flex-shrink-0">{item.icon}</span>
                <p className="text-xs leading-snug" style={{ color: 'var(--text)' }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pt-6 flex flex-col gap-3 animate-in-delay-2">
        <p
          className="text-center text-base font-black"
          style={{ color: 'var(--green-light)' }}
        >
          今日は飲まない。それだけで勝ち。
        </p>
        <button
          onClick={() => router.push('/alternatives')}
          className="w-full py-5 rounded-2xl text-white text-lg font-black transition-transform active:scale-95"
          style={{
            background: 'linear-gradient(135deg, var(--green) 0%, #15803d 100%)',
          }}
        >
          ✅ 飲まない方を選ぶ
        </button>
        <button
          onClick={() => router.back()}
          className="w-full py-4 rounded-2xl text-sm font-bold transition-colors active:opacity-70"
          style={{ background: 'var(--bg-card)', color: 'var(--text-muted)' }}
        >
          ← 戻る
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
