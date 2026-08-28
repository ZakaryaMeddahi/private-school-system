'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GetUser } from '@/utils/getUser';
import { fetchMyEnrollments, type Enrollment } from '@/lib/student-portal/api';
import { Greeting } from '@/components/dashboard/greeting';
import { StatsRow } from '@/components/dashboard/stats-row';
import { ContinueLearning } from '@/components/dashboard/continue-learning';
import { UpcomingSession } from '@/components/dashboard/upcoming-session';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { MyFormations } from '@/components/dashboard/my-formations';
import { RecentNotifications } from '@/components/dashboard/recent-notifications';

const Overview = () => {
  const [firstName, setFirstName] = useState('');
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const router = useRouter();

  useEffect(() => {
    GetUser()
      .then((data) => {
        if (!data) {
          router.push('/login');
          return;
        }
        setFirstName(data.firstName ?? '');
      })
      .catch((err) => console.log(err.message));

    fetchMyEnrollments()
      .then(setEnrollments)
      .catch((err) => console.error(err));
  }, []);

  const approvedEnrollments = enrollments.filter(
    (e) => e.status === 'approved'
  );
  const continueEnrollment = approvedEnrollments[0] ?? enrollments[0] ?? null;

  return (
    <div className="flex flex-col gap-6 p-8">
      <Greeting firstName={firstName} />

      <StatsRow enrolledCount={enrollments.length} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.8fr_1fr]">
        <ContinueLearning enrollment={continueEnrollment} />
        <UpcomingSession />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
        <QuickActions />
        <MyFormations enrollments={approvedEnrollments} />
      </div>

      <RecentNotifications />
    </div>
  );
};

export default Overview;
