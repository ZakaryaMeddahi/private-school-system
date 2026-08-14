'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { GetUser } from '@/utils/getUser';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import { IoChatbubblesOutline, IoSearch } from 'react-icons/io5';
import { CgInbox } from 'react-icons/cg';
import OverviewCard from '@/components/OverviewCard';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Overview = () => {
  const [value, onChange] = useState(new Date());
  const [userId, setUserId] = useState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    GetUser()
      .then((data) => {
        if (!data) {
          router.push('/login');
        }
        setUserId(data.id);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setRole(data.role);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const FullName = `${firstName} ${lastName}`;

  return (
    <div className="flex h-full flex-col overflow-y-auto py-5 px-12.5">
      <div className="grid h-full grid-cols-[1fr_0.5fr] gap-5">
        <div className="flex h-full flex-col gap-5">
          <div className="h-62.5 rounded-[25px] bg-white shadow-[rgba(0,0,0,0.1)_0px_4px_12px]">
            <div className="flex h-full flex-col justify-center p-5">
              <h1 className="text-[64px] font-semibold">Welcome Back</h1>
              <p className="text-2xl font-medium">
                {FullName}
              </p>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 grid-rows-2 gap-5 rounded-[25px]">
            <Link href='/student_dashboard/course'>
              <OverviewCard
                title='Courses'
                value='Explore Our Courses'
                icon={<HiOutlineAcademicCap color='white' size='150px' />}
                bgColor={'#234C51'}
              />
            </Link>
            <Link href='/chat'>
              <OverviewCard
                title='Chat'
                value='Join Us To Discuss'
                icon={<IoChatbubblesOutline color='white' size='150px' />}
                bgColor={'#FCC128'}
              />
            </Link>
            <Link href='/student_dashboard/enrollments'>
              <OverviewCard
                title='Enrollments'
                value='View Your Enrollments'
                icon={<CgInbox color='white' size='150px' />}
                bgColor={'#FF6647'}
              />
            </Link>
            <Link href='/student_dashboard/course'>
              <OverviewCard
                title='Search'
                value='Search For Courses'
                icon={<IoSearch color='white' size='150px' />}
                bgColor={'#213E69'}
              />
            </Link>
          </div>
        </div>
        <div className="flex h-full flex-col gap-5">
          <div className="flex h-1/2 w-full flex-col items-center justify-center gap-6.25 rounded-[25px] bg-white shadow-[rgba(0,0,0,0.1)_0px_4px_12px]">
            <div className="size-32 rounded-full border border-black">
              <img src='/profile.jpeg' alt='profile' className="rounded-full" />
            </div>
            <div className="text-center">
              <h2 className="text-[32px] font-semibold">{FullName}</h2>
              <p>
                {firstName}
                {lastName}
                {userId}
              </p>
              <Badge className="bg-blue-500 px-1.75">
                {role}
              </Badge>
            </div>
          </div>
          <div className="h-1/2 rounded-[25px] bg-white shadow-[rgba(0,0,0,0.1)_0px_4px_12px]"></div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
