import { Button } from '@/components/ui/button';
import React, { ReactNode, useContext, useState } from 'react';
import { ChatContext } from '@/app/providers/ChatProvider';
import { MdStart } from 'react-icons/md';
import { useRouter } from 'next/navigation';

interface RoomHeaderProps {
  roomName?: string;
  image?: string;
  ChangeLayout?: boolean;
  icon?: ReactNode;
  ShowPopover?: boolean;
  roomId?: string;
  isChatSession?: boolean;
}

const RoomHeader = ({
  roomName,
  image,
  ChangeLayout,
  icon,
  ShowPopover,
  roomId,
  isChatSession,
}: RoomHeaderProps) => {
  const [count, setCount] = useState(0);
  const router = useRouter();
  const { roomInfoRef, chatRef } = useContext(ChatContext);

  const changeLayout = () => {
    if (chatRef.current && roomInfoRef.current && count === 0) {
      roomInfoRef.current.style.display = 'none';
      chatRef.current.style.gridColumn = 'span 9 / span 9';
      console.log(chatRef.current.style);
      setCount(1);
    }

    if (chatRef.current && roomInfoRef.current && count === 1) {
      roomInfoRef.current.style.display = 'block';
      roomInfoRef.current.style.gridColumn = 'span 3 / span 3';
      chatRef.current.style.gridColumn = 'span 6 / span 6';
      console.log(chatRef.current.style);
      setCount(0);
    }
  };

  return (
    <div className="flex h-[8%] w-full flex-row items-center justify-between rounded-[15px] bg-white shadow-[rgba(0,0,0,0.24)_0px_3px_8px]">
      <div onClick={ChangeLayout ? changeLayout : undefined}>
        <div className="cursor-pointer rounded-[7px] p-3.75 text-black">
          <div className="flex flex-row items-center gap-3.75">
            <img
              className="size-8.75 rounded-full object-cover"
              src={image}
              alt={roomName}
            />
            <span className="text-sm">{roomName}</span>
          </div>
        </div>
      </div>
      {!isChatSession && (
        <Button
          aria-label='Start room'
          onClick={() => router.push(`/room/${roomId}`)}
          className="mr-3.75 bg-teal-600 hover:bg-teal-700"
          size="icon"
        >
          <MdStart />
        </Button>
      )}
    </div>
  );
};

export default RoomHeader;
