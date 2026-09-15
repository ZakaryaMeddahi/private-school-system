'use client';

import { useMemo, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { SessionsTable } from '@/components/admin/live-classes/sessions-table';
import { ScheduleSessionDialog } from '@/components/admin/live-classes/schedule-session-dialog';
import { EmptyState } from '@/components/ui/empty-state';
import { emptyStatePresets } from '@/components/ui/empty-state-presets';
import { adminSessions } from '@/lib/admin-data';

type Tab = 'upcoming' | 'live' | 'completed' | 'all';

const LiveClassesPage = () => {
  const [tab, setTab] = useState<Tab>('upcoming');

  const filtered = useMemo(() => {
    switch (tab) {
      case 'upcoming':
        return adminSessions.filter((s) =>
          ['Scheduled', 'Starting Soon'].includes(s.status)
        );
      case 'live':
        return adminSessions.filter((s) => s.status === 'Live');
      case 'completed':
        return adminSessions.filter((s) => s.status === 'Completed');
      default:
        return adminSessions;
    }
  }, [tab]);

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E] sm:text-[28px]">
            Live Classes Management
          </h1>
          <p className="mt-1 text-[#6B7280]">
            Schedule and manage virtual classrooms.
          </p>
        </div>
        <ScheduleSessionDialog />
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="live" className="gap-1.5">
            <span className="size-2 rounded-full bg-red-500" />
            Live Now
          </TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          {filtered.length === 0 ? (
            <EmptyState
              icon={emptyStatePresets.liveClasses.icon}
              variant="rose"
              title="No sessions here"
              description="There are no live sessions in this view right now."
            />
          ) : (
            <SessionsTable sessions={filtered} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LiveClassesPage;
