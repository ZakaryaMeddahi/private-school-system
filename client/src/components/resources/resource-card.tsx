import {
  FileText,
  Presentation,
  Film,
  Image as ImageIcon,
  File,
  Eye,
  Download,
  type LucideIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Resource, ResourceType } from '@/lib/student-portal/demo-data';

const typeMeta: Record<
  ResourceType,
  { label: string; icon: LucideIcon; iconBg: string; iconColor: string; badge: string }
> = {
  pdf: {
    label: 'PDF',
    icon: FileText,
    iconBg: '#FDE8E8',
    iconColor: '#EF4444',
    badge: 'bg-red-100 text-red-600',
  },
  presentation: {
    label: 'Presentation',
    icon: Presentation,
    iconBg: '#FFF1E0',
    iconColor: '#F59E0B',
    badge: 'bg-orange-100 text-orange-600',
  },
  video: {
    label: 'Video',
    icon: Film,
    iconBg: '#F3EEFF',
    iconColor: '#6C3CE1',
    badge: 'bg-purple-100 text-purple-600',
  },
  image: {
    label: 'Image',
    icon: ImageIcon,
    iconBg: '#E6F9EE',
    iconColor: '#22C55E',
    badge: 'bg-green-100 text-green-600',
  },
  other: {
    label: 'Other',
    icon: File,
    iconBg: '#F1F2F4',
    iconColor: '#6B7280',
    badge: 'bg-gray-100 text-gray-600',
  },
};

export function ResourceCard({ resource }: { resource: Resource }) {
  const meta = typeMeta[resource.type];
  const Icon = meta.icon;

  return (
    <Card className="p-5">
      <CardContent className="flex gap-4 px-0">
        <div
          className="flex size-12 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: meta.iconBg }}
        >
          <Icon size={20} style={{ color: meta.iconColor }} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="truncate text-[15px] font-semibold text-[#1A1A2E]">
              {resource.filename}
            </p>
            <Badge className={`shrink-0 ${meta.badge}`}>{meta.label}</Badge>
          </div>

          <p className="mt-0.5 truncate text-[13px] text-[#6B7280]">
            {resource.formation}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#9CA3AF]">
            <span>{resource.size}</span>
            <span>{resource.instructor}</span>
            <span>{resource.date}</span>
          </div>

          <div className="mt-3 flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-[#6C3CE1] hover:text-[#5A2EC0]"
            >
              <Eye size={14} />
              Preview
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-[#6B7280]"
            >
              <Download size={14} />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
