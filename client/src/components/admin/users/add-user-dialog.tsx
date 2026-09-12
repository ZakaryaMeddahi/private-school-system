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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/**
 * UI-only mockup — there is no "create any role" endpoint on the backend
 * (students self-register, and only teacher accounts can be provisioned by
 * an admin). This dialog exists to match the design spec; it intentionally
 * does not submit anywhere.
 */
export function AddUserDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#6C3CE1] text-white hover:bg-[#5A2EC0]">
          + Add User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="add-user-first-name">First Name</Label>
              <Input id="add-user-first-name" placeholder="First name" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="add-user-last-name">Last Name</Label>
              <Input id="add-user-last-name" placeholder="Last name" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="add-user-email">Email</Label>
            <Input id="add-user-email" type="email" placeholder="name@email.com" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label>Role</Label>
              <Select defaultValue="student">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Status</Label>
              <Select defaultValue="active">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
            Add User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
