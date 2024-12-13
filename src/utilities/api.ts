import { ApiResponse } from './types';

export const fetchGraphData = async (): Promise<ApiResponse> => {
  const response = await fetch('/api/graph-data');
  if (!response.ok) {
    throw new Error('Failed to fetch graph data');
  }
  return response.json();
};
