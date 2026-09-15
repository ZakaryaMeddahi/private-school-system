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
import type { AdminUser } from '@/lib/admin-portal/api';

/**
 * UI-only mockup — course creation is a teacher-only action on the backend
 * (see courses.controller.ts `@Roles(Role.TEACHER)`). This dialog matches
 * the design spec but intentionally does not submit anywhere.
 */
export function CreateFormationDialog({ teachers }: { teachers: AdminUser[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#6C3CE1] text-white hover:bg-[#5A2EC0]">
          + Create Formation
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Formation</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="formation-title">Formation Title</Label>
            <Input id="formation-title" placeholder="e.g. Advanced React Patterns" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="formation-description">Description</Label>
            <Textarea id="formation-description" rows={3} placeholder="What will students learn?" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label>Instructor</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.firstName} {teacher.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Level</Label>
              <Select defaultValue="beginner">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="formation-duration">Duration</Label>
              <Input id="formation-duration" placeholder="e.g. 24h" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="formation-modules">Modules</Label>
              <Input id="formation-modules" type="number" min={0} placeholder="e.g. 6" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Thumbnail</Label>
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#E5E7EB] py-8 text-center">
              <UploadCloud className="text-[#9CA3AF]" size={28} />
              <p className="text-sm text-[#6B7280]">
                Drag & drop or click to browse
              </p>
              <p className="text-xs text-[#9CA3AF]">PNG, JPG up to 5MB</p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Status</Label>
            <Select defaultValue="draft">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
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
            Create Formation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
