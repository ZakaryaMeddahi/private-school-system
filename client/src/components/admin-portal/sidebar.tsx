'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
  ClipboardList,
  MessageSquare,
  LogOut,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const mainItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin_dashboard', icon: LayoutDashboard },
  { label: 'Teachers', href: '/admin_dashboard/teachers', icon: GraduationCap },
  { label: 'Students', href: '/admin_dashboard/students', icon: Users },
  { label: 'Courses', href: '/admin_dashboard/courses', icon: BookOpen },
  {
    label: 'Enrollment Requests',
    href: '/admin_dashboard/enrollements',
    icon: ClipboardList,
  },
  { label: 'Messages', href: '/chat', icon: MessageSquare },
];

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
  return (
    <Link href={item.href} className="block" onClick={onNavigate}>
      <div
        className={cn(
          'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          active
            ? 'bg-[#6C3CE1] text-white'
            : 'text-[#4B4B5A] hover:bg-[#F3EEFF] hover:text-[#6C3CE1]'
        )}
      >
        <Icon size={20} className="shrink-0" />
        <span className="flex-1">{item.label}</span>
      </div>
    </Link>
  );
}

export function AdminPortalSidebar({
  onLogout,
  className,
  onNavigate,
}: {
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
            ADMIN PORTAL
          </p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
        <p className="px-3 text-[11px] font-semibold tracking-wide text-[#9CA3AF]">
          MANAGE
        </p>
        {mainItems.map((item) => (
          <NavRow
            key={item.label}
            item={item}
            active={pathname === item.href}
            onNavigate={onNavigate}
          />
        ))}
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
