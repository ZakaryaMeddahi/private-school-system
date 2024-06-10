'use client';

import Overview from '@/Pages/Overview';
import Loading from '@/components/Loading';

const TeacherDashboard = () => {
  return (
    <div>
      <Loading page='/teacher_dashboard/my_courses' />
    </div>
    // <Overview />
  );
};

export default TeacherDashboard;
