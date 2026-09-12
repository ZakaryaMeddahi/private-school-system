'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { formatDate, initialsOf } from '@/lib/format';
import type { AdminUser } from '@/lib/admin-portal/api';

export function AdminUserTable({
  users,
  onDelete,
}: {
  users: AdminUser[];
  onDelete: (id: string) => Promise<void> | void;
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-100">
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Name
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Status
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Joined
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Last Login
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} onDelete={onDelete} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function UserRow({
  user,
  onDelete,
}: {
  user: AdminUser;
  onDelete: (id: string) => Promise<void> | void;
}) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(user.id);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <TableRow className="border-gray-100 hover:bg-gray-50/50">
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar size="sm">
            <AvatarFallback className="bg-[#F3EEFF] text-[10px] text-[#6C3CE1]">
              {initialsOf(user.firstName, user.lastName)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[#1A1A2E]">
              {user.firstName} {user.lastName}
            </p>
            <p className="truncate text-xs text-[#9CA3AF]">{user.email}</p>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <Badge
          className={
            user.isActive
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-600'
          }
        >
          {user.isActive ? 'Active' : 'Inactive'}
        </Badge>
      </TableCell>

      <TableCell className="text-sm text-[#1A1A2E]">
        {formatDate(user.createdAt)}
      </TableCell>

      <TableCell className="text-sm text-[#1A1A2E]">
        {formatDate(user.lastLogging)}
      </TableCell>

      <TableCell>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 size={16} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete account?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently remove {user.firstName} {user.lastName}
                &apos;s account. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={deleting}
                className="bg-destructive text-white hover:bg-destructive/90"
                onClick={handleDelete}
              >
                {deleting ? 'Deleting…' : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
}
