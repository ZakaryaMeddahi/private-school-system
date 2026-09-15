'use client';

import { useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LogsTable } from '@/components/admin/audit-logs/logs-table';
import { Pagination } from '@/components/admin/shared/pagination';
import { EmptyState } from '@/components/ui/empty-state';
import { emptyStatePresets } from '@/components/ui/empty-state-presets';
import { downloadCsv } from '@/lib/csv';
import { auditLogs, type AuditAction } from '@/lib/admin-data';

type ActionFilter = 'all' | AuditAction;

const PAGE_SIZE = 8;
const TOTAL_LOGS = 2456;

const AuditLogsPage = () => {
  const [user, setUser] = useState('');
  const [action, setAction] = useState<ActionFilter>('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return auditLogs.filter((log) => {
      const matchesUser = log.user.toLowerCase().includes(user.toLowerCase());
      const matchesAction = action === 'all' || log.action === action;
      return matchesUser && matchesAction;
    });
  }, [user, action]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleExport = () => {
    downloadCsv(
      'audit-logs.csv',
      filtered.map((log) => ({
        timestamp: log.timestamp,
        user: log.user,
        action: log.action,
        details: log.details,
        ip: log.ip,
      }))
    );
  };

  return (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E] sm:text-[28px]">
          Audit Logs
        </h1>
        <p className="mt-1 text-[#6B7280]">
          Track all platform activity and changes.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Input
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
            setPage(1);
          }}
          placeholder="Search by user..."
          className="h-10 max-w-sm rounded-full border-[#E5E7EB] bg-[#F8F7FC]"
        />

        <Select
          value={action}
          onValueChange={(v) => {
            setAction(v as ActionFilter);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="Login">Login</SelectItem>
            <SelectItem value="Enrollment Approved">Enrollment</SelectItem>
            <SelectItem value="Resource Uploaded">Resource</SelectItem>
            <SelectItem value="User Created">User Management</SelectItem>
            <SelectItem value="Settings Changed">Settings</SelectItem>
            <SelectItem value="Session Scheduled">Session</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="ml-auto" onClick={handleExport}>
          <Download />
          Export Logs
        </Button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={emptyStatePresets.notifications.icon}
          variant="gray"
          title="No matching logs"
          description="Try adjusting your search or filters."
        />
      ) : (
        <>
          <LogsTable logs={paginated} />
          <Pagination
            page={page}
            pageCount={Math.max(1, Math.ceil(TOTAL_LOGS / PAGE_SIZE))}
            totalItems={TOTAL_LOGS}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default AuditLogsPage;
