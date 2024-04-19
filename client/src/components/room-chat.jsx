import {
    Box,
} from "@chakra-ui/react";
import RoomHeader from "./room-header";
import RoomBody from "./chat-room-body";
import MessageInput from "./message-input";

const RoomChat = ({roomName, messages, ChangeLayout, icon, ShowPopover}) => {
    
    return (
        <Box h='100%' p='20px' display='flex' flexDirection='column' justifyContent='space-between'>
            <RoomHeader roomName={roomName} ChangeLayout={ChangeLayout} icon={icon} ShowPopover={ShowPopover} />
            <RoomBody messages={messages} />
            <MessageInput />
        </Box>
    );
}

export default RoomChat;