'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import { getSettings, saveSettings } from '@/lib/storage';
import {
  calcDailyCost,
  calcWeeklyCost,
  calcMonthlyCost,
  calcYearlyCost,
  calcPureAlcohol,
  formatCurrency,
} from '@/lib/calculations';
import { DrinkSettings } from '@/lib/types';

const defaultSettings: DrinkSettings = {
  drinkName: 'ビール',
  pricePerUnit: 250,
  volumeML: 500,
  alcoholPercent: 5,
  unitsPerDay: 2,
  daysPerWeek: 5,
};

export default function SettingsPage() {
  const router = useRouter();
  const [form, setForm] = useState<DrinkSettings>(defaultSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = getSettings();
    if (existing) setForm(existing);
  }, []);

  const update = (key: keyof DrinkSettings, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: typeof value === 'string' ? value : Number(value) }));
  };

  const handleSave = () => {
    saveSettings(form);
    setSaved(true);
    setTimeout(() => {
      router.push('/');
    }, 800);
  };

  const daily = calcDailyCost(form);
  const weekly = calcWeeklyCost(form);
  const monthly = calcMonthlyCost(form);
  const yearly = calcYearlyCost(form);
  const alcohol = calcPureAlcohol(form);

  const fields: {
    key: keyof DrinkSettings;
    label: string;
    type: 'text' | 'number';
    suffix?: string;
    min?: number;
    max?: number;
    step?: number;
  }[] = [
    { key: 'drinkName', label: 'よく飲むお酒の名前', type: 'text' },
    { key: 'pricePerUnit', label: '1本あたりの価格', type: 'number', suffix: '円', min: 1, max: 10000 },
    { key: 'volumeML', label: '1本あたりの容量', type: 'number', suffix: 'ml', min: 50, max: 3000 },
    { key: 'alcoholPercent', label: 'アルコール度数', type: 'number', suffix: '%', min: 0.1, max: 70, step: 0.1 },
    { key: 'unitsPerDay', label: '1日に飲む本数', type: 'number', suffix: '本', min: 1, max: 20 },
    { key: 'daysPerWeek', label: '週に飲む日数', type: 'number', suffix: '日', min: 1, max: 7 },
  ];

  return (
    <div className="flex flex-col min-h-dvh pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-6 animate-in">
        <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'var(--red-light)' }}>
          SETTINGS
        </p>
        <h1 className="text-2xl font-black">初期設定</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
          あなたの飲酒習慣を入力してください。
        </p>
      </div>

      {/* Form */}
      <div className="px-5 flex flex-col gap-4 animate-in-delay-1">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>
              {f.label}
            </label>
            <div className="flex items-center gap-2">
              <input
                type={f.type}
                value={form[f.key]}
                min={f.min}
                max={f.max}
                step={f.step ?? 1}
                onChange={(e) => update(f.key, f.type === 'text' ? e.target.value : e.target.value)}
                className="flex-1 rounded-xl px-4 py-3 text-base font-semibold outline-none transition-all"
                style={{
                  background: 'var(--bg-card)',
                  color: 'var(--text)',
                  border: '1.5px solid var(--border)',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--red)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
              {f.suffix && (
                <span className="text-sm font-semibold w-8" style={{ color: 'var(--text-muted)' }}>
                  {f.suffix}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Preview */}
      <div className="mx-5 mt-6 rounded-2xl p-4 animate-in-delay-2" style={{ background: 'var(--bg-card)' }}>
        <p className="text-xs font-bold mb-3 tracking-wider uppercase" style={{ color: 'var(--red-light)' }}>
          あなたの飲酒コスト
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '1日', value: formatCurrency(daily) },
            { label: '1週間', value: formatCurrency(weekly) },
            { label: '1か月', value: formatCurrency(monthly) },
            { label: '1年間', value: formatCurrency(yearly) },
          ].map((item) => (
            <div key={item.label} className="rounded-xl p-3 text-center" style={{ background: 'var(--bg-card2)' }}>
              <p className="text-lg font-black" style={{ color: 'var(--text)' }}>{item.value}</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>1日の純アルコール量</span>
            <span className="text-base font-black" style={{ color: 'var(--red-light)' }}>
              {Math.round(alcohol * 10) / 10}g
            </span>
          </div>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            ※ 厚労省の適正量は1日20gまで
          </p>
        </div>
      </div>

      {/* Save button */}
      <div className="px-5 mt-6 animate-in-delay-3">
        <button
          onClick={handleSave}
          className="w-full py-5 rounded-2xl text-white text-lg font-black transition-all active:scale-95"
          style={{
            background: saved
              ? 'var(--green)'
              : 'linear-gradient(135deg, var(--red-dark) 0%, var(--red) 100%)',
          }}
        >
          {saved ? '✓ 保存しました！' : '設定を保存する'}
        </button>
        <p className="text-center text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
          データはお使いの端末にのみ保存されます。
          <br />
          健康不安がある場合は医師にご相談ください。
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
