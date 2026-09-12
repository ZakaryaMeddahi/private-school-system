'use client';

import { useRouter } from 'next/navigation';
import { Search, Bell, ChevronDown, Menu, User, Settings, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function AdminPortalHeader({
  search,
  onSearchChange,
  onLogout,
  onMenuClick,
  notificationCount = 3,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  onLogout: () => void;
  onMenuClick: () => void;
  notificationCount?: number;
}) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-black/5 bg-white px-4 sm:px-8">
      <button
        onClick={onMenuClick}
        className="flex size-9 shrink-0 items-center justify-center rounded-full text-[#6B7280] hover:bg-[#F3EEFF] hover:text-[#6C3CE1] lg:hidden"
      >
        <Menu size={20} />
      </button>

      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#9CA3AF]" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search users, formations, reports..."
          className="h-10 rounded-full border-[#E5E7EB] bg-[#F8F7FC] pl-9.5!"
        />
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <button className="relative flex size-9 items-center justify-center rounded-full text-[#6B7280] hover:bg-[#F3EEFF] hover:text-[#6C3CE1]">
          <Bell size={20} />
          {notificationCount > 0 && (
            <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-4 justify-center rounded-full bg-red-500 px-1 text-[10px] text-white">
              {notificationCount}
            </Badge>
          )}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full py-1 pr-1 pl-1 hover:bg-[#F3EEFF]">
              <Avatar>
                <AvatarFallback className="bg-[#6C3CE1] text-white">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left leading-tight sm:block">
                <p className="text-sm font-semibold text-[#1A1A2E]">Admin</p>
                <p className="text-xs text-[#9CA3AF]">Administrator</p>
              </div>
              <ChevronDown size={16} className="text-[#9CA3AF]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 py-2">
            <DropdownMenuItem className="gap-2 px-4 py-2.5">
              <User size={16} />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 px-4 py-2.5"
              onClick={() => router.push('/admin/settings')}
            >
              <Settings size={16} />
              Admin Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 px-4 py-2.5">
              <Bell size={16} />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              className="gap-2 px-4 py-2.5"
              onClick={onLogout}
            >
              <LogOut size={16} />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
