'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import {
  getData,
  getStreak,
  getTotalSavedAmount,
  getTotalAvoidedAlcohol,
} from '@/lib/storage';
import { formatCurrency, calcYearlyCost } from '@/lib/calculations';
import { AppData } from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<AppData | null>(null);
  const [streak, setStreak] = useState(0);
  const [saved, setSaved] = useState(0);
  const [avoided, setAvoided] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const d = getData();
    setData(d);
    setStreak(getStreak());
    setSaved(getTotalSavedAmount());
    setAvoided(getTotalAvoidedAlcohol());
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-dvh">
        <div className="text-4xl animate-pulse">📊</div>
      </div>
    );
  }

  const soberDays = data?.records.filter((r) => !r.drank).length ?? 0;
  const totalCravings = data?.totalCravingsStopped ?? 0;
  const knowledgePoints = data?.knowledgePoints ?? 0;
  const yearlyLoss = data?.settings ? calcYearlyCost(data.settings) : null;
  const recentRecords = [...(data?.records ?? [])]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 7);

  // Collect all alternative actions
  const allActions = data?.records
    .flatMap((r) => r.alternativeActions)
    .filter(Boolean) ?? [];
  const actionCounts: Record<string, number> = {};
  allActions.forEach((a) => {
    actionCounts[a] = (actionCounts[a] ?? 0) + 1;
  });
  const topActions = Object.entries(actionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="flex flex-col min-h-dvh pb-24">
      {/* Header */}
      <div className="px-5 pt-10 pb-6 animate-in">
        <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'var(--red-light)' }}>
          DASHBOARD
        </p>
        <h1 className="text-2xl font-black">あなたの記録</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
          酒代45,000円を、人生投資に戻そう。
        </p>
      </div>

      <div className="px-4 flex flex-col gap-4">
        {/* Streak hero */}
        <div
          className="rounded-2xl p-5 text-center animate-in"
          style={{
            background: streak > 0
              ? 'linear-gradient(135deg, rgba(22,163,74,0.2) 0%, rgba(22,163,74,0.05) 100%)'
              : 'var(--bg-card)',
            border: `1px solid ${streak > 0 ? 'var(--green-light)' : 'var(--border)'}`,
          }}
        >
          <p className="text-6xl font-black" style={{ color: streak > 0 ? 'var(--green-light)' : 'var(--text-muted)' }}>
            {streak}
          </p>
          <p className="text-sm font-bold mt-1" style={{ color: 'var(--text-muted)' }}>
            連続禁酒日
          </p>
          {streak >= 3 && (
            <p className="text-xs mt-2 font-bold" style={{ color: 'var(--green-light)' }}>
              🔥 {streak}日継続中！素晴らしい！
            </p>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 animate-in-delay-1">
          {[
            { label: '累計節約額', value: formatCurrency(saved), color: 'var(--green-light)', icon: '💰' },
            { label: '禁酒日数', value: `${soberDays}日`, color: 'var(--green-light)', icon: '📅' },
            { label: '回避アルコール', value: `${Math.round(avoided)}g`, color: '#8b5cf6', icon: '🍶' },
            { label: '抑制した衝動', value: `${totalCravings}回`, color: '#f97316', icon: '💪' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-4"
              style={{ background: 'var(--bg-card)' }}
            >
              <p className="text-lg">{stat.icon}</p>
              <p className="text-xl font-black mt-1" style={{ color: stat.color }}>
                {stat.value}
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Yearly loss projector */}
        {yearlyLoss !== null && (
          <div
            className="rounded-2xl p-4 animate-in-delay-2"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <p className="text-xs font-bold mb-2 tracking-wider" style={{ color: 'var(--red-light)' }}>
              飲み続けた場合の年間損失
            </p>
            <p className="text-3xl font-black" style={{ color: 'var(--red-light)' }}>
              {formatCurrency(yearlyLoss)}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              このお金を投資・学習・旅行に回せる
            </p>
          </div>
        )}

        {/* Knowledge points */}
        <div
          className="rounded-2xl p-4 flex items-center gap-4 animate-in-delay-2"
          style={{ background: 'var(--bg-card)' }}
        >
          <div className="text-3xl">🎓</div>
          <div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>知識ポイント</p>
            <p className="text-2xl font-black" style={{ color: '#eab308' }}>{knowledgePoints}pt</p>
          </div>
          <button
            onClick={() => router.push('/quiz')}
            className="ml-auto py-2 px-4 rounded-xl text-sm font-bold transition-colors active:opacity-70"
            style={{ background: 'var(--bg-card2)', color: 'var(--text)' }}
          >
            クイズへ →
          </button>
        </div>

        {/* Top actions */}
        {topActions.length > 0 && (
          <div className="rounded-2xl p-4 animate-in-delay-3" style={{ background: 'var(--bg-card)' }}>
            <p className="text-xs font-bold mb-3 tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>
              よく選ぶ勝ち行動
            </p>
            <div className="flex flex-col gap-2">
              {topActions.map(([action, count]) => (
                <div key={action} className="flex items-center justify-between">
                  <p className="text-sm" style={{ color: 'var(--text)' }}>{action}</p>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(22,163,74,0.2)', color: 'var(--green-light)' }}
                  >
                    {count}回
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent 7 days */}
        {recentRecords.length > 0 && (
          <div className="rounded-2xl p-4 animate-in-delay-3" style={{ background: 'var(--bg-card)' }}>
            <p className="text-xs font-bold mb-3 tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>
              最近の記録
            </p>
            <div className="flex flex-col gap-2">
              {recentRecords.map((record) => (
                <div key={record.date} className="flex items-center gap-3">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: record.drank ? 'var(--red)' : 'var(--green-light)' }}
                  />
                  <p className="text-sm flex-1" style={{ color: 'var(--text-muted)' }}>
                    {record.date}
                  </p>
                  <p
                    className="text-xs font-bold"
                    style={{ color: record.drank ? 'var(--red-light)' : 'var(--green-light)' }}
                  >
                    {record.drank ? '飲んだ' : '禁酒 ✓'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {soberDays === 0 && totalCravings === 0 && (
          <div className="text-center py-8 animate-in">
            <p className="text-4xl mb-3">🌱</p>
            <p className="font-bold mb-1">まだ記録がありません</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              「飲みたい衝動が来た」ボタンから始めよう。
            </p>
            <button
              onClick={() => router.push('/')}
              className="mt-4 py-3 px-6 rounded-xl text-sm font-bold"
              style={{ background: 'var(--red)', color: 'white' }}
            >
              ホームに戻る
            </button>
          </div>
        )}

        <p className="text-center text-xs pb-4" style={{ color: 'var(--text-muted)' }}>
          健康不安がある場合は医師にご相談ください。
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
