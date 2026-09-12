'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { defaultPlatformSettings } from '@/lib/admin-data';

export function GeneralSettings() {
  const [settings, setSettings] = useState(defaultPlatformSettings);

  return (
    <Card>
      <CardContent className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="platform-name">Platform Name</Label>
            <Input
              id="platform-name"
              value={settings.platformName}
              onChange={(e) =>
                setSettings((s) => ({ ...s, platformName: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="platform-url">Platform URL</Label>
            <Input
              id="platform-url"
              value={settings.platformUrl}
              onChange={(e) =>
                setSettings((s) => ({ ...s, platformUrl: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="support-email">Support Email</Label>
            <Input
              id="support-email"
              type="email"
              value={settings.supportEmail}
              onChange={(e) =>
                setSettings((s) => ({ ...s, supportEmail: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="max-enrollments">Max Enrollments Per Student</Label>
            <Input
              id="max-enrollments"
              type="number"
              min={1}
              value={settings.maxEnrollments}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  maxEnrollments: Number(e.target.value),
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Default Language</Label>
            <Select
              value={settings.language}
              onValueChange={(v) => setSettings((s) => ({ ...s, language: v }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="French">French</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="Arabic">Arabic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Timezone</Label>
            <Select
              value={settings.timezone}
              onValueChange={(v) => setSettings((s) => ({ ...s, timezone: v }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="EST">EST</SelectItem>
                <SelectItem value="CET">CET</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-[#E5E7EB] px-4 py-3">
          <div>
            <p className="text-sm font-medium text-[#1A1A2E]">
              Auto-Approve Enrollments
            </p>
            <p className="text-xs text-[#9CA3AF]">
              Automatically approve new enrollment requests.
            </p>
          </div>
          <Switch
            checked={settings.autoApproveEnrollments}
            onCheckedChange={(checked) =>
              setSettings((s) => ({ ...s, autoApproveEnrollments: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between rounded-xl border border-[#E5E7EB] px-4 py-3">
          <div>
            <p className="text-sm font-medium text-[#1A1A2E]">
              Maintenance Mode
            </p>
            <p className="text-xs text-[#9CA3AF]">
              Take the platform offline for all non-admin users.
            </p>
            {settings.maintenanceMode && (
              <p className="mt-1 text-xs font-medium text-red-600">
                Warning: the platform is currently in maintenance mode.
              </p>
            )}
          </div>
          <Switch
            checked={settings.maintenanceMode}
            onCheckedChange={(checked) =>
              setSettings((s) => ({ ...s, maintenanceMode: checked }))
            }
          />
        </div>

        <Button className="self-end bg-[#6C3CE1] text-white hover:bg-[#5A2EC0]">
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}
