'use client';

import { useState } from 'react';
import { Flag, MoreHorizontal, ShieldAlert, VolumeX } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MessageBubble } from '@/components/messages/message-bubble';
import { cn } from '@/lib/utils';
import { adminConversationMessages, adminConversations } from '@/lib/admin-data';

const AdminMessagesPage = () => {
  const [selectedId, setSelectedId] = useState(adminConversations[0]?.id ?? '');
  const selected = adminConversations.find((c) => c.id === selectedId);
  const messages = selected ? adminConversationMessages[selected.id] ?? [] : [];

  return (
    <div className="flex h-full">
      <div className="w-full max-w-100 shrink-0 border-r border-gray-200">
        <div className="border-b border-gray-100 px-4 py-3">
          <p className="text-sm font-bold text-[#1A1A2E]">Conversations</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {adminConversations.map((conversation) => {
            const active = conversation.id === selectedId;
            return (
              <button
                key={conversation.id}
                onClick={() => setSelectedId(conversation.id)}
                className={cn(
                  'flex w-full items-center gap-3 border-l-[3px] border-transparent px-4 py-3 text-left transition-colors hover:bg-gray-50',
                  active && 'border-[#6C3CE1] bg-[#6C3CE1]/5'
                )}
              >
                <Avatar className="size-11 shrink-0">
                  <AvatarFallback className="bg-[#F3EEFF] text-[#6C3CE1]">
                    {conversation.initials}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-[#1A1A2E]">
                      {conversation.name}
                    </p>
                    <span className="shrink-0 text-xs text-[#9CA3AF]">
                      {conversation.time}
                    </span>
                  </div>
                  <p className="truncate text-xs text-[#9CA3AF]">
                    {conversation.preview}
                  </p>
                </div>

                {conversation.unread > 0 && (
                  <Badge className="h-5 min-w-5 shrink-0 justify-center rounded-full bg-[#6C3CE1] px-1 text-white">
                    {conversation.unread}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        {selected ? (
          <>
            <div className="flex shrink-0 items-center justify-between border-b px-6 py-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-[#F3EEFF] text-[#6C3CE1]">
                    {selected.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-[15px] font-bold text-[#1A1A2E]">
                    {selected.name}
                  </p>
                  <p className="text-xs text-[#9CA3AF]">{selected.formation}</p>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex size-8 items-center justify-center rounded-full text-[#6B7280] hover:bg-[#F3EEFF] hover:text-[#6C3CE1]">
                    <MoreHorizontal size={18} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <ShieldAlert size={14} />
                    Moderate
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Flag size={14} />
                    Flag Messages
                  </DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">
                    <VolumeX size={14} />
                    Mute User
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isMine={false}
                  showSender={false}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[#9CA3AF]">
            Select a conversation to view messages.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessagesPage;
