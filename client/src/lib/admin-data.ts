// Mock data for the admin dashboard screens that have no backing API yet
// (Analytics, Live Classes, Resources, Messages, Announcements, Settings,
// Roles & Permissions, Audit Logs). Users, Formations, and Enrollments are
// backed by the real API in `@/lib/admin-portal/api` and `@/lib/student-portal/api`.

import type { ChatMessage } from '@/app/providers/ChatProvider';

export type ActivityDot = 'green' | 'blue' | 'purple' | 'orange' | 'red' | 'gray';

export type ActivityItem = {
  id: string;
  text: string;
  time: string;
  dot: ActivityDot;
};

export const activityFeed: ActivityItem[] = [
  { id: '1', text: 'Sarah Johnson enrolled in Advanced React Patterns', time: '2m ago', dot: 'green' },
  { id: '2', text: 'Dr. Elena Voss uploaded React Hooks Guide.pdf', time: '15m ago', dot: 'purple' },
  { id: '3', text: 'New student registered: Mike Chen', time: '1h ago', dot: 'blue' },
  { id: '4', text: 'Enrollment pending: TypeScript Mastery — James Liu', time: '2h ago', dot: 'orange' },
  { id: '5', text: 'Live session completed: Code Review Session', time: '3h ago', dot: 'gray' },
  { id: '6', text: 'Student cancelled enrollment: CSS Fundamentals', time: '5h ago', dot: 'red' },
];

export type EnrollmentPoint = { date: string; count: number };

export type EnrollmentPeriod = '7d' | '30d' | '90d';

export const enrollmentChartDataByPeriod: Record<EnrollmentPeriod, EnrollmentPoint[]> = {
  '7d': [
    { date: 'Mon', count: 3 },
    { date: 'Tue', count: 5 },
    { date: 'Wed', count: 2 },
    { date: 'Thu', count: 8 },
    { date: 'Fri', count: 6 },
    { date: 'Sat', count: 4 },
    { date: 'Sun', count: 7 },
  ],
  '30d': [
    { date: 'Week 1', count: 18 },
    { date: 'Week 2', count: 24 },
    { date: 'Week 3', count: 15 },
    { date: 'Week 4', count: 29 },
  ],
  '90d': [
    { date: 'Jun', count: 64 },
    { date: 'Jul', count: 81 },
    { date: 'Aug', count: 97 },
  ],
};

export type TopFormation = { rank: number; title: string; enrollments: number };

export const topFormations: TopFormation[] = [
  { rank: 1, title: 'Data Structures & Algorithms', enrollments: 8920 },
  { rank: 2, title: 'Node.js & API Design', enrollments: 4521 },
  { rank: 3, title: 'Advanced React Patterns', enrollments: 2840 },
  { rank: 4, title: 'Cloud Architecture with AWS', enrollments: 2340 },
];

export type UpcomingSessionSummary = {
  id: string;
  title: string;
  time: string;
  instructor: string;
  attendees: string;
  status: 'Starting Soon' | 'Scheduled' | 'Live';
};

export const upcomingSessionsToday: UpcomingSessionSummary[] = [
  { id: '1', title: 'React Masterclass', time: '18:00', instructor: 'Dr. Elena Voss', attendees: '24/30', status: 'Starting Soon' },
  { id: '2', title: 'Design Systems Workshop', time: '20:00', instructor: 'Ms. Nadia Petrov', attendees: '18/25', status: 'Scheduled' },
  { id: '3', title: 'API Office Hours', time: '21:30', instructor: 'Prof. James Chen', attendees: '9/20', status: 'Scheduled' },
];

export type PendingAction = {
  id: string;
  label: string;
  count: number;
  href: string;
};

export const pendingActionsExtra: PendingAction[] = [
  { id: 'teacher-verifications', label: 'Teacher verifications', count: 1, href: '/admin/users' },
  { id: 'reported-messages', label: 'Reported messages', count: 2, href: '/admin/messages' },
  { id: 'resources-review', label: 'Resources pending review', count: 0, href: '/admin/resources' },
];

export type SparklineMetric = {
  id: string;
  label: string;
  value: string;
  change: string;
  direction: 'up' | 'down';
  data: { value: number }[];
};

