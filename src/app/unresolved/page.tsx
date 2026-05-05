'use client';

import { useState, useEffect } from 'react';
import WakaranBottomNav from '@/components/WakaranBottomNav';
import WakaranPageHeader from '@/components/WakaranPageHeader';
import { wakaranStorage } from '@/lib/wakaranStorage';
import { CATEGORY_COLORS } from '@/lib/wakaranTypes';
import type { UnresolvedItem } from '@/lib/wakaranTypes';

type Filter = 'all' | 'unresolved' | 'resolved';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' });
}

export default function UnresolvedPage() {
  const [items, setItems] = useState<UnresolvedItem[]>([]);
  const [filter, setFilter] = useState<Filter>('unresolved');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setItems(wakaranStorage.getUnresolved());
    setMounted(true);
  }, []);

  const handleToggle = (id: string) => {
    wakaranStorage.toggleResolved(id);
    setItems(wakaranStorage.getUnresolved());
  };

  const handleDelete = (id: string) => {
    wakaranStorage.deleteUnresolved(id);
    setItems(wakaranStorage.getUnresolved());
  };

  const filtered = items.filter(item => {
    if (filter === 'unresolved') return !item.resolved;
    if (filter === 'resolved') return item.resolved;
    return true;
  });

  const unresolvedCount = items.filter(i => !i.resolved).length;
  const resolvedCount = items.filter(i => i.resolved).length;

  const filterTabs: { id: Filter; label: string; count: number }[] = [
    { id: 'unresolved', label: '未解決', count: unresolvedCount },
    { id: 'resolved', label: '解決済み', count: resolvedCount },
    { id: 'all', label: 'すべて', count: items.length },
  ];

  return (
    <div className="min-h-screen bg-blue-50 pb-24">
      <WakaranPageHeader title="未解決リスト" backHref="/" />

      <div className="px-4 py-5">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-5">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-500 border border-slate-200'
              }`}
            >
              {tab.label}
              {mounted && tab.count > 0 && (
                <span
                  className={`ml-1.5 text-xs font-bold px-1.5 py-0.5 rounded-full ${
                    filter === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* List */}
        {mounted && filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm fade-in-up">
            {filter === 'unresolved' ? (
              <>
                <p className="text-4xl mb-3">✨</p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  未解決の項目はありません。<br />
                  よく頑張りました！
                </p>
              </>
            ) : filter === 'resolved' ? (
              <>
                <p className="text-4xl mb-3">📝</p>
                <p className="text-slate-500 text-sm">
                  解決済みの項目はまだありません。
                </p>
              </>
            ) : (
              <>
                <p className="text-4xl mb-3">📭</p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  リストに項目がありません。<br />
                  AI整理結果画面から追加できます。
                </p>
              </>
            )}
          </div>
        )}

        <div className="space-y-3 fade-in-up">
          {filtered.map(item => {
            const colors = CATEGORY_COLORS[item.category];
            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-4 shadow-sm transition-opacity ${
                  item.resolved ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Checkbox */}
                  <button
                    onClick={() => handleToggle(item.id)}
                    className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all active:scale-90 ${
                      item.resolved
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-slate-300 bg-white'
                    }`}
                    aria-label={item.resolved ? '未解決に戻す' : '解決済みにする'}
                  >
                    {item.resolved && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-4 h-4">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors.badge}`}>
                        {item.category}
                      </span>
                      <span className="text-xs text-slate-400">{formatDate(item.createdAt)}</span>
                    </div>
                    <p className={`text-sm leading-relaxed ${item.resolved ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                      {item.content}
                    </p>
                    {item.theme && (
                      <p className="text-xs text-slate-400 mt-1.5 truncate">
                        テーマ：{item.theme}
                      </p>
                    )}
                    {item.resolved && item.resolvedAt && (
                      <p className="text-xs text-emerald-600 mt-1">
                        ✓ {formatDate(item.resolvedAt)} 解決
                      </p>
                    )}
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-300 active:text-red-400 active:bg-red-50 transition-colors flex-shrink-0"
                    aria-label="削除"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats summary */}
        {mounted && items.length > 0 && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <p className="text-sm text-blue-700 text-center">
              全 {items.length} 件中、{resolvedCount} 件を解決済み
              {resolvedCount > 0 && (
                <span className="block text-xs text-blue-500 mt-1">
                  よく頑張りました！解決できていることを大切にしましょう 🌟
                </span>
              )}
            </p>
          </div>
        )}
      </div>

      <WakaranBottomNav current="unresolved" />
    </div>
  );
}
