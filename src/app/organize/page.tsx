'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  getMemoById,
  getCurrentMemoId,
  saveUnresolvedItem,
  generateId,
} from '@/lib/wakaranlog/storage';
import { WakaranMemo, OrganizeResult, CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/wakaranlog/types';
import BottomNav from '@/components/wakaranlog/BottomNav';

interface Section {
  key: keyof OrganizeResult;
  label: string;
  emoji: string;
  colorClass: string;
  labelColor: string;
}

const SECTIONS: Section[] = [
  {
    key: 'theme',
    label: '今のテーマ',
    emoji: '🎯',
    colorClass: 'bg-blue-50 border-blue-100',
    labelColor: 'text-blue-700',
  },
  {
    key: 'tasks',
    label: 'やる作業',
    emoji: '📋',
    colorClass: 'bg-violet-50 border-violet-100',
    labelColor: 'text-violet-700',
  },
  {
    key: 'reason',
    label: 'なぜそれをやるか',
    emoji: '💡',
    colorClass: 'bg-amber-50 border-amber-100',
    labelColor: 'text-amber-700',
  },
  {
    key: 'unclear',
    label: 'わからないこと',
    emoji: '❓',
    colorClass: 'bg-rose-50 border-rose-100',
    labelColor: 'text-rose-700',
  },
  {
    key: 'nextSteps',
    label: '次に確認すべきこと',
    emoji: '✅',
    colorClass: 'bg-emerald-50 border-emerald-100',
    labelColor: 'text-emerald-700',
  },
];

export default function OrganizePage() {
  const router = useRouter();
  const [memo, setMemo] = useState<WakaranMemo | null>(null);
  const [savedToUnresolved, setSavedToUnresolved] = useState(false);

  useEffect(() => {
    const id = getCurrentMemoId();
    if (!id) {
      router.replace('/');
      return;
    }
    const m = getMemoById(id);
    if (!m) {
      router.replace('/');
      return;
    }
    setMemo(m);
  }, [router]);

  const handleSaveUnresolved = () => {
    if (!memo) return;
    saveUnresolvedItem({
      id: `u_${generateId()}`,
      content: memo.content,
      category: memo.category,
      status: 'unresolved',
      createdAt: memo.createdAt,
      memoId: memo.id,
    });
    setSavedToUnresolved(true);
  };

  if (!memo) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <p className="text-slate-400">読み込み中…</p>
      </div>
    );
  }

  const result = memo.organizeResult;

  if (!result) {
    return (
      <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center gap-4 px-8 text-center">
        <p className="text-slate-500">整理結果がありません</p>
        <Link href="/memo" className="text-blue-500 text-sm underline">
          メモ入力に戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-slate-400 hover:text-slate-600 p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <h1 className="text-lg font-bold text-slate-800 flex-1">AI整理結果</h1>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[memo.category]}`}
          >
            {CATEGORY_LABELS[memo.category]}
          </span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-5 space-y-4">
        {/* Original memo */}
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 mb-2">元のメモ</p>
          <p className="text-sm text-slate-600 leading-relaxed">{memo.content}</p>
        </div>

        {/* Organize result sections */}
        {SECTIONS.map((section) => (
          <div key={section.key} className={`rounded-xl p-4 border ${section.colorClass}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{section.emoji}</span>
              <p className={`text-sm font-bold ${section.labelColor}`}>{section.label}</p>
            </div>
            <p className="text-base text-slate-800 leading-relaxed whitespace-pre-line">
              {result[section.key]}
            </p>
          </div>
        ))}

        {/* Action buttons */}
        <div className="space-y-3 pt-2 pb-4">
          <button
            onClick={() => router.push('/question')}
            className="w-full bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white text-base font-bold py-4 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
          >
            💬 質問文を作る
          </button>

          <button
            onClick={() => router.push('/review')}
            className="w-full bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-white text-base font-bold py-4 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
          >
            🃏 復習カードを作る
          </button>

          <button
            onClick={handleSaveUnresolved}
            disabled={savedToUnresolved}
            className={`w-full text-base font-medium py-4 rounded-xl transition-colors border ${
              savedToUnresolved
                ? 'bg-emerald-50 text-emerald-600 border-emerald-200 cursor-default'
                : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
            }`}
          >
            {savedToUnresolved ? '✅ 未解決リストに保存しました' : '📌 未解決リストに保存する'}
          </button>
        </div>
      </div>

      <BottomNav active="home" />
    </div>
  );
}
