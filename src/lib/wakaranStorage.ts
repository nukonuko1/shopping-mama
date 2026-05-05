import type { Memo, CurrentSession, UnresolvedItem } from './wakaranTypes';

const KEYS = {
  MEMOS: 'wakaranlog_memos',
  UNRESOLVED: 'wakaranlog_unresolved',
  SESSION: 'wakaranlog_session',
} as const;

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const val = localStorage.getItem(key);
    return val ? (JSON.parse(val) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export const wakaranStorage = {
  getMemos: (): Memo[] => safeGet(KEYS.MEMOS, []),

  addMemo: (memo: Memo): void => {
    safeSet(KEYS.MEMOS, [memo, ...wakaranStorage.getMemos()]);
  },

  getSession: (): CurrentSession | null => safeGet(KEYS.SESSION, null),

  saveSession: (session: CurrentSession): void => safeSet(KEYS.SESSION, session),

  getUnresolved: (): UnresolvedItem[] => safeGet(KEYS.UNRESOLVED, []),

  addUnresolvedItems: (items: UnresolvedItem[]): void => {
    safeSet(KEYS.UNRESOLVED, [...items, ...wakaranStorage.getUnresolved()]);
  },

  toggleResolved: (id: string): void => {
    const items = wakaranStorage.getUnresolved();
    safeSet(
      KEYS.UNRESOLVED,
      items.map(item =>
        item.id === id
          ? {
              ...item,
              resolved: !item.resolved,
              resolvedAt: !item.resolved ? new Date().toISOString() : undefined,
            }
          : item
      )
    );
  },

  deleteUnresolved: (id: string): void => {
    safeSet(KEYS.UNRESOLVED, wakaranStorage.getUnresolved().filter(i => i.id !== id));
  },
};
