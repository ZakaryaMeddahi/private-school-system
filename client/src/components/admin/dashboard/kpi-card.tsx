import { AlertCircle, TrendingDown, TrendingUp, type LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type KpiTrend = {
  text: string;
  direction: 'up' | 'down' | 'neutral' | 'attention';
};

export function KpiCard({
  label,
  value,
  icon: Icon,
  iconBg,
  iconColor,
  trend,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  trend?: KpiTrend;
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
      {trend && (
        <p
          className={cn(
            'mt-1.5 flex items-center gap-1 text-xs font-medium',
            trend.direction === 'up' && 'text-green-600',
            trend.direction === 'down' && 'text-red-600',
            trend.direction === 'attention' && 'text-orange-500',
            trend.direction === 'neutral' && 'text-[#9CA3AF]'
          )}
        >
          {trend.direction === 'up' && <TrendingUp size={12} />}
          {trend.direction === 'down' && <TrendingDown size={12} />}
          {trend.direction === 'attention' && <AlertCircle size={12} />}
          {trend.text}
        </p>
      )}
    </Card>
  );
}
