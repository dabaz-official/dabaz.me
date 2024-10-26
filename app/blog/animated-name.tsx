import { Link } from 'next-view-transitions';

export function AnimatedName() {
  return (
    <div className='font-medium transition-element'>
      <Link href="/" className="flex mb-8 font-medium text-gray-400 fade-in">
        DabAZ
      </Link>
    </div>
  );
}