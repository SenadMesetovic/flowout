'use client';
import GraphWidget from '@/components/GraphWidget';
import { fetchGraphData } from '@/utilities/api';
import { ApiResponse } from '@/utilities/types';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const { data, isLoading, error, refetch, isFetching } = useQuery<ApiResponse>(
    {
      queryKey: ['graphData'],
      queryFn: fetchGraphData,
    },
  );

  return (
    <div className="p-6">
      <div className="flex w-full items-center justify-center">
        {
          <GraphWidget
            data={data}
            onRefresh={() => {
              refetch();
            }}
            isFetching={isFetching}
            isLoading={isLoading}
            error={error?.message}
          />
        }
      </div>
    </div>
  );
}
