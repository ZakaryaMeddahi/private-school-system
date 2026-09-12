'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { formatDate, initialsOf } from '@/lib/format';
import type { AdminEnrollment } from '@/lib/admin-portal/api';

export function EnrollmentRequestCard({
  enrollment,
  onDecide,
}: {
  enrollment: AdminEnrollment;
  onDecide: (id: string, status: 'approved' | 'rejected') => Promise<void> | void;
}) {
  const [decidingAs, setDecidingAs] = useState<'approved' | 'rejected' | null>(
    null
  );
  const student = enrollment.student.user;

  const handleDecide = async (status: 'approved' | 'rejected') => {
    setDecidingAs(status);
    try {
      await onDecide(enrollment.id, status);
    } finally {
      setDecidingAs(null);
    }
  };

  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback className="bg-[#F3EEFF] text-[#6C3CE1]">
            {initialsOf(student.firstName, student.lastName)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-[#1A1A2E]">
            {student.firstName} {student.lastName}
          </p>
          <p className="text-xs text-[#9CA3AF]">
            Requested {formatDate(enrollment.enrollmentDate)}
          </p>
        </div>
      </div>

      <p className="text-sm text-[#6B7280]">
        <span className="font-semibold text-[#1A1A2E]">Course: </span>
        {enrollment.course.title}
      </p>

      <div className="flex items-center gap-2">
        <Button
          className="flex-1 bg-[#6C3CE1] text-white hover:bg-[#5A2EC0]"
          disabled={decidingAs !== null}
          onClick={() => handleDecide('approved')}
        >
          <Check />
          {decidingAs === 'approved' ? 'Approving…' : 'Approve'}
        </Button>
        <Button
          variant="outline"
          className="flex-1 text-red-600 hover:bg-red-50 hover:text-red-700"
          disabled={decidingAs !== null}
          onClick={() => handleDecide('rejected')}
        >
          <X />
          {decidingAs === 'rejected' ? 'Rejecting…' : 'Reject'}
        </Button>
      </div>
    </Card>
  );
}
