'use client';

import { useMemo, useState } from 'react';
import { SatelliteDish } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { SessionCard } from '@/components/live-classes/session-card';
import { demoLiveSessions } from '@/lib/student-portal/demo-data';
import { EmptyState } from '@/components/ui/empty-state';
import { emptyStatePresets } from '@/components/ui/empty-state-presets';

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
          {upcoming.length === 0 ? (
            <EmptyState {...emptyStatePresets.liveClasses} />
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {upcoming.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="live" className="mt-6">
          <EmptyState
            icon={SatelliteDish}
            variant="rose"
            title="No live now sessions"
            description="No sessions are live right now. Check the Upcoming tab to see what's scheduled next."
          />
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {completed.length === 0 ? (
            <EmptyState
              icon={SatelliteDish}
              variant="rose"
              title="No completed sessions yet"
              description="Live classes you've attended will show up here once they're finished."
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {completed.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LiveClassesPage;
