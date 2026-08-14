'use client';

import RoomHeader from './room-header';
import RoomBody from './chat-room-body';
import MessageInput from './message-input';
import { Socket } from 'socket.io-client';
import {
  ChatMessage,
  Course,
} from '@/app/providers/ChatProvider';
import { Dispatch, ReactNode, RefObject, SetStateAction } from 'react';

interface RoomChatProps {
  roomName?: string;
  messages: ChatMessage[];
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  chatNamespace: RefObject<Socket | null>;
  image?: string;
  ChangeLayout?: boolean;
  icon?: ReactNode;
  ShowPopover?: boolean;
  selectedCourse: Course | null;
  chatId?: string;
  isChatSession?: boolean;
  pinnedMessages: ChatMessage[];
  setPinnedMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  fileUploading?: boolean;
}

const RoomChat = ({
  roomName,
  messages,
  setMessages,
  chatNamespace,
  image,
  ChangeLayout,
  icon,
  ShowPopover,
  selectedCourse,
  chatId,
  isChatSession,
  pinnedMessages,
  setPinnedMessages,
  isLoading,
  setIsLoading,
  fileUploading,
}: RoomChatProps) => {
  console.log('====================================');
  console.log('FROM RoomChat : ', messages);
  console.log('====================================');

  return (
    <div className="flex h-full flex-col justify-between p-5">
      <RoomHeader
        roomName={roomName}
        image={image}
        ChangeLayout={ChangeLayout}
        icon={icon}
        ShowPopover={ShowPopover}
        roomId={selectedCourse?.rooms?.[0]?.id}
        isChatSession={isChatSession}
      />
      <RoomBody
        messages={messages}
        pinnedMessages={pinnedMessages}
        setPinnedMessages={setPinnedMessages}
        chatNamespace={chatNamespace}
        selectedCourse={selectedCourse}
        chatId={chatId}
        isChatSession={isChatSession}
      />
      <MessageInput
        messages={messages}
        setMessages={setMessages}
        chatNamespace={chatNamespace}
        selectedCourse={selectedCourse}
        chatId={chatId}
        isChatSession={isChatSession}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        fileUploading={fileUploading}
      />
    </div>
  );
};

export default RoomChat;
