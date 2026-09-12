'use client';

import { useState } from 'react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formationPerformance } from '@/lib/admin-data';

type Audience = 'all' | 'students' | 'teachers' | 'formation';
type Schedule = 'now' | 'later';

/**
 * UI-only mockup — there is no announcements module on the backend yet.
 * This dialog matches the design spec but intentionally does not
 * publish anywhere.
 */
export function CreateAnnouncementDialog() {
  const [open, setOpen] = useState(false);
  const [audience, setAudience] = useState<Audience>('all');
  const [schedule, setSchedule] = useState<Schedule>('now');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#6C3CE1] text-white hover:bg-[#5A2EC0]">
          + New Announcement
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Announcement</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="announcement-title">Title</Label>
            <Input id="announcement-title" placeholder="Announcement title" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="announcement-content">Content</Label>
            <Textarea id="announcement-content" rows={5} placeholder="Write your announcement..." />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Audience</Label>
            <Select value={audience} onValueChange={(v) => setAudience(v as Audience)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="students">Students Only</SelectItem>
                <SelectItem value="teachers">Teachers Only</SelectItem>
                <SelectItem value="formation">Specific Formation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {audience === 'formation' && (
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
          )}

          <div className="flex flex-col gap-2">
            <Label>Schedule</Label>
            <RadioGroup
              value={schedule}
              onValueChange={(v) => setSchedule(v as Schedule)}
              className="flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="now" id="schedule-now" />
                <Label htmlFor="schedule-now" className="font-normal">
                  Publish Now
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="later" id="schedule-later" />
                <Label htmlFor="schedule-later" className="font-normal">
                  Schedule for later
                </Label>
              </div>
            </RadioGroup>
          </div>

          {schedule === 'later' && (
            <div className="grid grid-cols-2 gap-3">
              <Input type="date" />
              <Input type="time" />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            className="bg-[#6C3CE1] text-white hover:bg-[#5A2EC0]"
            onClick={() => setOpen(false)}
          >
            Publish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
