'use client';

import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CgEditContrast, CgTrash } from 'react-icons/cg';
import { FaDeleteLeft } from 'react-icons/fa6';
import { IoAddCircleOutline } from 'react-icons/io5';
import { MdUpdate } from 'react-icons/md';
import { PiNeedle } from 'react-icons/pi';
import Message from './Message';

const RoomBody = ({
  messages,
  pinnedMessages,
  setPinnedMessages,
  chatNamespace,
  selectedCourse,
}) => {
  const chatRef = useRef();
  const userIdRef = useRef();
  useEffect(() => {
    console.log(chatRef);
    userIdRef.current = localStorage.getItem('userId');
    // const chat = document.getElementById('chat');
    // chat.scrollTop = 700;
  }, []);

  return (
    <Box
      w='100%'
      height='82%'
      paddingInline='5'
      bgColor='white'
      boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
      paddingTop='20px'
      borderRadius='15px'
      overflowY='auto'
      display='flex'
      // justifyContent='flex-end'
      flexDir='column'
      // gap='15px'
    >
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
            chatRef={chatRef}
          />
        );
      })}
    </Box>
  );
};

export default RoomBody;
