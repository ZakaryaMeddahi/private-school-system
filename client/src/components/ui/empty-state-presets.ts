import {
  Award,
  BellOff,
  BookOpen,
  Calendar,
  ClipboardList,
  Compass,
  FileText,
  FolderOpen,
  ListChecks,
  MessageSquare,
  Rocket,
  Target,
  Video,
} from "lucide-react"

import type { EmptyStateProps } from "@/components/ui/empty-state"

export const emptyStatePresets = {
  exploreFormations: {
    icon: BookOpen,
    variant: "purple",
    title: "No formations available yet",
    description:
      "New formations are being prepared. Check back soon or explore other learning resources in the meantime.",
    hints: [
      // {
      //   icon: FileText,
      //   label: "Browse resources",
      //   href: "/student_dashboard/resources",
      // },
      // {
      //   icon: MessageSquare,
      //   label: "Ask a question",
      //   href: "/student_dashboard/messages",
      // },
      // {
      //   icon: Calendar,
      //   label: "Live classes",
      //   href: "/student_dashboard/live_classes",
      // },
    ],
  },
  myLearning: {
    icon: Rocket,
    variant: "teal",
    title: "Start your learning journey",
    description:
      "You haven't enrolled in any formations yet. Browse the catalog to find courses that match your goals.",
    // action: {
    //   label: "Explore courses",
    //   icon: Compass,
    //   href: "/student_dashboard/course",
    // },
    steps: [
      // {
      //   icon: Target,
      //   iconColor: "text-purple-600",
      //   title: "Set your goals",
      //   description: "Define what skills you want to develop.",
      // },
      // {
      //   icon: ListChecks,
      //   iconColor: "text-teal-600",
      //   title: "Enroll in a course",
      //   description: "Pick a formation that fits your schedule.",
      // },
      // {
      //   icon: Award,
      //   iconColor: "text-amber-600",
      //   title: "Earn your certificate",
      //   description: "Complete lessons and track your progress.",
      // },
    ],
  },
  enrollments: {
    icon: ClipboardList,
    variant: "blue",
    title: "No enrollments yet",
    description:
      "Once you request to join a formation, its enrollment status will show up here.",
    // action: {
    //   label: "Explore courses",
    //   icon: Compass,
    //   href: "/student_dashboard/course",
    // },
  },
  messages: {
    icon: MessageSquare,
    variant: "purple",
    title: "No conversations yet",
    description:
      "Messages from your teachers and classmates will appear here once a conversation starts.",
    hints: [
      // {
      //   icon: BookOpen,
      //   label: "Explore courses",
      //   href: "/student_dashboard/course",
      // },
      // {
      //   icon: Calendar,
      //   label: "Live classes",
      //   href: "/student_dashboard/live_classes",
      // },
    ],
  },
  resources: {
    icon: FolderOpen,
    variant: "amber",
    title: "No resources available yet",
    description:
      "Course materials, slides, and files shared by your teachers will show up here.",
    // action: {
    //   label: "Explore courses",
    //   icon: Compass,
    //   href: "/student_dashboard/course",
    // },
  },
  liveClasses: {
    icon: Video,
    variant: "rose",
    title: "No live classes scheduled",
    description:
      "When a teacher schedules a live session for one of your formations, it will appear here.",
    // action: {
    //   label: "Explore courses",
    //   icon: Compass,
    //   href: "/student_dashboard/course",
    // },
  },
  notifications: {
    icon: BellOff,
    variant: "gray",
    title: "You're all caught up",
    description: "You have no notifications right now. Check back later.",
  },
} as const satisfies Record<string, EmptyStateProps>
