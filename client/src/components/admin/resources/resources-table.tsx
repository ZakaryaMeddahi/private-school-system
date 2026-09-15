import {
  FileText,
  Presentation,
  Film,
  Image as ImageIcon,
  File,
  MoreHorizontal,
  Eye,
  Download,
  Pencil,
  RefreshCw,
  Trash2,
  type LucideIcon,
} from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { AdminResource } from '@/lib/admin-data';

const typeMeta: Record<
  AdminResource['type'],
  { icon: LucideIcon; iconBg: string; iconColor: string; badge: string }
> = {
  PDF: { icon: FileText, iconBg: '#FDE8E8', iconColor: '#EF4444', badge: 'bg-red-100 text-red-600' },
  Presentation: { icon: Presentation, iconBg: '#FFF1E0', iconColor: '#F59E0B', badge: 'bg-orange-100 text-orange-600' },
  Video: { icon: Film, iconBg: '#F3EEFF', iconColor: '#6C3CE1', badge: 'bg-purple-100 text-purple-600' },
  Image: { icon: ImageIcon, iconBg: '#E6F9EE', iconColor: '#22C55E', badge: 'bg-green-100 text-green-600' },
  Other: { icon: File, iconBg: '#F1F2F4', iconColor: '#6B7280', badge: 'bg-gray-100 text-gray-600' },
};

export function ResourcesTable({ resources }: { resources: AdminResource[] }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-100">
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Resource
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Formation
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Uploaded By
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Size
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Date
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Downloads
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((resource) => {
            const meta = typeMeta[resource.type];
            const Icon = meta.icon;
            return (
              <TableRow key={resource.id} className="border-gray-100 hover:bg-gray-50/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex size-9 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: meta.iconBg }}
                    >
                      <Icon size={16} style={{ color: meta.iconColor }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-bold text-[#1A1A2E]">
                          {resource.filename}
                        </p>
                        <Badge className={`shrink-0 ${meta.badge}`}>
                          {resource.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-[#1A1A2E]">
                  {resource.formation}
                </TableCell>
                <TableCell className="text-sm text-[#1A1A2E]">
                  {resource.uploadedBy}
                </TableCell>
                <TableCell className="text-sm text-[#1A1A2E]">
                  {resource.size}
                </TableCell>
                <TableCell className="text-sm text-[#1A1A2E]">
                  {resource.date}
                </TableCell>
                <TableCell className="text-sm text-[#1A1A2E]">
                  {resource.downloads}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye size={14} />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download size={14} />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil size={14} />
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <RefreshCw size={14} />
                        Replace File
                      </DropdownMenuItem>
                      <DropdownMenuItem variant="destructive">
                        <Trash2 size={14} />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
