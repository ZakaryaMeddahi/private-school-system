import { Video } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { demoUpcomingSession } from '@/lib/student-portal/demo-data';

export function UpcomingSession() {
  const session = demoUpcomingSession;

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2 text-[#EF4444]">
        <Video size={16} />
        <span className="text-xs font-semibold tracking-wide uppercase">
          Upcoming Live Session
        </span>
      </div>

      <Card className="flex-1 p-5">
        <CardContent className="flex h-full flex-col gap-4 px-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-lg font-bold text-[#1A1A2E]">
                {session.title}
              </p>
              <p className="text-sm text-[#6B7280]">{session.formation}</p>
              <p className="mt-0.5 text-xs text-[#9CA3AF]">
                with {session.instructor}
              </p>
            </div>
            <Badge className="bg-[#22C55E]/10 text-[#22C55E]">
              Starting Soon
            </Badge>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Date</span>
              <span className="font-medium text-[#1A1A2E]">
                {session.date}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Time</span>
              <span className="font-medium text-[#1A1A2E]">
                {session.time}
              </span>
            </div>
          </div>

          <div className="mt-auto flex gap-3">
            <Button className="flex-[2] bg-[#6C3CE1] text-white hover:bg-[#5A2EC0]">
              Join Session
            </Button>
            <Button variant="ghost" className="flex-1">
              Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
