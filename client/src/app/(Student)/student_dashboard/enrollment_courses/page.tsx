'use client';

import { useEffect, useState } from 'react';
import { LearningCard } from '@/components/my-learning/learning-card';
import { fetchMyEnrollments, type Enrollment } from '@/lib/student-portal/api';
import { EmptyState } from '@/components/ui/empty-state';
import { emptyStatePresets } from '@/components/ui/empty-state-presets';

const EnrollmentCourse = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

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
        <EmptyState {...emptyStatePresets.myLearning} />
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
