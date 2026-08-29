import Image from 'next/image';
import Link from 'next/link';
import { PlayCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import type { Enrollment } from '@/lib/student-portal/api';
import { demoProgressFor, thumbnailFor } from '@/lib/student-portal/demo-data';

export function ContinueLearning({
  enrollment,
}: {
  enrollment: Enrollment | null;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-[#6C3CE1]">
        <PlayCircle size={16} />
        <span className="text-xs font-semibold tracking-wide uppercase">
          Continue Learning
        </span>
      </div>

      <Card className="p-5">
        <CardContent className="flex flex-col gap-4 px-0">
          {enrollment ? (
            <>
              <div className="flex gap-4">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={thumbnailFor(enrollment.course.id)}
                    alt={enrollment.course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-lg font-bold text-[#1A1A2E]">
                    {enrollment.course.title}
                  </p>
                  <p className="text-sm text-[#6B7280]">
                    Continue where you left off
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                    <Clock size={12} />
                    Last accessed recently
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6B7280]">In progress</span>
                  <span className="font-semibold text-[#6C3CE1]">
                    {demoProgressFor(enrollment.course.id)}%
                  </span>
                </div>
                <Progress
                  value={demoProgressFor(enrollment.course.id)}
                  className="mt-2 h-1.5"
                />
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/course_details/${enrollment.course.id}`}
                  className="flex-[2]"
                >
                  <Button className="w-full bg-[#6C3CE1] text-white hover:bg-[#5A2EC0]">
                    Continue Learning
                  </Button>
                </Link>
                <Link
                  href={`/course_details/${enrollment.course.id}`}
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full">
                    View Formation
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <p className="text-sm text-[#6B7280]">
                You haven&apos;t enrolled in any formations yet.
              </p>
              <Link href="/student_dashboard/course">
                <Button className="bg-[#6C3CE1] text-white hover:bg-[#5A2EC0]">
                  Explore Formations
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
