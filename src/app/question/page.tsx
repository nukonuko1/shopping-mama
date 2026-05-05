'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WakaranBottomNav from '@/components/WakaranBottomNav';
import WakaranPageHeader from '@/components/WakaranPageHeader';
import { wakaranStorage } from '@/lib/wakaranStorage';
import { QUESTION_TONES } from '@/lib/wakaranTypes';
import type { CurrentSession, QuestionTone } from '@/lib/wakaranTypes';

const TONE_ICONS: Record<QuestionTone, string> = {
  '丁寧': '🙇',
  '短め': '⚡',
  'LINE風': '📱',
  'メール風': '📧',
};

const TONE_DESC: Record<QuestionTone, string> = {
  '丁寧': '丁寧な敬語で',
  '短め': '簡潔に直接',
  'LINE風': 'カジュアルに',
  'メール風': 'メール形式で',
};

export default function QuestionPage() {
  const router = useRouter();
  const [session, setSession] = useState<CurrentSession | null>(null);
  const [tone, setTone] = useState<QuestionTone>('丁寧');
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSession(wakaranStorage.getSession());
    setMounted(true);
  }, []);

  const handleCopy = async () => {
    if (!session) return;
    const text = session.questions[tone];
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null;

  if (!session) {
    return (
      <div className="min-h-screen bg-blue-50 pb-24">
        <WakaranPageHeader title="質問文生成" backHref="/organize" />
        <div className="px-4 py-10 text-center">
          <p className="text-4xl mb-4">📭</p>
          <p className="text-slate-500 text-base mb-6">先にメモを入力・整理してください。</p>
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

  const questionText = session.questions[tone];

  return (
    <div className="min-h-screen bg-blue-50 pb-24">
      <WakaranPageHeader title="質問文生成" backHref="/organize" />

      <div className="px-4 py-5 space-y-5 fade-in-up">
        {/* Theme reminder */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-slate-400 mb-1">整理したテーマ</p>
          <p className="text-sm font-bold text-slate-700 leading-snug">{session.organized.theme}</p>
        </div>

        {/* Tone selector */}
        <div>
          <p className="text-sm font-bold text-slate-700 mb-3">トーンを選んでください</p>
          <div className="grid grid-cols-2 gap-2">
            {QUESTION_TONES.map(t => (
              <button
                key={t}
                onClick={() => {
                  setTone(t);
                  setCopied(false);
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all active:scale-95 border-2 ${
                  tone === t
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 border-slate-200'
                }`}
              >
                <span className="text-lg">{TONE_ICONS[t]}</span>
                <div className="text-left">
                  <div className="font-bold">{t}</div>
                  <div className={`text-xs ${tone === t ? 'text-blue-200' : 'text-slate-400'}`}>
                    {TONE_DESC[t]}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Generated question */}
        <div>
          <p className="text-sm font-bold text-slate-700 mb-2">生成された質問文</p>
          <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-blue-100">
            <pre className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">
              {questionText}
            </pre>
          </div>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className={`w-full py-4 rounded-2xl text-base font-bold transition-all active:scale-95 ${
            copied
              ? 'bg-emerald-500 text-white'
              : 'bg-blue-600 text-white shadow-lg shadow-blue-200'
          }`}
        >
          {copied ? '✓ コピーしました！' : '📋 コピーする'}
        </button>

        {/* Back to organize */}
        <button
          onClick={() => router.push('/organize')}
          className="w-full bg-white text-slate-600 py-4 rounded-2xl text-base font-medium border-2 border-slate-200 active:bg-slate-50 transition-colors"
        >
          ← 整理結果に戻る
        </button>
      </div>

      <WakaranBottomNav current="home" />
    </div>
  );
}
