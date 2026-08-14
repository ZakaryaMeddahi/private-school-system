'use client';

import React, { createContext, useState, useRef, ReactNode } from 'react';

export interface ChatUser {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  biography?: string;
}

export interface CourseMember {
  id: string;
  role?: string;
  profilePicture?: string;
  user: ChatUser;
}

export interface ChatRoomRef {
  id: string;
  name?: string;
}

export interface Course {
  id: string;
  title?: string;
  teacher?: CourseMember;
  chat?: ChatRoomRef;
  rooms?: { id: string }[];
  file?: { url: string };
}

export interface ChatFile {
  url: string;
  name?: string;
  format?: string;
}

export interface ChatMessage {
  id: string;
  content?: string;
  isPinned?: boolean;
  sentAt?: string;
  sender?: {
    id: string;
    firstName: string;
    lastName: string;
    role?: string;
  };
  file?: ChatFile;
}

export interface ChatContextType {
  roomInfoRef: React.RefObject<HTMLDivElement>;
  chatRef: React.RefObject<HTMLDivElement>;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  selectedCourse: Course | null;
  setSelectedCourse: React.Dispatch<React.SetStateAction<Course | null>>;
  teacherInfo: CourseMember | Record<string, never>;
  setTeacherInfo: React.Dispatch<
    React.SetStateAction<CourseMember | Record<string, never>>
  >;
  members: CourseMember[];
  setMembers: React.Dispatch<React.SetStateAction<CourseMember[]>>;
  pinnedMessages: ChatMessage[];
  setPinnedMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export const ChatContext = createContext<ChatContextType>({
  roomInfoRef: { current: null },
  chatRef: { current: null },
  messages: [],
  setMessages: () => {},
  courses: [],
  setCourses: () => {},
  selectedCourse: null,
  setSelectedCourse: () => {},
  teacherInfo: {},
  setTeacherInfo: () => {},
  members: [],
  setMembers: () => {},
  pinnedMessages: [],
  setPinnedMessages: () => {},
});

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const chatRef = useRef<HTMLDivElement>(null);
  const roomInfoRef = useRef<HTMLDivElement>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [teacherInfo, setTeacherInfo] = useState<
    CourseMember | Record<string, never>
  >({});
  const [members, setMembers] = useState<CourseMember[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pinnedMessages, setPinnedMessages] = useState<ChatMessage[]>([]);

  return (
    <ChatContext.Provider
      value={{
        roomInfoRef,
        chatRef,
        messages,
        setMessages,
        courses,
        setCourses,
        selectedCourse,
        setSelectedCourse,
        teacherInfo,
        setTeacherInfo,
        members,
        setMembers,
        pinnedMessages,
        setPinnedMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
