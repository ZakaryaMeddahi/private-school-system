'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminPortalSidebar } from '@/components/admin-portal/sidebar';
import { AdminPortalHeader } from '@/components/admin-portal/header';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const router = useRouter();

  const Logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div
      className="flex h-screen w-full bg-white/97"
      style={
        {
          '--primary': '#6C3CE1',
          '--primary-foreground': '#FFFFFF',
        } as React.CSSProperties
      }
    >
      <AdminPortalSidebar
        onLogout={Logout}
        className="hidden border-r border-black/5 lg:flex"
      />

      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="w-65 p-0 sm:max-w-65">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <AdminPortalSidebar
            onLogout={Logout}
            className="w-full"
            onNavigate={() => setMobileNavOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <div className="flex h-full min-w-0 flex-1 flex-col">
        <AdminPortalHeader
          search={search}
          onSearchChange={setSearch}
          onLogout={Logout}
          onMenuClick={() => setMobileNavOpen(true)}
        />
        <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
