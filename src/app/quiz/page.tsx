'use client';

import { useState, useEffect } from 'react';
import BottomNav from '@/components/BottomNav';
import { quizzes } from '@/lib/quizData';
import { getData, addKnowledgePoints } from '@/lib/storage';

type Phase = 'idle' | 'answered';

export default function QuizPage() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [chosen, setChosen] = useState<number | null>(null);
  const [points, setPoints] = useState(0);
  const [sessionPoints, setSessionPoints] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const data = getData();
    setPoints(data.knowledgePoints);
    // Shuffle for variety
    const shuffled = [...quizzes].sort(() => Math.random() - 0.5);
    quizzes.splice(0, quizzes.length, ...shuffled);
  }, []);

  const quiz = quizzes[index];

  const handleAnswer = (optionIndex: number) => {
    if (phase === 'answered') return;
    setChosen(optionIndex);
    setPhase('answered');
    if (optionIndex === quiz.answerIndex) {
      addKnowledgePoints(10);
      setPoints((p) => p + 10);
      setSessionPoints((p) => p + 10);
    }
  };

  const handleNext = () => {
    if (index + 1 >= quizzes.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setPhase('idle');
    setChosen(null);
  };

  const handleRestart = () => {
    const shuffled = [...quizzes].sort(() => Math.random() - 0.5);
    quizzes.splice(0, quizzes.length, ...shuffled);
    setIndex(0);
    setPhase('idle');
    setChosen(null);
    setFinished(false);
    setSessionPoints(0);
  };

  if (finished) {
    return (
      <div className="flex flex-col min-h-dvh pb-24">
        <div className="flex-1 flex flex-col items-center justify-center px-5 text-center gap-6 animate-in">
          <div className="text-6xl">🎓</div>
          <div>
            <h1 className="text-2xl font-black mb-2">クイズ完了！</h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              今回獲得したポイント
            </p>
            <p className="text-5xl font-black mt-2" style={{ color: 'var(--green-light)' }}>
              +{sessionPoints}pt
            </p>
          </div>
          <div className="w-full rounded-2xl p-5" style={{ background: 'var(--bg-card)' }}>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>累計知識ポイント</p>
            <p className="text-4xl font-black mt-1" style={{ color: 'var(--text)' }}>
              {points}pt
            </p>
          </div>
          <button
            onClick={handleRestart}
            className="w-full py-5 rounded-2xl text-white text-lg font-black transition-transform active:scale-95"
            style={{ background: 'linear-gradient(135deg, var(--red-dark) 0%, var(--red) 100%)' }}
          >
            もう一度挑戦する
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  const isCorrect = chosen !== null && chosen === quiz.answerIndex;

  return (
    <div className="flex flex-col min-h-dvh pb-24">
      {/* Header */}
      <div className="px-5 pt-10 pb-4 animate-in">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--red-light)' }}>
              QUIZ
            </p>
            <h1 className="text-xl font-black">お酒の知識クイズ</h1>
          </div>
          <div
            className="rounded-xl px-3 py-2 text-center"
            style={{ background: 'var(--bg-card)' }}
          >
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>知識ポイント</p>
            <p className="text-lg font-black" style={{ color: 'var(--green-light)' }}>{points}pt</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-card)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              background: 'var(--red)',
              width: `${((index + 1) / quizzes.length) * 100}%`,
            }}
          />
        </div>
        <p className="text-xs mt-1 text-right" style={{ color: 'var(--text-muted)' }}>
          {index + 1} / {quizzes.length}
        </p>
      </div>

      {/* Question */}
      <div className="px-4 flex-1 flex flex-col gap-4 animate-in-delay-1">
        <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)' }}>
          <p className="text-lg font-black leading-snug">{quiz.question}</p>
          <p className="text-xs mt-2" style={{ color: 'var(--red-light)' }}>
            正解で +10pt
          </p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {quiz.options.map((option, i) => {
            let bg = 'var(--bg-card)';
            let border = 'transparent';
            let textColor = 'var(--text)';

            if (phase === 'answered') {
              if (i === quiz.answerIndex) {
                bg = 'rgba(22,163,74,0.18)';
                border = 'var(--green-light)';
                textColor = 'var(--green-light)';
              } else if (i === chosen && i !== quiz.answerIndex) {
                bg = 'rgba(220,38,38,0.18)';
                border = 'var(--red)';
                textColor = 'var(--red-light)';
              }
            } else if (chosen === i) {
              bg = 'rgba(220,38,38,0.1)';
              border = 'var(--red)';
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={phase === 'answered'}
                className="w-full rounded-2xl p-4 text-left font-bold text-sm transition-all active:scale-98"
                style={{
                  background: bg,
                  border: `2px solid ${border}`,
                  color: textColor,
                  opacity: phase === 'answered' && i !== quiz.answerIndex && i !== chosen ? 0.5 : 1,
                }}
              >
                <span
                  className="inline-block w-6 h-6 rounded-full text-xs font-black text-center leading-6 mr-2 flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {phase === 'answered' && (
          <div
            className="rounded-2xl p-4 animate-in"
            style={{
              background: isCorrect ? 'rgba(22,163,74,0.1)' : 'rgba(220,38,38,0.1)',
              border: `1px solid ${isCorrect ? 'var(--green-light)' : 'var(--red)'}`,
            }}
          >
            <p
              className="text-sm font-black mb-1"
              style={{ color: isCorrect ? 'var(--green-light)' : 'var(--red-light)' }}
            >
              {isCorrect ? '✓ 正解！ +10pt' : '✗ 不正解'}
            </p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {quiz.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Next button */}
      {phase === 'answered' && (
        <div className="px-5 pt-4">
          <button
            onClick={handleNext}
            className="w-full py-5 rounded-2xl text-white text-lg font-black transition-transform active:scale-95 animate-in"
            style={{ background: 'linear-gradient(135deg, var(--red-dark) 0%, var(--red) 100%)' }}
          >
            {index + 1 >= quizzes.length ? '結果を見る →' : '次の問題 →'}
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
