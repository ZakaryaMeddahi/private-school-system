import Image from 'next/image';
import Link from 'next/link';
import { MoreHorizontal, Eye, Pencil, Copy, Archive, Trash2 } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { thumbnailFor } from '@/lib/student-portal/demo-data';
import type { Course } from '@/lib/student-portal/api';

const difficultyBadge: Record<string, string> = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-orange-100 text-orange-700',
  hard: 'bg-red-100 text-red-700',
};

export function FormationsTable({ courses }: { courses: Course[] }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-100">
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Formation
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Instructor
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Modules
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Duration
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Price
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Status
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => {
            const teacher = course.teacher?.user;
            return (
              <TableRow key={course.id} className="border-gray-100 hover:bg-gray-50/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={course.file?.url || thumbnailFor(course.id)}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#1A1A2E]">
                        {course.title}
                      </p>
                      {course.difficulty && (
                        <Badge
                          className={`mt-1 capitalize ${difficultyBadge[course.difficulty] ?? ''}`}
                        >
                          {course.difficulty}
                        </Badge>
                      )}
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-sm text-[#1A1A2E]">
                  {teacher ? `${teacher.firstName} ${teacher.lastName}` : '—'}
                </TableCell>

                <TableCell className="text-sm text-[#1A1A2E]">
                  {course.topics?.length ?? 0}
                </TableCell>

                <TableCell className="text-sm text-[#1A1A2E]">
                  {course.duration ? `${course.duration} ${course.durationUnit}` : '—'}
                </TableCell>

                <TableCell className="text-sm text-[#1A1A2E]">
                  ${course.price}
                </TableCell>

                <TableCell>
                  <Badge className="bg-green-100 text-green-700">Published</Badge>
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/course_details/${course.id}`}>
                          <Eye size={14} />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/update_course/${course.id}`}>
                          <Pencil size={14} />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy size={14} />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive size={14} />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem variant="destructive">
                        <Trash2 size={14} />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
