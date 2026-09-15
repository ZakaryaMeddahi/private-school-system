import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { upcomingSessionsToday } from '@/lib/admin-data';

const statusBadge: Record<string, string> = {
  'Starting Soon': 'bg-green-100 text-green-700',
  Scheduled: 'bg-blue-100 text-blue-700',
  Live: 'bg-red-100 text-red-700',
};

export function UpcomingSessions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <p className="text-base font-bold text-[#1A1A2E]">
          Today&apos;s Live Sessions
        </p>
        <Link
          href="/admin/live-classes"
          className="text-sm font-medium text-[#6C3CE1] hover:underline"
        >
          View all →
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {upcomingSessionsToday.map((session) => (
          <div key={session.id} className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-[#1A1A2E]">
                {session.title}
              </p>
              <p className="text-xs text-[#9CA3AF]">
                {session.time} · {session.instructor} · {session.attendees}
              </p>
            </div>
            <Badge className={statusBadge[session.status]}>
              {session.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
