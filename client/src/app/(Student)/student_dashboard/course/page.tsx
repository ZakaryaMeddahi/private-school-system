'use client';

import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bell,
  BookOpen,
  Calendar,
  FileText,
  LayoutGrid,
  MessageSquare,
} from 'lucide-react';
import { StudentContext } from '../../layout';
import { fetchCourses, type Course } from '@/lib/student-portal/api';
import { ExploreCourseCard } from '@/components/explore/course-card';
import { EmptyState } from '@/components/ui/empty-state';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SortOption = 'title-asc' | 'title-desc';

const CoursePage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [sort, setSort] = useState<SortOption>('title-asc');
  const { search } = useContext(StudentContext);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = search ? `search=${encodeURIComponent(search)}` : '';
        const data = await fetchCourses(query);
        setCourses(data);
      } catch (error) {
        console.error(error);
        if ((error as any)?.status === 401) router.push('/login');
      }
    };

    fetchData();
  }, [search]);

  const handleNotify = useCallback(() => {
    // TODO: wire up to the notifications preference endpoint once available.
    console.info('Notify me requested for new formations');
  }, []);

  const sortedCourses = useMemo(() => {
    const list = [...courses];
    list.sort((a, b) =>
      sort === 'title-asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
    return list;
  }, [courses, sort]);

  return (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E] sm:text-[28px]">
          Explore Formations
        </h1>
        <p className="mt-1 text-[#6B7280]">
          Discover online formations and expand your skills.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title-asc">Title A–Z</SelectItem>
            <SelectItem value="title-desc">Title Z–A</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1.5 text-sm text-[#6B7280]">
          <LayoutGrid size={16} />
          {sortedCourses.length} formations
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sortedCourses.map((course) => (
          <ExploreCourseCard key={course.id} course={course} />
        ))}
      </div>

      {sortedCourses.length === 0 && (
        <EmptyState
          icon={BookOpen}
          variant="purple"
          title="No formations available yet"
          description="New formations are being prepared. Check back soon or explore other learning resources in the meantime."
          // action={{
          //   label: 'Notify me when available',
          //   icon: Bell,
          //   onClick: handleNotify,
          // }}
          hints={[
            // {
            //   icon: FileText,
            //   label: 'Browse resources',
            //   href: '/student_dashboard/resources',
            // },
            // {
            //   icon: MessageSquare,
            //   label: 'Ask a question',
            //   href: '/student_dashboard/messages',
            // },
            // {
            //   icon: Calendar,
            //   label: 'Live classes',
            //   href: '/student_dashboard/live_classes',
            // },
          ]}
        />
      )}
    </div>
  );
};

export default CoursePage;
