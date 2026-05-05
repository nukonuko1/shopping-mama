'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMemoById, getCurrentMemoId } from '@/lib/wakaranlog/storage';
import { WakaranMemo, QuestionTone } from '@/lib/wakaranlog/types';
import { generateQuestion } from '@/lib/wakaranlog/mockAI';
import BottomNav from '@/components/wakaranlog/BottomNav';

const TONES: { key: QuestionTone; label: string; emoji: string; desc: string }[] = [
  { key: 'polite', label: '丁寧', emoji: '🤝', desc: '職場での標準的な敬語' },
  { key: 'short', label: '短め', emoji: '⚡', desc: 'シンプルにさっと聞く' },
  { key: 'line', label: 'LINE風', emoji: '💬', desc: 'カジュアルに聞ける版' },
  { key: 'email', label: 'メール風', emoji: '📧', desc: '正式なメールとして送れる' },
];

export default function QuestionPage() {
  const router = useRouter();
  const [memo, setMemo] = useState<WakaranMemo | null>(null);
  const [tone, setTone] = useState<QuestionTone>('polite');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = getCurrentMemoId();
    if (!id) {
      router.replace('/');
      return;
    }
    const m = getMemoById(id);
    if (!m?.organizeResult) {
      router.replace('/organize');
      return;
    }
    setMemo(m);
  }, [router]);

  const handleCopy = async () => {
    if (!memo?.organizeResult) return;
    await navigator.clipboard.writeText(generateQuestion(memo.organizeResult, tone));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!memo?.organizeResult) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <p className="text-slate-400">読み込み中…</p>
      </div>
    );
  }

  const questionText = generateQuestion(memo.organizeResult, tone);

  return (
    <div className="min-h-screen bg-blue-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => router.back()} className="text-slate-400 hover:text-slate-600 p-1">
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
          </button>
          <h1 className="text-lg font-bold text-slate-800">質問文を作る</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-5 space-y-5">
        {/* Tone selector */}
        <div>
          <p className="text-sm font-semibold text-slate-600 mb-3">トーンを選んでください</p>
          <div className="grid grid-cols-2 gap-2">
            {TONES.map((t) => (
              <button
                key={t.key}
                onClick={() => {
                  setTone(t.key);
                  setCopied(false);
                }}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  tone === t.key
                    ? 'bg-violet-500 text-white border-violet-500 shadow-md'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-violet-200'
                }`}
              >
                <span className="text-xl">{t.emoji}</span>
                <p className="font-bold text-sm mt-1.5">{t.label}</p>
                <p
                  className={`text-xs mt-0.5 leading-relaxed ${
                    tone === t.key ? 'text-violet-100' : 'text-slate-400'
                  }`}
                >
                  {t.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Generated question */}
        <div className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-400">生成された質問文</p>
            <button
              onClick={handleCopy}
              className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-colors ${
                copied
                  ? 'bg-emerald-100 text-emerald-600'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {copied ? '✓ コピー済み' : '📋 コピー'}
            </button>
          </div>
          <div className="p-4">
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {questionText}
            </p>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-violet-50 rounded-xl p-4 border border-violet-100">
          <p className="text-xs text-violet-700 leading-relaxed">
            💡 「コピー」でクリップボードにコピーできます。
            <br />
            メッセージアプリやメールにそのまま貼り付けて使えます。
          </p>
        </div>

        <button
          onClick={() => router.back()}
          className="w-full text-center text-sm text-slate-400 hover:text-slate-600 py-2"
        >
          ← 整理結果に戻る
        </button>
      </div>

      <BottomNav active="home" />
    </div>
  );
}
