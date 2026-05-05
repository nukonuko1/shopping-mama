'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WakaranBottomNav from '@/components/WakaranBottomNav';
import WakaranPageHeader from '@/components/WakaranPageHeader';
import { wakaranStorage } from '@/lib/wakaranStorage';
import type { CurrentSession, ReviewCard } from '@/lib/wakaranTypes';

function FlipCard({ card, flipped, onClick }: { card: ReviewCard; flipped: boolean; onClick: () => void }) {
  return (
    <div className="flip-container w-full cursor-pointer" style={{ height: '280px' }} onClick={onClick}>
      <div className={`flip-inner w-full ${flipped ? 'flipped' : ''}`} style={{ height: '280px' }}>
        {/* Front (Question) */}
        <div className="flip-front bg-white rounded-2xl p-6 flex flex-col items-center justify-center border-2 border-blue-200 shadow-md">
          <span className="text-xs font-bold text-blue-400 tracking-widest mb-4">Q U E S T I O N</span>
          <p className="text-lg font-bold text-slate-800 text-center leading-relaxed">
            {card.question}
          </p>
          <div className="mt-6 flex items-center gap-2 text-slate-400 text-xs">
            <span>タップして答えを確認</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M7 16V4m0 0L3 8m4-4l4 4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 8v12m0 0l4-4m-4 4l-4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Back (Answer) */}
        <div className="flip-back bg-blue-600 rounded-2xl p-6 flex flex-col items-center justify-center shadow-md">
          <span className="text-xs font-bold text-blue-300 tracking-widest mb-4">A N S W E R</span>
          <p className="text-base text-white text-center leading-relaxed whitespace-pre-wrap">
            {card.answer}
          </p>
          <p className="text-blue-300 text-xs mt-5">タップしてもどる</p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewPage() {
  const router = useRouter();
  const [session, setSession] = useState<CurrentSession | null>(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSession(wakaranStorage.getSession());
    setMounted(true);
  }, []);

  const handleFlip = () => setFlipped(f => !f);

  const handleNext = () => {
    if (!session || index >= session.reviewCards.length - 1) return;
    setFlipped(false);
    setTimeout(() => setIndex(i => i + 1), 120);
  };

  const handlePrev = () => {
    if (index <= 0) return;
    setFlipped(false);
    setTimeout(() => setIndex(i => i - 1), 120);
  };

  if (!mounted) return null;

  if (!session) {
    return (
      <div className="min-h-screen bg-blue-50 pb-24">
        <WakaranPageHeader title="復習カード" backHref="/organize" />
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

  const cards = session.reviewCards;
  const card = cards[index];
  const total = cards.length;

  return (
    <div className="min-h-screen bg-blue-50 pb-24">
      <WakaranPageHeader title="復習カード" backHref="/organize" />

      <div className="px-4 py-5 space-y-5 fade-in-up">
        {/* Progress */}
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-slate-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>
          <span className="text-sm font-bold text-slate-500 flex-shrink-0">
            {index + 1} / {total}
          </span>
        </div>

        {/* Theme */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3">
          <p className="text-xs text-blue-600 font-medium text-center leading-snug">
            {session.organized.theme}
          </p>
        </div>

        {/* Flip card */}
        <FlipCard card={card} flipped={flipped} onClick={handleFlip} />

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={handlePrev}
            disabled={index === 0}
            className="flex-1 bg-white text-slate-600 py-4 rounded-2xl text-base font-medium border-2 border-slate-200 active:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← 前へ
          </button>
          <button
            onClick={handleNext}
            disabled={index === total - 1}
            className="flex-1 bg-blue-600 text-white py-4 rounded-2xl text-base font-bold shadow-sm active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            次へ →
          </button>
        </div>

        {/* Completion message */}
        {index === total - 1 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center fade-in-up">
            <p className="text-2xl mb-2">🎉</p>
            <p className="text-sm font-bold text-emerald-700">全カード確認しました！</p>
            <p className="text-xs text-emerald-600 mt-1">繰り返し復習すると記憶が定着します。</p>
          </div>
        )}

        {/* Card dots */}
        <div className="flex justify-center gap-2">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => { setFlipped(false); setTimeout(() => setIndex(i), 120); }}
              className={`w-2 h-2 rounded-full transition-all ${
                i === index ? 'bg-blue-600 w-4' : 'bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>

      <WakaranBottomNav current="home" />
    </div>
  );
}
