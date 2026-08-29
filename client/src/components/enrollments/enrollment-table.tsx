'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Monitor, X } from 'lucide-react';
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
import { Progress } from '@/components/ui/progress';
import { cancelEnrollment, type Enrollment } from '@/lib/student-portal/api';
import {
  demoLessonsFor,
  demoProgressFor,
  thumbnailFor,
} from '@/lib/student-portal/demo-data';

function initialsOf(firstName?: string, lastName?: string) {
  return `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase() || 'T';
}

const statusBadgeClass: Record<string, string> = {
  approved: 'bg-green-100 text-green-700',
  pending: 'bg-orange-100 text-orange-700',
  rejected: 'bg-red-100 text-red-700',
};

export function EnrollmentTable({
  enrollments,
  onCancelled,
}: {
  enrollments: Enrollment[];
  onCancelled: (id: string) => void;
}) {
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const handleCancel = async (id: string) => {
    setCancellingId(id);
    try {
      await cancelEnrollment(id);
      onCancelled(id);
    } catch (err) {
      console.error(err);
    } finally {
      setCancellingId(null);
    }
  };

  if (enrollments.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-[#6B7280]">
        No enrollments found.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-100">
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Formation
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Teacher
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
            const { course } = enrollment;
            const teacher = course.teacher?.user;
            const progress = demoProgressFor(course.id);
            const { total } = demoLessonsFor(course.id);
            const requested = new Date(
              enrollment.enrollmentDate
            ).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <TableRow
                key={enrollment.id}
                className="border-gray-100 py-4 hover:bg-gray-50/50"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={thumbnailFor(course.id)}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#1A1A2E]">
                        {course.title}
                      </p>
                      <p className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                        <Monitor size={12} />
                        {total} lessons · Online
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar size="sm">
                      <AvatarFallback className="bg-[#F3EEFF] text-[10px] text-[#6C3CE1]">
                        {initialsOf(teacher?.firstName, teacher?.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-[#1A1A2E]">
                      {teacher
                        ? `${teacher.firstName} ${teacher.lastName}`
                        : 'Instructor'}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="text-sm text-[#1A1A2E]">
                  {requested}
                </TableCell>

                <TableCell>
                  <Badge
                    className={`capitalize ${statusBadgeClass[enrollment.status] ?? ''}`}
                  >
                    {enrollment.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  {enrollment.status === 'pending' ? (
                    <span className="text-sm text-[#9CA3AF]">—</span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Progress value={progress} className="h-1.5 w-20" />
                      <span className="text-sm text-[#6B7280]">
                        {progress}%
                      </span>
                    </div>
                  )}
                </TableCell>

                <TableCell>
                  {enrollment.status === 'approved' ? (
                    <Link
                      href={`/course_details/${course.id}`}
                      className="text-sm font-medium text-[#6C3CE1] hover:underline"
                    >
                      Open
                    </Link>
                  ) : enrollment.status === 'pending' ? (
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/course_details/${course.id}`}
                        className="text-sm font-medium text-[#6C3CE1] hover:underline"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleCancel(enrollment.id)}
                        disabled={cancellingId === enrollment.id}
                        className="flex items-center gap-1 text-sm font-medium text-red-500 hover:underline disabled:opacity-50"
                      >
                        <X size={14} />
                        Cancel
                      </button>
                    </div>
                  ) : null}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
