import {
    Box,
    Center,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    Portal
} from "@chakra-ui/react";
import Room from "@/components/Room/Room";
import { chatContext } from "@/Pages/Chat/Chat";
import React, { useRef, useState, useContext } from "react";
import { ChatContext } from "@/app/providers/ChatProvider";

const RoomHeader = ({ roomName, ChangeLayout, icon, ShowPopover }) => {

    const MenuRef = useRef();
    const [count, setCount] = useState(0);
    const [popover, setPopover] = useState(false);
    if (ChangeLayout) {
        var { roomInfoRef, chatRef } = useContext(ChatContext);
    }

    const changeLayout = () => {
        if (chatRef.current && roomInfoRef.current && count === 0) {
            roomInfoRef.current.style.display = 'none';
            chatRef.current.style.gridColumn = 'span 9 / span 9';
            console.log(chatRef.current.style);
            setCount(1);
        }

        if (chatRef.current && roomInfoRef.current && count === 1) {
            roomInfoRef.current.style.display = 'block'
            roomInfoRef.current.style.gridColumn = 'span 3 / span 3';
            chatRef.current.style.gridColumn = 'span 6 / span 6';
            console.log(chatRef.current.style);
            setCount(0);
        }
    }

    const showPopover = () => {
        if (MenuRef.current) {
            setPopover(true);
        }
    }

    return (
        <Box w='100%' height='8%' bgColor='white' display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px' borderRadius='15px'>
            <Box  onClick={ChangeLayout && changeLayout}>
                <Room RoomName={roomName} hover={false} />
            </Box>
            <Box ref={MenuRef} onClick={showPopover} w='45px' height='45px' borderRadius='50px' marginRight='15px' _hover={{bgColor: 'whitesmoke'}}>
                {
                    ShowPopover ? 
                    <Popover>
                        <PopoverTrigger>
                            <Center h='100%'>
                                {icon}
                            </Center>
                        </PopoverTrigger>
                        {
                        popover &&
                            <Portal>
                                <PopoverContent>
                                <PopoverArrow />
                                <PopoverHeader>Header</PopoverHeader>
                                <PopoverCloseButton />
                                <PopoverBody>
                                    <Button colorScheme='blue'>Button</Button>
                                </PopoverBody>
                                <PopoverFooter>This is the footer</PopoverFooter>
                                </PopoverContent>
                            </Portal>
                        }
                    </Popover>
                    :
                    <Center h='100%'>
                        {icon}
                    </Center>
                }
            </Box>
        </Box>  
    );
}

export default RoomHeader;