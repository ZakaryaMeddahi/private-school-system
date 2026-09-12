'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UsersTable } from '@/components/admin/users/users-table';
import { AddUserDialog } from '@/components/admin/users/add-user-dialog';
import { Pagination } from '@/components/admin/shared/pagination';
import { EmptyState } from '@/components/ui/empty-state';
import { emptyStatePresets } from '@/components/ui/empty-state-presets';
import { downloadCsv } from '@/lib/csv';
import {
  deleteStudent,
  deleteTeacher,
  fetchStudents,
  fetchTeachers,
  HttpError,
  type AdminUser,
} from '@/lib/admin-portal/api';

type RoleFilter = 'all' | 'student' | 'teacher' | 'admin';
type StatusFilter = 'all' | 'active' | 'inactive';
type Tab = 'all' | 'student' | 'teacher' | 'admin';

const PAGE_SIZE = 8;

const UsersPage = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [tab, setTab] = useState<Tab>('all');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [page, setPage] = useState(1);
  const router = useRouter();

  const loadUsers = () => {
    Promise.all([fetchStudents(), fetchTeachers()])
      .then(([students, teachers]) => setUsers([...students, ...teachers]))
      .catch((error) => {
        console.error(error);
        if (error instanceof HttpError && error.status === 401) {
          router.push('/login');
        }
      });
  };

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (user: AdminUser) => {
    try {
      if (user.role === 'teacher') {
        await deleteTeacher(user.id);
      } else {
        await deleteStudent(user.id);
      }
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    } catch (error) {
      console.error(error);
    }
  };

  const counts = useMemo(
    () => ({
      all: users.length,
      student: users.filter((u) => u.role === 'student').length,
      teacher: users.filter((u) => u.role === 'teacher').length,
      admin: users.filter((u) => u.role === 'admin').length,
    }),
    [users]
  );

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return users.filter((user) => {
      if (tab !== 'all' && user.role !== tab) return false;
      if (roleFilter !== 'all' && user.role !== roleFilter) return false;
      if (statusFilter === 'active' && !user.isActive) return false;
      if (statusFilter === 'inactive' && user.isActive) return false;
      return (
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
      );
    });
  }, [users, tab, roleFilter, statusFilter, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [tab, roleFilter, statusFilter, search]);

  const handleExport = () => {
    downloadCsv(
      'users.csv',
      filtered.map((user) => ({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        status: user.isActive ? 'Active' : 'Inactive',
        joined: user.createdAt,
      }))
    );
  };

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E] sm:text-[28px]">
            User Management
          </h1>
          <p className="mt-1 text-[#6B7280]">
            Manage students and teachers on the platform.
          </p>
        </div>
        <AddUserDialog />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or role..."
          className="h-10 max-w-sm rounded-full border-[#E5E7EB] bg-[#F8F7FC]"
        />

        <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v as RoleFilter)}>
          <SelectTrigger className="w-35">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="teacher">Teacher</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as StatusFilter)}
        >
          <SelectTrigger className="w-35">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="ml-auto" onClick={handleExport}>
          <Download />
          Export CSV
        </Button>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
        <TabsList>
          <TabsTrigger value="all">All Users ({counts.all})</TabsTrigger>
          <TabsTrigger value="student">Students ({counts.student})</TabsTrigger>
          <TabsTrigger value="teacher">Teachers ({counts.teacher})</TabsTrigger>
          <TabsTrigger value="admin">Admins ({counts.admin})</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4 flex flex-col gap-4">
          {filtered.length === 0 ? (
            <EmptyState {...emptyStatePresets.adminStudents} title="No users found" />
          ) : (
            <>
              <UsersTable users={paginated} onDelete={handleDelete} />
              <Pagination
                page={page}
                pageCount={pageCount}
                totalItems={filtered.length}
                pageSize={PAGE_SIZE}
                onPageChange={setPage}
              />
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsersPage;
