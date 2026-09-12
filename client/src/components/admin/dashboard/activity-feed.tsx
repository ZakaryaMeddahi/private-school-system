import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { activityFeed, type ActivityDot } from '@/lib/admin-data';

const dotColor: Record<ActivityDot, string> = {
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  purple: 'bg-[#6C3CE1]',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
  gray: 'bg-gray-400',
};

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <p className="text-base font-bold text-[#1A1A2E]">Recent Activity</p>
        <Link
          href="/admin/audit-logs"
          className="text-sm font-medium text-[#6C3CE1] hover:underline"
        >
          View all →
        </Link>
      </CardHeader>
      <CardContent className="flex max-h-75 flex-col gap-4 overflow-y-auto">
        {activityFeed.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <span
              className={cn(
                'mt-1.5 size-2 shrink-0 rounded-full',
                dotColor[activity.dot]
              )}
            />
            <p className="flex-1 text-sm text-[#1A1A2E]">{activity.text}</p>
            <span className="shrink-0 text-xs text-[#9CA3AF]">
              {activity.time}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
