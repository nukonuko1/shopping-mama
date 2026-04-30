'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import { getSettings, recordCraving } from '@/lib/storage';
import {
  calcDailyCost,
  calcYearlyCost,
  calcPureAlcohol,
  formatCurrency,
} from '@/lib/calculations';
import { DrinkSettings } from '@/lib/types';

interface LossItem {
  icon: string;
  label: string;
  detail: string;
  color: string;
}

export default function InterventionPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<DrinkSettings | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setSettings(getSettings());
    recordCraving();
    // Auto-reveal losses after 0.6s for impact
    const t = setTimeout(() => setRevealed(true), 600);
    return () => clearTimeout(t);
  }, []);

  const getLossItems = (): LossItem[] => {
    const base: LossItem[] = [
      {
        icon: '🌙',
        label: '今夜の睡眠の質',
        detail: 'レム睡眠が減り、翌朝ぼーっとする',
        color: '#8b5cf6',
      },
      {
        icon: '🧠',
        label: '明日の集中力',
        detail: 'アルコールの分解に脳のリソースを消耗',
        color: '#ef4444',
      },
      {
        icon: '🍔',
        label: '食欲のコントロール',
        detail: '食欲増進ホルモンが刺激され食べ過ぎる',
        color: '#f97316',
      },
      {
        icon: '💪',
        label: '体型改善の進捗',
        detail: '摂取カロリーが増え、脂肪が蓄積しやすくなる',
        color: '#eab308',
      },
      {
        icon: '😤',
        label: '翌日の気分',
        detail: '自己嫌悪と後悔が残る',
        color: '#6b7280',
      },
      {
        icon: '⏰',
        label: '今夜の自由時間',
        detail: '飲む時間・酔いが覚める時間が消える',
        color: '#3b82f6',
      },
    ];

    if (settings) {
      const daily = calcDailyCost(settings);
      const yearly = calcYearlyCost(settings);
      const alcohol = calcPureAlcohol(settings);
      base.unshift({
        icon: '💴',
        label: `今夜の酒代 ${formatCurrency(daily)}`,
        detail: `このペースで1年続けると ${formatCurrency(yearly)} が消える`,
        color: '#22c55e',
      });
      base.push({
        icon: '🍶',
        label: `純アルコール ${Math.round(alcohol * 10) / 10}g`,
        detail: '厚労省の適正量（20g/日）を超えている可能性あり',
        color: '#ec4899',
      });
    }

    return base;
  };

  const lossItems = getLossItems();

  return (
    <div className="flex flex-col min-h-dvh pb-24">
      {/* Header */}
      <div
        className="px-5 pt-10 pb-6 text-center animate-in"
        style={{
          background: 'linear-gradient(180deg, rgba(185,28,28,0.15) 0%, transparent 100%)',
        }}
      >
        <div className="text-5xl mb-3">⚠️</div>
        <h1 className="text-2xl font-black leading-tight">
          今飲むと、<br />失うもの
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
          この瞬間に立ち止まれた。それだけで前進。
        </p>
      </div>

      {/* Loss list */}
      <div className="px-4 flex flex-col gap-3 flex-1">
        {lossItems.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 flex items-start gap-3 transition-all"
            style={{
              background: 'var(--bg-card)',
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`,
              borderLeft: `3px solid ${item.color}`,
            }}
          >
            <span className="text-2xl flex-shrink-0">{item.icon}</span>
            <div>
              <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>
                {item.label}
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="px-5 pt-6 flex flex-col gap-3">
        <button
          onClick={() => router.push('/alternatives')}
          className="w-full py-5 rounded-2xl text-white text-lg font-black transition-transform active:scale-95"
          style={{
            background: 'linear-gradient(135deg, var(--green) 0%, #15803d 100%)',
          }}
        >
          ✅ 飲まない方を選ぶ
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => router.push('/comparison')}
            className="flex-1 py-4 rounded-2xl text-sm font-bold transition-colors active:opacity-70"
            style={{ background: 'var(--bg-card)', color: 'var(--text)' }}
          >
            📊 未来を比較する
          </button>
          <button
            onClick={() => router.back()}
            className="flex-1 py-4 rounded-2xl text-sm font-bold transition-colors active:opacity-70"
            style={{ background: 'var(--bg-card)', color: 'var(--text-muted)' }}
          >
            ← 戻る
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
