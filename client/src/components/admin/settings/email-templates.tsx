'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { emailTemplates, type EmailTemplate } from '@/lib/admin-data';

export function EmailTemplates() {
  const [editing, setEditing] = useState<EmailTemplate | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {emailTemplates.map((template) => (
        <Card key={template.id} className="flex-row items-center justify-between p-4">
          <div>
            <p className="text-sm font-bold text-[#1A1A2E]">{template.name}</p>
            <p className="text-xs text-[#9CA3AF]">
              Last edited {template.lastEdited}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setEditing(template)}>
            Edit
          </Button>
        </Card>
      ))}

      <Dialog open={editing !== null} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing?.name}</DialogTitle>
          </DialogHeader>
          <Textarea rows={8} defaultValue={editing?.body} />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button
              className="bg-[#6C3CE1] text-white hover:bg-[#5A2EC0]"
              onClick={() => setEditing(null)}
            >
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
