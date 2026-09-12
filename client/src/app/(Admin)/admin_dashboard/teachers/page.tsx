'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useDisclosure } from '@/hooks/use-disclosure';
import { AdminUserTable } from '@/components/admin-portal/user-table';
import { EmptyState } from '@/components/ui/empty-state';
import { emptyStatePresets } from '@/components/ui/empty-state-presets';
import {
  createTeacher,
  deleteTeacher,
  fetchTeachers,
  HttpError,
  type AdminUser,
} from '@/lib/admin-portal/api';

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const loadTeachers = (query = '') => {
    fetchTeachers(query)
      .then(setTeachers)
      .catch((error) => {
        console.error(error);
        if (error instanceof HttpError && error.status === 401) {
          router.push('/login');
        }
      });
  };

  useEffect(() => {
    loadTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    loadTeachers(value);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTeacher(id);
      setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async () => {
    if (!firstName || !lastName || !email) {
      setFormError('Please fill all fields');
      return;
    }

    setIsSubmitting(true);
    setFormError('');
    try {
      const teacher = await createTeacher({ firstName, lastName, email });
      setTeachers((prev) => [...prev, teacher]);
      setFirstName('');
      setLastName('');
      setEmail('');
      setFormSuccess(true);
      setTimeout(() => setFormSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      setFormError(
        error instanceof Error ? error.message : 'Cannot create account'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E] sm:text-[28px]">
            Teachers
          </h1>
          <p className="mt-1 text-[#6B7280]">
            Manage teacher accounts for your school.
          </p>
        </div>

        <Button
          className="bg-[#6C3CE1] text-white hover:bg-[#5A2EC0]"
          onClick={onOpen}
        >
          <Plus />
          Add Teacher
        </Button>
      </div>

      <Input
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Search teachers..."
        className="h-10 max-w-md rounded-full border-[#E5E7EB] bg-[#F8F7FC]"
      />

      {teachers.length === 0 ? (
        <EmptyState {...emptyStatePresets.adminTeachers} />
      ) : (
        <AdminUserTable users={teachers} onDelete={handleDelete} />
      )}

      <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create teacher&apos;s account</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-3.75 px-4">
            <Input
              value={firstName}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              value={lastName}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              value={email}
              type="email"
              placeholder="Teacher Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <SheetFooter>
            {formSuccess && (
              <Alert className="mb-4 items-center justify-center rounded-xl text-center">
                <AlertDescription>Created successfully</AlertDescription>
              </Alert>
            )}
            {formError && (
              <Alert
                variant="destructive"
                className="mb-4 items-center justify-center rounded-xl text-center"
              >
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}
            <div className="flex w-full justify-between gap-3">
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button
                disabled={isSubmitting}
                className="flex-1 bg-[#6C3CE1] text-white hover:bg-[#5A2EC0]"
                onClick={handleCreate}
              >
                <UserPlus />
                {isSubmitting ? 'Saving…' : 'Save'}
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default TeachersPage;
