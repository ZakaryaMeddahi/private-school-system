import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { enrollmentsByFormation } from '@/lib/admin-data';

export function EnrollmentBarChart() {
  return (
    <Card>
      <CardHeader>
        <p className="text-base font-bold text-[#1A1A2E]">
          Enrollments by Formation
        </p>
      </CardHeader>
      <CardContent className="h-75">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={enrollmentsByFormation}
            layout="vertical"
            margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
          >
            <CartesianGrid horizontal={false} stroke="#F1F0F5" />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis
              type="category"
              dataKey="title"
              width={150}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#4B4B5A', fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: '#F8F7FC' }}
              contentStyle={{
                borderRadius: 12,
                borderColor: '#E5E7EB',
                fontSize: 12,
              }}
            />
            <Bar dataKey="enrollments" fill="#6C3CE1" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
