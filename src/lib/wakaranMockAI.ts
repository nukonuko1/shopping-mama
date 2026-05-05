import type { Memo, OrganizedResult, ReviewCard, CurrentSession, QuestionTone, Category } from './wakaranTypes';

interface CategoryTemplate {
  themeBase: string;
  tasks: string[];
  whyTasks: string;
  unknowns: string[];
  nextSteps: string[];
}

const templates: Record<Category, CategoryTemplate> = {
  '現場作業': {
    themeBase: '現場作業の手順と安全確認',
    tasks: [
      '作業の全体的な流れと各ステップを把握する',
      '必要な安全確認ポイントを整理する',
      '担当者・役割分担を確認する',
    ],
    whyTasks:
      '現場作業は手順を間違えると安全リスクや品質問題につながります。正しい手順を把握することで、安全かつ効率よく作業を進めることができます。',
    unknowns: [
      '各ステップの正確な順序・タイミングが不明確',
      'ミスが起きやすい箇所やリスクが把握できていない',
      '自分がどこまで判断してよいかの基準がわからない',
    ],
    nextSteps: [
      '先輩に作業手順を口頭で確認してもらう',
      '手順書やマニュアルがあれば再確認する',
      '次回の作業時に各ステップで確認しながら進める',
    ],
  },
  '器材準備': {
    themeBase: '器材・道具の準備と管理方法',
    tasks: [
      '必要な器材の一覧を把握する',
      '各器材の用途・使い方を確認する',
      '保管場所・管理方法を把握する',
    ],
    whyTasks:
      '適切な器材を正しく準備することで作業をスムーズに進められます。管理方法を知ることで破損や紛失を防ぎ、チーム全体の効率が上がります。',
    unknowns: [
      '器材の正式名称と用途の対応が不明',
      '使用前・使用後の確認事項がわからない',
      'どの器材をどの作業で使うかの判断基準が不明確',
    ],
    nextSteps: [
      '器材リストを作成して一覧化する',
      '使い方が不明な器材を実際に見せてもらう',
      '保管場所を写真に撮っておく',
    ],
  },
  '分析': {
    themeBase: 'データ分析の目的と手順',
    tasks: [
      '分析の目的とゴールを整理する',
      '使用するデータの種類・取得方法を確認する',
      '分析結果をどう活用するか把握する',
    ],
    whyTasks:
      '分析の目的を理解することで、何のためにどのデータを見ているかが明確になります。目的が明確だと、適切な解釈と次のアクションが取れます。',
    unknowns: [
      '分析手法の選択理由・根拠が不明',
      '結果の解釈方法と活用先がわからない',
      '数値の異常値・外れ値への対応方法がわからない',
    ],
    nextSteps: [
      '分析の目的を自分の言葉でまとめてみる',
      '使用ツール・手法の操作方法を確認する',
      '過去の分析レポートを参考として見せてもらう',
    ],
  },
  '報告書': {
    themeBase: '報告書の構成と作成手順',
    tasks: [
      '報告書に必要な項目・構成を把握する',
      '読み手を意識した内容の組み立てを理解する',
      '使用するフォーマット・テンプレートを確認する',
    ],
    whyTasks:
      '報告書は受け取る人が迅速に情報を把握するためのものです。構成を理解することで何を書けばよいかが明確になり、質の高い報告書が書けます。',
    unknowns: [
      '報告書に含める内容の優先順位がわからない',
      '適切な文体・表現の使い方が不明確',
      '図表・データの引用方法がわからない',
    ],
    nextSteps: [
      '過去の報告書のサンプルをもらって参考にする',
      '提出期限と提出方法・形式を確認する',
      '先輩に下書きを見てもらうタイミングを相談する',
    ],
  },
  '用語': {
    themeBase: '専門用語・業界用語の意味と使い方',
    tasks: [
      '用語の正確な定義を調べる',
      '用語が使われる具体的な場面を確認する',
      '関連する用語・概念とのつながりを整理する',
    ],
    whyTasks:
      '用語を正確に理解することで、会議や作業で適切なコミュニケーションが取れます。業務全体の理解が深まり、応用力も身につきます。',
    unknowns: [
      '用語の正確な意味・定義が不明確',
      '似たような用語との違いがわからない',
      '文脈によって意味が変わるのかどうかがわからない',
    ],
    nextSteps: [
      '用語の意味を自分の言葉で説明できるか試す',
      '社内ドキュメント・マニュアルでの使用例を確認する',
      '先輩に「この解釈で合っていますか？」と確認してもらう',
    ],
  },
  'その他': {
    themeBase: '業務内容の整理と理解',
    tasks: [
      '状況・背景を整理して把握する',
      '自分が理解できていない部分を明確にする',
      '解決のための次のアクションを決める',
    ],
    whyTasks:
      '漠然とした疑問を「何がわからないか」に変換することで、先輩への質問がしやすくなり、短時間で問題を解決できます。',
    unknowns: [
      '全体の文脈の中での今回の位置づけが不明',
      '適切な対応方法・判断基準がわからない',
      '誰に確認すればよいかがわからない',
    ],
    nextSteps: [
      'わからない点を箇条書きにして先輩に見せる',
      '関連するドキュメントや資料を探す',
      '類似した経験をした先輩に相談する',
    ],
  },
};

