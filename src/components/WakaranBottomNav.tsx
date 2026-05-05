'use client';

import Link from 'next/link';

type NavId = 'home' | 'memo' | 'unresolved';

interface WakaranBottomNavProps {
  current: NavId;
}

const navItems: { id: NavId; href: string; label: string }[] = [
  { id: 'home', href: '/', label: 'ホーム' },
  { id: 'memo', href: '/memo', label: 'メモ入力' },
  { id: 'unresolved', href: '/unresolved', label: '未解決' },
];

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <path d="M3 12L12 3l9 9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21V12h6v9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10v11h14V10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function PencilIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <path
        d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={active ? 'currentColor' : 'none'}
        fillOpacity={active ? 0.1 : 0}
      />
      <path
        d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ListIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <rect
        x="3" y="3" width="18" height="18" rx="2"
        fill={active ? 'currentColor' : 'none'}
        fillOpacity={active ? 0.1 : 0}
      />
      <path d="M9 7h10M9 12h10M9 17h10M5 7h.01M5 12h.01M5 17h.01" strokeLinecap="round" />
    </svg>
  );
}

const icons: Record<NavId, (active: boolean) => React.ReactNode> = {
  home: (a) => <HomeIcon active={a} />,
  memo: (a) => <PencilIcon active={a} />,
  unresolved: (a) => <ListIcon active={a} />,
};

export default function WakaranBottomNav({ current }: WakaranBottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 flex" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {navItems.map(item => {
        const active = current === item.id;
        return (
          <Link
            key={item.id}
            href={item.href}
            className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${
              active ? 'text-blue-600' : 'text-slate-400'
            }`}
          >
            {icons[item.id](active)}
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
