import { TooltipProps } from 'recharts';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

const CustomTooltip = ({ payload }: TooltipProps<ValueType, NameType>) => {
  if (payload && payload.length) {
    const data = payload[0].payload;
    const timestamp = data.timestamp;

    return (
      <div className="custom-tooltip bg-white border border-gray-300 shadow-lg p-4 rounded-lg">
        <p className="text-sm">
          Date:{' '}
          {new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
        <p className="text-sm">{`Customers: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
