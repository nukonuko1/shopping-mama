import { Category, OrganizeResult, ReviewCard, QuestionTone, WakaranMemo } from './types';

const categoryContext: Record<Category, { themeSuffix: string; taskVerb: string; reason: string }> = {
  field: {
    themeSuffix: '（現場作業）',
    taskVerb: '現場での手順を',
    reason: '安全かつ正確に現場作業を進めるため',
  },
  equipment: {
    themeSuffix: '（器材準備）',
    taskVerb: '使用する器材の取り扱いを',
    reason: '適切な器材を準備・使用して作業を行うため',
  },
  analysis: {
    themeSuffix: '（分析）',
    taskVerb: 'データの分析方法を',
    reason: '正確な分析結果を出すため',
  },
  report: {
    themeSuffix: '（報告書）',
    taskVerb: '報告書の作成方法を',
    reason: '正確で読みやすい報告書を作成するため',
  },
  terms: {
    themeSuffix: '（用語）',
    taskVerb: '用語の意味・使い方を',
    reason: '正しい知識で業務に取り組むため',
  },
  other: {
    themeSuffix: '',
    taskVerb: '業務の手順・内容を',
    reason: '業務をスムーズに正確に進めるため',
  },
};

export function mockOrganize(memo: WakaranMemo): OrganizeResult {
  const { content, category } = memo;
  const ctx = categoryContext[category];
  const shortContent = content.length > 40 ? content.substring(0, 40) + '…' : content;

  return {
    theme: `${shortContent}${ctx.themeSuffix}`,
    tasks: `${ctx.taskVerb}確認・理解する`,
    reason: ctx.reason,
    unclear: content,
    nextSteps: `先輩や担当者に「${shortContent}」について質問する\n関連するマニュアル・資料を確認する`,
  };
}

export function generateReviewCards(result: OrganizeResult): ReviewCard[] {
  return [
    {
      question: 'このメモのテーマは何ですか？',
      answer: result.theme,
    },
    {
      question: '確認・理解すべき作業は何ですか？',
      answer: result.tasks,
    },
    {
      question: 'なぜこの作業が必要ですか？',
      answer: result.reason,
    },
    {
      question: 'わからなかった内容は何ですか？',
      answer: result.unclear,
    },
    {
      question: '次に確認すべきことは何ですか？',
      answer: result.nextSteps,
    },
  ];
}

export function generateQuestion(result: OrganizeResult, tone: QuestionTone): string {
  const shortUnclear =
    result.unclear.length > 60 ? result.unclear.substring(0, 60) + '…' : result.unclear;

  switch (tone) {
    case 'polite':
      return `お忙しいところ失礼いたします。

先ほどの業務（${result.theme}）の中で、理解できていない点がありましたので、確認させていただけますでしょうか。

具体的には、以下の点が不明でした：
「${result.unclear}」

${result.nextSteps}について、お時間のあるときに教えていただけますと大変助かります。

よろしくお願いいたします。`;

    case 'short':
      return `「${shortUnclear}」についてわからないことがあります。少し教えてもらえますか？`;

    case 'line':
      return `ちょっといい？🙏
${result.theme}のことなんだけど

「${shortUnclear}」

っていう部分がよくわからなくて😅
いつか教えてほしいな〜！`;

    case 'email':
      return `件名：${result.theme}に関するご確認のお願い

お世話になっております。

${result.theme}の業務を進める中で、理解が不十分な点がありましたため、ご確認をお願いしたくご連絡いたしました。

■確認したい内容
${result.unclear}

■背景・目的
${result.tasks}ために、上記の点を正確に把握したいと考えております。

ご多忙のところ恐れ入りますが、お時間のあるときにご教示いただけますと幸いです。

よろしくお願いいたします。`;
  }
}
