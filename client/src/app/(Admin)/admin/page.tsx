'use client';

import { useEffect, useState } from 'react';
import { Users, UserCheck, GraduationCap, ClipboardList, Video, FolderOpen } from 'lucide-react';
import { Greeting } from '@/components/dashboard/greeting';
import { KpiCard } from '@/components/admin/dashboard/kpi-card';
import { EnrollmentChart } from '@/components/admin/dashboard/enrollment-chart';
import { ActivityFeed } from '@/components/admin/dashboard/activity-feed';
import { UpcomingSessions } from '@/components/admin/dashboard/upcoming-sessions';
import { TopFormations } from '@/components/admin/dashboard/top-formations';
import { PendingActions } from '@/components/admin/dashboard/pending-actions';
import { fetchAllEnrollments, fetchStudents, fetchTeachers } from '@/lib/admin-portal/api';
import { fetchCourses } from '@/lib/student-portal/api';

const AdminDashboard = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    fetchStudents().then((students) => setStudentCount(students.length)).catch(console.error);
    fetchTeachers().then((teachers) => setTeacherCount(teachers.length)).catch(console.error);
    fetchCourses().then((courses) => setCourseCount(courses.length)).catch(console.error);
    fetchAllEnrollments()
      .then((enrollments) =>
        setPendingCount(
          enrollments.filter((e) => e.enrollmentStatus === 'pending').length
        )
      )
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-col gap-6 p-8">
      <Greeting
        firstName="Admin"
        subtitle="Here's what's happening on the platform today."
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        <KpiCard
          label="Total Students"
          value={studentCount}
          icon={Users}
          iconBg="#F3EEFF"
          iconColor="text-[#6C3CE1]"
        />
        <KpiCard
          label="Total Teachers"
          value={teacherCount}
          icon={UserCheck}
          iconBg="#E5EEFF"
          iconColor="text-[#3B82F6]"
        />
        <KpiCard
          label="Active Formations"
          value={courseCount}
          icon={GraduationCap}
          iconBg="#FFF1E0"
          iconColor="text-[#F59E0B]"
        />
        <KpiCard
          label="Pending Enrollments"
          value={pendingCount}
          icon={ClipboardList}
          iconBg="#FFF6DB"
          iconColor="text-[#EAB308]"
          trend={
            pendingCount > 0
              ? { text: 'Needs attention', direction: 'attention' }
              : { text: 'All caught up', direction: 'neutral' }
          }
        />
        <KpiCard
          label="Live Sessions Today"
          value={3}
          icon={Video}
          iconBg="#FDE8E8"
          iconColor="text-[#EF4444]"
        />
        <KpiCard
          label="Total Resources"
          value={34}
          icon={FolderOpen}
          iconBg="#F1F2F4"
          iconColor="text-[#6B7280]"
          trend={{ text: '+8 this week', direction: 'up' }}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        <EnrollmentChart />
        <ActivityFeed />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <UpcomingSessions />
        <TopFormations />
        <PendingActions pendingEnrollments={pendingCount} />
      </div>
    </div>
  );
};

export default AdminDashboard;
