'use client';

import { Input } from '@/components/ui/input';
import CardForCourse from '@/components/CardForCourse';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const CoursePage = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  // fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses?${search}`,
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
          const { data } = await response.json();
          throw new Error(data.message);
        }

        const { data } = await response.json();

        console.log(data);

        setCourses(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, [search]);

  const searchCourses = async (value) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses?search=${value}`,
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
        const { data } = await response.json();
        throw new Error(data.message);
      }

      const { data } = await response.json();

      console.log(data);

      setCourses(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-full px-12.5">
      <div className="flex h-[10%] w-full flex-row items-center justify-start">
        <Input
          placeholder='Search Course'
          className="w-125 border-black"
          onChange={(e) => searchCourses(e.target.value)}
        />
      </div>
      <div className="grid h-full max-w-full grid-cols-3 gap-5 overflow-y-auto p-6.25">
        {courses.map((course) => {
          return <CardForCourse key={course.id} w={'100%'} Course={course} teacher={course.teacher} Role='admin' />;
        })}
      </div>
    </div>
  );
};

export default CoursePage;
