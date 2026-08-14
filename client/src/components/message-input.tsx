import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IoIosAttach, IoIosSend } from 'react-icons/io';
import React, { createRef, useState } from 'react';
import {
  ChatMessage,
  Course,
} from '@/app/providers/ChatProvider';
import FileCard from './FileCard';
import { Socket } from 'socket.io-client';
import { Dispatch, RefObject, SetStateAction } from 'react';

interface MessageInputProps {
  messages: ChatMessage[];
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  chatNamespace: RefObject<Socket | null>;
  selectedCourse: Course | null;
  chatId?: string;
  isChatSession?: boolean;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  fileUploading?: boolean;
}

const MessageInput = ({
  messages,
  setMessages,
  chatNamespace,
  selectedCourse,
  chatId,
  isChatSession,
  isLoading,
  setIsLoading,
  fileUploading,
}: MessageInputProps) => {
  const [message, setMessage] = useState<{ content?: string }>({});
  const [file, setFile] = useState<File | null>(null);
  const messageInputRef = createRef<HTMLInputElement>();

  const sendMsg = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(file.split('\\')[file.split('\\').length - 1]);
    console.log(file);

    if (!message.content && !file) return;

    setIsLoading(true);

    if (file) {
      const formData = new FormData();

      formData.append('file', file);

      if (message.content) {
        formData.append('content', message.content);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/${selectedCourse?.id}/chats/${chatId}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
        }
      );
      const { data } = await response.json();

      console.log(
        '**************************************************************************************************************'
      );
      console.log(
        '**************************************************************************************************************'
      );
      console.log(
        '**************************************************************************************************************'
      );
      console.log(data);
      console.log(
        '**************************************************************************************************************'
      );
      console.log(
        '**************************************************************************************************************'
      );
      console.log(
        '**************************************************************************************************************'
      );

      setMessages([...messages, data]);
      // messageInputRef.current?.value = '';
      setMessage({});
      setFile(null);
      setIsLoading(false);

      return;
    }

    const newMessage: {
      message: { content?: string };
      roomId?: string;
      chatId?: string;
    } = { message };

    isChatSession ? (newMessage.roomId = chatId) : (newMessage.chatId = chatId);

    chatNamespace.current?.emit('message', newMessage);

    if (messageInputRef.current) messageInputRef.current.value = '';
    setMessage({});
    setFile(null);
  };

  // useEffect(() => {
  //   console.log('====================================');
  //   console.log('FROM Chat : ', messages);
  //   console.log('====================================');

  //   return () => {
  //     chatNamespace.current?.off('message');
  //   };
  // }, []);

  return (
    <div className="relative flex w-full flex-row items-center rounded-[15px] bg-white px-3 shadow-[rgba(0,0,0,0.24)_0px_3px_8px]" style={{ height: '8%' }}>
      <FileCard file={file} setFile={setFile} />
      <form className="w-full" onSubmit={sendMsg}>
        <div className="flex w-full gap-2.5">
          {!isChatSession && (
            <Label
              htmlFor='file'
              className="m-0 flex h-10 w-11.25 cursor-pointer items-center justify-center rounded-[5px] bg-teal-600 text-white hover:bg-teal-500"
            >
              <input
                type='file'
                accept='image/*, .pdf'
                id='file'
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                disabled={!selectedCourse}
              />
              <IoIosAttach size='24px' />
            </Label>
          )}

          <Input
            ref={messageInputRef}
            value={message.content || ''}
            placeholder='Hello, world'
            className="border-none"
            onChange={(e) => setMessage({ content: e.target.value })}
            disabled={!selectedCourse}
          />
          <Button
            className="w-10 bg-teal-600 hover:bg-teal-700"
            type='submit'
            disabled={isLoading}
          >
            <IoIosSend size='24px' />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
