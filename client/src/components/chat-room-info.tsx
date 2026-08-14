'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useRef } from 'react';
import Message from './Message';
import { Socket } from 'socket.io-client';
import {
  ChatMessage,
  Course,
  CourseMember,
} from '@/app/providers/ChatProvider';
import { Dispatch, SetStateAction, RefObject } from 'react';

interface RoomInfoProps {
  teacherInfo: CourseMember | Record<string, never>;
  members: CourseMember[];
  pinnedMessages: ChatMessage[];
  setPinnedMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  chatNamespace: RefObject<Socket | null>;
  selectedCourse: Course | null;
}

const RoomInfo = ({
  teacherInfo,
  members,
  pinnedMessages,
  setPinnedMessages,
  chatNamespace,
  selectedCourse,
}: RoomInfoProps) => {
  const userIdRef = useRef<string | null>(null);
  console.log('====================================');
  console.log('FROM RoomInfo : ', teacherInfo);
  console.log('====================================');
  console.log('====================================');
  console.log('====================================');
  console.log('====================================');
  console.log('FROM RoomInfo : ', pinnedMessages);
  console.log('====================================');
  console.log('====================================');
  console.log('====================================');

  useEffect(() => {
    userIdRef.current = localStorage.getItem('userId');
  });

  return (
    <div>
      <Tabs defaultValue='pinned' className="mt-5">
        <TabsList className="mb-1.25 h-17.5 w-full">
          <TabsTrigger value='pinned'>Pinned Resources</TabsTrigger>
          <TabsTrigger value='members'>Members</TabsTrigger>
        </TabsList>
        <TabsContent value='pinned' className="h-[calc(100vh-95px)] overflow-y-auto">
          {pinnedMessages.map((msg) => {
            return (
              <Message
                key={msg.id}
                msg={msg}
                userIdRef={userIdRef}
                isPinned={true}
                pinnedMessages={pinnedMessages}
                setPinnedMessages={setPinnedMessages}
                chatNamespace={chatNamespace}
                selectedCourse={selectedCourse}
              />
            );
          })}
        </TabsContent>
        <TabsContent value='members'>
          {selectedCourse?.teacher && (
            <div
              key={selectedCourse.teacher.id}
              className="flex w-full cursor-pointer flex-row items-center justify-between gap-3.75 rounded-[10px] p-2.5 hover:bg-gray-100"
            >
              <div className="flex flex-row items-center gap-2">
                <img
                  className="size-8.75 rounded-full border-[1.2px] border-blue-500 object-cover"
                  src={selectedCourse.teacher.profilePicture || './logo.png'}
                  alt={
                    selectedCourse.teacher.user.firstName +
                    ' ' +
                    selectedCourse.teacher.user.lastName
                  }
                />
                <span className="text-sm font-semibold">
                  {selectedCourse.teacher.user.firstName +
                    ' ' +
                    selectedCourse.teacher.user.lastName}
                </span>
              </div>
              <span className="rounded bg-blue-500 p-1.25 text-[11px] text-white">
                TEACHER
              </span>
            </div>
          )}

          {members.map((member) => {
            return (
              <div
                key={member.id}
                className="flex w-full cursor-pointer flex-row items-center gap-3.75 rounded-[10px] p-2.5 hover:bg-gray-100"
              >
                <img
                  className="size-8.75 rounded-full border-[1.2px] border-blue-500 object-cover"
                  src={member.profilePicture || './logo.png'}
                  alt={member.user.firstName + ' ' + member.user.lastName}
                />
                <span className="text-sm font-semibold">
                  {member.user.firstName + ' ' + member.user.lastName}
                </span>
              </div>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RoomInfo;
