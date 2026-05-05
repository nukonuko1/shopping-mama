'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getMemos, getUnresolvedItems, setCurrentMemoId } from '@/lib/wakaranlog/storage';
import { WakaranMemo, CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/wakaranlog/types';
import BottomNav from '@/components/wakaranlog/BottomNav';

export default function HomePage() {
  const router = useRouter();
  const [memos, setMemos] = useState<WakaranMemo[]>([]);
  const [unresolvedCount, setUnresolvedCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);

  useEffect(() => {
    setMemos(getMemos().slice(0, 5));
    const items = getUnresolvedItems();
    setUnresolvedCount(items.filter((i) => i.status === 'unresolved').length);
    setResolvedCount(items.filter((i) => i.status === 'resolved').length);
  }, []);

  const handleMemoClick = (memo: WakaranMemo) => {
    setCurrentMemoId(memo.id);
    router.push('/organize');
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-blue-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">📝</span>
            <h1 className="text-lg font-bold text-blue-700">わからんログ</h1>
          </div>
          <Link
            href="/memo"
            className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-blue-600 transition-colors shadow-sm"
          >
            + メモ
          </Link>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-5 space-y-5">
        {/* Hero */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white shadow-md">
          <p className="text-xl font-bold leading-relaxed mb-2">
            一回で理解できなくても
            <br />
            大丈夫。
          </p>
          <p className="text-sm text-blue-100 leading-relaxed">
            わからなかったことを、
            <br />
            質問と復習に変える。
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-50">
            <p className="text-3xl font-bold text-rose-500">{unresolvedCount}</p>
            <p className="text-sm text-slate-500 mt-1">未解決のわからん</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-50">
            <p className="text-3xl font-bold text-emerald-500">{resolvedCount}</p>
            <p className="text-sm text-slate-500 mt-1">解決済み ✨</p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/memo"
            className="bg-white rounded-xl p-4 shadow-sm border border-blue-50 hover:border-blue-200 hover:shadow-md transition-all text-center"
          >
            <span className="text-2xl">✏️</span>
            <p className="text-sm font-semibold text-slate-700 mt-2">新しいメモ</p>
            <p className="text-xs text-slate-400 mt-0.5">今わからないことを記録</p>
          </Link>
          <Link
            href="/unresolved"
            className="bg-white rounded-xl p-4 shadow-sm border border-blue-50 hover:border-blue-200 hover:shadow-md transition-all text-center"
          >
            <span className="text-2xl">📋</span>
            <p className="text-sm font-semibold text-slate-700 mt-2">未解決リスト</p>
            <p className="text-xs text-slate-400 mt-0.5">あとで確認する項目</p>
          </Link>
        </div>

        {/* Recent memos */}
        <div>
          <h2 className="text-sm font-semibold text-slate-500 mb-3">最近のメモ</h2>
          {memos.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-blue-50">
              <p className="text-4xl mb-3">✏️</p>
              <p className="font-semibold text-slate-500 mb-1">まだメモがありません</p>
              <p className="text-sm text-slate-400">「+ メモ」からはじめましょう</p>
            </div>
          ) : (
            <div className="space-y-2">
              {memos.map((memo) => (
                <button
                  key={memo.id}
                  onClick={() => handleMemoClick(memo)}
                  className="w-full bg-white rounded-xl p-4 shadow-sm border border-blue-50 text-left hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[memo.category]}`}
                    >
                      {CATEGORY_LABELS[memo.category]}
                    </span>
                    <span className="text-xs text-slate-400">{formatDate(memo.createdAt)}</span>
                    {memo.organizeResult && (
                      <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full">
                        整理済み
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-700 line-clamp-2">{memo.content}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Encouragement */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 text-center">
          <p className="text-sm text-blue-600">
            💙 理解するのに時間がかかることは、恥ずかしくありません。
            <br />
            メモに残すことが、成長への第一歩です。
          </p>
        </div>
      </div>

      <BottomNav active="home" />
    </div>
  );
}
