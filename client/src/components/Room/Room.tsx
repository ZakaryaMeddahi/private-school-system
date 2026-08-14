'use client';

import { useRef } from 'react';
import { Course, CourseMember } from '@/app/providers/ChatProvider';

interface RoomProps {
  RoomName?: string;
  image?: string;
  hover?: boolean;
  course: Course;
  setSelectedCourse: (course: Course) => void;
  setTeacherInfo: (teacher: CourseMember | Record<string, never>) => void;
  fetchMessages: (courseId: string, chatId?: string) => void;
  fetchChatMembers: (courseId: string) => void;
  switchRoom: (chatId?: string) => void;
}

const Room = ({
  RoomName,
  image,
  hover,
  course,
  setSelectedCourse,
  setTeacherInfo,
  fetchMessages,
  fetchChatMembers,
  switchRoom,
}: RoomProps) => {
  const boxRef = useRef<HTMLDivElement>(null);

  const RoomFocus = () => {
    if (boxRef.current) {
      console.log(boxRef.current.style);
      boxRef.current.style.backgroundColor = 'rgba(115, 191, 224, 0.25)';
      console.log('Room Focused');
    }
  };

  return (
    <div
      ref={boxRef}
      className={`cursor-pointer rounded-[7px] p-3.75 text-black ${hover ? 'hover:bg-[rgba(128,128,128,0.15)]' : ''}`}
      onClick={() => {
        setSelectedCourse(course);
        setTeacherInfo(course.teacher || {});
        fetchMessages(course.id, course.chat?.id);
        fetchChatMembers(course.id);
        switchRoom(course.chat?.id);
      }}
    >
      <div className="flex flex-row items-center gap-3.75">
        <img
          className="size-8.75 rounded-full object-cover"
          src={image}
          alt={RoomName}
        />
        <span className="text-sm">{RoomName}</span>
      </div>
    </div>
  );
};

export default Room;
