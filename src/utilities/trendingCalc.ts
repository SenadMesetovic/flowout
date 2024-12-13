import { DataPoint } from './types';

export function calculateTrend(data: DataPoint[]): number | null {
  if (!data || data.length < 7) {
    console.error(
      'At least 7 data points are required to calculate the trend.',
    );
    return null;
  }

  const startAverage =
    data.slice(0, 3).reduce((sum, point) => sum + point.value, 0) / 3;

  const endAverage =
    data.slice(-3).reduce((sum, point) => sum + point.value, 0) / 3;

  if (startAverage === 0) {
    console.error('Start average is zero, trend cannot be calculated.');
    return null;
  }

  const trend = ((endAverage - startAverage) / startAverage) * 100;
  return parseFloat(trend.toFixed(2));
}
