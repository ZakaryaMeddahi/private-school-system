export type AdminRole = 'student' | 'teacher' | 'admin';

export type AdminUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  role: AdminRole;
  isActive: boolean;
  lastLogging?: string;
  createdAt: string;
  updatedAt: string;
  profilePicture?: string;
};

export type EnrollmentStatus = 'pending' | 'approved' | 'rejected';

export type AdminEnrollment = {
  id: string;
  enrollmentDate: string;
  enrollmentStatus: EnrollmentStatus;
  student: { user: { firstName: string; lastName: string; email: string } };
  course: { id: string; title: string };
};

export type NewTeacherInput = {
  firstName: string;
  lastName: string;
  email: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
}

async function unwrap<T>(response: Response, fallbackMessage: string): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new HttpError(body?.message || fallbackMessage, response.status);
  }
  const { data } = await response.json();
  return data;
}

export class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function fetchTeachers(search = ''): Promise<AdminUser[]> {
  const response = await fetch(
    `${BASE_URL}/api/v1/teachers?search=${encodeURIComponent(search)}`,
    { method: 'GET', headers: authHeaders() }
  );
  return unwrap(response, 'Failed to load teachers');
}

export async function createTeacher(input: NewTeacherInput): Promise<AdminUser> {
  const response = await fetch(`${BASE_URL}/api/v1/teachers`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(input),
  });
  return unwrap(response, 'Failed to create teacher');
}

export async function deleteTeacher(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/v1/teachers/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  await unwrap(response, 'Failed to delete teacher');
}

export async function fetchStudents(search = ''): Promise<AdminUser[]> {
  const response = await fetch(
    `${BASE_URL}/api/v1/students?search=${encodeURIComponent(search)}`,
    { method: 'GET', headers: authHeaders() }
  );
  return unwrap(response, 'Failed to load students');
}

export async function deleteStudent(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/v1/students/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  await unwrap(response, 'Failed to delete student');
}

export async function fetchAllEnrollments(): Promise<AdminEnrollment[]> {
  const response = await fetch(`${BASE_URL}/api/v1/courses/enrollments`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return unwrap(response, 'Failed to load enrollment requests');
}

export async function updateEnrollmentStatus(
  id: string,
  enrollmentStatus: EnrollmentStatus
): Promise<AdminEnrollment> {
  const response = await fetch(
    `${BASE_URL}/api/v1/courses/enrollments/${id}`,
    {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ enrollmentStatus }),
    }
  );
  return unwrap(response, 'Failed to update enrollment request');
}
