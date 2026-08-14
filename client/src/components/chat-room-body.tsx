'use client';

import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from 'react';
import Message from './Message';
import { Socket } from 'socket.io-client';
import { ChatMessage, Course } from '@/app/providers/ChatProvider';

interface RoomBodyProps {
  messages: ChatMessage[];
  pinnedMessages: ChatMessage[];
  setPinnedMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  chatNamespace: RefObject<Socket | null>;
  selectedCourse: Course | null;
  chatId?: string;
  isChatSession?: boolean;
}

const RoomBody = ({
  messages,
  pinnedMessages,
  setPinnedMessages,
  chatNamespace,
  selectedCourse,
  chatId,
  isChatSession,
}: RoomBodyProps) => {
  const chatRef = useRef<HTMLDivElement | null>(null);
  const userIdRef = useRef<string | null>(null);
  useEffect(() => {
    console.log(chatRef);
    userIdRef.current = localStorage.getItem('userId');
    // const chat = document.getElementById('chat');
    // chat.scrollTop = 700;
  }, []);

  return (
    <div className="flex h-[82%] w-full flex-col gap-3.75 overflow-y-auto rounded-[15px] bg-white px-5 pt-5 shadow-[rgba(0,0,0,0.24)_0px_3px_8px]">
      {messages.map((msg) => {
        return (
          <Message
            key={msg.id}
            msg={msg}
            userIdRef={userIdRef}
            isPinned={false}
            pinnedMessages={pinnedMessages}
            setPinnedMessages={setPinnedMessages}
            chatNamespace={chatNamespace}
            selectedCourse={selectedCourse}
            chatId={chatId}
            isChatSession={isChatSession}
            chatRef={chatRef}
          />
        );
      })}
    </div>
  );
};

export default RoomBody;
