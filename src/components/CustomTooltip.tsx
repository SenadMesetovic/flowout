import { TooltipProps } from 'recharts';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

const CustomTooltip = ({ payload }: TooltipProps<ValueType, NameType>) => {
  if (payload && payload.length) {
    console.log(payload);
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

export default CustomTooltip;
