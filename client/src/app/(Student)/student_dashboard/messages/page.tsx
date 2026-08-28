'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import io, { Socket } from 'socket.io-client';
import type { ChatMessage, Course } from '@/app/providers/ChatProvider';
import { ConversationList } from '@/components/messages/conversation-list';
import { ChatView } from '@/components/messages/chat-view';

const MessagesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const chatNamespace = useRef<Socket | null>(null);
  const currentUserId = useRef('');

  const fetchMessages = async (courseId: string, chatId?: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/${courseId}/chats/${chatId}/messages`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      if (!response.ok) {
        if (response.status === 401) router.push('/login');
        throw new Error('Failed to load messages');
      }
      const { data } = await response.json();
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  const switchRoom = (chatId?: string) => {
    chatNamespace.current?.emit('leave-room', { chatId });
    chatNamespace.current?.emit('join-room', { chatId });
  };

  const selectCourse = (course: Course) => {
    setSelectedCourse(course);
    fetchMessages(course.id, course.chat?.id);
    switchRoom(course.chat?.id);
  };

  useEffect(() => {
    currentUserId.current = localStorage.getItem('userId') || '';
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

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
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );
        if (!response.ok) {
          if (response.status === 401) router.push('/login');
          throw new Error('Failed to load conversations');
        }
        const { data } = await response.json();
        setCourses(data);

        if (data[0]) {
          setSelectedCourse(data[0]);
          await fetchMessages(data[0].id, data[0].chat?.id);
          chatNamespace.current?.emit('join-room', { chatId: data[0].chat?.id });
        }
      } catch (err) {
        console.error(err);
      }
    };

    chatNamespace.current.on('connect', () => {
      fetchChatRooms();

      chatNamespace.current?.on('message', (data: { message: ChatMessage }) => {
        setMessages((prev) => [...prev, data.message]);
        setIsLoading(false);
      });

      chatNamespace.current?.on(
        'message-updated',
        (data: { message: ChatMessage }) => {
          setMessages((prev) =>
            prev.map((m) => (m.id === data.message.id ? data.message : m))
          );
        }
      );

      chatNamespace.current?.on(
        'message-removed',
        (data: { messageId: string }) => {
          setMessages((prev) => prev.filter((m) => m.id !== data.messageId));
        }
      );
    });

    return () => {
      chatNamespace.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-full">
      <div className="w-full max-w-100 shrink-0 border-r border-gray-200">
        <ConversationList
          courses={courses}
          selectedCourseId={selectedCourse?.id}
          onSelect={selectCourse}
        />
      </div>
      <div className="min-w-0 flex-1">
        <ChatView
          selectedCourse={selectedCourse}
          messages={messages}
          setMessages={setMessages}
          chatNamespace={chatNamespace}
          currentUserId={currentUserId.current}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
};

export default MessagesPage;
