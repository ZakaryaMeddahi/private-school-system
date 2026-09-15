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
import { initialsOf } from '@/lib/format';
import type { AuditAction, AuditLog } from '@/lib/admin-data';

const actionBadge: Record<AuditAction, string> = {
  Login: 'bg-blue-100 text-blue-700',
  'Enrollment Approved': 'bg-green-100 text-green-700',
  'Resource Uploaded': 'bg-[#F3EEFF] text-[#6C3CE1]',
  'User Created': 'bg-teal-100 text-teal-700',
  'Settings Changed': 'bg-orange-100 text-orange-700',
  'Session Scheduled': 'bg-indigo-100 text-indigo-700',
};

function nameParts(name: string): [string, string] {
  const [first, ...rest] = name.split(' ');
  return [first, rest.join(' ')];
}

export function LogsTable({ logs }: { logs: AuditLog[] }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-100">
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Timestamp
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              User
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Action
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Details
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              IP Address
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => {
            const [first, last] = nameParts(log.user);
            return (
              <TableRow key={log.id} className="border-gray-100 hover:bg-gray-50/50">
                <TableCell className="text-sm text-[#1A1A2E]">
                  {log.timestamp}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar size="sm">
                      <AvatarFallback className="bg-[#F3EEFF] text-[10px] text-[#6C3CE1]">
                        {initialsOf(first, last)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-[#1A1A2E]">{log.user}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={actionBadge[log.action]}>{log.action}</Badge>
                </TableCell>
                <TableCell className="text-sm text-[#6B7280]">
                  {log.details}
                </TableCell>
                <TableCell className="text-sm text-[#9CA3AF]">{log.ip}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