export const analyticsOverview: SparklineMetric[] = [
  {
    id: 'enrollments',
    label: 'Total Enrollments',
    value: '342',
    change: '+18% vs last period',
    direction: 'up',
    data: [12, 18, 15, 22, 19, 28, 26].map((value) => ({ value })),
  },
  {
    id: 'completion',
    label: 'Completion Rate',
    value: '64%',
    change: '+5%',
    direction: 'up',
    data: [50, 54, 58, 55, 60, 62, 64].map((value) => ({ value })),
  },
  {
    id: 'attendance',
    label: 'Avg Session Attendance',
    value: '21',
    change: '-3%',
    direction: 'down',
    data: [26, 24, 25, 23, 22, 22, 21].map((value) => ({ value })),
  },
  {
    id: 'satisfaction',
    label: 'Student Satisfaction',
    value: '4.7/5',
    change: '+0.2',
    direction: 'up',
    data: [4.3, 4.4, 4.5, 4.5, 4.6, 4.6, 4.7].map((value) => ({ value })),
  },
];

export type FormationEnrollmentBar = { title: string; enrollments: number };

export const enrollmentsByFormation: FormationEnrollmentBar[] = [
  { title: 'Data Structures & Algorithms', enrollments: 8920 },
  { title: 'Node.js & API Design', enrollments: 4521 },
  { title: 'Advanced React Patterns', enrollments: 2840 },
  { title: 'Cloud Architecture with AWS', enrollments: 2340 },
  { title: 'TypeScript Mastery', enrollments: 1890 },
  { title: 'UI/UX Fundamentals', enrollments: 1245 },
];

export const progressDistribution = [
  { label: 'Not Started', value: 15, color: '#D1D5DB' },
  { label: 'In Progress', value: 55, color: '#6C3CE1' },
  { label: 'Completed', value: 30, color: '#22C55E' },
];

export type FormationPerformance = {
  id: string;
  formation: string;
  instructor: string;
  enrolled: number;
  completed: number;
  rating: number;
  status: 'Active';
};

export const formationPerformance: FormationPerformance[] = [
  { id: '1', formation: 'Advanced React Patterns', instructor: 'Dr. Elena Voss', enrolled: 2840, completed: 1816, rating: 4.8, status: 'Active' },
  { id: '2', formation: 'UI/UX Fundamentals', instructor: 'Ms. Nadia Petrov', enrolled: 1245, completed: 810, rating: 4.7, status: 'Active' },
  { id: '3', formation: 'Node.js & API Design', instructor: 'Prof. James Chen', enrolled: 4521, completed: 3255, rating: 4.9, status: 'Active' },
  { id: '4', formation: 'TypeScript Mastery', instructor: 'Dr. Elena Voss', enrolled: 1890, completed: 1096, rating: 4.6, status: 'Active' },
  { id: '5', formation: 'Data Structures & Algorithms', instructor: 'Prof. Marcus Webb', enrolled: 8920, completed: 5352, rating: 4.9, status: 'Active' },
  { id: '6', formation: 'Cloud Architecture with AWS', instructor: 'Ms. Sofia Ramirez', enrolled: 2340, completed: 1404, rating: 4.7, status: 'Active' },
];

export type AdminSession = {
  id: string;
  title: string;
  formation: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  registered: number;
  capacity: number;
  status: 'Scheduled' | 'Starting Soon' | 'Live' | 'Completed' | 'Cancelled';
};

export const adminSessions: AdminSession[] = [
  { id: '1', title: 'React Masterclass', formation: 'Advanced React Patterns', instructor: 'Dr. Elena Voss', date: 'Today', time: '18:00', duration: '1.5h', registered: 24, capacity: 30, status: 'Starting Soon' },
  { id: '2', title: 'Design Systems Workshop', formation: 'UI/UX Fundamentals', instructor: 'Ms. Nadia Petrov', date: 'Tomorrow', time: '14:00', duration: '2h', registered: 18, capacity: 25, status: 'Scheduled' },
  { id: '3', title: 'UI Component Lab', formation: 'UI/UX Fundamentals', instructor: 'Ms. Nadia Petrov', date: 'Aug 25', time: '10:00', duration: '1.5h', registered: 16, capacity: 25, status: 'Scheduled' },
  { id: '4', title: 'Code Review Session', formation: 'Advanced React Patterns', instructor: 'Dr. Elena Voss', date: 'Aug 20', time: '16:00', duration: '1h', registered: 22, capacity: 30, status: 'Completed' },
  { id: '5', title: 'AWS Deep Dive', formation: 'Cloud Architecture with AWS', instructor: 'Ms. Sofia Ramirez', date: 'Aug 15', time: '14:00', duration: '2h', registered: 20, capacity: 25, status: 'Completed' },
];

