import {
  BarChart,
  Bar,
  Tooltip,
  Rectangle,
  ResponsiveContainer,
} from 'recharts';
import { ApiResponse } from '@/utilities/types';

const BORDER = '#66C56B';
const BACKGROUND = '#C1F4C5';
const GRADIENT_DARK = '#4BDC55';
const GRADIENT_LIGHT = '#BEF5C2';

const calculateOpacity = (height: number, maxHeight: number) => {
  const minOpacity = 0.3;
  const maxOpacity = 1;
  return minOpacity + (height / maxHeight) * (maxOpacity - minOpacity);
};

const CustomTooltip = ({ payload }: { payload: any }) => {
  if (payload && payload.length) {
    const data = payload[0].payload;
    const timestamp = data.timestamp;

    return (
      <div
        className="custom-tooltip"
        style={{
          borderRadius: '8px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          padding: '10px',
        }}
      >
        <p>
          Date:{' '}
          {new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
        <p>{`Customers: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const Graph = ({ data }: { data: ApiResponse }) => {
  const maxValue = data ? Math.max(...data.map((itm) => itm.value)) : 0;
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
          {data.map((entry, index) => {
            // Dynamically calculate opacity
            const height = entry.value;
            const opacity = calculateOpacity(height, maxValue);

            return (
              <linearGradient
                key={`gradient-${index}`}
                id={`gradient-${index}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={GRADIENT_DARK}
                  stopOpacity={opacity}
                />
                <stop
                  offset="100%"
                  stopColor={GRADIENT_LIGHT}
                  stopOpacity={1}
                />
              </linearGradient>
            );
          })}
        </defs>

        <Tooltip
          content={<CustomTooltip payload={data} />}
          cursor={{ fill: 'transparent' }}
        />

        <Bar
          dataKey="value"
          fill="url(#gradient)"
          stroke={BORDER}
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
