'use client';

import { useEffect, useState } from 'react';

function timeOfDayGreeting(hour: number) {
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export function Greeting({ firstName }: { firstName: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E] sm:text-[28px]">
          {now ? timeOfDayGreeting(now.getHours()) : 'Welcome'}
          {firstName ? `, ${firstName}` : ''} 👋
        </h1>
        <p className="mt-1 text-[#6B7280]">Continue your learning journey.</p>
      </div>

      {now && (
        <div className="rounded-xl border border-[#E5E7EB] bg-white px-5 py-2.5 text-right">
          <p className="text-sm font-bold text-[#1A1A2E]">
            {now.toLocaleDateString(undefined, {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className="text-xs text-[#6B7280]">
            {now.toLocaleTimeString(undefined, {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      )}
    </div>
  );
}
