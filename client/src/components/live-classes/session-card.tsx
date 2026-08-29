import { Video, Calendar, Clock, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { LiveSession } from '@/lib/student-portal/demo-data';

export function SessionCard({ session }: { session: LiveSession }) {
  const isCompleted = session.status === 'completed';

  return (
    <Card className="p-5">
      <CardContent className="flex flex-col gap-4 px-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F3EEFF]">
              <Video size={18} className="text-[#6C3CE1]" />
            </div>
            <div>
              <p className="font-semibold text-[#1A1A2E]">{session.title}</p>
              <p className="text-[13px] text-[#6B7280]">{session.formation}</p>
            </div>
          </div>

          {isCompleted ? (
            <Badge variant="outline" className="shrink-0 text-[#6B7280]">
              Completed
            </Badge>
          ) : (
            <Badge className="shrink-0 bg-green-100 text-green-600">
              Starting Soon
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Avatar size="sm">
            <AvatarFallback
              className="text-[10px] text-[#6C3CE1]"
              style={{ backgroundColor: session.avatarBg }}
            >
              {session.initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-[#1A1A2E]">{session.instructor}</span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-[#F8F7FC] px-4 py-2 text-sm text-[#4B4B5A]">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {session.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {session.time}
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={14} />
            {session.attendees}
          </span>
        </div>

        {!isCompleted && (
          <div className="flex items-center justify-between px-1">
            <span className="text-sm text-[#6B7280]">Starts in</span>
            <span className="text-sm font-bold text-[#6C3CE1]">
              {session.startsIn}
            </span>
          </div>
        )}

        <div className="flex gap-3">
          {isCompleted ? (
            <>
              <Button
                variant="outline"
                className="flex-[3] text-[#6C3CE1] hover:text-[#5A2EC0]"
              >
                View Recording
              </Button>
              <Button variant="outline" className="flex-1">
                Details
              </Button>
            </>
          ) : (
            <>
              <Button className="flex-[3] gap-1.5 bg-[#6C3CE1] text-white hover:bg-[#5A2EC0]">
                <Video size={14} />
                Join Session
              </Button>
              <Button variant="outline" className="flex-1">
                Details
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
