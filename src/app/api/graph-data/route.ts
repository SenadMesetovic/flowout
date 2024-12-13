import { ApiResponse } from '@/utilities/types';
import { NextResponse } from 'next/server';

function generateRandomData(): ApiResponse {
  const data: ApiResponse = [];
  const days = 7; // Generate data for 7 days
  const startDate = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(startDate.getDate() - (days - 1 - i));
    data.push({
      timestamp: date.toISOString().split('T')[0], // Format as YYYY-MM-DD
      value: Math.floor(Math.random() * (500 - 50 + 1) + 50),
    });
  }

  return data;
}

export async function GET() {
  const data = generateRandomData();

  // Simulate latency
  await new Promise((resolve) => setTimeout(resolve, 400));

  return NextResponse.json(data);
}
