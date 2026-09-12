'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  GraduationCap,
  ClipboardCheck,
  Video,
  FolderOpen,
  MessageSquare,
  Megaphone,
  Settings,
  Shield,
  ScrollText,
  LogOut,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type NavSection = {
  label: string;
  items: NavItem[];
};

const sections: NavSection[] = [
  {
    label: 'OVERVIEW',
    items: [
      { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    ],
  },
  {
    label: 'MANAGEMENT',
    items: [
      { label: 'Users', href: '/admin/users', icon: Users },
      { label: 'Formations', href: '/admin/formations', icon: GraduationCap },
      { label: 'Enrollments', href: '/admin/enrollments', icon: ClipboardCheck },
      { label: 'Live Classes', href: '/admin/live-classes', icon: Video },
      { label: 'Resources', href: '/admin/resources', icon: FolderOpen },
    ],
  },
  {
    label: 'COMMUNICATION',
    items: [
      { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
      { label: 'Announcements', href: '/admin/announcements', icon: Megaphone },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { label: 'Settings', href: '/admin/settings', icon: Settings },
      { label: 'Roles & Permissions', href: '/admin/roles', icon: Shield },
      { label: 'Audit Logs', href: '/admin/audit-logs', icon: ScrollText },
    ],
  },
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
        'flex h-full w-65 shrink-0 flex-col gap-6 bg-white px-4 py-6',
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

      <nav className="flex flex-1 flex-col gap-5 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.label} className="flex flex-col gap-1">
            <p className="px-3 text-[11px] font-semibold tracking-wide text-[#9CA3AF]">
              {section.label}
            </p>
            {section.items.map((item) => (
              <NavRow
                key={item.label}
                item={item}
                active={pathname === item.href}
                onNavigate={onNavigate}
              />
            ))}
          </div>
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
