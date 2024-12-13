export interface DataPoint {
  timestamp: string;

  value: number;
}

export type ApiResponse = DataPoint[];
