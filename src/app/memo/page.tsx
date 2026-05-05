'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Category, CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/wakaranlog/types';
import { saveMemo, setCurrentMemoId, saveUnresolvedItem, generateId } from '@/lib/wakaranlog/storage';
import { mockOrganize } from '@/lib/wakaranlog/mockAI';
import BottomNav from '@/components/wakaranlog/BottomNav';

const CATEGORIES: Category[] = ['field', 'equipment', 'analysis', 'report', 'terms', 'other'];

const PLACEHOLDER =
  '例：○○の測定をするとき、なぜあの器具を使うのかがわからなかった。先輩が説明してくれたけど、手順の理由がよく理解できていない。';

export default function MemoPage() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Category>('other');
  const [isLoading, setIsLoading] = useState(false);

  const handleOrganize = async () => {
    if (!content.trim()) return;
    setIsLoading(true);

    const memo = {
      id: generateId(),
      content: content.trim(),
      category,
      createdAt: new Date().toISOString(),
    };

    await new Promise((resolve) => setTimeout(resolve, 1400));

    const organizeResult = mockOrganize(memo);
    saveMemo({ ...memo, organizeResult });
    setCurrentMemoId(memo.id);

    setIsLoading(false);
    router.push('/organize');
  };

  const handleSaveLater = () => {
    if (!content.trim()) return;
    const id = generateId();
    const memo = {
      id,
      content: content.trim(),
      category,
      createdAt: new Date().toISOString(),
    };
    saveMemo(memo);
    saveUnresolvedItem({
      id: `u_${id}`,
      content: content.trim(),
      category,
      status: 'unresolved',
      createdAt: new Date().toISOString(),
      memoId: id,
    });
    router.push('/unresolved');
  };

  return (
    <div className="min-h-screen bg-blue-50 pb-28">
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
          <h1 className="text-lg font-bold text-slate-800">わからんメモ</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-5 space-y-5">
        {/* Encouragement */}
        <div className="bg-blue-600 rounded-2xl p-4 text-white">
          <p className="text-sm font-medium leading-relaxed">
            💡 うまく書けなくても大丈夫です。
            <br />
            思ったことをそのまま書いてみてください。
          </p>
        </div>

        {/* Category */}
        <div>
          <p className="text-sm font-semibold text-slate-600 mb-3">カテゴリを選んでください</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  category === cat
                    ? `${CATEGORY_COLORS[cat]} ring-2 ring-offset-2 ring-blue-400 shadow-sm`
                    : 'bg-white text-slate-500 border-slate-200 hover:border-blue-200'
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Text area */}
        <div>
          <p className="text-sm font-semibold text-slate-600 mb-2">
            わからなかったこと・気になったこと
          </p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={PLACEHOLDER}
            rows={8}
            className="w-full bg-white rounded-xl p-4 text-slate-800 text-base border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent placeholder-slate-300 resize-none shadow-sm leading-relaxed"
          />
          <div className="flex justify-between mt-1">
            <p className="text-xs text-slate-400">箇条書きでもOKです</p>
            <p className="text-xs text-slate-400">{content.length}文字</p>
          </div>
        </div>

        {/* Writing tips */}
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 mb-2">📌 書くときのヒント</p>
          <ul className="text-xs text-slate-400 space-y-1.5 leading-relaxed">
            <li>・「○○をやったとき、△△の手順がわからなかった」</li>
            <li>・「先輩が言ってた"○○"という言葉の意味がわからない」</li>
            <li>・「なぜ○○をするのかが理解できていない」</li>
            <li>・「後で確認しようと思ったが何をか忘れた」</li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <button
            onClick={handleOrganize}
            disabled={!content.trim() || isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-200 disabled:cursor-not-allowed text-white text-base font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                AIが整理しています…
              </>
            ) : (
              <>✨ AIで整理する</>
            )}
          </button>

          <button
            onClick={handleSaveLater}
            disabled={!content.trim()}
            className="w-full bg-white hover:bg-slate-50 active:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600 text-base font-medium py-4 rounded-xl transition-colors border border-slate-200"
          >
            📌 あとで確認する（未解決リストに保存）
          </button>
        </div>
      </div>

      <BottomNav active="memo" />
    </div>
  );
}
