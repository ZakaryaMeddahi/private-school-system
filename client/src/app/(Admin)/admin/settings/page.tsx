import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { GeneralSettings } from '@/components/admin/settings/general-settings';
import { BrandingSettings } from '@/components/admin/settings/branding-settings';
import { EmailTemplates } from '@/components/admin/settings/email-templates';
import { NotificationSettings } from '@/components/admin/settings/notification-settings';

const SettingsPage = () => {
  return (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E] sm:text-[28px]">
          Platform Settings
        </h1>
        <p className="mt-1 text-[#6B7280]">
          Configure platform preferences and branding.
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="email">Email Templates</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4">
          <GeneralSettings />
        </TabsContent>
        <TabsContent value="branding" className="mt-4">
          <BrandingSettings />
        </TabsContent>
        <TabsContent value="email" className="mt-4">
          <EmailTemplates />
        </TabsContent>
        <TabsContent value="notifications" className="mt-4">
          <NotificationSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
