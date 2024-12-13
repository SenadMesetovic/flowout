const RegularTooltip = ({ message }: { message: string }) => {
  return (
    <div className="absolute bg-white border border-gray-300 shadow-lg p-4 rounded-lg top-10 left-0 transform -translate-x-1/2 z-10 w-48">
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default RegularTooltip;
