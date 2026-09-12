import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatDate, initialsOf } from '@/lib/format';
import type { AdminEnrollment } from '@/lib/admin-portal/api';

export function PendingRequests({
  enrollments,
}: {
  enrollments: AdminEnrollment[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold tracking-wide text-[#1A1A2E] uppercase">
          Pending Requests
        </p>
        <Link
          href="/admin_dashboard/enrollements"
          className="text-sm font-medium text-[#6C3CE1] hover:underline"
        >
          View all →
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {enrollments.length === 0 && (
          <Card className="p-5 text-sm text-[#6B7280]">
            No pending enrollment requests right now.
          </Card>
        )}

        {enrollments.slice(0, 3).map((enrollment) => {
          const student = enrollment.student.user;
          return (
            <Card key={enrollment.id} className="p-4">
              <div className="flex items-center gap-4">
                <Avatar size="sm">
                  <AvatarFallback className="bg-[#F3EEFF] text-[10px] text-[#6C3CE1]">
                    {initialsOf(student.firstName, student.lastName)}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#1A1A2E]">
                    {student.firstName} {student.lastName}
                  </p>
                  <p className="truncate text-xs text-[#9CA3AF]">
                    {enrollment.course.title}
                  </p>
                </div>

                <p className="shrink-0 text-xs text-[#9CA3AF]">
                  {formatDate(enrollment.enrollmentDate)}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
