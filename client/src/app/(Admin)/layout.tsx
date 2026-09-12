'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AdminPortalSidebar } from '@/components/admin-portal/sidebar';
import { AdminPortalHeader } from '@/components/admin-portal/header';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';

const PAGE_TITLES: Record<string, string> = {
  '/admin_dashboard': 'Dashboard',
  '/admin_dashboard/teachers': 'Teachers',
  '/admin_dashboard/students': 'Students',
  '/admin_dashboard/courses': 'Courses',
  '/admin_dashboard/enrollements': 'Enrollment Requests',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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
        <SheetContent side="left" className="w-60 p-0 sm:max-w-60">
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
          title={PAGE_TITLES[pathname] ?? 'Admin'}
          onLogout={Logout}
          onMenuClick={() => setMobileNavOpen(true)}
        />
        <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
