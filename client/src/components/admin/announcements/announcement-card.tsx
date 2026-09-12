import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Announcement } from '@/lib/admin-data';

const audienceBadge: Record<Announcement['audience'], string> = {
  'All Users': 'bg-[#F3EEFF] text-[#6C3CE1]',
  Students: 'bg-blue-100 text-blue-700',
  Teachers: 'bg-orange-100 text-orange-700',
};

export function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-base font-bold text-[#1A1A2E]">{announcement.title}</p>
        <Badge className={audienceBadge[announcement.audience]}>
          {announcement.audience}
        </Badge>
      </div>

      <p className="mt-2 line-clamp-2 text-sm text-[#6B7280]">
        {announcement.text}
      </p>

      <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
        <p className="text-xs text-[#9CA3AF]">
          Published by Admin · {announcement.date}
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Pencil size={14} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <Trash2 size={14} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}
