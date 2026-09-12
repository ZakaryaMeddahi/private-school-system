'use client';

import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, Star } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formationPerformance, type FormationPerformance } from '@/lib/admin-data';

type SortKey = keyof Pick<
  FormationPerformance,
  'formation' | 'instructor' | 'enrolled' | 'completed' | 'rating'
>;

const columns: { key: SortKey; label: string }[] = [
  { key: 'formation', label: 'Formation' },
  { key: 'instructor', label: 'Instructor' },
  { key: 'enrolled', label: 'Enrolled' },
  { key: 'completed', label: 'Completed' },
  { key: 'rating', label: 'Avg Rating' },
];

export function PerformanceTable() {
  const [sortKey, setSortKey] = useState<SortKey>('enrolled');
  const [sortAsc, setSortAsc] = useState(false);

  const rows = useMemo(() => {
    const list = [...formationPerformance];
    list.sort((a, b) => {
      const left = a[sortKey];
      const right = b[sortKey];
      const comparison =
        typeof left === 'string'
          ? left.localeCompare(right as string)
          : (left as number) - (right as number);
      return sortAsc ? comparison : -comparison;
    });
    return list;
  }, [sortKey, sortAsc]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortAsc((prev) => !prev);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <Card>
      <CardHeader>
        <p className="text-base font-bold text-[#1A1A2E]">
          Formation Performance
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-100">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className="cursor-pointer text-xs font-medium tracking-wide text-[#9CA3AF] uppercase select-none"
                  onClick={() => toggleSort(column.key)}
                >
                  <span className="flex items-center gap-1">
                    {column.label}
                    {sortKey === column.key ? (
                      sortAsc ? (
                        <ArrowUp size={12} />
                      ) : (
                        <ArrowDown size={12} />
                      )
                    ) : (
                      <ArrowUpDown size={12} className="opacity-40" />
                    )}
                  </span>
                </TableHead>
              ))}
              <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
                Completion %
              </TableHead>
              <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} className="border-gray-100">
                <TableCell className="font-bold text-[#1A1A2E]">
                  {row.formation}
                </TableCell>
                <TableCell className="text-[#4B4B5A]">
                  {row.instructor}
                </TableCell>
                <TableCell>{row.enrolled.toLocaleString()}</TableCell>
                <TableCell>{row.completed.toLocaleString()}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-1">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    {row.rating}
                  </span>
                </TableCell>
                <TableCell>
                  {Math.round((row.completed / row.enrolled) * 100)}%
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-700">
                    {row.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
