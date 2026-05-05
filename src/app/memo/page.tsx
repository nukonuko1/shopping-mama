'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import WakaranBottomNav from '@/components/WakaranBottomNav';
import WakaranPageHeader from '@/components/WakaranPageHeader';
import { wakaranStorage } from '@/lib/wakaranStorage';
import { processMockAI } from '@/lib/wakaranMockAI';
import { CATEGORIES, CATEGORY_COLORS } from '@/lib/wakaranTypes';
import type { Category, Memo } from '@/lib/wakaranTypes';

const PLACEHOLDERS: Record<Category, string> = {
  '現場作業': '例：今日の現場作業で△△の手順がよくわからなかった。先輩が「○○したあと□□する」と言っていたが、なぜその順番なのかが不明。',
  '器材準備': '例：△△という器材の名前は聞いたけど、何に使うのかわからない。保管場所も教えてもらったが覚えていない。',
  '分析': '例：データを見て「○○の傾向がある」と言われたが、どのグラフのどの部分を見ればいいのかわからなかった。',
  '報告書': '例：報告書に「所見」と「結果」を書くように言われたが、何が違うのかよくわからない。',
  '用語': '例：「インシデント」という言葉が出てきたが、「事故」とどう違うのかわからない。',
  'その他': '例：打ち合わせで出てきた話の内容がよく理解できなかった。あとで確認したいことがある。',
};

export default function MemoPage() {
  const router = useRouter();
  const [category, setCategory] = useState<Category>('現場作業');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (content.trim().length < 5) {
      setError('もう少し詳しく書いてみましょう（5文字以上）');
      return;
    }
    setError('');
    setLoading(true);

    const memo: Memo = {
      id: `${Date.now()}`,
      content: content.trim(),
      category,
      createdAt: new Date().toISOString(),
    };

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1800));

    const session = processMockAI(memo);
    wakaranStorage.addMemo(memo);
    wakaranStorage.saveSession(session);

    router.push('/organize');
  };

  return (
    <div className="min-h-screen bg-blue-50 pb-24">
      <WakaranPageHeader title="メモ入力" backHref="/" />

      <div className="px-4 py-5 space-y-5">
        {/* Category */}
        <div>
          <p className="text-sm font-bold text-slate-700 mb-3">カテゴリを選んでください</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => {
              const colors = CATEGORY_COLORS[cat];
              const active = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                    active
                      ? `${colors.bg} ${colors.text} ring-2 ring-current`
                      : 'bg-white text-slate-500 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Textarea */}
        <div>
          <p className="text-sm font-bold text-slate-700 mb-3">
            わからなかったことをメモしてください
          </p>
          <textarea
            value={content}
            onChange={e => {
              setContent(e.target.value);
              if (error) setError('');
            }}
            placeholder={PLACEHOLDERS[category]}
            rows={7}
            className="w-full bg-white border-2 border-slate-200 rounded-2xl p-4 text-base text-slate-800 leading-relaxed resize-none focus:outline-none focus:border-blue-400 transition-colors placeholder:text-slate-300"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <p className="text-xs text-slate-400 mt-2 text-right">{content.length} 文字</p>
        </div>

        {/* Encouragement */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <p className="text-sm text-blue-700 leading-relaxed">
            ✍️ 完璧じゃなくていいです。<br />
            「なんかよくわからなかった」くらいのメモでもOK。<br />
            AIが整理をサポートします。
          </p>
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-5 rounded-2xl text-lg font-bold shadow-lg shadow-blue-200 active:scale-95 transition-all disabled:opacity-70 disabled:scale-100"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <span className="flex gap-1.5">
                <span className="w-2 h-2 bg-white rounded-full dot-1" />
                <span className="w-2 h-2 bg-white rounded-full dot-2" />
                <span className="w-2 h-2 bg-white rounded-full dot-3" />
              </span>
              AIで整理しています…
            </span>
          ) : (
            'AIで整理する →'
          )}
        </button>
      </div>

      <WakaranBottomNav current="memo" />
    </div>
  );
}
