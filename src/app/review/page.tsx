'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMemoById, getCurrentMemoId } from '@/lib/wakaranlog/storage';
import { WakaranMemo, ReviewCard } from '@/lib/wakaranlog/types';
import { generateReviewCards } from '@/lib/wakaranlog/mockAI';
import BottomNav from '@/components/wakaranlog/BottomNav';

export default function ReviewPage() {
  const router = useRouter();
  const [memo, setMemo] = useState<WakaranMemo | null>(null);
  const [cards, setCards] = useState<ReviewCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

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
    setCards(generateReviewCards(m.organizeResult));
  }, [router]);

  const navigate = (dir: 'prev' | 'next') => {
    if (transitioning) return;
    setTransitioning(true);
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((i) => (dir === 'next' ? Math.min(i + 1, cards.length - 1) : Math.max(i - 1, 0)));
      setTransitioning(false);
    }, 200);
  };

  if (!memo || cards.length === 0) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <p className="text-slate-400">読み込み中…</p>
      </div>
    );
  }

  const card = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

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
          <h1 className="text-lg font-bold text-slate-800 flex-1">復習カード</h1>
          <span className="text-sm text-slate-400 font-medium">
            {currentIndex + 1} / {cards.length}
          </span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-8">
        {/* Progress bar */}
        <div className="h-2 bg-slate-200 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-teal-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Flip card */}
        <div
          className="card-container mb-4"
          style={{ height: '280px' }}
          onClick={() => setIsFlipped((f) => !f)}
        >
          <div className={`card ${isFlipped ? 'flipped' : ''}`}>
            {/* Front — Question */}
            <div className="card-face card-front bg-white rounded-2xl shadow-lg border border-teal-100 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                <span className="text-2xl">❓</span>
              </div>
              <p className="text-xs text-teal-500 font-bold mb-3 uppercase tracking-widest">
                Question
              </p>
              <p className="text-base font-semibold text-slate-800 leading-relaxed">{card.question}</p>
              <p className="text-xs text-slate-300 mt-6 flex items-center gap-1">
                <span>タップして答えを見る</span>
                <span>→</span>
              </p>
            </div>

            {/* Back — Answer */}
            <div className="card-face card-back bg-teal-500 rounded-2xl shadow-lg flex flex-col items-center justify-center p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-teal-400 flex items-center justify-center mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <p className="text-xs text-teal-100 font-bold mb-3 uppercase tracking-widest">Answer</p>
              <p className="text-sm text-white leading-relaxed whitespace-pre-line">{card.answer}</p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mb-8">
          {isFlipped ? '← タップして問題に戻る' : 'タップして答えを見る →'}
        </p>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => navigate('prev')}
            disabled={currentIndex === 0}
            className="w-14 h-14 rounded-full bg-white border border-slate-200 shadow-sm disabled:opacity-30 flex items-center justify-center text-slate-600 hover:bg-slate-50 active:bg-slate-100 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="flex gap-2 items-center">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (i === currentIndex) return;
                  setIsFlipped(false);
                  setCurrentIndex(i);
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-6 h-2.5 bg-teal-500' : 'w-2.5 h-2.5 bg-slate-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => navigate('next')}
            disabled={currentIndex === cards.length - 1}
            className="w-14 h-14 rounded-full bg-white border border-slate-200 shadow-sm disabled:opacity-30 flex items-center justify-center text-slate-600 hover:bg-slate-50 active:bg-slate-100 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Completion message */}
        {currentIndex === cards.length - 1 && (
          <div className="mt-8 bg-teal-50 rounded-xl p-4 border border-teal-100 text-center">
            <p className="text-sm font-semibold text-teal-700">🎉 最後のカードです！</p>
            <p className="text-xs text-teal-500 mt-1">復習お疲れ様でした。</p>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className="mt-3 text-xs text-teal-600 font-semibold underline"
            >
              最初からやり直す
            </button>
          </div>
        )}
      </div>

      <BottomNav active="home" />
    </div>
  );
}
