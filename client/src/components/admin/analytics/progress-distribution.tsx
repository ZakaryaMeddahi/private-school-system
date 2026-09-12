import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { progressDistribution } from '@/lib/admin-data';

export function ProgressDistribution() {
  return (
    <Card>
      <CardHeader>
        <p className="text-base font-bold text-[#1A1A2E]">
          Student Progress Distribution
        </p>
      </CardHeader>
      <CardContent className="flex h-75 items-center gap-4">
        <div className="h-full flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={progressDistribution}
                dataKey="value"
                nameKey="label"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={2}
              >
                {progressDistribution.map((segment) => (
                  <Cell key={segment.label} fill={segment.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  borderColor: '#E5E7EB',
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex shrink-0 flex-col gap-3">
          {progressDistribution.map((segment) => (
            <div key={segment.label} className="flex items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-sm text-[#4B4B5A]">
                {segment.label} — {segment.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
