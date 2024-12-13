'use client';
import GraphWidget from '@/components/GraphWidget';
import { ApiResponse } from '@/utilities/types';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const fetchGraphData = async (): Promise<ApiResponse> => {
    const response = await fetch('/api/graph-data');
    if (!response.ok) {
      throw new Error('Failed to fetch graph data');
    }
    return response.json();
  };

  const { data, isLoading, error, refetch, isFetching } = useQuery<ApiResponse>(
    {
      queryKey: ['graphData'],
      queryFn: fetchGraphData,
    },
  );

  return (
    <div className="p-6">
      <div className="mt-4" style={{ height: '300px' }}>
        {error && (
          <p className="text-red-500">Error: {(error as Error).message}</p>
        )}
        <div className="flex w-full items-center justify-center">
          {
            <GraphWidget
              data={data}
              onRefresh={() => {
                refetch();
              }}
              isFetching={isFetching}
              isLoading={isLoading}
            />
          }
        </div>
      </div>
    </div>
  );
}
