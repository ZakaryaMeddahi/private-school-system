import Link from 'next/link';
import { ClipboardCheck, UserPlus, Flag, FileWarning, type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { pendingActionsExtra } from '@/lib/admin-data';

const extraIcons: Record<string, LucideIcon> = {
  'teacher-verifications': UserPlus,
  'reported-messages': Flag,
  'resources-review': FileWarning,
};

export function PendingActions({ pendingEnrollments }: { pendingEnrollments: number }) {
  return (
    <Card>
      <CardHeader>
        <p className="text-base font-bold text-[#1A1A2E]">Pending Actions</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <ActionRow
          icon={ClipboardCheck}
          label="Enrollment requests"
          count={pendingEnrollments}
          href="/admin/enrollments"
        />
        {pendingActionsExtra.map((action) => (
          <ActionRow
            key={action.id}
            icon={extraIcons[action.id]}
            label={action.label}
            count={action.count}
            href={action.href}
          />
        ))}
      </CardContent>
    </Card>
  );
}

function ActionRow({
  icon: Icon,
  label,
  count,
  href,
}: {
  icon: LucideIcon;
  label: string;
  count: number;
  href: string;
}) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F3EEFF] text-[#6C3CE1]">
        <Icon size={16} />
      </div>
      <p className="flex-1 text-sm text-[#1A1A2E]">{label}</p>
      <Badge
        className={
          count > 0
            ? 'bg-orange-100 text-orange-700'
            : 'bg-gray-100 text-gray-500'
        }
      >
        {count}
      </Badge>
      {count > 0 ? (
        <Link
          href={href}
          className="text-sm font-medium text-[#6C3CE1] hover:underline"
        >
          Review
        </Link>
      ) : (
        <span className="text-sm text-[#9CA3AF]">—</span>
      )}
    </div>
  );
}
