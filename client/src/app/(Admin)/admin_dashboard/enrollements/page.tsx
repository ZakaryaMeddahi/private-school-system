'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { EmptyState } from '@/components/ui/empty-state';
import { emptyStatePresets } from '@/components/ui/empty-state-presets';
import { EnrollmentRequestCard } from '@/components/admin-portal/enrollment-request-card';
import {
  fetchAllEnrollments,
  updateEnrollmentStatus,
  HttpError,
  type AdminEnrollment,
  type EnrollmentStatus,
} from '@/lib/admin-portal/api';

const EnrollmentsPage = () => {
  const [enrollments, setEnrollments] = useState<AdminEnrollment[]>([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchAllEnrollments()
      .then((data) =>
        setEnrollments(data.filter((e) => e.enrollmentStatus === 'pending'))
      )
      .catch((error) => {
        console.error(error);
        if (error instanceof HttpError && error.status === 401) {
          router.push('/login');
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDecide = async (id: string, status: EnrollmentStatus) => {
    try {
      await updateEnrollmentStatus(id, status);
      setEnrollments((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return enrollments.filter((enrollment) => {
      const student = enrollment.student.user;
      return (
        `${student.firstName} ${student.lastName}`
          .toLowerCase()
          .includes(query) ||
        enrollment.course.title.toLowerCase().includes(query)
      );
    });
  }, [enrollments, search]);

  return (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E] sm:text-[28px]">
          Enrollment Requests
        </h1>
        <p className="mt-1 text-[#6B7280]">
          Review and decide on pending course enrollment requests.
        </p>
      </div>

      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by student or course..."
        className="h-10 max-w-md rounded-full border-[#E5E7EB] bg-[#F8F7FC]"
      />

      {filtered.length === 0 ? (
        <EmptyState {...emptyStatePresets.adminEnrollments} />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((enrollment) => (
            <EnrollmentRequestCard
              key={enrollment.id}
              enrollment={enrollment}
              onDecide={handleDecide}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrollmentsPage;
