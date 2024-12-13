import { DataPoint } from './types';

export function calculateTrend(data: DataPoint[]): number | null {
  if (!data || data.length < 2) {
    console.error('Insufficient data to calculate the trend.');
    return null;
  }

  const startValue = data[0].value;
  const endValue = data[data.length - 1].value;

  if (startValue === 0) {
    console.error('Start value is zero, trend cannot be calculated.');
    return null;
  }

  const trend = ((endValue - startValue) / startValue) * 100;
  return parseFloat(trend.toFixed(2));
}
