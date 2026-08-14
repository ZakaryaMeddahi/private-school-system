'use client';

import Logo from '@/components/Logo/Logo';
import { Input } from '@/components/ui/input';
import NavDropdown from '@/components/nav-dropdown';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { createContext, useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { LuLogOut } from 'react-icons/lu';
import { TbSmartHome } from 'react-icons/tb';
import { CgProfile } from 'react-icons/cg';
import Link from 'next/link';
import { useRouter } from "next/navigation";

export const StudentContext = createContext<{
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}>({ search: '', setSearch: () => {} });

const Layout = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [search, setSearch] = useState('');

  const router = useRouter();

    const Logout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

  useEffect(() => {
    setUserId(localStorage.getItem('userId') || '');
  }, []);

  return (
    <div className="flex h-screen w-full">
      <div className="flex h-full w-1/4 flex-col bg-[#F1F2ED]">
        <div className="w-full pr-6.25">
          <Logo fontSize='20px' fontWeight='500' />
        </div>
        <hr className="border-t border-[#898C81]" />
        <div className="flex h-full w-full flex-col">
          <Link href='/student_dashboard'>
            <div className="flex min-h-17.5 max-h-20 w-full flex-row items-center gap-1.25 pl-7.5 hover:bg-[whitesmoke]">
              <TbSmartHome color='#898C81' size='23px' />
              <span className="text-[#898C81]">Overview</span>
            </div>
          </Link>
          <Link href='/student_dashboard/course'>
            <div className="flex min-h-17.5 max-h-20 w-full flex-row items-center gap-1.25 pl-7.5 hover:bg-[whitesmoke]">
              <HiOutlineAcademicCap color='#898C81' size='23px' />
              <span className="text-[#898C81]">Courses</span>
            </div>
          </Link>
          <Link href={`/student_dashboard/enrollment_courses`}>
            <div className="flex min-h-17.5 max-h-20 w-full flex-row items-center gap-1.25 pl-7.5 hover:bg-[whitesmoke]">
              <HiOutlineAcademicCap color='#898C81' size='23px' />
              <span className="text-[#898C81]">Enrolled in courses</span>
            </div>
          </Link>
        </div>
        <div className="flex h-fit w-full flex-col">
          <Link href='/chat'>
            <div className="flex min-h-17.5 max-h-20 w-full flex-row items-center gap-1.25 pl-7.5 hover:bg-[whitesmoke]">
              <IoChatbubblesOutline color='#898C81' size='23px' />
              <span className="text-[#898C81]">Chat</span>
            </div>
          </Link>
          <Link href={`/student_dashboard/profile/${userId}`}>
            <div className="flex min-h-17.5 max-h-20 w-full flex-row items-center gap-1.25 pl-7.5 hover:bg-[whitesmoke]">
              <CgProfile color='#898C81' size='23px' />
              <span className="text-[#898C81]">Profile</span>
            </div>
          </Link>
          <hr className="border-t border-[#898C81]" />
          <div
            className="flex min-h-17.5 max-h-20 w-full cursor-pointer flex-row items-center gap-1.25 pl-7.5 hover:bg-[whitesmoke]"
            onClick={Logout}
          >
            <div className="scale-x-[-1]">
              <LuLogOut color='#898C81' size='23px' />
            </div>
            <span className="text-[#898C81]">Logout</span>
          </div>
        </div>
      </div>
      <div className="flex h-full w-full flex-col">
        <div className="mt-2.5 flex h-[8%] w-full items-center justify-between px-12.5">
          <Input
            placeholder='Search'
            className="w-125 border-black"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-full bg-[#D8D9D4]">
              AS
            </div>
            <NavDropdown
              items={[
                { label: 'Profile', href: `/student_dashboard/profile/${userId}` },
                { label: 'Logout', onClick: Logout },
              ]}
            />
          </div>
        </div>
        <div className="h-[93%] w-full">
          <StudentContext.Provider value={{ search, setSearch }}>
            {children}
          </StudentContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Layout;