export type AdminResource = {
  id: string;
  filename: string;
  formation: string;
  uploadedBy: string;
  type: 'PDF' | 'Video' | 'Presentation' | 'Image' | 'Other';
  size: string;
  date: string;
  downloads: number;
};

export const adminResources: AdminResource[] = [
  { id: '1', filename: 'React Hooks Guide.pdf', formation: 'Advanced React Patterns', uploadedBy: 'Dr. Elena Voss', type: 'PDF', size: '2.4 MB', date: 'Aug 18, 2026', downloads: 156 },
  { id: '2', filename: 'Component Architecture Slides.pptx', formation: 'Advanced React Patterns', uploadedBy: 'Dr. Elena Voss', type: 'Presentation', size: '8.1 MB', date: 'Aug 15, 2026', downloads: 89 },
  { id: '3', filename: 'Design Tokens Cheatsheet.pdf', formation: 'UI/UX Fundamentals', uploadedBy: 'Ms. Nadia Petrov', type: 'PDF', size: '1.2 MB', date: 'Aug 12, 2026', downloads: 234 },
  { id: '4', filename: 'Figma Design System.fig', formation: 'UI/UX Fundamentals', uploadedBy: 'Ms. Nadia Petrov', type: 'Other', size: '14.7 MB', date: 'Aug 10, 2026', downloads: 67 },
  { id: '5', filename: 'State Management Overview.mp4', formation: 'Advanced React Patterns', uploadedBy: 'Dr. Elena Voss', type: 'Video', size: '245 MB', date: 'Aug 8, 2026', downloads: 312 },
  { id: '6', filename: 'Cloud Architecture Diagram.png', formation: 'Cloud Architecture with AWS', uploadedBy: 'Ms. Sofia Ramirez', type: 'Image', size: '3.6 MB', date: 'Aug 5, 2026', downloads: 45 },
  { id: '7', filename: 'API Design Best Practices.pdf', formation: 'Node.js & API Design', uploadedBy: 'Prof. James Chen', type: 'PDF', size: '3.1 MB', date: 'Aug 3, 2026', downloads: 178 },
  { id: '8', filename: 'Algorithm Complexity Cheatsheet.pdf', formation: 'Data Structures & Algorithms', uploadedBy: 'Prof. Marcus Webb', type: 'PDF', size: '0.8 MB', date: 'Aug 1, 2026', downloads: 421 },
];

export type AdminConversation = {
  id: string;
  name: string;
  initials: string;
  role: 'Teacher' | 'Group';
  formation: string;
  preview: string;
  time: string;
  unread: number;
};

export const adminConversations: AdminConversation[] = [
  { id: '1', name: 'Dr. Elena Voss', initials: 'EV', role: 'Teacher', formation: 'Advanced React Patterns', preview: 'The next live session is confirmed for...', time: '11:00 AM', unread: 1 },
  { id: '2', name: 'Ms. Nadia Petrov', initials: 'NP', role: 'Teacher', formation: 'UI/UX Fundamentals', preview: 'Can we reschedule the workshop?', time: '10:15 AM', unread: 3 },
  { id: '3', name: 'Prof. James Chen', initials: 'JC', role: 'Teacher', formation: 'Node.js & API Design', preview: 'New resource uploaded for Module 5.', time: 'Yesterday', unread: 0 },
  { id: '4', name: 'Support Requests', initials: 'SR', role: 'Group', formation: 'Platform Support', preview: 'Student reported login issue...', time: 'Yesterday', unread: 2 },
];

