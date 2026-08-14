'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Admin = ({ To }) => {
  return (
    <div className="flex w-full flex-row items-center justify-end">
      <Link href={To}>
        <Button className="bg-[#234C51] text-white hover:bg-[#234C51]/90">
          Course Details
        </Button>
      </Link>
    </div>
  );
};
const Student = ({ courseId, price, Enroll }) => {
  const [enrollment, setEnrollment] = useState<any>({});
  const [enrolled, setEnrolled] = useState(false);
  const router = useRouter();
  // const roleRef = useRef();

  const enroll = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/${courseId}/enrollments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) {
        response.status === 401 && router.push('/login');
        const data = await response.json();
        throw new Error(data.message);
      }

      const { data } = await response.json();

      console.log(data);

      setEnrolled(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // roleRef.current = localStorage.getItem('role');
    const checkEnrollment = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/${courseId}/enrollments/status`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (!response.ok) {
          response.status === 401 && router.push('/login');
          const data = await response.json();
          throw new Error(data.message);
        }

        const { data } = await response.json();
        setEnrollment(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    checkEnrollment();
  }, [enrolled]);

  return (
    <div className={`flex w-full flex-row items-center ${Enroll ? 'justify-end' : 'justify-between'}`}>
      {!enrollment.isEnrolled ? (
        <Button
          className="w-45 bg-[#234C51] text-center text-white hover:bg-[#234C51]/50"
          onClick={enroll}
        >
          Enroll
        </Button>
      ) : enrollment.status === 'approved' ? (
        <Button
          className="w-45 bg-[#234C51] text-center text-white hover:bg-[#234C51]/31"
          onClick={() => {
            router.push(`/chat`);
          }}
        >
          chat rooms
        </Button>
      ) : (
        <Button
          className="w-45 bg-[#234C51] text-center text-white hover:bg-[#234C51]"
          disabled={true}
        >
          {enrollment.status}
        </Button>
      )}
    </div>
  );
};

const Teacher = ({ To }) => {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <Button variant="destructive">
        Delete Course
      </Button>
      <Link href={To}>
        <Button className="bg-[#234C51] text-white hover:bg-[#234C51]/90">
          Course Detials
        </Button>
      </Link>
    </div>
  );
};

const CardForCourse = ({ w = 'fit-content', teacher, Course, Role, Enroll = false }) => {
  const course_details = `/course_details/${Course.id}`;
  return (
    <Link href={course_details}>
      <div
        className="flex flex-col gap-3.75 rounded-[25px] bg-white px-3.75 py-6.25 shadow-[rgba(0,0,0,0.1)_0px_0px_14px_1px] transition-transform duration-500 hover:scale-105"
        style={{ width: w, height: 'fit-content' }}
      >
        <div className="flex items-center justify-center"></div>
        <div className="flex w-full flex-row items-center gap-3.75">
          <div className="flex size-8 items-center justify-center rounded-full bg-[whitesmoke]">
            A
          </div>
          <span className="font-medium">{`${teacher?.user.firstName} ${teacher?.user.lastName}`}</span>
        </div>
        <span className="text-[32px] font-bold text-[#213E69]">
          {Course?.title}
        </span>
        <span className="text-[graytext]">
          {Course?.description.slice(0, 100) + '...'}
        </span>
        {Role === 'student' ? (
          <Student courseId={Course.id} price={Course.price} Enroll={Enroll} />
        ) : Role === 'teacher' ? (
          <Teacher To={course_details} />
        ) : (
          <Admin To={course_details} />
        )}
      </div>
    </Link>
  );
};

export default CardForCourse;
