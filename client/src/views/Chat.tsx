'use client';

import Room from '@/components/Room/Room';

import { CiMenuKebab } from 'react-icons/ci';
import { IoMdArrowBack } from 'react-icons/io';

import React, { useContext, useEffect, useRef, useState } from 'react';

import RoomInfo from '@/components/chat-room-info';
import RoomChat from '@/components/room-chat';
import { ChatContext, ChatMessage } from '@/app/providers/ChatProvider';
import Link from 'next/link';
import io, { Socket } from 'socket.io-client';
import { useRouter } from 'next/navigation';

const ChatPage = () => {
  // const { messages, roomInfoRef, chatRef, setMessages } =
  //     useContext(ChatContext);

  const {
    roomInfoRef,
    chatRef,
    messages,
    setMessages,
    courses,
    setCourses,
    selectedCourse,
    setSelectedCourse,
    teacherInfo,
    setTeacherInfo,
    members,
    setMembers,
    pinnedMessages,
    setPinnedMessages,
  } = useContext(ChatContext);

  // console.log('====================================');
  // console.log('FROM Chat : ', messages);
  // console.log('====================================');

  /****************/

  const router = useRouter();
  const chatNamespace = useRef<Socket | null>(null);
  const userRole = useRef<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get chats by teacher id or student id
  // Get messages of the selected room
  // Get Teacher info
  // Get room members

  const switchRoom = (chatId?: string) => {
    console.log('Switching room');
    chatNamespace.current?.emit('leave-room', {
      chatId: chatId,
    });

    chatNamespace.current?.emit('join-room', {
      chatId: chatId,
    });
  };

  const fetchMessages = async (courseId: string, chatId?: string) => {
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
      setPinnedMessages([]);
      data.map((message: ChatMessage) => {
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

  const fetchChatMembers = async (courseId: string) => {
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

      const teacher = selectedCourse?.teacher;

      // setMembers(data);
      setMembers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    userRole.current = localStorage.getItem('role');
    if (!token) router.push('/login');
    chatNamespace.current = io(`${process.env.NEXT_PUBLIC_SERVER_URL}/chats`, {
      query: { token: `Bearer ${token}` },
      transports: ['websocket'],
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

        setCourses(data);

        setSelectedCourse(data[0]);

        setTeacherInfo(data[0].teacher);

        // data.foreach((course) => {
        //   const { chat, teacher } = course;
        //   setChatRooms([...chatRooms, chat]);
        //   setTeacherInfo(teacher);
        // });

        chatNamespace.current?.emit('join-room', {
          chatId: data[0].chat.id,
        });

        await fetchMessages(data[0].id, data[0].chat?.id);
        await fetchChatMembers(data[0].id);
      } catch (error) {
        console.log(error);
      }
    };

    const handleWebsocketEvents = () => {
      chatNamespace.current?.on('connect', async () => {
        console.log('Connected to socket');

        console.log(selectedCourse);

        await fetchChatRooms();

        // let currentCourse = null;

        // get the value of chat inside selectedCourse , i don't want to get null
        // setSelectedCourse((course) => {
        //   currentCourse = course;
        //   return course;
        // });

        chatNamespace.current?.on('user-joined', (data) => {
          console.log('====================================');
          console.log('Joined Room : ', data);
          console.log('====================================');
        });

        chatNamespace.current?.on('message', (data) => {
          console.log('====================================');
          console.log('FROM Chat : ', data);
          console.log('====================================');
          const message = data.message;
          setMessages((prev) => [...prev, message]);
          setIsLoading(false);
        });

        console.log('websocket events');

        chatNamespace.current?.on('message-updated', (data) => {
          console.log('====================================');
          console.log('FROM Chat (update message) : ', data);
          console.log('====================================');
          const message: ChatMessage = data.message;
          setMessages((prev) => {
            const index = prev.findIndex((msg) => msg.id === message.id);
            prev[index] = message;
            console.log(message);
            return [...prev];
          });
          // setPinnedMessages([])
          setPinnedMessages((prev) => {
            const index = prev.findIndex((msg) => msg.id === message.id);
            if (index !== -1) {
              message.isPinned
                ? (prev[index] = message)
                : prev.splice(index, 1);
              return [...prev];
            }
            if (message.isPinned) return [...prev, message];
            // console.log(message);
            return [...prev];
          });
        });

        chatNamespace.current?.on('message-removed', (data) => {
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
    };

    handleWebsocketEvents();
    return () => {
      chatNamespace.current?.emit('leave-room', {
        chatId: selectedCourse?.chat?.id,
      });
      chatNamespace.current?.disconnect();
    };
  }, []);

  return (
    <div className="fixed h-screen max-w-full bg-white">
      <div className="grid h-full grid-cols-12">
        <div className="col-span-3 overflow-y-auto border-l border-gray-500 shadow-[rgba(0,0,0,0.15)_5px_-1px_2.6px]">
          <div className="flex h-full flex-col p-2">
            <div className="flex flex-row items-center justify-start py-2.5">
              <Link
                href={
                  userRole.current === 'admin'
                    ? '/admin_dashboard'
                    : userRole.current === 'teacher'
                    ? '/teacher_dashboard'
                    : '/student_dashboard'
                }
              >
                <div className="ml-1.25 flex size-12.5 items-center justify-center rounded-full hover:bg-[whitesmoke]">
                  <IoMdArrowBack size='28px' />
                </div>
              </Link>
              <div className="flex w-full flex-col items-center justify-center">
                <div className="text-center text-xl font-semibold">
                  Chat Rooms
                </div>
                <div className="text-sm font-normal">
                  Select a room to start chat
                </div>
              </div>
            </div>
            <hr className="border-black" />
            <div className="h-full overflow-y-auto">
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
            </div>
          </div>
        </div>
        <div ref={chatRef} className="col-span-6 h-screen border-l border-gray-500">
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
            chatId={selectedCourse?.chat?.id}
            pinnedMessages={pinnedMessages}
            setPinnedMessages={setPinnedMessages}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
        <div
          ref={roomInfoRef}
          className="col-span-3 border-l border-gray-500 shadow-[rgba(0,0,0,0.24)_0px_3px_8px]"
        >
          <RoomInfo
            teacherInfo={teacherInfo}
            members={members}
            pinnedMessages={pinnedMessages}
            setPinnedMessages={setPinnedMessages}
            chatNamespace={chatNamespace}
            selectedCourse={selectedCourse}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
