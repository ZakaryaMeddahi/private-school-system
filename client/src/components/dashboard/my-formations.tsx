import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import type { Enrollment } from '@/lib/student-portal/api';
import { demoProgressFor } from '@/lib/student-portal/demo-data';

function initialsOf(firstName?: string, lastName?: string) {
  return `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase() || 'T';
}

export function MyFormations({ enrollments }: { enrollments: Enrollment[] }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold tracking-wide text-[#1A1A2E] uppercase">
          My Formations
        </p>
        <Link
          href="/student_dashboard/enrollment_courses"
          className="text-sm font-medium text-[#6C3CE1] hover:underline"
        >
          View all →
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {enrollments.length === 0 && (
          <Card className="p-5 text-sm text-[#6B7280]">
            No formations yet — head over to Explore Courses to enroll.
          </Card>
        )}

        {enrollments.slice(0, 3).map((enrollment) => {
          const progress = demoProgressFor(enrollment.course.id);
          const teacher = enrollment.course.teacher?.user;
          return (
            <Card key={enrollment.id} className="p-4">
              <div className="flex items-center gap-4">
                <Avatar size="lg">
                  <AvatarFallback className="bg-[#F3EEFF] text-[#6C3CE1]">
                    {initialsOf(teacher?.firstName, teacher?.lastName)}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-[#1A1A2E]">
                    {enrollment.course.title}
                  </p>
                  <p className="truncate text-sm text-[#6B7280]">
                    {teacher
                      ? `${teacher.firstName} ${teacher.lastName}`
                      : 'Instructor'}
                  </p>
                  <Progress value={progress} className="mt-2 h-1.5" />
                </div>

                <div className="shrink-0 text-right">
                  <p className="font-bold text-[#6C3CE1]">{progress}%</p>
                  <Link
                    href={`/course_details/${enrollment.course.id}`}
                    className="text-xs font-medium text-[#6C3CE1] hover:underline"
                  >
                    Continue
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
