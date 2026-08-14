'use client';

import CourseCard from '@/components/Course Card/CourseCard';
import Item from '@/components/Item/Item';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const CourseDetailsPage = ({ courseId }) => {
  const [course, setCourse] = useState<any>({});
  const router = useRouter();

  const printScroll = () => {
    console.log(window.innerHeight);
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/${courseId}`,
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

        setCourse(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourse();
  }, []);

  return (
    <div className="m-0 max-h-50 max-w-full p-18.75 min-h-screen grid grid-cols-2 gap-6.25 justify-items-center" onClick={printScroll}>
      <div className="pt-12.5">
        <h1 className="text-2xl font-semibold">{course.title}</h1>
        <p className="mt-1.25 mb-11.25 leading-relaxed">
          {course.description}
        </p>
        <h2 className="text-xl font-semibold"> Topics </h2>
        <ul className="mb-11.25 list-disc pl-5">
          {course.topics?.map((topic: any) => {
            return <Item key={topic.id} item={topic.title} mrT='5' />;
          })}
        </ul>
        <h2 className="text-xl font-semibold">Requirements</h2>
        <div className="mb-11.25">{course.requirements}</div>
      </div>
      <CourseCard courseId={courseId} course={course} />
    </div>
  );
};

export default CourseDetailsPage;