export const adminConversationMessages: Record<string, ChatMessage[]> = {
  '1': [
    { id: 'm1', content: 'Hi! Just confirming the room for today.', sentAt: '2026-08-28T10:40:00', sender: { id: 'ev', firstName: 'Elena', lastName: 'Voss' } },
    { id: 'm2', content: 'The next live session is confirmed for 18:00 today.', sentAt: '2026-08-28T11:00:00', sender: { id: 'ev', firstName: 'Elena', lastName: 'Voss' } },
  ],
  '2': [
    { id: 'm3', content: "Hi Admin, I'd like to move the UI/UX workshop.", sentAt: '2026-08-28T09:50:00', sender: { id: 'np', firstName: 'Nadia', lastName: 'Petrov' } },
    { id: 'm4', content: 'Can we reschedule the workshop?', sentAt: '2026-08-28T10:15:00', sender: { id: 'np', firstName: 'Nadia', lastName: 'Petrov' } },
  ],
  '3': [
    { id: 'm5', content: 'New resource uploaded for Module 5.', sentAt: '2026-08-27T16:20:00', sender: { id: 'jc', firstName: 'James', lastName: 'Chen' } },
  ],
  '4': [
    { id: 'm6', content: 'A student reported a login issue on mobile.', sentAt: '2026-08-27T14:05:00', sender: { id: 'sr', firstName: 'Support', lastName: 'Bot' } },
    { id: 'm7', content: 'Student reported login issue...', sentAt: '2026-08-27T15:00:00', sender: { id: 'sr', firstName: 'Support', lastName: 'Bot' } },
  ],
};

export type Announcement = {
  id: string;
  title: string;
  audience: 'All Users' | 'Students' | 'Teachers';
  text: string;
  date: string;
};

export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Platform Maintenance Scheduled',
    audience: 'All Users',
    text: 'The platform will undergo scheduled maintenance on Aug 30, 2026 from 2:00 AM to 6:00 AM UTC. During this time, the portal will be unavailable.',
    date: 'Aug 20, 2026',
  },
  {
    id: '2',
    title: 'New Formation: TypeScript Mastery',
    audience: 'Students',
    text: "We're excited to announce a new formation — TypeScript Mastery by Dr. Elena Voss. Enrollment is now open for all students.",
    date: 'Aug 18, 2026',
  },
  {
    id: '3',
    title: 'Updated Grading Policy',
    audience: 'Teachers',
    text: 'Please review the updated grading policy for all formations. The new rubric templates are available in your teacher dashboard.',
    date: 'Aug 15, 2026',
  },
  {
    id: '4',
    title: 'Welcome to NEXA Platform',
    audience: 'All Users',
    text: "Welcome to the NEXA Student Portal! We're thrilled to have you. Explore our formations, join live sessions, and start learning today.",
    date: 'Aug 1, 2026',
  },
];

export type AuditAction =
  | 'Login'
  | 'Enrollment Approved'
  | 'Resource Uploaded'
  | 'User Created'
  | 'Settings Changed'
  | 'Session Scheduled';

export type AuditLog = {
  id: string;
  timestamp: string;
  user: string;
  action: AuditAction;
  details: string;
  ip: string;
};

export const auditLogs: AuditLog[] = [
  { id: '1', timestamp: 'Aug 28, 2026, 18:15', user: 'Admin', action: 'Settings Changed', details: 'Updated auto-approve enrollments', ip: '192.168.1.1' },
  { id: '2', timestamp: 'Aug 28, 2026, 17:42', user: 'Dr. Elena Voss', action: 'Resource Uploaded', details: 'React Hooks Guide.pdf', ip: '10.0.0.15' },
  { id: '3', timestamp: 'Aug 28, 2026, 16:30', user: 'Admin', action: 'Enrollment Approved', details: 'Alex Morgan → Advanced React Patterns', ip: '192.168.1.1' },
  { id: '4', timestamp: 'Aug 28, 2026, 15:10', user: 'Ms. Nadia Petrov', action: 'Session Scheduled', details: 'Design Systems Workshop — Aug 29', ip: '10.0.0.22' },
  { id: '5', timestamp: 'Aug 28, 2026, 14:00', user: 'Mike Chen', action: 'Login', details: 'Successful login', ip: '172.16.0.5' },
  { id: '6', timestamp: 'Aug 28, 2026, 12:45', user: 'Admin', action: 'User Created', details: 'New teacher: Prof. Marcus Webb', ip: '192.168.1.1' },
  { id: '7', timestamp: 'Aug 28, 2026, 11:30', user: 'Sarah Johnson', action: 'Login', details: 'Successful login', ip: '172.16.0.8' },
  { id: '8', timestamp: 'Aug 28, 2026, 10:00', user: 'Admin', action: 'Enrollment Approved', details: 'Sarah Johnson → Data Structures & Algorithms', ip: '192.168.1.1' },
];

