import { DataPoint } from './types';

export const formatDateRange = (
  data: DataPoint[],
): { formattedStartDate: string; formattedEndDate: string } => {
  const startDate = new Date(data[0].timestamp);
  const endDate = new Date(data[data.length - 1].timestamp);

  const formatDate = (date: Date, showYear: boolean = true): string =>
    date.toLocaleDateString('en-US', {
      year: showYear ? 'numeric' : undefined,
      month: 'short',
      day: 'numeric',
    });

  // Format the start date: omit year if it's the same as the end date
  const formattedStartDate =
    startDate.getFullYear() === endDate.getFullYear()
      ? formatDate(startDate, false)
      : formatDate(startDate);

  // Always show the year for the end date
  const formattedEndDate = formatDate(endDate);

  return { formattedStartDate, formattedEndDate };
};
