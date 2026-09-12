import {
  GraduationCap,
  Users,
  BookOpen,
  ClipboardList,
  type LucideIcon,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

function StatCard({
  label,
  value,
  icon: Icon,
  iconBg,
  iconColor,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <Card className="relative p-5">
      <div
        className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={18} className={iconColor} />
      </div>
      <p className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-[#1A1A2E]">{value}</p>
    </Card>
  );
}

export function AdminStatsRow({
  teacherCount,
  studentCount,
  courseCount,
  pendingCount,
}: {
  teacherCount: number;
  studentCount: number;
  courseCount: number;
  pendingCount: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <StatCard
        label="Teachers"
        value={teacherCount}
        icon={GraduationCap}
        iconBg="#F3EEFF"
        iconColor="text-[#6C3CE1]"
      />
      <StatCard
        label="Students"
        value={studentCount}
        icon={Users}
        iconBg="#E5EEFF"
        iconColor="text-[#3B82F6]"
      />
      <StatCard
        label="Courses"
        value={courseCount}
        icon={BookOpen}
        iconBg="#E6F9EE"
        iconColor="text-[#22C55E]"
      />
      <StatCard
        label="Pending Requests"
        value={pendingCount}
        icon={ClipboardList}
        iconBg="#FFF6DB"
        iconColor="text-[#F59E0B]"
      />
    </div>
  );
}
