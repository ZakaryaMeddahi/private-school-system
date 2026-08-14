'use client';

import {
  Box,
  Flex,
  Avatar,
  Heading,
  Image,
  Divider,
  Text,
} from '@chakra-ui/react';
import { useRef } from 'react';

const Room = ({
  RoomName,
  image,
  hover,
  course,
  setSelectedCourse,
  setTeacherInfo,
  fetchMessages,
  fetchChatMembers,
  switchRoom
}) => {
  const boxRef = useRef();

  const RoomFocus = () => {
    if (boxRef.current) {
      console.log(boxRef.current.style);
      boxRef.current.style.backgroundColor = 'rgba(115, 191, 224, 0.25)';
      console.log('Room Focused');
    }
  };

  return (
    <Box
      ref={boxRef}
      padding='15px'
      color='black'
      borderRadius='7px'
      cursor='pointer'
      _hover={hover && { backgroundColor: 'rgba(128, 128, 128, 0.150)' }}
      // onClick={hover && RoomFocus}
      onClick={() => {
        setSelectedCourse(course);
        setTeacherInfo(course.teacher);
        fetchMessages(course.id, course.chat?.id);
        fetchChatMembers(course.id);
        switchRoom(course.chat?.id);
      }}
    >
      <Flex direction='row' gap='15' alignItems='center'>
        <Image
          borderRadius='full'
          boxSize='35px'
          src={image}
          alt={RoomName}
        />
        <Text size='sm'>{RoomName}</Text>
      </Flex>
    </Box>
  );
};

export default Room;
