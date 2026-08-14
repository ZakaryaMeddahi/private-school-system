'use client';

import CardForCourse from '@/components/CardForCourse';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StudentContext } from '../../layout';

const CoursePage = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const { search, setSearch } = useContext(StudentContext);
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

  //   const searchCourses = async (value) => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses?search=${value}`,
  //         {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: `Bearer ${localStorage.getItem('token')}`,
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         response.status === 401 && router.push('/login');
  //         const { data } = await response.json();
  //         throw new Error(data.message);
  //       }

  //       const { data } = await response.json();

  //       console.log(data);

  //       setCourses(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  return (
    <div className="grid h-full max-w-full grid-cols-3 gap-5 overflow-y-auto p-6.25">
      {courses.map((course) => {
        return (
          <CardForCourse
            w='100%'
            key={course.id}
            teacher={course.teacher}
            Course={course}
            Role='student'
          />
        );
      })}
    </div>
  );
};

export default CoursePage;
