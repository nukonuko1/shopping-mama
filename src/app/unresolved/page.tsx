'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  getUnresolvedItems,
  updateUnresolvedStatus,
  deleteUnresolvedItem,
  setCurrentMemoId,
} from '@/lib/wakaranlog/storage';
import { UnresolvedItem, Category, CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/wakaranlog/types';
import BottomNav from '@/components/wakaranlog/BottomNav';

type FilterCategory = 'all' | Category;

const FILTER_CATEGORIES: { key: FilterCategory; label: string }[] = [
  { key: 'all', label: 'すべて' },
  { key: 'field', label: '現場作業' },
  { key: 'equipment', label: '器材準備' },
  { key: 'analysis', label: '分析' },
  { key: 'report', label: '報告書' },
  { key: 'terms', label: '用語' },
  { key: 'other', label: 'その他' },
];

export default function UnresolvedPage() {
  const router = useRouter();
  const [items, setItems] = useState<UnresolvedItem[]>([]);
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [showResolved, setShowResolved] = useState(false);

  const reload = () => setItems(getUnresolvedItems());

  useEffect(() => {
    reload();
  }, []);

  const handleToggle = (id: string, current: 'unresolved' | 'resolved') => {
    updateUnresolvedStatus(id, current === 'unresolved' ? 'resolved' : 'unresolved');
    reload();
  };

  const handleDelete = (id: string) => {
    deleteUnresolvedItem(id);
    reload();
  };

  const handleView = (item: UnresolvedItem) => {
    if (item.memoId) {
      setCurrentMemoId(item.memoId);
      router.push('/organize');
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' });
  };

  const unresolvedCount = items.filter((i) => i.status === 'unresolved').length;

  const filtered = items.filter((item) => {
    const catMatch = filter === 'all' || item.category === filter;
    const statusMatch = showResolved || item.status === 'unresolved';
    return catMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-blue-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-slate-800">未解決リスト</h1>
              <p className="text-xs text-slate-400">
                未解決 {unresolvedCount}件 / 全{items.length}件
              </p>
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-500 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showResolved}
                onChange={(e) => setShowResolved(e.target.checked)}
                className="w-4 h-4 accent-blue-500"
              />
              解決済みも表示
            </label>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-4 space-y-4">
        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {FILTER_CATEGORIES.map(({ key, label }) => {
            const isActive = filter === key;
            const colorClass =
              key !== 'all' ? CATEGORY_COLORS[key as Category] : '';
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  isActive && key === 'all'
                    ? 'bg-blue-500 text-white border-blue-500 shadow-sm'
                    : isActive
                    ? `${colorClass} ring-2 ring-offset-1 ring-blue-300 shadow-sm`
                    : 'bg-white text-slate-500 border-slate-200 hover:border-blue-200'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Items */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center shadow-sm border border-blue-50">
            {unresolvedCount === 0 ? (
              <>
                <p className="text-4xl mb-3">🎉</p>
                <p className="font-semibold text-slate-600 mb-1">未解決がありません！</p>
                <p className="text-sm text-slate-400">素晴らしいです。</p>
              </>
            ) : (
              <>
                <p className="text-4xl mb-3">🔍</p>
                <p className="font-semibold text-slate-600 mb-1">該当する項目がありません</p>
                <p className="text-sm text-slate-400">フィルターを変えてみてください。</p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-xl p-4 border shadow-sm transition-all ${
                  item.status === 'resolved' ? 'border-emerald-100 opacity-60' : 'border-blue-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Status toggle */}
                  <button
                    onClick={() => handleToggle(item.id, item.status)}
                    className={`mt-0.5 flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
                      item.status === 'resolved'
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-slate-300 hover:border-emerald-400'
                    }`}
                    title={item.status === 'resolved' ? '未解決に戻す' : '解決済みにする'}
                  >
                    {item.status === 'resolved' && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                        stroke="white"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    {/* Meta row */}
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${CATEGORY_COLORS[item.category]}`}
                      >
                        {CATEGORY_LABELS[item.category]}
                      </span>
                      <span className="text-xs text-slate-400">{formatDate(item.createdAt)}</span>
                      {item.status === 'resolved' && (
                        <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full font-medium">
                          解決済み
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <p
                      className={`text-sm leading-relaxed ${
                        item.status === 'resolved'
                          ? 'text-slate-400 line-through decoration-slate-300'
                          : 'text-slate-700'
                      }`}
                    >
                      {item.content.length > 90
                        ? item.content.substring(0, 90) + '…'
                        : item.content}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-2.5">
                      {item.memoId && (
                        <button
                          onClick={() => handleView(item)}
                          className="text-xs text-blue-500 hover:text-blue-700 font-semibold"
                        >
                          整理結果を見る →
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-xs text-slate-300 hover:text-rose-400 ml-auto transition-colors"
                      >
                        削除
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add new */}
        <Link
          href="/memo"
          className="block w-full bg-white rounded-xl p-4 border border-dashed border-blue-200 text-center text-blue-400 hover:border-blue-400 hover:text-blue-600 transition-colors"
        >
          ＋ 新しいわからんを記録する
        </Link>
      </div>

      <BottomNav active="unresolved" />
    </div>
  );
}
