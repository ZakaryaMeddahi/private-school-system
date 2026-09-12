'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RoleCard } from '@/components/admin/roles/role-card';
import { rolePermissions as defaultRolePermissions } from '@/lib/admin-data';

const RolesPage = () => {
  const [permissions, setPermissions] = useState(
    defaultRolePermissions.map((p) => ({ ...p }))
  );

  const toggle = (role: 'teacher' | 'admin', label: string) => {
    setPermissions((prev) =>
      prev.map((p) => (p.label === label ? { ...p, [role]: !p[role] } : p))
    );
  };

  return (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E] sm:text-[28px]">
          Roles & Permissions
        </h1>
        <p className="mt-1 text-[#6B7280]">
          Define access levels for platform users.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <RoleCard
          role="student"
          permissions={permissions}
          onToggle={() => {}}
        />
        <RoleCard
          role="teacher"
          permissions={permissions}
          onToggle={(label) => toggle('teacher', label)}
        />
        <RoleCard
          role="admin"
          permissions={permissions}
          onToggle={(label) => toggle('admin', label)}
        />
      </div>

      <Button className="self-end bg-[#6C3CE1] text-white hover:bg-[#5A2EC0]">
        Save Permissions
      </Button>
    </div>
  );
};

export default RolesPage;
