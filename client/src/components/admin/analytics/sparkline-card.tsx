import { TrendingDown, TrendingUp } from 'lucide-react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { SparklineMetric } from '@/lib/admin-data';

export function SparklineCard({ metric }: { metric: SparklineMetric }) {
  const color = metric.direction === 'up' ? '#22C55E' : '#EF4444';

  return (
    <Card className="p-5">
      <p className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
        {metric.label}
      </p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <div>
          <p className="text-2xl font-bold text-[#1A1A2E]">{metric.value}</p>
          <p
            className={cn(
              'mt-1 flex items-center gap-1 text-xs font-medium',
              metric.direction === 'up' ? 'text-green-600' : 'text-red-600'
            )}
          >
            {metric.direction === 'up' ? (
              <TrendingUp size={12} />
            ) : (
              <TrendingDown size={12} />
            )}
            {metric.change}
          </p>
        </div>
        <div className="h-12.5 w-20 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={metric.data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
