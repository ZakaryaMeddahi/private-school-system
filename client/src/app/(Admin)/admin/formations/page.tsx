'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormationsTable } from '@/components/admin/formations/formations-table';
import { CreateFormationDialog } from '@/components/admin/formations/create-formation-dialog';
import { EmptyState } from '@/components/ui/empty-state';
import { emptyStatePresets } from '@/components/ui/empty-state-presets';
import { fetchCourses, type Course } from '@/lib/student-portal/api';
import { fetchTeachers, type AdminUser } from '@/lib/admin-portal/api';

type LevelFilter = 'all' | 'easy' | 'medium' | 'hard';
type SortOption = 'popular' | 'newest' | 'alphabetical';

const FormationsPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState<LevelFilter>('all');
  const [sort, setSort] = useState<SortOption>('newest');
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

  useEffect(() => {
    fetchTeachers().then(setTeachers).catch(console.error);
  }, []);

  const filteredCourses = useMemo(() => {
    const list = courses.filter(
      (course) => level === 'all' || course.difficulty === level
    );

    list.sort((a, b) => {
      switch (sort) {
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'popular':
          return (b.topics?.length ?? 0) - (a.topics?.length ?? 0);
        default:
          return (
            new Date(b.createdAt ?? 0).getTime() -
            new Date(a.createdAt ?? 0).getTime()
          );
      }
    });

    return list;
  }, [courses, level, sort]);

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E] sm:text-[28px]">
            Formation Management
          </h1>
          <p className="mt-1 text-[#6B7280]">
            Create and manage online formations.
          </p>
        </div>
        <CreateFormationDialog teachers={teachers} />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search formations..."
          className="h-10 max-w-sm rounded-full border-[#E5E7EB] bg-[#F8F7FC]"
        />

        <Select value={level} onValueChange={(v) => setLevel(v as LevelFilter)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="easy">Beginner</SelectItem>
            <SelectItem value="medium">Intermediate</SelectItem>
            <SelectItem value="hard">Advanced</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="alphabetical">Alphabetical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredCourses.length === 0 ? (
        <EmptyState {...emptyStatePresets.adminCourses} />
      ) : (
        <FormationsTable courses={filteredCourses} />
      )}
    </div>
  );
};

export default FormationsPage;
