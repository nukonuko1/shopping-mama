export type Category = 'field' | 'equipment' | 'analysis' | 'report' | 'terms' | 'other';
export type QuestionTone = 'polite' | 'short' | 'line' | 'email';
export type ItemStatus = 'unresolved' | 'resolved';

export interface WakaranMemo {
  id: string;
  content: string;
  category: Category;
  createdAt: string;
  organizeResult?: OrganizeResult;
}

export interface OrganizeResult {
  theme: string;
  tasks: string;
  reason: string;
  unclear: string;
  nextSteps: string;
}

export interface ReviewCard {
  question: string;
  answer: string;
}

export interface UnresolvedItem {
  id: string;
  content: string;
  category: Category;
  status: ItemStatus;
  createdAt: string;
  memoId?: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  field: '現場作業',
  equipment: '器材準備',
  analysis: '分析',
  report: '報告書',
  terms: '用語',
  other: 'その他',
};

export const CATEGORY_COLORS: Record<Category, string> = {
  field: 'bg-orange-100 text-orange-700 border-orange-200',
  equipment: 'bg-teal-100 text-teal-700 border-teal-200',
  analysis: 'bg-purple-100 text-purple-700 border-purple-200',
  report: 'bg-blue-100 text-blue-700 border-blue-200',
  terms: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  other: 'bg-slate-100 text-slate-600 border-slate-200',
};
