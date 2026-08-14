'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Logo from '../Logo/Logo';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const NavBar = () => {
  const tokenRef = useRef<string | null>(null)
  const router = useRouter();

  useEffect(() => {
    tokenRef.current = localStorage.getItem('token')
  })

  return (
    <div className="grid grid-cols-9 items-center gap-6 border-b border-gray-500 bg-transparent p-4 text-white">
      <div className="col-span-2">
        <Logo color='#213E69' />
      </div>
      <div className="col-span-5 flex items-center justify-center gap-12 text-[GrayText]">
        <Link href='/student_dashboard'>
          <span className="hover:text-[#FCC128]">Home</span>
        </Link>
        <Link href='/'>
          <span className="hover:text-[#FCC128]">About</span>
        </Link>
        <Link href='/student_dashboard'>
          <span className="hover:text-[#FCC128]">Courses</span>
        </Link>
        <Link href='/contact'>
          <span className="hover:text-[#FCC128]">Contact</span>
        </Link>
      </div>
      <div className="col-span-2 grid justify-items-center">
        {tokenRef.current ? (
          <Button
            className="border border-transparent bg-[#234C51] text-white transition-colors duration-500 hover:border-[#234C51] hover:bg-transparent hover:text-[#234C51]"
            onClick={() => {
              router.push('/login');
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            className="border border-transparent bg-[#234C51] text-white transition-colors duration-500 hover:border-[#234C51] hover:bg-transparent hover:text-[#234C51]"
            onClick={() => {
              localStorage.removeItem('token');
              router.push('/login');
            }}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
