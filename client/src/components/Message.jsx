import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CgEditBlackPoint, CgTrash } from 'react-icons/cg';
import { MdChangeCircle, MdUpdate } from 'react-icons/md';
import { PiNeedle } from 'react-icons/pi';

function Message({
  msg,
  userIdRef,
  isPinned,
  pinnedMessages,
  setPinnedMessages,
  chatNamespace,
  selectedCourse,
  chatId,
  isChatSession,
  chatRef,
}) {
  const [updateMode, setUpdateMode] = useState(false);
  const [updatedMessage, setUpdatedMessage] = useState(msg.content);

  const showPin = () => {
    const role = localStorage.getItem('role');
    const result = role === 'teacher' && !isChatSession;
    console.log(result);
    return result;
  };

  const convertTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString().replace(',', '');
  };

  const handleUpdateContent = (e) => {
    setUpdatedMessage(e.target.value);
  };

  const handlePinMessage = async () => {
    setPinnedMessages([...pinnedMessages, msg]);
    // update message
    // console.log(msg);

    const message = {
      messageId: msg.id,
      message: { ...msg, isPinned: true },
    };

    isChatSession ? (message.roomId = chatId) : (message.chatId = chatId);

    chatNamespace.current.emit('update-message', message);

    // chatRef.current.scrollIntoView({
    //   behavior: 'smooth',
    //   // block: 'end',
    //   top: chatRef.current.scrollHeight + 20,
    // });
  };

  const handleUnpinMessage = () => {
    setPinnedMessages(
      pinnedMessages.filter((message) => message.id !== msg.id)
    );

    const message = {
      messageId: msg.id,
      message: { ...msg, isPinned: false },
    };

    isChatSession ? (message.roomId = chatId) : (message.chatId = chatId);

    // update message
    chatNamespace.current.emit('update-message', message);

    // chatRef.current.scrollIntoView({
    //   behavior: 'smooth',
    //   // block: 'end',
    //   top: chatRef.current.scrollHeight + 20,
    // });
  };

  const handleUpdateMessage = (e) => {
    e.preventDefault();
    console.log('update message');

    const message = {
      messageId: msg.id,
      message: { ...msg, content: updatedMessage },
    };

    isChatSession ? (message.roomId = chatId) : (message.chatId = chatId);

    // update content of message
    chatNamespace.current.emit('update-message', message);
    setUpdateMode(false);

    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
      // block: 'end',
      top: chatRef.current.scrollHeight + 20,
    });
  };

  const handleDeleteMessage = () => {
    console.log('delete message');

    const message = {
      messageId: msg.id,
    };

    isChatSession ? (message.roomId = chatId) : (message.chatId = chatId);

    // delete message
    chatNamespace.current.emit('remove-message', message);

    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
      // block: 'end',
      top: chatRef.current.scrollHeight + 20,
    });
  };

  const pinRef = useRef();
  const hoverRef = useRef();

  return (
    <Stack
      className='chat'
      ref={(el) => {
        chatRef && (chatRef.current = el);
        console.log(el);
        // msg.sender.role = 'student';
        if (chatRef?.current) {
          chatRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            top: chatRef.current.scrollHeight + 15,
          });
        }
      }}
      key={msg.id}
      flexDir='column'
      justifyContent='space-between'
      w={isPinned ? '100%' : isChatSession ? '90%' : '48%'}
      padding='14px 15px'
      bgColor={msg.sender?.id === userIdRef.current ? 'blue.100' : 'gray.100'}
      color={msg.sender?.id === userIdRef.current ? 'blue.900' : 'gray.900'}
      borderRadius={
        msg.sender?.id === userIdRef.current
          ? '7px 50px 7px 7px'
          : '7px 7px 7px 50px'
      }
      marginBottom='15px'
      marginLeft={msg.sender?.id === userIdRef.current ? 'auto' : '0'}
    >
      <Stack
        flexDir='row'
        justifyContent='space-between'
        alignItems='center'
        mb='10px'
      >
        <Stack
          w='100%'
          justifyContent='space-between'
          alignItems='center'
          flexDir='row'
        >
          <Stack alignItems='center' flexDir='row'>
            <Avatar name='private school' src='../logo.png' boxSize='35px' />
            <Text fontSize='sm' fontWeight='bold'>
              {msg.sender?.firstName + ' ' + msg.sender?.lastName}
            </Text>
          </Stack>

          <Box
            p='3px'
            bgColor={
              msg.sender?.role === 'admin'
                ? 'red.600'
                : msg.sender?.role === 'teacher'
                ? 'blue.600'
                : 'green'
            }
            color='white'
            borderRadius='3px'
            opacity='0.9'
          >
            <Text fontSize='8' fontWeight='600' textTransform='uppercase'>
              {msg.sender?.role}
            </Text>
          </Box>
        </Stack>

        {(showPin() || msg.sender?.id === userIdRef.current) && (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<BsThreeDotsVertical />}
              variant='outline'
              paddingInline='0'
              minW='10px'
              border='none'
              _hover={{
                bgColor:
                  msg.sender?.id === userIdRef.current
                    ? 'blue.200'
                    : 'gray.200',
              }}
            />
            <MenuList minW='10rem' fontSize='12'>
              {showPin() &&
                (msg.isPinned ? (
                  <MenuItem icon={<PiNeedle />} onClick={handleUnpinMessage}>
                    Unpin
                  </MenuItem>
                ) : (
                  <MenuItem icon={<PiNeedle />} onClick={handlePinMessage}>
                    Pin
                  </MenuItem>
                ))}
              {msg.sender?.id === userIdRef.current && (
                <MenuItem
                  icon={<CgEditBlackPoint />}
                  onClick={() => setUpdateMode(true)}
                >
                  Edit
                </MenuItem>
              )}
              {msg.sender?.id === userIdRef.current && (
                <MenuItem icon={<CgTrash />} onClick={handleDeleteMessage}>
                  Delete
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        )}
      </Stack>
      {msg.file && (
        <Box
          w='100%'
          minH='45px'
          bgColor='gray.200'
          borderRadius='8px'
          marginBottom='10px'
          border='2px'
          borderColor='gray.400'
        >
          <a
            href={msg.file.url}
            download
            target='_blank'
            style={{ display: 'block', padding: '10px' }}
          >
            {msg.file?.name + '.' + msg.file?.format}
          </a>
        </Box>
      )}
      <Text paddingInline='10px'>{msg.content}</Text>
      <form>
        <FormControl display={updateMode ? 'flex' : 'none'} gap='10px'>
          <Input
            value={updatedMessage}
            borderColor='gray'
            _hover={{ borderColor: 'blue' }}
            onChange={handleUpdateContent}
          />
          <IconButton
            icon={<MdChangeCircle />}
            type='submit'
            onClick={handleUpdateMessage}
          />
        </FormControl>
      </form>
      {/* <Text fontSize='xs' ml='auto'>
        {isPinned
          ? msg.sentAt.split('T')[0]
          : msg.sentAt.split('T')[1].split('.')[0]}
      </Text>{' '} */}
      <Text fontFamily='monospace' fontSize='10' ml='auto'>
        {convertTime(msg.sentAt)}
      </Text>
    </Stack>
  );
}
export default Message;
