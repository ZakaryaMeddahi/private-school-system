'use client';

import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import EnrollmentCard from '@/components/EnrollmentCard';

const EnrollmentPage = () => {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const router = useRouter();

  const SearchRequest = (Search) => {
    console.log(Search);
  };

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/enrollments`,
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

        console.log(data);

        const pendingEnrollments = data.filter(
          (e) => e.enrollmentStatus === 'pending'
        );

        console.log(pendingEnrollments);

        setEnrollments(pendingEnrollments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <div className="flex h-screen w-full flex-col px-12.5">
      <div className="h-fit py-6.25">
        <Input
          placeholder='Search Student Request'
          className="w-125 border-black"
          onChange={(e) => SearchRequest(e.target.value)}
        />
      </div>
      <div className="grid w-full grid-cols-2 gap-2.5 overflow-y-auto p-5">
        {enrollments.map((enrollment) => (
          <EnrollmentCard
            key={enrollment.id}
            enrollment={enrollment}
            enrollments={enrollments}
            setEnrollments={setEnrollments}
          />
        ))}
      </div>
    </div>
  );
};

export default EnrollmentPage;
