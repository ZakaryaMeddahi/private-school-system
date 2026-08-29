'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { Course } from '@/app/providers/ChatProvider';

function initialsOf(title?: string) {
  return (title || '?')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function ConversationList({
  courses,
  selectedCourseId,
  onSelect,
}: {
  courses: Course[];
  selectedCourseId?: string;
  onSelect: (course: Course) => void;
}) {
  const [query, setQuery] = useState('');

  const filtered = courses.filter((c) =>
    (c.chat?.name || c.title || '')
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 border-b border-gray-100 bg-white px-4 py-3">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#9CA3AF]" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conversations..."
            className="rounded-full bg-[#F8F7FC] pl-9!"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 && (
          <p className="px-4 py-6 text-center text-sm text-[#9CA3AF]">
            No conversations found.
          </p>
        )}

        {filtered.map((course) => {
          const active = course.id === selectedCourseId;
          const title = course.chat?.name || course.title || 'Untitled';

          return (
            <button
              key={course.id}
              onClick={() => onSelect(course)}
              className={cn(
                'flex w-full items-center gap-3 border-l-[3px] border-transparent px-4 py-3 text-left transition-colors hover:bg-gray-50',
                active && 'border-[#6C3CE1] bg-[#6C3CE1]/5'
              )}
            >
              <Avatar className="size-11 shrink-0">
                {course.file?.url && <AvatarImage src={course.file.url} />}
                <AvatarFallback className="bg-[#F3EEFF] text-[#6C3CE1]">
                  {initialsOf(title)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#1A1A2E]">
                  {title}
                </p>
                <p className="truncate text-xs text-[#9CA3AF]">Group chat</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
