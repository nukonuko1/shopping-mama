'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import { recordSoberDay } from '@/lib/storage';

const actions = [
  { id: 'sparkling', icon: '💧', label: '炭酸水を飲む', desc: '口の寂しさをすぐに満たせる' },
  { id: 'teeth', icon: '🦷', label: '歯を磨く', desc: '磨いた後は飲みたくなくなる' },
  { id: 'shower', icon: '🚿', label: 'シャワーを浴びる', desc: '気分がリセットされる' },
  { id: 'walk', icon: '🚶', label: '5分散歩する', desc: '外に出ると衝動が落ち着く' },
  { id: 'study', icon: '📖', label: '5分だけ勉強する', desc: 'ほんの少しの前進が自己肯定感を上げる' },
  { id: 'side', icon: '💡', label: '副業アイデアを書く', desc: '飲まない時間が将来の収益になる' },
  { id: 'family', icon: '👨‍👩‍👧', label: '家族と話す', desc: '大切なものを思い出す' },
  { id: 'sleep', icon: '😴', label: 'すぐ寝る', desc: '最も強力なリセット方法' },
  { id: 'stretch', icon: '🧘', label: 'ストレッチをする', desc: '体をほぐして衝動を流す' },
  { id: 'journal', icon: '✍️', label: '日記を書く', desc: '感情を外に出すことで楽になる' },
];

export default function AlternativesPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSave = () => {
    const chosen = actions
      .filter((a) => selected.has(a.id))
      .map((a) => a.label);
    recordSoberDay(chosen.length > 0 ? chosen : ['記録のみ']);
    setSaved(true);
    setTimeout(() => router.push('/dashboard'), 1200);
  };

  return (
    <div className="flex flex-col min-h-dvh pb-24">
      {/* Header */}
      <div
        className="px-5 pt-10 pb-6 animate-in"
        style={{
          background: 'linear-gradient(180deg, rgba(22,163,74,0.12) 0%, transparent 100%)',
        }}
      >
        <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'var(--green-light)' }}>
          ACTION PLAN
        </p>
        <h1 className="text-2xl font-black">今からこれをやる</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
          1つ選んで動き出そう。衝動は時間とともに消える。
        </p>
      </div>

      {/* Action grid */}
      <div className="px-4 flex flex-col gap-3 flex-1 animate-in-delay-1">
        {actions.map((action) => {
          const isSelected = selected.has(action.id);
          return (
            <button
              key={action.id}
              onClick={() => toggle(action.id)}
              className="flex items-center gap-4 rounded-2xl p-4 text-left w-full transition-all active:scale-98"
              style={{
                background: isSelected ? 'rgba(22,163,74,0.18)' : 'var(--bg-card)',
                border: `2px solid ${isSelected ? 'var(--green-light)' : 'transparent'}`,
              }}
            >
              <span className="text-3xl flex-shrink-0">{action.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm" style={{ color: isSelected ? 'var(--green-light)' : 'var(--text)' }}>
                  {action.label}
                </p>
                <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-muted)' }}>
                  {action.desc}
                </p>
              </div>
              {isSelected && (
                <span className="text-xl flex-shrink-0" style={{ color: 'var(--green-light)' }}>✓</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Save button */}
      <div className="px-5 pt-6 flex flex-col gap-3 animate-in-delay-2">
        {selected.size > 0 && (
          <p className="text-center text-sm font-bold" style={{ color: 'var(--green-light)' }}>
            {selected.size}個選択中
          </p>
        )}
        <button
          onClick={handleSave}
          className="w-full py-5 rounded-2xl text-white text-lg font-black transition-all active:scale-95"
          style={{
            background: saved
              ? 'var(--green)'
              : 'linear-gradient(135deg, var(--green) 0%, #15803d 100%)',
          }}
        >
          {saved ? '🎉 今日の勝ち行動を記録した！' : '🏆 今日は飲まなかった！記録する'}
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
