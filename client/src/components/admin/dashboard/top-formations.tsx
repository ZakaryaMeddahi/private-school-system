import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { topFormations } from '@/lib/admin-data';

export function TopFormations() {
  const max = Math.max(...topFormations.map((f) => f.enrollments));

  return (
    <Card>
      <CardHeader>
        <p className="text-base font-bold text-[#1A1A2E]">Top Formations</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {topFormations.map((formation) => (
          <div key={formation.rank} className="flex items-center gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#F3EEFF] text-xs font-bold text-[#6C3CE1]">
              {formation.rank}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[#1A1A2E]">
                {formation.title}
              </p>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-[#F1F0F5]">
                <div
                  className="h-1.5 rounded-full bg-[#6C3CE1]"
                  style={{
                    width: `${(formation.enrollments / max) * 100}%`,
                  }}
                />
              </div>
            </div>
            <span className="shrink-0 text-sm font-semibold text-[#1A1A2E]">
              {formation.enrollments.toLocaleString()}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
