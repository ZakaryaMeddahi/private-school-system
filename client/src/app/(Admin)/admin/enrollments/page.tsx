'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { EnrollmentStats } from '@/components/admin/enrollments/enrollment-stats';
import { AdminEnrollmentTable } from '@/components/admin/enrollments/admin-enrollment-table';
import { BulkActionsBar } from '@/components/admin/enrollments/bulk-actions-bar';
import { EmptyState } from '@/components/ui/empty-state';
import { emptyStatePresets } from '@/components/ui/empty-state-presets';
import {
  fetchAllEnrollments,
  updateEnrollmentStatus,
  HttpError,
  type AdminEnrollment,
  type EnrollmentStatus,
} from '@/lib/admin-portal/api';

type Tab = 'all' | 'pending' | 'approved' | 'rejected';

const EnrollmentsPage = () => {
  const [enrollments, setEnrollments] = useState<AdminEnrollment[]>([]);
  const [tab, setTab] = useState<Tab>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const router = useRouter();

  const loadEnrollments = () => {
    fetchAllEnrollments()
      .then(setEnrollments)
      .catch((error) => {
        console.error(error);
        if (error instanceof HttpError && error.status === 401) {
          router.push('/login');
        }
      });
  };

  useEffect(() => {
    loadEnrollments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const counts = useMemo(
    () => ({
      all: enrollments.length,
      pending: enrollments.filter((e) => e.enrollmentStatus === 'pending').length,
      approved: enrollments.filter((e) => e.enrollmentStatus === 'approved').length,
      rejected: enrollments.filter((e) => e.enrollmentStatus === 'rejected').length,
    }),
    [enrollments]
  );

  const filtered = useMemo(
    () =>
      tab === 'all'
        ? enrollments
        : enrollments.filter((e) => e.enrollmentStatus === tab),
    [enrollments, tab]
  );

  const handleDecide = async (id: string, status: EnrollmentStatus) => {
    try {
      await updateEnrollmentStatus(id, status);
      setEnrollments((prev) =>
        prev.map((e) => (e.id === id ? { ...e, enrollmentStatus: status } : e))
      );
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleBulkDecide = async (status: EnrollmentStatus) => {
    const ids = Array.from(selectedIds);
    await Promise.allSettled(
      ids.map((id) => updateEnrollmentStatus(id, status))
    );
    setEnrollments((prev) =>
      prev.map((e) =>
        selectedIds.has(e.id) ? { ...e, enrollmentStatus: status } : e
      )
    );
    setSelectedIds(new Set());
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-6 p-8 pb-24">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E] sm:text-[28px]">
          Enrollment Management
        </h1>
        <p className="mt-1 text-[#6B7280]">
          Review and manage student enrollment requests.
        </p>
      </div>

      <EnrollmentStats
        total={counts.all}
        pending={counts.pending}
        approved={counts.approved}
        rejected={counts.rejected}
      />

      <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
        <TabsList>
          <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({counts.pending})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({counts.approved})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({counts.rejected})</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          {filtered.length === 0 ? (
            <EmptyState {...emptyStatePresets.adminEnrollments} />
          ) : (
            <AdminEnrollmentTable
              enrollments={filtered}
              selectedIds={selectedIds}
              onToggleSelect={toggleSelect}
              onDecide={handleDecide}
            />
          )}
        </TabsContent>
      </Tabs>

      <BulkActionsBar
        count={selectedIds.size}
        onApproveAll={() => handleBulkDecide('approved')}
        onRejectAll={() => handleBulkDecide('rejected')}
        onClear={() => setSelectedIds(new Set())}
      />
    </div>
  );
};

export default EnrollmentsPage;
