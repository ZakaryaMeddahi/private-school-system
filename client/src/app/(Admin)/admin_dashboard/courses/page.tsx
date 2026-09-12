'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutGrid } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { AdminCourseCard } from '@/components/admin-portal/course-overview-card';
import { EmptyState } from '@/components/ui/empty-state';
import { emptyStatePresets } from '@/components/ui/empty-state-presets';
import { fetchCourses, type Course } from '@/lib/student-portal/api';

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const query = search ? `search=${encodeURIComponent(search)}` : '';
    fetchCourses(query)
      .then(setCourses)
      .catch((error) => {
        console.error(error);
        if ((error as { status?: number })?.status === 401) {
          router.push('/login');
        }
      });
  }, [search]);

  return (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E] sm:text-[28px]">
          Courses
        </h1>
        <p className="mt-1 text-[#6B7280]">
          Browse every course published across the school.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses..."
          className="h-10 max-w-md rounded-full border-[#E5E7EB] bg-[#F8F7FC]"
        />

        <div className="flex items-center gap-1.5 text-sm text-[#6B7280]">
          <LayoutGrid size={16} />
          {courses.length} courses
        </div>
      </div>

      {courses.length === 0 ? (
        <EmptyState {...emptyStatePresets.adminCourses} />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <AdminCourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
