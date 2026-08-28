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
