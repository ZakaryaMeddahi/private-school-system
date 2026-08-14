'use client';

import { Box } from '@chakra-ui/react';
import RoomHeader from './room-header';
import RoomBody from './chat-room-body';
import MessageInput from './message-input';

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
}) => {
  console.log('====================================');
  console.log('FROM RoomChat : ', messages);
  console.log('====================================');

  return (
    <Box
      h='100%'
      p='20px'
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
    >
      <RoomHeader
        roomName={roomName}
        image={image}
        ChangeLayout={ChangeLayout}
        icon={icon}
        ShowPopover={ShowPopover}
        roomId={selectedCourse?.rooms[0].id}
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
    </Box>
  );
};

export default RoomChat;
