import Link from 'next/link';
import NexaLogo from './NexaLogo';

const AuthTopBar = () => {
  return (
    <header
      className="animate-in fade-in slide-in-from-top-2 sticky top-0 z-50 border-b border-[#E2E8F0]/80 bg-white/60 backdrop-blur-lg duration-300 ease-out"
      style={{ boxShadow: '0 1px 12px rgba(15, 23, 42, 0.04)' }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-5">
        <Link
          href="/"
          className="rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4338CA]"
        >
          <NexaLogo className="text-xl sm:text-2xl" />
        </Link>
      </div>
    </header>
  );
};

export default AuthTopBar;
