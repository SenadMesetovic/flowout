import {
  BarChart,
  Bar,
  Tooltip,
  Rectangle,
  ResponsiveContainer,
} from 'recharts';
import { ApiResponse } from '@/utilities/types';
import { useMemo } from 'react';
import CustomTooltip from './CustomTooltip';

const BORDER = '#66C56B';
const BACKGROUND = '#C1F4C5';
const GRADIENT_DARK = '#4BDC55';
const GRADIENT_LIGHT = '#BEF5C2';

const calculateOpacity = (height: number, maxHeight: number) => {
  const minOpacity = 0.3;
  const maxOpacity = 1;
  return minOpacity + (height / maxHeight) * (maxOpacity - minOpacity);
};

const Graph = ({ data }: { data: ApiResponse }) => {
  const maxValue = data ? Math.max(...data.map((itm) => itm.value)) : 0;

  const gradients = useMemo(() => {
    return data.map((entry, index) => {
      const opacity = calculateOpacity(entry.value, maxValue);
      return (
        <linearGradient
          key={`gradient-${index}`}
          id={`gradient-${index}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor={GRADIENT_DARK} stopOpacity={opacity} />
          <stop offset="100%" stopColor={GRADIENT_LIGHT} stopOpacity={1} />
        </linearGradient>
      );
    });
  }, [data, maxValue]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={GRADIENT_DARK} stopOpacity={1} />
            <stop offset="100%" stopColor={GRADIENT_LIGHT} stopOpacity={1} />
          </linearGradient>
          <linearGradient id="topGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={BACKGROUND} stopOpacity={1} />
            <stop offset="100%" stopColor={GRADIENT_DARK} stopOpacity={1} />
          </linearGradient>
          {gradients}
        </defs>

        <Tooltip
          content={<CustomTooltip payload={data} />}
          cursor={{ fill: 'transparent' }}
        />

        <Bar
          dataKey="value"
          fill="url(#gradient)"
          stroke={BORDER}
          //there is an issue on github related to shape props
          shape={(props: any) => {
            const { x, y, width, height, index } = props;

            return (
              <>
                <Rectangle
                  x={x}
                  y={y}
                  radius={[10, 10, 11, 11]}
                  width={width}
                  height={height}
                  fill={BACKGROUND}
                  stroke={BORDER}
                  strokeWidth={2}
                  style={{ cursor: 'pointer' }}
                />

                <Rectangle
                  x={x + 1}
                  y={y + 2}
                  radius={[10, 10, 10, 10]}
                  width={width - 2}
                  height={height - 3}
                  fill={`url(#gradient-${index})`}
                  strokeWidth={1}
                  style={{ cursor: 'pointer' }}
                />
              </>
            );
          }}
          //there is an issue on github related to shape props
          activeBar={(props: any) => {
            const { x, y, width, height } = props;
            return (
              <Rectangle
                x={x}
                y={y}
                width={width}
                height={height}
                radius={[10, 10, 10, 10]}
                fill={BACKGROUND}
                stroke={BORDER}
                strokeWidth={2}
                style={{ cursor: 'pointer' }}
              />
            );
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Graph;
