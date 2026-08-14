'use-client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const CourseCard = ({ courseId, course }) => {
  const { difficulty, duration, durationUnit, language, teacher, file } =
    course;
  const [enrollment, setEnrollment] = useState<any>({});
  const [enrolled, setEnrolled] = useState(false);
  const router = useRouter();
  const roleRef = useRef<string | null>(null);

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
    roleRef.current = localStorage.getItem('role');
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
    <div className="max-w-md rounded-xl border shadow-sm">
      <div className="p-6">
        <img
          src={file?.url || '../../Private-School-default-image.png'}
          alt='course image'
          className="rounded-lg"
        />
      </div>

      <div className="px-6 pb-6">
        <div className="flex flex-row items-center justify-start">
          <div className="mb-7.5 flex flex-row items-center gap-1.25">
            <Avatar className="mr-2.5 size-6">
              <AvatarFallback>{teacher?.user?.firstName?.[0]}</AvatarFallback>
            </Avatar>
            <span>
              {teacher?.user?.firstName} {teacher?.user?.lastName}
            </span>
          </div>
        </div>
        <div>
          <h3 className="mb-5 text-lg font-semibold text-[#213E69]">
            {course.title}
          </h3>
          <div className="mb-5 flex flex-row gap-1.5 text-[#213E69]">
            <span className="font-semibold">Language: </span> <span>{language}</span>
          </div>
          <div className="mb-5 flex flex-row gap-1.5 text-[#213E69]">
            <span className="font-semibold">Duration: </span>
            <span>
              {duration} {durationUnit}
            </span>
          </div>
          <div className="flex flex-row gap-1.5 text-[#213E69]">
            <span className="font-semibold">Difficulty: </span> <span>{difficulty}</span>
          </div>
        </div>
      </div>
      {roleRef.current === 'student' && (
        <div className="flex justify-end border-t px-6 py-4">
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
      )}
    </div>
  );
};

export default CourseCard;
