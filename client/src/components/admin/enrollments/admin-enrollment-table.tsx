'use client';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { formatDate, initialsOf } from '@/lib/format';
import { demoProgressFor } from '@/lib/student-portal/demo-data';
import type { AdminEnrollment, EnrollmentStatus } from '@/lib/admin-portal/api';

const statusBadge: Record<EnrollmentStatus, string> = {
  approved: 'bg-green-100 text-green-700',
  pending: 'bg-orange-100 text-orange-700',
  rejected: 'bg-red-100 text-red-700',
};

export function AdminEnrollmentTable({
  enrollments,
  selectedIds,
  onToggleSelect,
  onDecide,
}: {
  enrollments: AdminEnrollment[];
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onDecide: (id: string, status: EnrollmentStatus) => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-100">
            <TableHead className="w-10" />
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Student
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Formation
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Requested
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Status
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Progress
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrollments.map((enrollment) => {
            const student = enrollment.student.user;
            const isPending = enrollment.enrollmentStatus === 'pending';
            const isApproved = enrollment.enrollmentStatus === 'approved';
            const progress = isApproved
              ? demoProgressFor(enrollment.course.id)
              : null;

            return (
              <TableRow
                key={enrollment.id}
                className="border-gray-100 hover:bg-gray-50/50"
              >
                <TableCell>
                  <Checkbox
                    checked={selectedIds.has(enrollment.id)}
                    onCheckedChange={() => onToggleSelect(enrollment.id)}
                    aria-label={`Select enrollment for ${student.firstName} ${student.lastName}`}
                  />
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      <AvatarFallback className="bg-[#F3EEFF] text-[10px] text-[#6C3CE1]">
                        {initialsOf(student.firstName, student.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#1A1A2E]">
                        {student.firstName} {student.lastName}
                      </p>
                      <p className="truncate text-xs text-[#9CA3AF]">
                        {student.email}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-sm text-[#1A1A2E]">
                  {enrollment.course.title}
                </TableCell>

                <TableCell className="text-sm text-[#1A1A2E]">
                  {formatDate(enrollment.enrollmentDate)}
                </TableCell>

                <TableCell>
                  <Badge
                    className={`capitalize ${statusBadge[enrollment.enrollmentStatus]}`}
                  >
                    {enrollment.enrollmentStatus}
                  </Badge>
                </TableCell>

                <TableCell>
                  {progress !== null ? (
                    <div className="flex items-center gap-2">
                      <Progress value={progress} className="h-1.5 w-20" />
                      <span className="text-sm text-[#6B7280]">
                        {progress}%
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-[#9CA3AF]">—</span>
                  )}
                </TableCell>

                <TableCell>
                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="bg-green-500 text-white hover:bg-green-600"
                        onClick={() => onDecide(enrollment.id, 'approved')}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => onDecide(enrollment.id, 'rejected')}
                      >
                        Reject
                      </Button>
                    </div>
                  ) : isApproved ? (
                    <button
                      onClick={() => onDecide(enrollment.id, 'rejected')}
                      className="text-sm font-medium text-orange-600 hover:underline"
                    >
                      Revoke
                    </button>
                  ) : (
                    <button
                      onClick={() => onDecide(enrollment.id, 'approved')}
                      className="text-sm font-medium text-[#6C3CE1] hover:underline"
                    >
                      Re-approve
                    </button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
