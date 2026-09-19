import type { ReactNode } from 'react';
import AuthWatermark from './AuthWatermark';

const AuthLayout = ({
  children,
  brandPanel,
}: {
  children: ReactNode;
  brandPanel: ReactNode;
}) => {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-white px-4 py-8 sm:min-h-[calc(100vh-4rem)] sm:px-6 sm:py-12">
      <div className="animate-in fade-in slide-in-from-bottom-4 relative flex w-full max-w-5xl overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-[0_20px_60px_-15px_rgba(67,56,202,0.12)] duration-500 ease-out">
        <div className="relative flex w-full flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:w-1/2 lg:px-14">
          <AuthWatermark />
          <div className="relative z-10">{children}</div>
        </div>

        <div
          className="relative hidden flex-1 items-center justify-center bg-gradient-to-br from-[#4338CA] to-[#6366F1] p-10 lg:flex"
          aria-hidden="true"
        >
          {brandPanel}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