function buildOrganized(memo: Memo, tmpl: CategoryTemplate): OrganizedResult {
  const snippet = memo.content.slice(0, 25);
  return {
    memoId: memo.id,
    theme: `${tmpl.themeBase}（${memo.category}）`,
    tasks: tmpl.tasks,
    whyTasks: tmpl.whyTasks,
    unknowns: [
      `「${snippet}${memo.content.length > 25 ? '…' : ''}」の意味・背景が不明確`,
      ...tmpl.unknowns,
    ],
    nextSteps: tmpl.nextSteps,
    createdAt: new Date().toISOString(),
  };
}

function buildReviewCards(organized: OrganizedResult): ReviewCard[] {
  return [
    {
      question: '今回のテーマは何でしたか？',
      answer: organized.theme,
    },
    {
      question: 'このテーマでやるべき作業を3つ挙げてください。',
      answer: organized.tasks.join('\n'),
    },
    {
      question: 'この作業を行う理由・目的は何ですか？',
      answer: organized.whyTasks,
    },
    {
      question: '今回わからなかった点を1つ挙げてください。',
      answer: organized.unknowns[0] ?? '（未記録）',
    },
    {
      question: '次に確認すべきことは何ですか？',
      answer: organized.nextSteps[0] ?? '先輩に質問する',
    },
    {
      question: '似たような場面で同じ疑問が出たとき、まず何をしますか？',
      answer: 'このメモを開いて整理内容を確認し、解決していなければ未解決リストに追加して先輩に質問する。',
    },
  ];
}

function buildQuestions(
  organized: OrganizedResult,
  memo: Memo
): Record<QuestionTone, string> {
  const theme = organized.theme;
  const unknown = organized.unknowns[0] ?? 'この点';
  const snippet = memo.content.slice(0, 40);

  return {
    丁寧: `お時間をいただけますでしょうか。\n\n「${theme}」について確認させてください。\n\n${unknown}の部分が理解しきれておりまして、もう少し詳しくご説明いただけますでしょうか。\n\n特に「${snippet}」という点がよくわかっていないのですが、ご教示いただけると大変助かります。\n\nよろしくお願いいたします。`,

    短め: `「${theme}」について確認させてください。\n${unknown}を教えてもらえますか？\n特に「${snippet}」の部分です。`,

    'LINE風': `ちょっと聞いていいですか？🙏\n「${snippet}」のことなんですけど、\n${unknown}ってどういうことですか？\nいつでもいいので教えてください！`,

    'メール風': `件名：【ご確認】${theme}について\n\nお世話になっております。\n\n標記の件について確認事項がございましてご連絡しました。\n\n${unknown}につきまして、理解が不十分なためご教示いただけますでしょうか。\n\n具体的には「${snippet}」の点が不明確です。\n\nお忙しいところ大変恐れ入りますが、よろしくお願いいたします。`,
  };
}

export function processMockAI(memo: Memo): CurrentSession {
  const tmpl = templates[memo.category] ?? templates['その他'];
  const organized = buildOrganized(memo, tmpl);
  const reviewCards = buildReviewCards(organized);
  const questions = buildQuestions(organized, memo);
  return { memo, organized, reviewCards, questions };
}
