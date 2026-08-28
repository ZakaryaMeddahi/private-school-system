import { Card } from '@/components/ui/card';
import { demoNotifications } from '@/lib/student-portal/demo-data';

export function RecentNotifications() {
  return (
    <div id="notifications" className="flex flex-col gap-3 scroll-mt-20">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold tracking-wide text-[#1A1A2E] uppercase">
          Recent Notifications
        </p>
        <span className="text-sm font-medium text-[#6C3CE1]">View all →</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {demoNotifications.map((notification, index) => (
          <Card key={index} className="relative p-4">
            <span className="absolute top-4 left-4 size-2 rounded-full bg-[#6C3CE1]" />
            <p className="pl-4 text-sm text-[#1A1A2E]">{notification.text}</p>
            <p className="mt-2 pl-4 text-xs text-[#9CA3AF]">
              {notification.time}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
