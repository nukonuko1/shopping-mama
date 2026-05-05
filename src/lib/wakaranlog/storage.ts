import { WakaranMemo, UnresolvedItem, ItemStatus } from './types';

const KEYS = {
  MEMOS: 'wakaranlog_memos',
  UNRESOLVED: 'wakaranlog_unresolved',
  CURRENT_MEMO_ID: 'wakaranlog_current_memo_id',
} as const;

function safeGet<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// ── Memos ──────────────────────────────────────────────
export function getMemos(): WakaranMemo[] {
  return safeGet<WakaranMemo>(KEYS.MEMOS);
}

export function saveMemo(memo: WakaranMemo): void {
  const memos = getMemos();
  const idx = memos.findIndex((m) => m.id === memo.id);
  if (idx >= 0) {
    memos[idx] = memo;
  } else {
    memos.unshift(memo);
  }
  localStorage.setItem(KEYS.MEMOS, JSON.stringify(memos));
}

export function getMemoById(id: string): WakaranMemo | null {
  return getMemos().find((m) => m.id === id) ?? null;
}

export function deleteMemo(id: string): void {
  const memos = getMemos().filter((m) => m.id !== id);
  localStorage.setItem(KEYS.MEMOS, JSON.stringify(memos));
}

// ── Current memo session ───────────────────────────────
export function getCurrentMemoId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(KEYS.CURRENT_MEMO_ID);
}

export function setCurrentMemoId(id: string): void {
  localStorage.setItem(KEYS.CURRENT_MEMO_ID, id);
}

// ── Unresolved items ───────────────────────────────────
export function getUnresolvedItems(): UnresolvedItem[] {
  return safeGet<UnresolvedItem>(KEYS.UNRESOLVED);
}

export function saveUnresolvedItem(item: UnresolvedItem): void {
  const items = getUnresolvedItems();
  const idx = items.findIndex((i) => i.id === item.id);
  if (idx >= 0) {
    items[idx] = item;
  } else {
    items.unshift(item);
  }
  localStorage.setItem(KEYS.UNRESOLVED, JSON.stringify(items));
}

export function updateUnresolvedStatus(id: string, status: ItemStatus): void {
  const items = getUnresolvedItems().map((item) =>
    item.id === id ? { ...item, status } : item
  );
  localStorage.setItem(KEYS.UNRESOLVED, JSON.stringify(items));
}

export function deleteUnresolvedItem(id: string): void {
  const items = getUnresolvedItems().filter((i) => i.id !== id);
  localStorage.setItem(KEYS.UNRESOLVED, JSON.stringify(items));
}

export function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