export type RolePermission = {
  label: string;
  student: boolean;
  teacher: boolean;
  admin: boolean;
};

export const rolePermissions: RolePermission[] = [
  { label: 'View formations', student: true, teacher: true, admin: true },
  { label: 'Enroll in formations', student: true, teacher: false, admin: true },
  { label: 'Create formations', student: false, teacher: true, admin: true },
  { label: 'Manage enrollments', student: false, teacher: false, admin: true },
  { label: 'Upload resources', student: false, teacher: true, admin: true },
  { label: 'Schedule live sessions', student: false, teacher: true, admin: true },
  { label: 'Manage users', student: false, teacher: false, admin: true },
  { label: 'View analytics', student: false, teacher: true, admin: true },
  { label: 'Platform settings', student: false, teacher: false, admin: true },
  { label: 'Send announcements', student: false, teacher: false, admin: true },
];

export type EmailTemplate = {
  id: string;
  name: string;
  lastEdited: string;
  body: string;
};

export const emailTemplates: EmailTemplate[] = [
  {
    id: 'welcome',
    name: 'Welcome Email',
    lastEdited: 'Aug 10, 2026',
    body: 'Hi {{student_name}},\n\nWelcome to NEXA! We are excited to have you on board.',
  },
  {
    id: 'enrollment-approved',
    name: 'Enrollment Approved',
    lastEdited: 'Aug 8, 2026',
    body: 'Hi {{student_name}},\n\nYour enrollment in {{formation_title}} has been approved. See you in class!',
  },
  {
    id: 'enrollment-rejected',
    name: 'Enrollment Rejected',
    lastEdited: 'Aug 8, 2026',
    body: 'Hi {{student_name}},\n\nUnfortunately your enrollment request for {{formation_title}} was not approved.',
  },
  {
    id: 'session-reminder',
    name: 'Session Reminder',
    lastEdited: 'Jul 30, 2026',
    body: 'Hi {{student_name}},\n\nThis is a reminder that {{formation_title}} starts soon.',
  },
  {
    id: 'password-reset',
    name: 'Password Reset',
    lastEdited: 'Jul 20, 2026',
    body: 'Hi {{student_name}},\n\nClick the link below to reset your password.',
  },
];

export type NotificationSetting = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};

export const notificationSettings: NotificationSetting[] = [
  { id: 'new-enrollment', label: 'New enrollment request', description: 'Get notified when a student requests to join a formation.', enabled: true },
  { id: 'enrollment-decision', label: 'Enrollment approved/rejected', description: 'Get notified when an enrollment request is decided.', enabled: true },
  { id: 'new-user', label: 'New user registration', description: 'Get notified when a new student or teacher registers.', enabled: true },
  { id: 'session-reminders', label: 'Live session reminders', description: 'Get notified before a scheduled live session starts.', enabled: false },
  { id: 'resource-uploads', label: 'Resource uploads', description: 'Get notified when a teacher uploads a new resource.', enabled: false },
  { id: 'system-alerts', label: 'System alerts', description: 'Get notified about platform-wide issues or incidents.', enabled: true },
];

export const defaultPlatformSettings = {
  platformName: 'NEXA',
  platformUrl: 'https://nexa.edu',
  supportEmail: 'support@nexa.edu',
  language: 'English',
  timezone: 'UTC',
  maxEnrollments: 5,
  autoApproveEnrollments: false,
  maintenanceMode: false,
};
