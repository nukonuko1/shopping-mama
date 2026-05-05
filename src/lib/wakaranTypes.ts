export type Category = '現場作業' | '器材準備' | '分析' | '報告書' | '用語' | 'その他';
export type QuestionTone = '丁寧' | '短め' | 'LINE風' | 'メール風';

export const CATEGORIES: Category[] = ['現場作業', '器材準備', '分析', '報告書', '用語', 'その他'];
export const QUESTION_TONES: QuestionTone[] = ['丁寧', '短め', 'LINE風', 'メール風'];

export const CATEGORY_COLORS: Record<Category, { bg: string; text: string; badge: string }> = {
  '現場作業': { bg: 'bg-orange-50', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' },
  '器材準備': { bg: 'bg-teal-50', text: 'text-teal-700', badge: 'bg-teal-100 text-teal-700' },
  '分析': { bg: 'bg-purple-50', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-700' },
  '報告書': { bg: 'bg-indigo-50', text: 'text-indigo-700', badge: 'bg-indigo-100 text-indigo-700' },
  '用語': { bg: 'bg-pink-50', text: 'text-pink-700', badge: 'bg-pink-100 text-pink-700' },
  'その他': { bg: 'bg-slate-50', text: 'text-slate-700', badge: 'bg-slate-100 text-slate-700' },
};

export interface Memo {
  id: string;
  content: string;
  category: Category;
  createdAt: string;
}

export interface OrganizedResult {
  memoId: string;
  theme: string;
  tasks: string[];
  whyTasks: string;
  unknowns: string[];
  nextSteps: string[];
  createdAt: string;
}

export interface ReviewCard {
  question: string;
  answer: string;
}

export interface CurrentSession {
  memo: Memo;
  organized: OrganizedResult;
  reviewCards: ReviewCard[];
  questions: Record<QuestionTone, string>;
}

export interface UnresolvedItem {
  id: string;
  content: string;
  category: Category;
  theme: string;
  resolved: boolean;
  createdAt: string;
  resolvedAt?: string;
}
