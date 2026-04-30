'use client';

import { AppData, DrinkSettings, DailyRecord } from './types';

const KEY = 'drinking-app-v1';

const defaultData: AppData = {
  settings: null,
  records: [],
  knowledgePoints: 0,
  totalCravingsStopped: 0,
  setupDone: false,
};

export function getData(): AppData {
  if (typeof window === 'undefined') return defaultData;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultData;
    return { ...defaultData, ...JSON.parse(raw) };
  } catch {
    return defaultData;
  }
}

function saveData(data: AppData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getSettings(): DrinkSettings | null {
  return getData().settings;
}

export function saveSettings(settings: DrinkSettings): void {
  const data = getData();
  saveData({ ...data, settings, setupDone: true });
}

function todayStr(): string {
  return new Date().toISOString().split('T')[0];
}

export function getTodayRecord(): DailyRecord {
  const today = todayStr();
  const data = getData();
  return data.records.find((r) => r.date === today) ?? {
    date: today,
    drank: false,
    alternativeActions: [],
    cravingCount: 0,
  };
}

export function recordCraving(): void {
  const data = getData();
  const today = getTodayRecord();
  const updated = { ...today, cravingCount: today.cravingCount + 1 };
  const records = data.records.filter((r) => r.date !== today.date);
  saveData({
    ...data,
    records: [...records, updated],
    totalCravingsStopped: data.totalCravingsStopped + 1,
  });
}

export function recordSoberDay(alternativeActions: string[]): void {
  const data = getData();
  const today = getTodayRecord();
  const updated = { ...today, drank: false, alternativeActions };
  const records = data.records.filter((r) => r.date !== today.date);
  saveData({ ...data, records: [...records, updated] });
}

export function addKnowledgePoints(points: number): void {
  const data = getData();
  saveData({ ...data, knowledgePoints: data.knowledgePoints + points });
}

export function getStreak(): number {
  const data = getData();
  let streak = 0;
  const date = new Date();
  for (let i = 0; i < 365; i++) {
    const dateStr = date.toISOString().split('T')[0];
    const record = data.records.find((r) => r.date === dateStr);
    if (!record || record.drank) break;
    streak++;
    date.setDate(date.getDate() - 1);
  }
  return streak;
}

export function getTotalSavedAmount(): number {
  const data = getData();
  if (!data.settings) return 0;
  const dailyCost = data.settings.pricePerUnit * data.settings.unitsPerDay;
  const soberDays = data.records.filter((r) => !r.drank).length;
  return dailyCost * soberDays;
}

export function getTotalAvoidedAlcohol(): number {
  const data = getData();
  if (!data.settings) return 0;
  const dailyAlcohol =
    data.settings.volumeML * (data.settings.alcoholPercent / 100) * 0.8 * data.settings.unitsPerDay;
  const soberDays = data.records.filter((r) => !r.drank).length;
  return dailyAlcohol * soberDays;
}
