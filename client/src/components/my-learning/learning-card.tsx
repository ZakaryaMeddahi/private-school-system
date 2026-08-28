import Image from 'next/image';
import Link from 'next/link';
import { Play, Monitor, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import type { Enrollment } from '@/lib/student-portal/api';
import {
  demoLessonsFor,
  demoLastAccessedFor,
  demoProgressFor,
  progressColor,
  thumbnailFor,
} from '@/lib/student-portal/demo-data';

function initialsOf(firstName?: string, lastName?: string) {
  return `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase() || 'T';
}

export function LearningCard({ enrollment }: { enrollment: Enrollment }) {
  const { course } = enrollment;
  const teacher = course.teacher?.user;
  const progress = demoProgressFor(course.id);
  const { completed, total } = demoLessonsFor(course.id);
  const lastAccessed = demoLastAccessedFor(course.id);
  const color = progressColor(progress);
  const courseHref = `/course_details/${course.id}`;

  return (
    <Card className="overflow-hidden p-0">
      <div className="relative h-45 w-full">
        <Image
          src={thumbnailFor(course.id)}
          alt={course.title}
          fill
          className="object-cover"
        />
        <Badge className="absolute top-3 left-3 bg-[#22C55E] text-white">
          Online Formation
        </Badge>
        <span
          className="absolute right-3 bottom-3 rounded-full bg-white px-2.5 py-1 text-xs font-semibold shadow-sm"
          style={{ color }}
        >
          {progress}%
        </span>
      </div>

      <CardContent className="flex flex-col gap-3 px-5 pt-4">
        <p className="truncate text-base font-semibold text-[#1A1A2E]">
          {course.title}
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

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1.5 text-[#6B7280]">
            <Monitor size={14} />
            {completed} / {total} lessons
          </span>
          <span className="font-semibold" style={{ color }}>
            {progress}%
          </span>
        </div>

        <Progress value={progress} className="h-1.5" />

        <p className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
          <Clock size={12} />
          Last accessed: {lastAccessed}
        </p>
      </CardContent>

      <CardFooter className="gap-3 bg-card">
        <Link href={courseHref} className="flex-1">
          <Button className="w-full gap-1.5 bg-[#6C3CE1] text-white hover:bg-[#5A2EC0]">
            <Play size={14} />
            Continue
          </Button>
        </Link>
        <Link href={courseHref}>
          <Button variant="outline">Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
