import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  SlideFade,
  Stack,
  Text,
} from '@chakra-ui/react';
import { IoIosAttach, IoIosSend } from 'react-icons/io';
import { chatContext } from '../Pages/Chat';
import React, { createRef, useContext, useEffect, useState } from 'react';
import { ChatContext } from '@/app/providers/ChatProvider';
import FileCard from './FileCard';

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
}) => {
  // const { messages, setMessages } = useContext(ChatContext);
  const [message, setMessage] = useState({});
  const [file, setFile] = useState(null);
  const messageInputRef = createRef();

  const sendMsg = async (e) => {
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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/${selectedCourse.id}/chats/${chatId}/messages`,
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

    const newMessage = { message };

    isChatSession ? (newMessage.roomId = chatId) : (newMessage.chatId = chatId);

    chatNamespace.current?.emit('message', newMessage);

    messageInputRef.current.value = '';
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
    <Stack
      paddingInline='3'
      w='100%'
      height='8%'
      bgColor='white'
      boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
      borderRadius='15px'
      flexDir='row'
      alignItems='center'
      position='relative'
    >
      <FileCard file={file} setFile={setFile} />
      <form style={{ width: '100%' }} onSubmit={sendMsg}>
        <FormControl w='100%' display='flex' gap='10px'>
          {!isChatSession && (
            <FormLabel
              htmlFor='file'
              bgColor='teal'
              color='#FFF'
              w='45px'
              h='40px'
              m='0'
              marginInline='0'
              // bgColor='gray.200'
              borderRadius='5px'
              cursor='pointer'
              _hover={{ bgColor: 'teal.500' }}
            >
              <Input
                type='file'
                accept='image/*, .pdf'
                id='file'
                display='none'
                onChange={(e) => setFile(e.target.files[0])}
                isDisabled={selectedCourse ? false : true}
              />
              <Center h='100%'>
                <IoIosAttach size='24px' />
              </Center>
            </FormLabel>
          )}

          <Input
            ref={messageInputRef}
            value={message.content || ''}
            placeholder='Hello, world'
            border='none'
            onChange={(e) => setMessage({ content: e.target.value })}
            isDisabled={selectedCourse ? false : true}
          />
          <Button
            colorScheme='teal'
            w='40px'
            type='submit'
            isLoading={isLoading}
          >
            <Center h='100%'>
              <IoIosSend size='24px' />
            </Center>
          </Button>
          {/* <Box
          w='45px'
          height='45px'
          borderRadius='50px'
          _hover={{ bgColor: 'whitesmoke' }}
          onClick={sendMsg}
        >
          
        </Box> */}
        </FormControl>
      </form>
    </Stack>
  );
};

export default MessageInput;
