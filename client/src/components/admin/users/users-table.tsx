'use client';

import { useState } from 'react';
import { MoreHorizontal, UserCog, Ban, CheckCircle2, Trash2, Eye } from 'lucide-react';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

const roleBadge: Record<string, string> = {
  student: 'bg-blue-100 text-blue-700',
  teacher: 'bg-[#F3EEFF] text-[#6C3CE1]',
  admin: 'bg-orange-100 text-orange-700',
};

export function UsersTable({
  users,
  onDelete,
}: {
  users: AdminUser[];
  onDelete: (user: AdminUser) => Promise<void> | void;
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-100">
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              User
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Role
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Status
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Joined
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Last Active
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
  onDelete: (user: AdminUser) => Promise<void> | void;
}) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(user);
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
        <Badge className={`capitalize ${roleBadge[user.role] ?? ''}`}>
          {user.role}
        </Badge>
      </TableCell>

      <TableCell>
        <span className="flex items-center gap-1.5 text-sm">
          <span
            className={`size-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-gray-400'}`}
          />
          <span className={user.isActive ? 'text-green-700' : 'text-gray-500'}>
            {user.isActive ? 'Active' : 'Inactive'}
          </span>
        </span>
      </TableCell>

      <TableCell className="text-sm text-[#1A1A2E]">
        {formatDate(user.createdAt)}
      </TableCell>

      <TableCell className="text-sm text-[#1A1A2E]">
        {formatDate(user.lastLogging)}
      </TableCell>

      <TableCell>
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye size={14} />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserCog size={14} />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {user.isActive ? (
                <DropdownMenuItem className="text-orange-600">
                  <Ban size={14} />
                  Suspend
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem className="text-green-600">
                  <CheckCircle2 size={14} />
                  Activate
                </DropdownMenuItem>
              )}
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Trash2 size={14} />
                  Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete account?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently remove {user.firstName} {user.lastName}
                &apos;s {user.role} account. This action cannot be undone.
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
