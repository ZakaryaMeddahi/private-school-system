import { MoreHorizontal, Eye, Pencil, Play, XCircle, Trash2 } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import type { AdminSession } from '@/lib/admin-data';

const statusBadge: Record<AdminSession['status'], string> = {
  Scheduled: 'bg-blue-100 text-blue-700',
  'Starting Soon': 'bg-green-100 text-green-700',
  Live: 'bg-red-100 text-red-700',
  Completed: 'bg-gray-100 text-gray-600',
  Cancelled: 'border border-red-300 text-red-600 bg-transparent',
};

export function SessionsTable({ sessions }: { sessions: AdminSession[] }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-100">
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Session
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Instructor
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Date
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Time
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Duration
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Attendees
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
          {sessions.map((session) => (
            <TableRow key={session.id} className="border-gray-100 hover:bg-gray-50/50">
              <TableCell>
                <p className="text-sm font-bold text-[#1A1A2E]">{session.title}</p>
                <p className="text-xs text-[#9CA3AF]">{session.formation}</p>
              </TableCell>
              <TableCell className="text-sm text-[#1A1A2E]">
                {session.instructor}
              </TableCell>
              <TableCell className="text-sm text-[#1A1A2E]">{session.date}</TableCell>
              <TableCell className="text-sm text-[#1A1A2E]">{session.time}</TableCell>
              <TableCell className="text-sm text-[#1A1A2E]">
                {session.duration}
              </TableCell>
              <TableCell className="text-sm text-[#1A1A2E]">
                {session.registered}/{session.capacity}
              </TableCell>
              <TableCell>
                <Badge className={cn('gap-1.5', statusBadge[session.status])}>
                  {session.status === 'Live' && (
                    <span className="size-1.5 animate-pulse rounded-full bg-red-600" />
                  )}
                  {session.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye size={14} />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil size={14} />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Play size={14} />
                      Start Now
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      <XCircle size={14} />
                      Cancel
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      <Trash2 size={14} />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
