export interface DrinkSettings {
  drinkName: string;
  pricePerUnit: number;
  volumeML: number;
  alcoholPercent: number;
  unitsPerDay: number;
  daysPerWeek: number;
}

export interface DailyRecord {
  date: string; // YYYY-MM-DD
  drank: boolean;
  alternativeActions: string[];
  cravingCount: number;
}

export interface AppData {
  settings: DrinkSettings | null;
  records: DailyRecord[];
  knowledgePoints: number;
  totalCravingsStopped: number;
  setupDone: boolean;
}
