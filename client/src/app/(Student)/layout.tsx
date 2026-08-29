'use client';

import { createContext, useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { HelpCircle } from 'lucide-react';
import { StudentPortalSidebar } from '@/components/student-portal/sidebar';
import { StudentPortalHeader } from '@/components/student-portal/header';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { GetUser } from '@/utils/getUser';

export const StudentContext = createContext<{
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}>({ search: '', setSearch: () => {} });

const Layout = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [search, setSearch] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const router = useRouter();

  const Logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  useEffect(() => {
    GetUser()
      .then((data) => {
        if (!data) return;
        setUserId(data.id);
        setFirstName(data.firstName ?? '');
        setLastName(data.lastName ?? '');
        setRole(data.role ?? '');
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div
      className="flex h-screen w-full bg-[#F8F7FC]"
      style={
        {
          '--primary': '#6C3CE1',
          '--primary-foreground': '#FFFFFF',
        } as React.CSSProperties
      }
    >
      <StudentPortalSidebar
        userId={userId}
        onLogout={Logout}
        className="hidden border-r border-black/5 lg:flex"
      />

      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="w-60 p-0 sm:max-w-60">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <StudentPortalSidebar
            userId={userId}
            onLogout={Logout}
            className="w-full"
            onNavigate={() => setMobileNavOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <div className="flex h-full min-w-0 flex-1 flex-col">
        <StudentPortalHeader
          firstName={firstName}
          lastName={lastName}
          role={role}
          search={search}
          onSearchChange={setSearch}
          onLogout={Logout}
          onProfile={() => router.push(`/student_dashboard/profile/${userId}`)}
          onSettings={() =>
            router.push(`/student_dashboard/profile/${userId}/edit_profile`)
          }
          onMenuClick={() => setMobileNavOpen(true)}
        />
        <main className="min-h-0 flex-1 overflow-y-auto">
          <StudentContext.Provider value={{ search, setSearch }}>
            {children}
          </StudentContext.Provider>
        </main>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="fixed right-6 bottom-6 z-50 flex size-12 items-center justify-center rounded-full bg-[#6C3CE1] text-white shadow-lg transition-colors hover:bg-[#5A2EC0]">
              <HelpCircle size={22} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">Help & Support — coming soon</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Layout;
