export type Teacher = {
  user: { firstName: string; lastName: string };
};

export type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  teacher: Teacher;
};

export type Enrollment = {
  id: string;
  enrollmentDate: string;
  status: 'pending' | 'approved' | 'rejected';
  course: Course;
};

export type EnrollmentStatus = {
  isEnrolled: boolean;
  status?: 'pending' | 'approved' | 'rejected';
};

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
}

export async function fetchCourses(search = ''): Promise<Course[]> {
  const response = await fetch(`${BASE_URL}/api/v1/courses?${search}`, {
    method: 'GET',
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error('Failed to load courses');
  const { data } = await response.json();
  return data;
}

export async function fetchMyEnrollments(): Promise<Enrollment[]> {
  const response = await fetch(`${BASE_URL}/api/v1/courses/enrollments/me`, {
    method: 'GET',
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error('Failed to load enrollments');
  const { data } = await response.json();
  return data;
}

export async function fetchEnrollmentStatus(
  courseId: string
): Promise<EnrollmentStatus> {
  const response = await fetch(
    `${BASE_URL}/api/v1/courses/${courseId}/enrollments/status`,
    { method: 'GET', headers: authHeaders() }
  );
  if (!response.ok) throw new Error('Failed to load enrollment status');
  const { data } = await response.json();
  return data;
}

export async function enrollInCourse(courseId: string) {
  const response = await fetch(
    `${BASE_URL}/api/v1/courses/${courseId}/enrollments`,
    { method: 'POST', headers: authHeaders() }
  );
  if (!response.ok) throw new Error('Failed to enroll');
  const { data } = await response.json();
  return data;
}

export async function cancelEnrollment(enrollmentId: string) {
  const response = await fetch(
    `${BASE_URL}/api/v1/courses/enrollments/${enrollmentId}`,
    {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ enrollmentStatus: 'rejected' }),
    }
  );
  if (!response.ok) throw new Error('Failed to cancel enrollment');
  const { data } = await response.json();
  return data;
}
