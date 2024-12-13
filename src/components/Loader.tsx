import Image from 'next/image';
import loading from './../../public/loading.gif';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Image src={loading} alt="my gif" height={30} width={30} />
    </div>
  );
};

export default Loader;
