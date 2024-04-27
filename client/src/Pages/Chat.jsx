'use client';

import { Box, Grid, GridItem, Container, Divider } from '@chakra-ui/react';
import Room from '@/components/Room/Room';

import { CiMenuKebab } from 'react-icons/ci';
import { IoMdArrowBack } from 'react-icons/io';

import React, { useContext, useEffect, useRef, useState } from 'react';

import RoomInfo from '@/components/chat-room-info';
import RoomChat from '@/components/room-chat';
import { ChatContext } from '@/app/providers/ChatProvider';
import Link from 'next/link';
import io from 'socket.io-client';
import { useRouter } from 'next/navigation';

const ChatPage = () => {
  // const { messages, roomInfoRef, chatRef, setMessages } =
  //     useContext(ChatContext);

  const { roomInfoRef, chatRef } = useContext(ChatContext);

  // console.log('====================================');
  // console.log('FROM Chat : ', messages);
  // console.log('====================================');

  /****************/
  // const [messages, setMessages] = useState([]);

  // const [chatRooms, setChatRooms] = useState([]);

  // const [selectedChat, setSelectedChat] = useState(null);

  // const [roomMembers, setRoomMembers] = useState([]);

  // const [teacherInfo, setTeacherInfo] = useState({});

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [teacherInfo, setTeacherInfo] = useState({});
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [pinnedMessages, setPinnedMessages] = useState([]);
  const chatNamespace = useRef(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Get chats by teacher id or student id
  // Get messages of the selected room
  // Get Teacher info
  // Get room members

  const switchRoom = (chatId) => {
    console.log('Switching room');
    chatNamespace.current.emit('leave-room', {
      chatId: chatId || 42,
    });

    chatNamespace.current.emit('join-room', {
      chatId: chatId || 42,
    });
  };

  const fetchMessages = async (courseId, chatId) => {
    try {
      console.log(selectedCourse);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/${courseId}/chats/${chatId}/messages`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) {
        response.status === 401 && router.push('/login');
        throw new Error('Something went wrong');
      }

      const { data } = await response.json();

      console.log(data);

      setMessages(data);
      data.map((message) => {
        console.log(
          '==================================================================================================================================================='
        );
        console.log(
          '==================================================================================================================================================='
        );
        console.log(
          '==================================================================================================================================================='
        );
        if (message.isPinned) {
          console.log(message);
          setPinnedMessages((prev) => [...prev, message]);
          console.log(pinnedMessages);
        }
        console.log(
          '==================================================================================================================================================='
        );
        console.log(
          '==================================================================================================================================================='
        );
        console.log(
          '==================================================================================================================================================='
        );
      });
      // setPinnedMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChatMembers = async (courseId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/${courseId}/members`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) {
        response.status === 401 && router.push('/login');
        throw new Error('Something went wrong');
      }

      const { data } = await response.json();

      console.log(data);

      setMembers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    chatNamespace.current = io(`${process.env.NEXT_PUBLIC_SERVER_URL}/chats`, {
      query: { token: `Bearer ${token}` },
      transports: ['websocket'],
    });

    chatNamespace.current.on('connect', () => {
      console.log('Connected to socket');

      chatNamespace.current.emit('join-room', {
        chatId: selectedCourse?.chat?.id || 42,
      });

      chatNamespace.current.on('user-joined', (data) => {
        console.log('====================================');
        console.log('Joined Room : ', data);
        console.log('====================================');
      });

      chatNamespace.current.on('message', (data) => {
        console.log('====================================');
        console.log('FROM Chat : ', data);
        console.log('====================================');
        const message = data.message;
        setMessages((prev) => [...prev, message]);
        setIsLoading(false);
      });

      chatNamespace.current.on('message-updated', (data) => {
        console.log('====================================');
        console.log('FROM Chat (update message) : ', data);
        console.log('====================================');
        const message = data.message;
        setMessages((prev) => {
          const index = prev.findIndex((msg) => msg.id === message.id);
          prev[index] = message;
          console.log(message);
          return [...prev];
        });
        setPinnedMessages((prev) => {
          const index = prev.findIndex((msg) => msg.id === message.id);
          prev[index] = message;
          console.log(message);
          return [...prev];
        });
      });

      chatNamespace.current.on('message-removed', (data) => {
        console.log('====================================');
        console.log('FROM Chat (delete message) : ', data);
        console.log('====================================');
        const messageId = data.messageId;
        setMessages((prev) => {
          return prev.filter((msg) => msg.id !== messageId);
        });
        setPinnedMessages((prev) => {
          return prev.filter((msg) => msg.id !== messageId);
        });
      });
    });

    const fetchChatRooms = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/chats`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (!response.ok) {
          response.status === 401 && router.push('/login');
          throw new Error('Something went wrong');
        }

        const { data } = await response.json();

        console.log(data);

        setCourses((selectedCourse) => {
          return [...selectedCourse, ...data];
        });

        setSelectedCourse((selectedCourse) => {
          return data[0];
        });

        setTeacherInfo(data[0].teacher);

        // data.foreach((course) => {
        //   const { chat, teacher } = course;
        //   setChatRooms([...chatRooms, chat]);
        //   setTeacherInfo(teacher);
        // });

        await fetchMessages(data[0].id, data[0].chat?.id || 42);
        await fetchChatMembers(data[0].id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChatRooms();

    return () => {
      chatNamespace.current.emit('leave-room', {
        chatId: selectedCourse?.chat?.id || 42,
      });
      chatNamespace.current.disconnect();
    };
  }, []);

  return (
    <Container
      m='0'
      p='0'
      h='100vh'
      maxW='100%'
      bgColor='white'
      position='fixed'
    >
      <Grid templateColumns='repeat(12, 1fr)' h='100%'>
        <GridItem
          colSpan={3}
          overflowY='auto'
          borderLeft='1px solid gray'
          boxShadow='rgba(0, 0, 0, 0.15) 5px -1px 2.6px'
        >
          <Box h='100%' display='flex' flexDir='column' padding='2'>
            <Box
              display='flex'
              flexDirection='row'
              alignItems='center'
              justifyContent='flex-start'
              paddingBlock='10px'
            >
              <Link href='/student_dashboard'>
                <Box
                  w={'50px'}
                  h={'50px'}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  borderRadius={'50%'}
                  marginLeft={'5px'}
                  _hover={{ bgColor: 'whiteSmoke' }}
                >
                  <IoMdArrowBack size='28px' />
                </Box>
              </Link>
              <Box
                w='100%'
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Box fontSize='20px' fontWeight='600' textAlign='center'>
                  Chat Rooms
                </Box>
                <Box fontSize='14px' fontWeight='400'>
                  Select a room to start chat
                </Box>
              </Box>
            </Box>
            <Divider borderColor='black' />
            <Box h='100%' overflowY='auto'>
              {courses.map((course) => {
                return (
                  <Room
                    key={course.id}
                    RoomName={course.chat?.name || course.title}
                    image={course.file?.url || './logo.png'}
                    hover={true}
                    course={course}
                    setSelectedCourse={setSelectedCourse}
                    setTeacherInfo={setTeacherInfo}
                    fetchMessages={fetchMessages}
                    fetchChatMembers={fetchChatMembers}
                    switchRoom={switchRoom}
                  />
                );
              })}
            </Box>
          </Box>
        </GridItem>
        <GridItem
          ref={chatRef}
          colSpan={6}
          borderLeft='1px solid gray'
          h='100vh'
        >
          <RoomChat
            roomName={selectedCourse?.title}
            messages={messages}
            setMessages={setMessages}
            chatNamespace={chatNamespace}
            image={selectedCourse?.file?.url || './logo.png'}
            ChangeLayout={true}
            icon={<CiMenuKebab />}
            ShowPopover={true}
            selectedCourse={selectedCourse}
            pinnedMessages={pinnedMessages}
            setPinnedMessages={setPinnedMessages}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </GridItem>
        <GridItem
          colSpan={3}
          borderLeft='1px solid gray'
          boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
          ref={roomInfoRef}
        >
          <RoomInfo
            teacherInfo={teacherInfo}
            members={members}
            pinnedMessages={pinnedMessages}
            setPinnedMessages={setPinnedMessages}
            chatNamespace={chatNamespace}
            selectedCourse={selectedCourse}
          />
        </GridItem>
      </Grid>
    </Container>
  );
};

export default ChatPage;
