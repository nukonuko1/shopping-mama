'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WakaranBottomNav from '@/components/WakaranBottomNav';
import { wakaranStorage } from '@/lib/wakaranStorage';
import { CATEGORY_COLORS } from '@/lib/wakaranTypes';
import type { Memo, UnresolvedItem } from '@/lib/wakaranTypes';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' });
}

export default function HomePage() {
  const router = useRouter();
  const [memos, setMemos] = useState<Memo[]>([]);
  const [unresolved, setUnresolved] = useState<UnresolvedItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMemos(wakaranStorage.getMemos().slice(0, 3));
    setUnresolved(wakaranStorage.getUnresolved().filter((u: UnresolvedItem) => !u.resolved));
    setMounted(true);
  }, []);

  const unresolvedCount = unresolved.length;
  const totalMemos = mounted ? wakaranStorage.getMemos().length : 0;

  return (
    <div className="min-h-screen bg-blue-50 pb-24">
      {/* Hero header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 px-5 pt-14 pb-10 text-white">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
            📝
          </div>
          <h1 className="text-2xl font-bold tracking-wide">わからんログ</h1>
        </div>
        <p className="text-lg font-medium leading-relaxed text-white">
          一回で理解できなくても大丈夫。
        </p>
        <p className="text-sm text-blue-200 mt-1 leading-relaxed">
          わからなかったことを、質問と復習に変える。
        </p>
      </div>

      <div className="px-4 -mt-5">
        {/* Stats */}
        {mounted && (
          <div className="grid grid-cols-2 gap-3 mb-5 fade-in-up">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-3xl font-bold text-blue-600">{totalMemos}</p>
              <p className="text-sm text-slate-500 mt-1">メモした数</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-3xl font-bold text-amber-500">{unresolvedCount}</p>
              <p className="text-sm text-slate-500 mt-1">未解決の数</p>
            </div>
          </div>
        )}
        {!mounted && <div className="h-24 mb-5" />}

        {/* CTA button */}
        <button
          onClick={() => router.push('/memo')}
          className="w-full bg-blue-600 text-white py-5 rounded-2xl text-lg font-bold shadow-lg shadow-blue-200 active:scale-95 transition-transform mb-4"
        >
          ＋ 新しいメモを入力する
        </button>

        {/* Hint */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-5">
          <p className="text-sm text-blue-700 leading-relaxed">
            💡 わからなかったことは、その場でメモしておこう。<br />
            あとから整理して、質問と復習に変えられます。
          </p>
        </div>

        {/* Recent memos */}
        {mounted && memos.length > 0 && (
          <div className="mb-5 fade-in-up">
            <h2 className="text-base font-bold text-slate-700 mb-3 px-1">最近のメモ</h2>
            <div className="space-y-3">
              {memos.map(memo => {
                const colors = CATEGORY_COLORS[memo.category];
                return (
                  <div
                    key={memo.id}
                    onClick={() => router.push('/organize')}
                    className="bg-white rounded-2xl p-4 shadow-sm active:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${colors.badge}`}>
                        {memo.category}
                      </span>
                      <span className="text-xs text-slate-400">{formatDate(memo.createdAt)}</span>
                    </div>
                    <p className="text-sm text-slate-700 line-clamp-2 leading-relaxed">{memo.content}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty state */}
        {mounted && memos.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm mb-5 fade-in-up">
            <p className="text-4xl mb-3">🌱</p>
            <p className="text-slate-500 text-sm leading-relaxed">
              まだメモがありません。<br />
              今日わからなかったことをメモしてみましょう。
            </p>
          </div>
        )}

        {/* Unresolved shortcut */}
        <button
          onClick={() => router.push('/unresolved')}
          className="w-full bg-white text-slate-700 py-4 rounded-2xl text-base font-medium border-2 border-slate-200 active:bg-slate-50 transition-colors"
        >
          未解決リストを見る
          {mounted && unresolvedCount > 0 && (
            <span className="ml-2 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {unresolvedCount}
            </span>
          )}
        </button>
      </div>

      <WakaranBottomNav current="home" />
    </div>
  );
}
