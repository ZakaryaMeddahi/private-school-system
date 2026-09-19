'use client';

import { useId, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PasswordInput = ({
  label,
  placeholder,
  onchange,
  autoComplete,
}: {
  label: string;
  placeholder: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
}) => {
  const [visible, setVisible] = useState(false);
  const id = useId();

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-[#111827]">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          required
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          onChange={onchange}
          autoComplete={autoComplete}
          className="h-11 rounded-lg border-[#E2E8F0] bg-white pr-10 text-sm text-[#111827] placeholder:text-[#64748B] focus-visible:border-[#4338CA] focus-visible:ring-[#4338CA]/15"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-r-lg text-[#64748B] transition-colors hover:text-[#4338CA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4338CA]"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
