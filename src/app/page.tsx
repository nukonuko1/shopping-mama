'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import { getData, getStreak, getTotalSavedAmount } from '@/lib/storage';
import { formatCurrency } from '@/lib/calculations';

export default function HomePage() {
  const router = useRouter();
  const [streak, setStreak] = useState(0);
  const [saved, setSaved] = useState(0);
  const [setupDone, setSetupDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const data = getData();
    setStreak(getStreak());
    setSaved(getTotalSavedAmount());
    setSetupDone(data.setupDone);
    setMounted(true);
  }, []);

  const handleCraving = () => {
    router.push('/intervention');
  };

  return (
    <div className="flex flex-col min-h-dvh pb-20">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 animate-in">
        <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'var(--red-light)' }}>
          飲酒介入アプリ
        </p>
        <h1 className="text-3xl font-black leading-tight tracking-tight" style={{ color: 'var(--text)' }}>
          その1本、<br />本当に飲む？
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
          今飲むと、明日の自分が払う。
        </p>
      </div>

      {/* Stats strip (if setup done) */}
      {mounted && setupDone && (
        <div className="mx-5 mb-5 animate-in-delay-1">
          <div className="flex gap-3">
            <div className="flex-1 rounded-2xl p-3 text-center" style={{ background: 'var(--bg-card)' }}>
              <p className="text-2xl font-black" style={{ color: 'var(--green-light)' }}>{streak}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>連続禁酒日</p>
            </div>
            <div className="flex-1 rounded-2xl p-3 text-center" style={{ background: 'var(--bg-card)' }}>
              <p className="text-2xl font-black" style={{ color: 'var(--green-light)' }}>{formatCurrency(saved)}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>累計節約</p>
            </div>
          </div>
        </div>
      )}

      {/* Main CTA */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 gap-6">
        {/* Craving button */}
        <button
          onClick={handleCraving}
          className="btn-pulse w-full py-7 rounded-2xl text-white text-xl font-black tracking-wide transition-transform active:scale-95"
          style={{ background: 'linear-gradient(135deg, var(--red-dark) 0%, var(--red) 50%, var(--red-light) 100%)' }}
        >
          🍺 飲みたい衝動が来た
        </button>

        <p className="text-center text-sm leading-relaxed animate-in-delay-2" style={{ color: 'var(--text-muted)' }}>
          ボタンを押して、<br />
          <span style={{ color: 'var(--text)' }}>「飲まない選択」</span>
          をする理由を確認しよう。
        </p>

        {/* Quick links */}
        <div className="w-full grid grid-cols-2 gap-3 animate-in-delay-3">
          <button
            onClick={() => router.push('/comparison')}
            className="py-4 rounded-2xl text-sm font-bold transition-colors active:opacity-70"
            style={{ background: 'var(--bg-card)', color: 'var(--text)' }}
          >
            📊 未来を比較する
          </button>
          <button
            onClick={() => router.push('/alternatives')}
            className="py-4 rounded-2xl text-sm font-bold transition-colors active:opacity-70"
            style={{ background: 'var(--bg-card)', color: 'var(--text)' }}
          >
            ✅ 代替行動を選ぶ
          </button>
        </div>

        {/* Setup banner (if not done) */}
        {mounted && !setupDone && (
          <button
            onClick={() => router.push('/settings')}
            className="w-full py-4 rounded-2xl text-sm font-bold border transition-colors active:opacity-70 animate-in-delay-4"
            style={{
              background: 'transparent',
              borderColor: 'var(--red)',
              color: 'var(--red-light)',
            }}
          >
            ⚙️ 初期設定をして損失額を計算する →
          </button>
        )}
      </div>

      {/* Footer copy */}
      <div className="px-5 pb-4 text-center animate-in-delay-4">
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          飲まない夜は、未来を取り戻す時間。
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
