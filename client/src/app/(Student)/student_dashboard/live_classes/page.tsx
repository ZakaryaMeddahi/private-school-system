'use client';

import { useMemo, useState } from 'react';
import { SatelliteDish } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { SessionCard } from '@/components/live-classes/session-card';
import { demoLiveSessions } from '@/lib/student-portal/demo-data';

type TabKey = 'upcoming' | 'live' | 'completed';

const LiveClassesPage = () => {
  const [tab, setTab] = useState<TabKey>('upcoming');

  const upcoming = useMemo(
    () => demoLiveSessions.filter((s) => s.status === 'upcoming'),
    []
  );
  const completed = useMemo(
    () => demoLiveSessions.filter((s) => s.status === 'completed'),
    []
  );

  return (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E] sm:text-[28px]">
          Live Classes
        </h1>
        <p className="mt-1 text-[#6B7280]">
          Join your scheduled virtual classrooms.
        </p>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)}>
        <TabsList className="h-auto gap-2 bg-transparent p-0">
          <TabsTrigger
            value="upcoming"
            className="rounded-full border border-transparent px-4 py-1.5 text-[#6B7280] data-active:border-[#6C3CE1] data-active:bg-transparent data-active:text-[#6C3CE1]"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="live"
            className="gap-1.5 rounded-full border border-transparent px-4 py-1.5 text-[#6B7280] data-active:border-[#6C3CE1] data-active:bg-transparent data-active:text-[#6C3CE1]"
          >
            <span className="size-2 rounded-full bg-red-500" />
            Live Now
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="rounded-full border border-transparent px-4 py-1.5 text-[#6B7280] data-active:border-[#6C3CE1] data-active:bg-transparent data-active:text-[#6C3CE1]"
          >
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {upcoming.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="live" className="mt-6">
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-white py-16 shadow-sm">
            <SatelliteDish size={48} className="text-[#B8A4F0]" />
            <p className="font-semibold text-[#1A1A2E]">
              No live now sessions
            </p>
            <p className="text-sm text-[#6B7280]">
              No sessions are live right now.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {completed.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LiveClassesPage;
