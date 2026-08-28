'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LearningCard } from '@/components/my-learning/learning-card';
import { fetchMyEnrollments, type Enrollment } from '@/lib/student-portal/api';

const EnrollmentCourse = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchMyEnrollments()
      .then((data) =>
        setEnrollments(data.filter((e) => e.status === 'approved'))
      )
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E] sm:text-[28px]">
          My Learning
        </h1>
        <p className="mt-1 text-[#6B7280]">
          Your enrolled online formations and progress.
        </p>
      </div>

      {enrollments.length === 0 ? (
        <p className="py-12 text-center text-sm text-[#6B7280]">
          You haven&apos;t enrolled in any formations yet.{' '}
          <button
            onClick={() => router.push('/student_dashboard/course')}
            className="font-medium text-[#6C3CE1] hover:underline"
          >
            Explore Courses
          </button>
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {enrollments.map((enrollment) => (
            <LearningCard key={enrollment.id} enrollment={enrollment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrollmentCourse;
