import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { thumbnailFor } from '@/lib/student-portal/demo-data';
import { initialsOf } from '@/lib/format';
import type { Course } from '@/lib/student-portal/api';

export function AdminCourseCard({ course }: { course: Course }) {
  const teacher = course.teacher?.user;

  return (
    <Card className="overflow-hidden p-0 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-45 w-full">
        <Image
          src={thumbnailFor(course.id)}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="flex flex-col gap-2.5 px-5 pt-4">
        <p className="truncate text-base font-bold text-[#1A1A2E]">
          {course.title}
        </p>

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

        <Badge className="w-fit bg-[#F3EEFF] text-[#6C3CE1]">
          ${course.price}
        </Badge>
      </CardContent>

      <CardFooter className="px-5 pb-5">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/course_details/${course.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
