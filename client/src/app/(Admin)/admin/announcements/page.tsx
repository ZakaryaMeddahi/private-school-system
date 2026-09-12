import { AnnouncementCard } from '@/components/admin/announcements/announcement-card';
import { CreateAnnouncementDialog } from '@/components/admin/announcements/create-announcement-dialog';
import { announcements } from '@/lib/admin-data';

const AnnouncementsPage = () => {
  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E] sm:text-[28px]">
            Announcements
          </h1>
          <p className="mt-1 text-[#6B7280]">
            Broadcast messages to students and teachers.
          </p>
        </div>
        <CreateAnnouncementDialog />
      </div>

      <div className="flex flex-col gap-4">
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
