'use client';

import { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formationPerformance } from '@/lib/admin-data';

/**
 * UI-only mockup — there is no resources module on the backend yet. This
 * dialog matches the design spec but intentionally does not submit or
 * upload anywhere.
 */
export function UploadResourceDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#6C3CE1] text-white hover:bg-[#5A2EC0]">
          + Upload Resource
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Resource</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#E5E7EB] py-8 text-center">
            <UploadCloud className="text-[#9CA3AF]" size={28} />
            <p className="text-sm text-[#6B7280]">
              Drag & drop or click to browse
            </p>
            <p className="text-xs text-[#9CA3AF]">
              PDF, video, presentation, image, or other files
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="resource-name">Resource Name</Label>
            <Input id="resource-name" placeholder="e.g. React Hooks Guide.pdf" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label>Formation</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a formation" />
                </SelectTrigger>
                <SelectContent>
                  {formationPerformance.map((f) => (
                    <SelectItem key={f.id} value={f.formation}>
                      {f.formation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Type</Label>
              <Select defaultValue="PDF">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="Video">Video</SelectItem>
                  <SelectItem value="Presentation">Presentation</SelectItem>
                  <SelectItem value="Image">Image</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="resource-description">Description (optional)</Label>
            <Textarea id="resource-description" rows={3} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            className="bg-[#6C3CE1] text-white hover:bg-[#5A2EC0]"
            onClick={() => setOpen(false)}
          >
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
