'use client';

import { useRouter } from 'next/navigation';

interface WakaranPageHeaderProps {
  title: string;
  backHref?: string;
  rightElement?: React.ReactNode;
}

export default function WakaranPageHeader({ title, backHref, rightElement }: WakaranPageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-4 py-4 flex items-center gap-3">
      <button
        onClick={handleBack}
        className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 active:bg-slate-200 transition-colors flex-shrink-0"
        aria-label="戻る"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 text-slate-600">
          <path d="M19 12H5M5 12l7-7M5 12l7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <h1 className="text-lg font-bold text-slate-800 flex-1">{title}</h1>
      {rightElement}
    </div>
  );
}
