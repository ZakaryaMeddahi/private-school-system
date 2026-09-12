'use client';

import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ResourcesTable } from '@/components/admin/resources/resources-table';
import { UploadResourceDialog } from '@/components/admin/resources/upload-resource-dialog';
import { EmptyState } from '@/components/ui/empty-state';
import { emptyStatePresets } from '@/components/ui/empty-state-presets';
import { adminResources, type AdminResource } from '@/lib/admin-data';

type TypeFilter = 'all' | AdminResource['type'];
type SortOption = 'newest' | 'oldest' | 'largest' | 'alphabetical';

const parseSize = (size: string) => parseFloat(size);

const AdminResourcesPage = () => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState<TypeFilter>('all');
  const [sort, setSort] = useState<SortOption>('newest');

  const filtered = useMemo(() => {
    const list = adminResources.filter((resource) => {
      const matchesType = type === 'all' || resource.type === type;
      const matchesSearch = resource.filename
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesType && matchesSearch;
    });

    list.sort((a, b) => {
      switch (sort) {
        case 'alphabetical':
          return a.filename.localeCompare(b.filename);
        case 'largest':
          return parseSize(b.size) - parseSize(a.size);
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return list;
  }, [search, type, sort]);

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E] sm:text-[28px]">
            Resource Management
          </h1>
          <p className="mt-1 text-[#6B7280]">
            Upload and manage learning materials.
          </p>
        </div>
        <UploadResourceDialog />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search resources..."
          className="h-10 max-w-sm rounded-full border-[#E5E7EB] bg-[#F8F7FC]"
        />

        <Select value={type} onValueChange={(v) => setType(v as TypeFilter)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="PDF">PDF</SelectItem>
            <SelectItem value="Video">Video</SelectItem>
            <SelectItem value="Presentation">Presentation</SelectItem>
            <SelectItem value="Image">Image</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="largest">Largest</SelectItem>
            <SelectItem value="alphabetical">Alphabetical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState {...emptyStatePresets.resources} />
      ) : (
        <ResourcesTable resources={filtered} />
      )}
    </div>
  );
};

export default AdminResourcesPage;
