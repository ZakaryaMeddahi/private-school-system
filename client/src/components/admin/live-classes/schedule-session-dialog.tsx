'use client';

import { useState } from 'react';
import { CalendarIcon } from 'lucide-react';
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
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatDate } from '@/lib/format';
import { formationPerformance } from '@/lib/admin-data';

const durations = ['30min', '1h', '1.5h', '2h', '3h'];

/**
 * UI-only mockup — there is no session-scheduling endpoint on the backend
 * yet. This dialog matches the design spec but intentionally does not
 * submit anywhere.
 */
export function ScheduleSessionDialog() {
  const [open, setOpen] = useState(false);
  const [formation, setFormation] = useState<string>('');
  const [date, setDate] = useState<Date | undefined>();

  const instructor = formationPerformance.find((f) => f.formation === formation)
    ?.instructor;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#6C3CE1] text-white hover:bg-[#5A2EC0]">
          + Schedule Session
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Schedule Live Session</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="session-title">Session Title</Label>
            <Input id="session-title" placeholder="e.g. React Masterclass" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label>Formation</Label>
              <Select value={formation} onValueChange={setFormation}>
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
              <Label>Instructor</Label>
              <Input value={instructor ?? ''} placeholder="Select a formation first" readOnly />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start font-normal">
                    <CalendarIcon />
                    {date ? formatDate(date) : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="session-time">Start Time</Label>
              <Input id="session-time" type="time" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Duration</Label>
              <Select defaultValue="1h">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="session-capacity">Max Attendees</Label>
            <Input id="session-capacity" type="number" min={1} placeholder="e.g. 30" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="session-description">Description</Label>
            <Textarea id="session-description" rows={3} placeholder="What will this session cover?" />
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
            Schedule Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
