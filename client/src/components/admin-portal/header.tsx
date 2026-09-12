'use client';

import { Menu, ChevronDown, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function AdminPortalHeader({
  title,
  onLogout,
  onMenuClick,
}: {
  title: string;
  onLogout: () => void;
  onMenuClick: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-black/5 bg-white px-4 sm:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-[#6B7280] hover:bg-[#F3EEFF] hover:text-[#6C3CE1] lg:hidden"
        >
          <Menu size={20} />
        </button>
        <p className="text-base font-bold text-[#1A1A2E] sm:text-lg">
          {title}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full py-1 pr-1 pl-1 hover:bg-[#F3EEFF]">
              <Avatar>
                <AvatarFallback className="bg-[#6C3CE1] text-white">
                  AD
                </AvatarFallback>
              </Avatar>
              <p className="hidden text-sm font-semibold text-[#1A1A2E] sm:block">
                Admin
              </p>
              <ChevronDown size={16} className="text-[#9CA3AF]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44 py-2">
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
