'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SparklineCard } from '@/components/admin/analytics/sparkline-card';
import { EnrollmentBarChart } from '@/components/admin/analytics/enrollment-bar-chart';
import { ProgressDistribution } from '@/components/admin/analytics/progress-distribution';
import { PerformanceTable } from '@/components/admin/analytics/performance-table';
import { analyticsOverview } from '@/lib/admin-data';

type RangePreset = '7d' | '30d' | '90d' | 'year';

const rangeLabels: Record<RangePreset, string> = {
  '7d': 'Last 7 days',
  '30d': 'Last 30 days',
  '90d': 'Last 90 days',
  year: 'This year',
};

const AnalyticsPage = () => {
  const [range, setRange] = useState<RangePreset>('30d');

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E] sm:text-[28px]">
            Analytics
          </h1>
          <p className="mt-1 text-[#6B7280]">
            Platform performance and engagement metrics.
          </p>
        </div>

        <Select value={range} onValueChange={(v) => setRange(v as RangePreset)}>
          <SelectTrigger className="w-45">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(rangeLabels) as RangePreset[]).map((key) => (
              <SelectItem key={key} value={key}>
                {rangeLabels[key]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {analyticsOverview.map((metric) => (
          <SparklineCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <EnrollmentBarChart />
        <ProgressDistribution />
      </div>

      <PerformanceTable />
    </div>
  );
};

export default AnalyticsPage;
