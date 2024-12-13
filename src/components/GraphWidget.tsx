import { ApiResponse } from '@/utilities/types';
import Graph from './Graph';
import { formatDateRange } from '@/utilities/timeDate';
import Reload from './../../public/reload.svg';
import Trending from './../../public/trending.svg';
import Decrease from './../../public/decrease.svg';
import Info from './../../public/info.svg';
import loading from './../../public/loading.gif';
import Image from 'next/image';
import { calculateTrend } from '@/utilities/trendingCalc';

const GraphWidget = ({
  data = undefined,
  onRefresh,
  isFetching,
  isLoading,
}: {
  data?: ApiResponse;
  onRefresh: () => void;
  isFetching: boolean;
  isLoading: boolean;
}) => {
  const sumValue = data ? data.reduce((sum, itm) => sum + itm.value, 0) : 0;
  const { formattedStartDate, formattedEndDate } = data
    ? formatDateRange(data)
    : { formattedStartDate: '', formattedEndDate: '' };

  const trend = data ? (calculateTrend(data) ?? 0) : 0;

  const trendColor =
    trend > 0
      ? 'bg-green-100 text-[#319E3B]'
      : trend < 0
        ? 'bg-red-100 text-[#D32F2F]'
        : 'bg-gray-100 text-gray-500';

  return (
    <div className="flex flex-col bg-white h-[350px] w-[440px] min-w-[400px] rounded-2xl px-5 py-7 gap-4">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Image src={loading} alt="my gif" height={30} width={30} />
        </div>
      ) : (
        <>
          <div className="px-2.5">
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <div className="text-xl font-regular">Total Customers</div>
                <div className="w-8 rounded-lg bg-gray-100  aspect-square flex items-center justify-center">
                  <Info />
                </div>
              </div>

              <button
                onClick={!isFetching ? onRefresh : () => {}}
                className="text-gray-400 w-8 rounded-lg hover:bg-gray-100 border border-2  aspect-square flex items-center justify-center"
              >
                {isFetching ? (
                  <Image src={loading} alt="my gif" height={18} width={18} />
                ) : (
                  <Reload
                    style={{
                      height: '18px',
                      width: '18px',
                    }}
                  />
                )}
              </button>
            </div>
            <div className="text-5xl font-regular">{sumValue}</div>
          </div>
          {!!data && <Graph data={data} />}
          <div className="px-2.5 flex flex-col gap-4">
            <div className="border"></div>
            <div className="flex justify-between items-center">
              <div className="text-gray-400">
                {formattedStartDate} - {formattedEndDate}
              </div>

              <div
                className={`flex items-center gap-2 py-1 px-2 rounded ${trendColor}`}
              >
                <span>{`${trend > 0 ? '+' : trend < 0 ? '-' : ''} ${Math.abs(trend)}%`}</span>
                {trend > 0 ? <Trending /> : <Decrease />}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GraphWidget;
