import { Link } from 'next-view-transitions';

export function Back() {
  return (
    <div className='font-medium transition-element'>
      <Link href="/" className="flex mb-2 font-medium text-neutral-500 fade-in">
        {`返回首页`}
      </Link>
    </div>
  );
}