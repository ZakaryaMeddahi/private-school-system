'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { notificationSettings as defaultNotificationSettings } from '@/lib/admin-data';

export function NotificationSettings() {
  const [settings, setSettings] = useState(
    defaultNotificationSettings.map((s) => ({ ...s }))
  );

  const toggle = (id: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  return (
    <Card>
      <CardContent className="flex flex-col divide-y divide-gray-100">
        {settings.map((setting) => (
          <div
            key={setting.id}
            className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
          >
            <div>
              <p className="text-sm font-medium text-[#1A1A2E]">
                {setting.label}
              </p>
              <p className="text-xs text-[#9CA3AF]">{setting.description}</p>
            </div>
            <Switch
              checked={setting.enabled}
              onCheckedChange={() => toggle(setting.id)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
