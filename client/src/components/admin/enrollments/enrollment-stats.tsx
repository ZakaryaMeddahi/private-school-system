import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: 'orange' | 'green' | 'red';
}) {
  return (
    <Card
      className={cn(
        'p-5',
        accent === 'orange' && 'border-l-4 border-l-orange-400',
        accent === 'green' && 'border-l-4 border-l-green-500',
        accent === 'red' && 'border-l-4 border-l-red-500'
      )}
    >
      <p className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-[#1A1A2E]">{value}</p>
    </Card>
  );
}

export function EnrollmentStats({
  total,
  pending,
  approved,
  rejected,
}: {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <StatCard label="Total Requests" value={total} />
      <StatCard label="Pending" value={pending} accent="orange" />
      <StatCard label="Approved" value={approved} accent="green" />
      <StatCard label="Rejected" value={rejected} accent="red" />
    </div>
  );
}
