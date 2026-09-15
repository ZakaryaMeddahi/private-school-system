'use client';

import { Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { RolePermission } from '@/lib/admin-data';

type RoleKey = 'student' | 'teacher' | 'admin';

const roleMeta: Record<
  RoleKey,
  { title: string; description: string; userCount: string; iconBg: string; iconColor: string; locked: boolean }
> = {
  student: {
    title: 'Student',
    description: 'Can browse and enroll in formations, and track their own progress.',
    userCount: '1,247 users',
    iconBg: '#F3EEFF',
    iconColor: '#6C3CE1',
    locked: true,
  },
  teacher: {
    title: 'Teacher',
    description: 'Can create formations, upload resources, and schedule live sessions.',
    userCount: '18 users',
    iconBg: '#E5EEFF',
    iconColor: '#3B82F6',
    locked: false,
  },
  admin: {
    title: 'Admin',
    description: 'Full access to manage users, content, and platform settings.',
    userCount: '3 users',
    iconBg: '#FFF1E0',
    iconColor: '#F59E0B',
    locked: false,
  },
};

export function RoleCard({
  role,
  permissions,
  onToggle,
}: {
  role: RoleKey;
  permissions: RolePermission[];
  onToggle: (label: string) => void;
}) {
  const meta = roleMeta[role];

  return (
    <Card className="p-6">
      <div
        className="flex size-12 items-center justify-center rounded-full"
        style={{ backgroundColor: meta.iconBg }}
      >
        <Shield size={22} style={{ color: meta.iconColor }} />
      </div>

      <p className="mt-4 text-lg font-bold text-[#1A1A2E]">{meta.title}</p>
      <p className="mt-1 text-sm text-[#6B7280]">{meta.description}</p>
      <p className="mt-2 text-xs font-medium text-[#9CA3AF]">{meta.userCount}</p>

      <div className="mt-4 flex flex-col gap-2.5 border-t border-gray-100 pt-4">
        {permissions.map((permission) => {
          const checked = permission[role];
          return (
            <label
              key={permission.label}
              className={cn(
                'flex items-center gap-2.5 text-sm',
                checked ? 'text-[#1A1A2E]' : 'text-[#9CA3AF]'
              )}
            >
              <Checkbox
                checked={checked}
                disabled={meta.locked}
                onCheckedChange={() => onToggle(permission.label)}
                className="data-[state=checked]:border-[#6C3CE1] data-[state=checked]:bg-[#6C3CE1]"
              />
              {permission.label}
            </label>
          );
        })}
      </div>
    </Card>
  );
}
