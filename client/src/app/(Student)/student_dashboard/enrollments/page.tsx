'use client';

import { useEffect, useMemo, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { EnrollmentTable } from '@/components/enrollments/enrollment-table';
import { fetchMyEnrollments, type Enrollment } from '@/lib/student-portal/api';

type TabKey = 'all' | 'pending' | 'approved' | 'rejected';

const EnrollmentsPage = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [tab, setTab] = useState<TabKey>('all');

  useEffect(() => {
    fetchMyEnrollments()
      .then(setEnrollments)
      .catch((err) => console.error(err));
  }, []);

  const counts = useMemo(
    () => ({
      pending: enrollments.filter((e) => e.status === 'pending').length,
      approved: enrollments.filter((e) => e.status === 'approved').length,
      rejected: enrollments.filter((e) => e.status === 'rejected').length,
    }),
    [enrollments]
  );

  const filtered = useMemo(() => {
    if (tab === 'all') return enrollments;
    return enrollments.filter((e) => e.status === tab);
  }, [enrollments, tab]);

  const handleCancelled = (id: string) => {
    setEnrollments((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E] sm:text-[28px]">
          My Enrollments
        </h1>
        <p className="mt-1 text-[#6B7280]">
          Manage your formation enrollments.
        </p>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)}>
        <TabsList variant="line" className="h-auto gap-6 p-0">
          <TabsTrigger
            value="all"
            className="rounded-none pb-2 text-[#6B7280] after:bg-[#6C3CE1] data-active:text-[#6C3CE1]"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="rounded-none pb-2 text-[#6B7280] after:bg-[#6C3CE1] data-active:text-[#6C3CE1]"
          >
            Pending {counts.pending}
          </TabsTrigger>
          <TabsTrigger
            value="approved"
            className="rounded-none pb-2 text-[#6B7280] after:bg-[#6C3CE1] data-active:text-[#6C3CE1]"
          >
            Approved {counts.approved}
          </TabsTrigger>
          <TabsTrigger
            value="rejected"
            className="rounded-none pb-2 text-[#6B7280] after:bg-[#6C3CE1] data-active:text-[#6C3CE1]"
          >
            Rejected {counts.rejected}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          <EnrollmentTable
            enrollments={filtered}
            onCancelled={handleCancelled}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnrollmentsPage;
