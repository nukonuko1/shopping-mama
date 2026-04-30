export interface Quiz {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export const quizzes: Quiz[] = [
  {
    id: 1,
    question: "ビール500ml・5%の純アルコール量は？",
    options: ["約10g", "約20g", "約30g"],
    answerIndex: 1,
    explanation: "500ml × 5% × 0.8 = 20g。厚労省の「節度ある適度な飲酒」は1日20gまでです。",
  },
  {
    id: 2,
    question: "飲酒後に起こりやすい睡眠の変化は？",
    options: ["深い眠りが増える", "レム睡眠が減る", "夢を見なくなる"],
    answerIndex: 1,
    explanation: "アルコールはレム睡眠を妨げ、睡眠の質を著しく低下させます。",
  },
  {
    id: 3,
    question: "飲酒が食欲に与える影響は？",
    options: ["食欲が減る", "変化なし", "食欲が増える"],
    answerIndex: 2,
    explanation: "アルコールは食欲増進ホルモンを刺激し、食べ過ぎにつながりやすいです。",
  },
  {
    id: 4,
    question: "毎日ビール500ml×2本を1年続けると酒代は？（1本250円として）",
    options: ["約10万円", "約18万円", "約30万円"],
    answerIndex: 1,
    explanation: "250円×2本×365日 = 182,500円。約18万円もの出費になります。",
  },
  {
    id: 5,
    question: "飲酒翌日に下がりやすいのは？",
    options: ["体温", "集中力", "体重"],
    answerIndex: 1,
    explanation: "利尿作用・睡眠の質低下により、翌日の集中力が著しく低下します。",
  },
  {
    id: 6,
    question: "ビール500ml（純アルコール20g）の分解にかかる時間は？",
    options: ["約1時間", "約2時間", "約4〜5時間"],
    answerIndex: 2,
    explanation: "個人差がありますが、純アルコール20gの分解には約4〜5時間かかります。",
  },
  {
    id: 7,
    question: "飲酒習慣でリスクが高まるとされる疾患は？",
    options: ["近視", "脂肪肝", "骨粗しょう症"],
    answerIndex: 1,
    explanation: "継続的な飲酒は脂肪肝・肝硬変のリスクを高めることが知られています。",
  },
  {
    id: 8,
    question: "「飲みたい衝動」に炭酸水が効果的な理由は？",
    options: ["甘いから", "口の寂しさを満たすから", "カフェインが入っているから"],
    answerIndex: 1,
    explanation: "炭酸の刺激が「何か飲みたい」という感覚を代替してくれます。",
  },
  {
    id: 9,
    question: "アルコールと脂肪の関係で正しいのは？",
    options: ["脂肪を分解する", "脂肪の蓄積を促進する", "関係ない"],
    answerIndex: 1,
    explanation: "アルコールは体内で優先的に代謝され、他の栄養素が脂肪として蓄積されやすくなります。",
  },
  {
    id: 10,
    question: "飲まない夜に生まれる自由時間の目安は？",
    options: ["約15分", "1〜2時間", "変わらない"],
    answerIndex: 1,
    explanation: "飲酒時間・前後の準備・翌日の回復時間を含めると、1〜2時間の自由時間が生まれます。",
  },
];
