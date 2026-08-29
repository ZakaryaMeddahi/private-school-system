import {
  ClipboardList,
  Trophy,
  TrendingUp,
  Video,
  FolderOpen,
  type LucideIcon,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { demoStats } from '@/lib/student-portal/demo-data';

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

export function StatsRow({ enrolledCount }: { enrolledCount: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      <StatCard
        label="Formations enrolled"
        value={enrolledCount}
        icon={ClipboardList}
        iconBg="#F3EEFF"
        iconColor="text-[#6C3CE1]"
      />
      <StatCard
        label="Completed"
        value={demoStats.completed}
        icon={Trophy}
        iconBg="#FFF1E0"
        iconColor="text-[#F59E0B]"
      />
      <StatCard
        label="Overall progress"
        value={`${demoStats.overallProgress}%`}
        icon={TrendingUp}
        iconBg="#E6F9EE"
        iconColor="text-[#22C55E]"
      />
      <StatCard
        label="Live sessions"
        value={demoStats.liveSessions}
        icon={Video}
        iconBg="#FDE8E8"
        iconColor="text-[#EF4444]"
      />
      <StatCard
        label="Resources"
        value={demoStats.resources}
        icon={FolderOpen}
        iconBg="#F1F2F4"
        iconColor="text-[#6B7280]"
      />
    </div>
  );
}
