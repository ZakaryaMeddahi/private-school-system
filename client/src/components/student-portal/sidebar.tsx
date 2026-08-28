'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  ClipboardList,
  Monitor,
  MessageSquare,
  FolderOpen,
  TrendingUp,
  User,
  Bell,
  HelpCircle,
  LogOut,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type NavItem = {
  label: string;
  href?: string;
  icon: LucideIcon;
  badge?: number;
};

const mainItems: NavItem[] = [
  { label: 'Dashboard', href: '/student_dashboard', icon: LayoutDashboard },
  {
    label: 'Explore Courses',
    href: '/student_dashboard/course',
    icon: Compass,
  },
  {
    label: 'My Learning',
    href: '/student_dashboard/enrollment_courses',
    icon: BookOpen,
  },
  {
    label: 'Enrollments',
    href: '/student_dashboard/enrollments',
    icon: ClipboardList,
  },
  {
    label: 'Live Classes',
    href: '/student_dashboard/live_classes',
    icon: Monitor,
  },
  {
    label: 'Messages',
    href: '/student_dashboard/messages',
    icon: MessageSquare,
  },
  {
    label: 'Resources',
    href: '/student_dashboard/resources',
    icon: FolderOpen,
  },
  { label: 'Progress', icon: TrendingUp },
];

function accountItems(userId: string): NavItem[] {
  return [
    {
      label: 'Profile',
      href: `/student_dashboard/profile/${userId}`,
      icon: User,
    },
    { label: 'Notifications', href: '/student_dashboard#notifications', icon: Bell, badge: 3 },
    { label: 'Help & Support', icon: HelpCircle },
  ];
}

function NavRow({
  item,
  active,
  onNavigate,
}: {
  item: NavItem;
  active: boolean;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;
  const content = (
    <div
      className={cn(
        'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
        active
          ? 'bg-[#6C3CE1] text-white'
          : item.href
            ? 'text-[#4B4B5A] hover:bg-[#F3EEFF] hover:text-[#6C3CE1]'
            : 'cursor-default text-[#B3B3BE]'
      )}
    >
      <Icon size={20} className="shrink-0" />
      <span className="flex-1">{item.label}</span>
      {item.badge ? (
        <Badge className="h-5 min-w-5 justify-center rounded-full bg-red-500 px-1 text-white">
          {item.badge}
        </Badge>
      ) : null}
      {!item.href && !item.badge ? (
        <span className="text-[10px] font-semibold tracking-wide text-[#B3B3BE]">
          SOON
        </span>
      ) : null}
    </div>
  );

  if (!item.href) return content;

  return (
    <Link href={item.href} className="block" onClick={onNavigate}>
      {content}
    </Link>
  );
}

export function StudentPortalSidebar({
  userId,
  onLogout,
  className,
  onNavigate,
}: {
  userId: string;
  onLogout: () => void;
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'flex h-full w-60 shrink-0 flex-col gap-6 bg-white px-4 py-6',
        className
      )}
    >
      <div className="flex items-center gap-2 px-2">
        <div className="flex size-9 items-center justify-center rounded-xl bg-[#6C3CE1] text-lg font-bold text-white">
          N
        </div>
        <div>
          <p className="text-lg leading-tight font-bold text-[#1A1A2E]">
            NEXA
          </p>
          <p className="text-[10px] leading-tight font-medium tracking-wide text-[#9CA3AF]">
            STUDENT PORTAL
          </p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto">
        <div className="flex flex-col gap-1">
          <p className="px-3 text-[11px] font-semibold tracking-wide text-[#9CA3AF]">
            MAIN
          </p>
          {mainItems.map((item) => (
            <NavRow
              key={item.label}
              item={item}
              active={!!item.href && pathname === item.href}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <p className="px-3 text-[11px] font-semibold tracking-wide text-[#9CA3AF]">
            ACCOUNT
          </p>
          {accountItems(userId).map((item) => (
            <NavRow
              key={item.label}
              item={item}
              active={!!item.href && pathname === item.href}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </nav>

      <button
        onClick={onLogout}
        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-[#4B4B5A] transition-colors hover:bg-[#F3EEFF] hover:text-[#6C3CE1]"
      >
        <LogOut size={20} className="shrink-0" />
        Logout
      </button>
    </aside>
  );
}
