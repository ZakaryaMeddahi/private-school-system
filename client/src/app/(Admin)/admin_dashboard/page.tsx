'use client';

import { useEffect, useState } from 'react';
import { Greeting } from '@/components/dashboard/greeting';
import { AdminStatsRow } from '@/components/admin-dashboard/stats-row';
import { AdminQuickActions } from '@/components/admin-dashboard/quick-actions';
import { PendingRequests } from '@/components/admin-dashboard/pending-requests';
import {
  fetchAllEnrollments,
  fetchStudents,
  fetchTeachers,
  type AdminEnrollment,
} from '@/lib/admin-portal/api';
import { fetchCourses } from '@/lib/student-portal/api';

const AdminDashboard = () => {
  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [enrollments, setEnrollments] = useState<AdminEnrollment[]>([]);

  useEffect(() => {
    fetchTeachers()
      .then((teachers) => setTeacherCount(teachers.length))
      .catch((err) => console.error(err));

    fetchStudents()
      .then((students) => setStudentCount(students.length))
      .catch((err) => console.error(err));

    fetchCourses()
      .then((courses) => setCourseCount(courses.length))
      .catch((err) => console.error(err));

    fetchAllEnrollments()
      .then((data) =>
        setEnrollments(data.filter((e) => e.enrollmentStatus === 'pending'))
      )
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-col gap-6 p-8">
      <Greeting
        firstName=""
        subtitle="Here's an overview of your school today."
      />

      <AdminStatsRow
        teacherCount={teacherCount}
        studentCount={studentCount}
        courseCount={courseCount}
        pendingCount={enrollments.length}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
        <AdminQuickActions />
        <PendingRequests enrollments={enrollments} />
      </div>
    </div>
  );
};

export default AdminDashboard;
