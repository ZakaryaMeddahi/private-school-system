'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  enrollInCourse,
  fetchEnrollmentStatus,
  type Course,
  type EnrollmentStatus,
} from '@/lib/student-portal/api';
import { thumbnailFor } from '@/lib/student-portal/demo-data';

function initialsOf(firstName?: string, lastName?: string) {
  return `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase() || 'T';
}

const statusBadge: Record<string, string> = {
  approved: 'bg-[#22C55E]/10 text-[#22C55E]',
  pending: 'bg-[#F59E0B]/10 text-[#F59E0B]',
};

export function ExploreCourseCard({ course }: { course: Course }) {
  const [status, setStatus] = useState<EnrollmentStatus | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const router = useRouter();
  const teacher = course.teacher?.user;

  const loadStatus = () => {
    fetchEnrollmentStatus(course.id)
      .then(setStatus)
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course.id]);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await enrollInCourse(course.id);
      loadStatus();
    } catch (err) {
      console.error(err);
    } finally {
      setEnrolling(false);
    }
  };

  const courseHref = `/course_details/${course.id}`;

  return (
    <Card className="overflow-hidden p-0 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-45 w-full">
        <Image
          src={thumbnailFor(course.id)}
          alt={course.title}
          fill
          className="object-cover"
        />
        {status?.isEnrolled && status.status && (
          <Badge
            className={`absolute top-3 right-3 capitalize ${statusBadge[status.status] ?? ''}`}
          >
            {status.status}
          </Badge>
        )}
      </div>

      <CardContent className="flex flex-col gap-2.5 px-5 pt-4">
        {status?.isEnrolled ? (
          <Link
            href={courseHref}
            className="truncate text-base font-bold text-[#6C3CE1] hover:underline"
          >
            {course.title}
          </Link>
        ) : (
          <p className="truncate text-base font-bold text-[#1A1A2E]">
            {course.title}
          </p>
        )}

        <p className="line-clamp-2 text-sm text-[#6B7280]">
          {course.description}
        </p>

        <div className="flex items-center gap-2">
          <Avatar size="sm">
            <AvatarFallback className="bg-[#F3EEFF] text-[10px] text-[#6C3CE1]">
              {initialsOf(teacher?.firstName, teacher?.lastName)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-[#6B7280]">
            {teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Instructor'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-[#6B7280]">
          <FileText size={14} />
          <span>${course.price}</span>
        </div>
      </CardContent>

      <CardFooter className="px-5 pb-5">
        {!status?.isEnrolled ? (
          <Button
            onClick={handleEnroll}
            disabled={enrolling}
            className="w-full bg-[#6C3CE1] text-white hover:bg-[#5A2EC0]"
          >
            {enrolling ? 'Enrolling…' : 'Enroll'}
          </Button>
        ) : status.status === 'approved' ? (
          <Button
            onClick={() => router.push(courseHref)}
            className="w-full bg-[#6C3CE1] text-white hover:bg-[#5A2EC0]"
          >
            View Formation
          </Button>
        ) : (
          <Button disabled className="w-full capitalize">
            {status.status}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
