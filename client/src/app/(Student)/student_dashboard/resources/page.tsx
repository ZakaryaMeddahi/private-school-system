'use client';

import { useMemo, useState } from 'react';
import { ResourceFilter, type FilterOption } from '@/components/resources/resource-filter';
import { ResourceCard } from '@/components/resources/resource-card';
import { demoResources } from '@/lib/student-portal/demo-data';
import type { ResourceType } from '@/lib/student-portal/demo-data';

const filterToType: Partial<Record<FilterOption, ResourceType>> = {
  PDF: 'pdf',
  Video: 'video',
  Presentation: 'presentation',
  Image: 'image',
  Other: 'other',
};

const ResourcesPage = () => {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState<FilterOption>('All');

  const filtered = useMemo(() => {
    return demoResources.filter((resource) => {
      const matchesType =
        active === 'All' || resource.type === filterToType[active];
      const matchesSearch = resource.filename
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [search, active]);

  return (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E] sm:text-[28px]">
          Resources
        </h1>
        <p className="mt-1 text-[#6B7280]">
          Access learning materials from your enrolled formations.
        </p>
      </div>

      <ResourceFilter
        search={search}
        onSearchChange={setSearch}
        active={active}
        onActiveChange={setActive}
      />

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-[#6B7280]">
          No resources found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
