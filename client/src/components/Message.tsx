import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dispatch,
  MutableRefObject,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CgEditBlackPoint, CgTrash } from 'react-icons/cg';
import { MdChangeCircle, MdUpdate } from 'react-icons/md';
import { PiNeedle } from 'react-icons/pi';
import { Socket } from 'socket.io-client';
import { ChatMessage, Course } from '@/app/providers/ChatProvider';

interface UpdateMessagePayload {
  messageId: string;
  message: ChatMessage;
  roomId?: string;
  chatId?: string;
}

interface DeleteMessagePayload {
  messageId: string;
  roomId?: string;
  chatId?: string;
}

interface MessageProps {
  msg: ChatMessage;
  userIdRef: RefObject<string | null>;
  isPinned: boolean;
  pinnedMessages: ChatMessage[];
  setPinnedMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  chatNamespace: RefObject<Socket | null>;
  selectedCourse?: Course | null;
  chatId?: string;
  isChatSession?: boolean;
  chatRef?: MutableRefObject<HTMLDivElement | null>;
}

function Message({
  msg,
  userIdRef,
  isPinned,
  pinnedMessages,
  setPinnedMessages,
  chatNamespace,
  chatId,
  isChatSession,
  chatRef,
}: MessageProps) {
  const [updateMode, setUpdateMode] = useState(false);
  const [updatedMessage, setUpdatedMessage] = useState(msg.content);

  const showPin = () => {
    const role = localStorage.getItem('role');
    const result = role === 'teacher' && !isChatSession;
    console.log(result);
    return result;
  };

  const convertTime = (time?: string) => {
    const date = new Date(time || '');
    return date.toLocaleString().replace(',', '');
  };

  const handleUpdateContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedMessage(e.target.value);
  };

  const handlePinMessage = async () => {
    setPinnedMessages([...pinnedMessages, msg]);
    // update message
    // console.log(msg);

    const message: UpdateMessagePayload = {
      messageId: msg.id,
      message: { ...msg, isPinned: true },
    };

    isChatSession ? (message.roomId = chatId) : (message.chatId = chatId);

    chatNamespace.current?.emit('update-message', message);

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

    const message: UpdateMessagePayload = {
      messageId: msg.id,
      message: { ...msg, isPinned: false },
    };

    isChatSession ? (message.roomId = chatId) : (message.chatId = chatId);

    // update message
    chatNamespace.current?.emit('update-message', message);

    // chatRef.current.scrollIntoView({
    //   behavior: 'smooth',
    //   // block: 'end',
    //   top: chatRef.current.scrollHeight + 20,
    // });
  };

  const handleUpdateMessage = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('update message');

    const message: UpdateMessagePayload = {
      messageId: msg.id,
      message: { ...msg, content: updatedMessage },
    };

    isChatSession ? (message.roomId = chatId) : (message.chatId = chatId);

    // update content of message
    chatNamespace.current?.emit('update-message', message);
    setUpdateMode(false);

    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  const handleDeleteMessage = () => {
    console.log('delete message');

    const message: DeleteMessagePayload = {
      messageId: msg.id,
    };

    isChatSession ? (message.roomId = chatId) : (message.chatId = chatId);

    // delete message
    chatNamespace.current?.emit('remove-message', message);

    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  const pinRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);

  const isOwn = msg.sender?.id === userIdRef.current;

  return (
    <div
      className="chat mb-3.75 flex flex-col justify-between p-3.5"
      ref={(el: HTMLDivElement | null) => {
        if (chatRef) chatRef.current = el;
        if (chatRef?.current) {
          chatRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
        }
      }}
      key={msg.id}
      style={{
        width: isPinned ? '100%' : isChatSession ? '90%' : '48%',
        backgroundColor: isOwn ? '#dbeafe' : '#f3f4f6',
        color: isOwn ? '#1e3a8a' : '#111827',
        borderRadius: isOwn ? '7px 50px 7px 7px' : '7px 7px 7px 50px',
        marginLeft: isOwn ? 'auto' : '0',
      }}
    >
      <div className="mb-2.5 flex flex-row items-center justify-between">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <Avatar className="size-8.75">
              <AvatarImage src='../logo.png' alt='private school' />
              <AvatarFallback>PS</AvatarFallback>
            </Avatar>
            <span className="text-sm font-bold">
              {msg.sender?.firstName + ' ' + msg.sender?.lastName}
            </span>
          </div>

          <div
            className="rounded-[3px] p-0.75 text-white opacity-90"
            style={{
              backgroundColor:
                msg.sender?.role === 'admin'
                  ? '#dc2626'
                  : msg.sender?.role === 'teacher'
                  ? '#2563eb'
                  : 'green',
            }}
          >
            <span className="text-[8px] font-semibold uppercase">
              {msg.sender?.role}
            </span>
          </div>
        </div>

        {(showPin() || isOwn) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label='Options'
                variant='outline'
                size='icon-sm'
                className={`border-0 px-0 ${isOwn ? 'hover:bg-blue-200' : 'hover:bg-gray-200'}`}
              >
                <BsThreeDotsVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-40 text-xs">
              {showPin() &&
                (msg.isPinned ? (
                  <DropdownMenuItem onClick={handleUnpinMessage}>
                    <PiNeedle /> Unpin
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={handlePinMessage}>
                    <PiNeedle /> Pin
                  </DropdownMenuItem>
                ))}
              {isOwn && (
                <DropdownMenuItem onClick={() => setUpdateMode(true)}>
                  <CgEditBlackPoint /> Edit
                </DropdownMenuItem>
              )}
              {isOwn && (
                <DropdownMenuItem onClick={handleDeleteMessage}>
                  <CgTrash /> Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      {msg.file && (
        <div className="mb-2.5 min-h-11.25 w-full rounded-lg border-2 border-gray-400 bg-gray-200">
          <a
            href={msg.file.url}
            download
            target='_blank'
            style={{ display: 'block', padding: '10px' }}
          >
            {msg.file?.name + '.' + msg.file?.format}
          </a>
        </div>
      )}
      <p className="px-2.5">{msg.content}</p>
      <form>
        <div className="gap-2.5" style={{ display: updateMode ? 'flex' : 'none' }}>
          <Input
            value={updatedMessage}
            className="border-gray-500 hover:border-blue-500"
            onChange={handleUpdateContent}
          />
          <Button aria-label='Save message' type='submit' size='icon' onClick={handleUpdateMessage}>
            <MdChangeCircle />
          </Button>
        </div>
      </form>
      <span className="ml-auto font-mono text-[10px]">
        {convertTime(msg.sentAt)}
      </span>
    </div>
  );
}
export default Message;
