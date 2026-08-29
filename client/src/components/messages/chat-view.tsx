'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MessageBubble } from './message-bubble';
import { MessageInput } from './message-input';
import type { ChatMessage, Course } from '@/app/providers/ChatProvider';
import type { Socket } from 'socket.io-client';

function initialsOf(title?: string) {
  return (title || '?')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function ChatView({
  selectedCourse,
  messages,
  setMessages,
  chatNamespace,
  currentUserId,
  isLoading,
  setIsLoading,
}: {
  selectedCourse: Course | null;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  chatNamespace: React.RefObject<Socket | null>;
  currentUserId: string;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length]);

  if (!selectedCourse) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-[#9CA3AF]">
        Select a conversation to start chatting.
      </div>
    );
  }

  const title = selectedCourse.chat?.name || selectedCourse.title || 'Chat';

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center justify-between border-b px-6 py-3">
        <div className="flex items-center gap-3">
          <Avatar>
            {selectedCourse.file?.url && (
              <AvatarImage src={selectedCourse.file.url} />
            )}
            <AvatarFallback className="bg-[#F3EEFF] text-[#6C3CE1]">
              {initialsOf(title)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-[15px] font-bold text-[#1A1A2E]">{title}</p>
            <p className="text-xs text-[#9CA3AF]">Group chat</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex size-8 items-center justify-center rounded-full text-[#6B7280] hover:bg-[#F3EEFF] hover:text-[#6C3CE1]">
              <MoreHorizontal size={18} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/course_details/${selectedCourse.id}`}>
                View Formation
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
        {messages.map((message, index) => {
          const prev = messages[index - 1];
          const showSender =
            !prev || prev.sender?.id !== message.sender?.id;

          return (
            <MessageBubble
              key={message.id}
              message={message}
              isMine={message.sender?.id === currentUserId}
              showSender={showSender}
            />
          );
        })}
        <div ref={bottomRef} />
      </div>

      <MessageInput
        messages={messages}
        setMessages={setMessages}
        chatNamespace={chatNamespace}
        selectedCourse={selectedCourse}
        chatId={selectedCourse.chat?.id}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}
