'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WakaranBottomNav from '@/components/WakaranBottomNav';
import WakaranPageHeader from '@/components/WakaranPageHeader';
import { wakaranStorage } from '@/lib/wakaranStorage';
import { CATEGORY_COLORS } from '@/lib/wakaranTypes';
import type { CurrentSession, UnresolvedItem } from '@/lib/wakaranTypes';

function SectionCard({
  emoji,
  title,
  children,
  colorClass = 'bg-white',
}: {
  emoji: string;
  title: string;
  children: React.ReactNode;
  colorClass?: string;
}) {
  return (
    <div className={`${colorClass} rounded-2xl p-4 shadow-sm`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{emoji}</span>
        <h3 className="font-bold text-slate-700 text-base">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function OrganizePage() {
  const router = useRouter();
  const [session, setSession] = useState<CurrentSession | null>(null);
  const [added, setAdded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const s = wakaranStorage.getSession();
    setSession(s);
    setMounted(true);
  }, []);

  const handleAddUnresolved = () => {
    if (!session) return;
    const items: UnresolvedItem[] = session.organized.unknowns.map((unknown, i) => ({
      id: `${Date.now()}-${i}`,
      content: unknown,
      category: session.memo.category,
      theme: session.organized.theme,
      resolved: false,
      createdAt: new Date().toISOString(),
    }));
    wakaranStorage.addUnresolvedItems(items);
    setAdded(true);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <p className="text-slate-400 text-sm">読み込み中…</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-blue-50 pb-24">
        <WakaranPageHeader title="AI整理結果" backHref="/memo" />
        <div className="px-4 py-10 text-center">
          <p className="text-4xl mb-4">📭</p>
          <p className="text-slate-500 text-base mb-6">
            整理結果がありません。<br />
            まずメモを入力してください。
          </p>
          <button
            onClick={() => router.push('/memo')}
            className="bg-blue-600 text-white py-4 px-8 rounded-2xl text-base font-bold"
          >
            メモを入力する
          </button>
        </div>
        <WakaranBottomNav current="home" />
      </div>
    );
  }

  const { organized, memo } = session;
  const colors = CATEGORY_COLORS[memo.category];

  return (
    <div className="min-h-screen bg-blue-50 pb-24">
      <WakaranPageHeader title="AI整理結果" backHref="/memo" />

      <div className="px-4 py-5 space-y-3 fade-in-up">
        {/* Theme */}
        <div className="bg-blue-600 rounded-2xl p-5 text-white shadow-md shadow-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${colors.badge}`}>
              {memo.category}
            </span>
            <p className="text-blue-200 text-xs">今のテーマ</p>
          </div>
          <p className="text-xl font-bold leading-snug">{organized.theme}</p>
        </div>

        {/* Tasks */}
        <SectionCard emoji="✅" title="やる作業">
          <ul className="space-y-2">
            {organized.tasks.map((task, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700 leading-relaxed">
                <span className="text-blue-400 font-bold mt-0.5">{i + 1}.</span>
                {task}
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Why */}
        <SectionCard emoji="💡" title="なぜそれをやるか">
          <p className="text-sm text-slate-700 leading-relaxed">{organized.whyTasks}</p>
        </SectionCard>

        {/* Unknowns */}
        <SectionCard emoji="❓" title="わからないこと" colorClass="bg-amber-50">
          <ul className="space-y-2">
            {organized.unknowns.map((u, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-amber-800 leading-relaxed">
                <span className="text-amber-400 mt-1 flex-shrink-0">▸</span>
                {u}
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Next steps */}
        <SectionCard emoji="🔍" title="次に確認すべきこと" colorClass="bg-emerald-50">
          <ul className="space-y-2">
            {organized.nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-emerald-800 leading-relaxed">
                <span className="text-emerald-500 font-bold mt-0.5">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Action buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => router.push('/question')}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl text-base font-bold shadow-sm active:scale-95 transition-transform"
          >
            💬 質問文を作る
          </button>
          <button
            onClick={() => router.push('/review')}
            className="w-full bg-white text-blue-600 py-4 rounded-2xl text-base font-bold border-2 border-blue-200 active:bg-blue-50 transition-colors"
          >
            🃏 復習カードを見る
          </button>
          <button
            onClick={handleAddUnresolved}
            disabled={added}
            className={`w-full py-4 rounded-2xl text-base font-medium border-2 transition-all ${
              added
                ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                : 'bg-white text-slate-600 border-slate-200 active:bg-slate-50'
            }`}
          >
            {added ? '✓ 未解決リストに追加しました' : '📋 未解決リストに追加する'}
          </button>
        </div>

        {/* Memo display */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
          <p className="text-xs text-slate-400 mb-2">元のメモ</p>
          <p className="text-sm text-slate-600 leading-relaxed">{memo.content}</p>
        </div>
      </div>

      <WakaranBottomNav current="home" />
    </div>
  );
}
