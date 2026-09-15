'use client';

import { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function BrandingSettings() {
  const [primaryColor, setPrimaryColor] = useState('#6C3CE1');

  return (
    <Card>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="primary-color">Primary Color</Label>
          <div className="flex items-center gap-3">
            <span
              className="size-9 shrink-0 rounded-lg border border-[#E5E7EB]"
              style={{ backgroundColor: primaryColor }}
            />
            <Input
              id="primary-color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="max-w-40"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label>Logo</Label>
            <UploadDropzone hint="SVG or PNG, up to 2MB" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Favicon</Label>
            <UploadDropzone hint="ICO or PNG, 32×32" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="welcome-text">Login Page Welcome Text</Label>
          <Textarea
            id="welcome-text"
            rows={3}
            defaultValue="Welcome back! Sign in to continue your learning journey."
          />
        </div>

        <Button className="self-end bg-[#6C3CE1] text-white hover:bg-[#5A2EC0]">
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}

function UploadDropzone({ hint }: { hint: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#E5E7EB] py-6 text-center">
      <UploadCloud className="text-[#9CA3AF]" size={24} />
      <p className="text-xs text-[#6B7280]">Drag & drop or click to browse</p>
      <p className="text-[11px] text-[#9CA3AF]">{hint}</p>
    </div>
  );
}
