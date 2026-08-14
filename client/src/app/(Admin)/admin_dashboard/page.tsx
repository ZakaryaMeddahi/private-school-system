'use client';

import Overview from '@/views/Overview';
import Loading from '@/components/Loading';

const AdminDashboard = () => {
  return (
    <div>
      <Loading page='/admin_dashboard/teachers'/>
    </div>
    // <Overview />
  );
};

export default AdminDashboard;
