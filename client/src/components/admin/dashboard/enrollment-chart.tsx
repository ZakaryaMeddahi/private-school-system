'use client';

import { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  enrollmentChartDataByPeriod,
  type EnrollmentPeriod,
} from '@/lib/admin-data';

const periodLabels: Record<EnrollmentPeriod, string> = {
  '7d': 'Last 7 days',
  '30d': 'Last 30 days',
  '90d': 'Last 90 days',
};

export function EnrollmentChart() {
  const [period, setPeriod] = useState<EnrollmentPeriod>('7d');
  const data = enrollmentChartDataByPeriod[period];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <p className="text-base font-bold text-[#1A1A2E]">
          Enrollment Activity
        </p>
        <Select
          value={period}
          onValueChange={(value) => setPeriod(value as EnrollmentPeriod)}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(periodLabels) as EnrollmentPeriod[]).map((key) => (
              <SelectItem key={key} value={key}>
                {periodLabels[key]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-62.5 px-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="enrollmentFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6C3CE1" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#6C3CE1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#F1F0F5" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                borderColor: '#E5E7EB',
                fontSize: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#6C3CE1"
              strokeWidth={2}
              fill="url(#enrollmentFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
