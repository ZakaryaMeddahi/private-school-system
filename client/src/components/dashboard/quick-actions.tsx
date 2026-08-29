import Link from 'next/link';
import {
  Compass,
  BookOpen,
  Monitor,
  FolderOpen,
  MessageSquare,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const actions: {
  label: string;
  href?: string;
  icon: LucideIcon;
  bg: string;
  color: string;
}[] = [
  {
    label: 'Explore',
    href: '/student_dashboard/course',
    icon: Compass,
    bg: '#F3EEFF',
    color: 'text-[#6C3CE1]',
  },
  {
    label: 'My Learning',
    href: '/student_dashboard/enrollment_courses',
    icon: BookOpen,
    bg: '#E5EEFF',
    color: 'text-[#3B82F6]',
  },
  {
    label: 'Live Class',
    href: '/student_dashboard/live_classes',
    icon: Monitor,
    bg: '#FDE8E8',
    color: 'text-[#EF4444]',
  },
  {
    label: 'Resources',
    href: '/student_dashboard/resources',
    icon: FolderOpen,
    bg: '#FFF6DB',
    color: 'text-[#F59E0B]',
  },
  {
    label: 'Messages',
    href: '/student_dashboard/messages',
    icon: MessageSquare,
    bg: '#E5EEFF',
    color: 'text-[#3B82F6]',
  },
  {
    label: 'Progress',
    icon: TrendingUp,
    bg: '#E6F9EE',
    color: 'text-[#22C55E]',
  },
];

function ActionTile({ action }: { action: (typeof actions)[number] }) {
  const Icon = action.icon;
  const card = (
    <Card
      className={`flex flex-col items-center justify-center gap-2 p-4 text-center transition-all duration-200 ${
        action.href
          ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md'
          : 'opacity-60'
      }`}
    >
      <div
        className="flex size-12 items-center justify-center rounded-full"
        style={{ backgroundColor: action.bg }}
      >
        <Icon size={22} className={action.color} />
      </div>
      <span className="text-sm font-medium text-[#1A1A2E]">
        {action.label}
      </span>
    </Card>
  );

  return action.href ? <Link href={action.href}>{card}</Link> : card;
}

export function QuickActions() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-bold tracking-wide text-[#1A1A2E] uppercase">
        Quick Actions
      </p>
      <div className="grid grid-cols-3 gap-4">
        {actions.map((action) => (
          <ActionTile key={action.label} action={action} />
        ))}
      </div>
    </div>
  );
}
