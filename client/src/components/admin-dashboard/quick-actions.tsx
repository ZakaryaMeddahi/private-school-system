import Link from 'next/link';
import {
  GraduationCap,
  Users,
  BookOpen,
  ClipboardList,
  type LucideIcon,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const actions: {
  label: string;
  href: string;
  icon: LucideIcon;
  bg: string;
  color: string;
}[] = [
  {
    label: 'Teachers',
    href: '/admin_dashboard/teachers',
    icon: GraduationCap,
    bg: '#F3EEFF',
    color: 'text-[#6C3CE1]',
  },
  {
    label: 'Students',
    href: '/admin_dashboard/students',
    icon: Users,
    bg: '#E5EEFF',
    color: 'text-[#3B82F6]',
  },
  {
    label: 'Courses',
    href: '/admin_dashboard/courses',
    icon: BookOpen,
    bg: '#E6F9EE',
    color: 'text-[#22C55E]',
  },
  {
    label: 'Requests',
    href: '/admin_dashboard/enrollements',
    icon: ClipboardList,
    bg: '#FFF6DB',
    color: 'text-[#F59E0B]',
  },
];

function ActionTile({ action }: { action: (typeof actions)[number] }) {
  const Icon = action.icon;
  return (
    <Link href={action.href}>
      <Card className="flex cursor-pointer flex-col items-center justify-center gap-2 p-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
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
    </Link>
  );
}

export function AdminQuickActions() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-bold tracking-wide text-[#1A1A2E] uppercase">
        Quick Actions
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {actions.map((action) => (
          <ActionTile key={action.label} action={action} />
        ))}
      </div>
    </div>
  );
}
