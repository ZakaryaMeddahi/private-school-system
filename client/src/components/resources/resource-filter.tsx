import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export const filterOptions = [
  'All',
  'PDF',
  'Video',
  'Presentation',
  'Image',
  'Other',
] as const;

export type FilterOption = (typeof filterOptions)[number];

export function ResourceFilter({
  search,
  onSearchChange,
  active,
  onActiveChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  active: FilterOption;
  onActiveChange: (value: FilterOption) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#9CA3AF]" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search resources..."
          className="rounded-full pl-9!"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <button
            key={option}
            onClick={() => onActiveChange(option)}
            className={cn(
              'cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              active === option
                ? 'bg-[#6C3CE1] text-white'
                : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
