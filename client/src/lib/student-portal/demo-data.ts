// Demo content for dashboard sections that have no backing API yet
// (live session scheduling, lesson-level progress, resources, notifications).
// Everything else in the student portal (identity, courses, enrollments) is live.

export const courseThumbnails = [
  '/Frontend-unsplash.jpg',
  '/backend-unsplash.jpg',
  '/ui-ux-unsplash.jpg',
  '/arduino-unsplash.jpg',
  '/teacher-unsplash.jpg',
  '/appMobile-unsplash.jpg',
];

export function thumbnailFor(id: string) {
  const index = Math.abs(hashCode(id)) % courseThumbnails.length;
  return courseThumbnails[index];
}

function hashCode(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

const demoProgressCycle = [68, 35, 12, 54, 80, 24];

export function demoProgressFor(id: string) {
  return demoProgressCycle[Math.abs(hashCode(id)) % demoProgressCycle.length];
}

const demoLessonTotalsCycle = [18, 24, 36, 20, 30, 15];

export function demoLessonsFor(id: string) {
  const total =
    demoLessonTotalsCycle[Math.abs(hashCode(id)) % demoLessonTotalsCycle.length];
  const progress = demoProgressFor(id);
  const completed = Math.round((total * progress) / 100);
  return { completed, total };
}

const demoLastAccessedCycle = [
  'Today, 10:32 AM',
  'Yesterday',
  '3 days ago',
  'Aug 18',
  'Last week',
];

export function demoLastAccessedFor(id: string) {
  return demoLastAccessedCycle[
    Math.abs(hashCode(id + 'accessed')) % demoLastAccessedCycle.length
  ];
}

export function progressColor(progress: number) {
  if (progress >= 60) return '#22C55E';
  if (progress >= 30) return '#F59E0B';
  return '#6C3CE1';
}

export const demoStats = {
  completed: 2,
  overallProgress: 68,
  liveSessions: 12,
  resources: 34,
};

export const demoUpcomingSession = {
  title: 'React Masterclass',
  formation: 'Advanced React Patterns',
  instructor: 'Dr. Elena Voss',
  date: 'Today',
  time: '18:00 — 19:30',
};

export type LiveSession = {
  id: string;
  title: string;
  formation: string;
  instructor: string;
  initials: string;
  avatarBg: string;
  date: string;
  time: string;
  attendees: number;
  startsIn?: string;
  status: 'upcoming' | 'live' | 'completed';
};

export const demoLiveSessions: LiveSession[] = [
  {
    id: 'ls1',
    title: 'React Masterclass',
    formation: 'Advanced React Patterns',
    instructor: 'Dr. Elena Voss',
    initials: 'EV',
    avatarBg: '#F3EEFF',
    date: 'Today',
    time: '18:00',
    attendees: 24,
    startsIn: '1h 24m',
    status: 'upcoming',
  },
  {
    id: 'ls2',
    title: 'Design Systems Workshop',
    formation: 'UI/UX Fundamentals',
    instructor: 'Ms. Nadia Petrov',
    initials: 'NP',
    avatarBg: '#E5EEFF',
    date: 'Tomorrow',
    time: '14:00',
    attendees: 18,
    startsIn: 'Tomorrow',
    status: 'upcoming',
  },
  {
    id: 'ls3',
    title: 'UI Component Lab',
    formation: 'UI/UX Fundamentals',
    instructor: 'Ms. Nadia Petrov',
    initials: 'NP',
    avatarBg: '#E5EEFF',
    date: 'Aug 25',
    time: '10:00',
    attendees: 16,
    startsIn: '3 days',
    status: 'upcoming',
  },
  {
    id: 'ls4',
    title: 'Code Review Session',
    formation: 'Advanced React Patterns',
    instructor: 'Dr. Elena Voss',
    initials: 'EV',
    avatarBg: '#F3EEFF',
    date: 'Aug 20',
    time: '16:00',
    attendees: 22,
    status: 'completed',
  },
  {
    id: 'ls5',
    title: 'AWS Deep Dive',
    formation: 'Cloud Architecture with AWS',
    instructor: 'Ms. Sofia Ramirez',
    initials: 'SR',
    avatarBg: '#FFF6DB',
    date: 'Aug 15',
    time: '14:00',
    attendees: 20,
    status: 'completed',
  },
];

export type ResourceType = 'pdf' | 'presentation' | 'video' | 'image' | 'other';

export type Resource = {
  id: string;
  filename: string;
  formation: string;
  type: ResourceType;
  size: string;
  instructor: string;
  date: string;
};

export const demoResources: Resource[] = [
  {
    id: 'r1',
    filename: 'React Hooks Guide.pdf',
    formation: 'Advanced React Patterns',
    type: 'pdf',
    size: '2.4 MB',
    instructor: 'Dr. Elena Voss',
    date: 'Aug 18, 2026',
  },
  {
    id: 'r2',
    filename: 'Component Architecture Slides.pptx',
    formation: 'Advanced React Patterns',
    type: 'presentation',
    size: '8.1 MB',
    instructor: 'Dr. Elena Voss',
    date: 'Aug 15, 2026',
  },
  {
    id: 'r3',
    filename: 'Design Tokens Cheatsheet.pdf',
    formation: 'UI/UX Fundamentals',
    type: 'pdf',
    size: '1.2 MB',
    instructor: 'Ms. Nadia Petrov',
    date: 'Aug 12, 2026',
  },
  {
    id: 'r4',
    filename: 'Figma Design System.fig',
    formation: 'UI/UX Fundamentals',
    type: 'other',
    size: '14.7 MB',
    instructor: 'Ms. Nadia Petrov',
    date: 'Aug 10, 2026',
  },
  {
    id: 'r5',
    filename: 'State Management Overview.mp4',
    formation: 'Advanced React Patterns',
    type: 'video',
    size: '245 MB',
    instructor: 'Dr. Elena Voss',
    date: 'Aug 8, 2026',
  },
  {
    id: 'r6',
    filename: 'Cloud Architecture Diagram.png',
    formation: 'Cloud Architecture with AWS',
    type: 'image',
    size: '3.6 MB',
    instructor: 'Ms. Sofia Ramirez',
    date: 'Aug 5, 2026',
  },
];

export const demoNotifications = [
  {
    text: 'Your enrollment request has been submitted for review.',
    time: '2h ago',
  },
  { text: 'React Masterclass starts in 30 minutes.', time: '5h ago' },
  {
    text: 'A new resource was posted: React Hooks Guide.pdf',
    time: '1d ago',
  },
];
