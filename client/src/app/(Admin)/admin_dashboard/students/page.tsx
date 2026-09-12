'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { AdminUserTable } from '@/components/admin-portal/user-table';
import { EmptyState } from '@/components/ui/empty-state';
import { emptyStatePresets } from '@/components/ui/empty-state-presets';
import {
  deleteStudent,
  fetchStudents,
  HttpError,
  type AdminUser,
} from '@/lib/admin-portal/api';

const StudentsPage = () => {
  const [students, setStudents] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  const loadStudents = (query = '') => {
    fetchStudents(query)
      .then(setStudents)
      .catch((error) => {
        console.error(error);
        if (error instanceof HttpError && error.status === 401) {
          router.push('/login');
        }
      });
  };

  useEffect(() => {
    loadStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    loadStudents(value);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((student) => student.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E] sm:text-[28px]">
          Students
        </h1>
        <p className="mt-1 text-[#6B7280]">
          Manage student accounts for your school.
        </p>
      </div>

      <Input
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Search students..."
        className="h-10 max-w-md rounded-full border-[#E5E7EB] bg-[#F8F7FC]"
      />

      {students.length === 0 ? (
        <EmptyState {...emptyStatePresets.adminStudents} />
      ) : (
        <AdminUserTable users={students} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default StudentsPage;
