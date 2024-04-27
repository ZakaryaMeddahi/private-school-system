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
  pinnedMessages,
  setPinnedMessages,
  isLoading,
  setIsLoading
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
      />
      <RoomBody
        messages={messages}
        pinnedMessages={pinnedMessages}
        setPinnedMessages={setPinnedMessages}
        chatNamespace={chatNamespace}
        selectedCourse={selectedCourse}
      />
      <MessageInput
        messages={messages}
        setMessages={setMessages}
        chatNamespace={chatNamespace}
        selectedCourse={selectedCourse}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </Box>
  );
};

export default RoomChat;
