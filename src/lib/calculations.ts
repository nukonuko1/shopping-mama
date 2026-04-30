import { DrinkSettings } from './types';

/** 純アルコール量(g) per session = 容量ml × 度数/100 × 0.8 × 本数 */
export function calcPureAlcohol(settings: DrinkSettings): number {
  return settings.volumeML * (settings.alcoholPercent / 100) * 0.8 * settings.unitsPerDay;
}

export function calcDailyCost(settings: DrinkSettings): number {
  return settings.pricePerUnit * settings.unitsPerDay;
}

export function calcWeeklyCost(settings: DrinkSettings): number {
  return calcDailyCost(settings) * settings.daysPerWeek;
}

export function calcMonthlyCost(settings: DrinkSettings): number {
  return Math.round(calcWeeklyCost(settings) * 4.33);
}

export function calcYearlyCost(settings: DrinkSettings): number {
  return Math.round(calcWeeklyCost(settings) * 52);
}

export function formatCurrency(amount: number): string {
  return `¥${Math.round(amount).toLocaleString()}`;
}

export function formatAlcohol(g: number): string {
  return `${Math.round(g * 10) / 10}g`;
}
