'use client';

import {
    Box, 
    Grid, 
    GridItem, 
    Flex, 
    Avatar, 
    Heading, 
    Text, 
    Container, 
    Tabs, 
    Tab, 
    TabList, 
    TabPanel, 
    TabPanels,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon, 
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
    Portal,
    Input
} from "@chakra-ui/react";
import Room from "@/components/Room/Room";
import { MdClose } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import RoomHeader from "@/components/room-header";
import MessageInput from "@/components/message-input";
import React , { useContext, useEffect, useRef, useState } from "react";
import RoomBody from "@/components/chat-room-body";
import RoomInfo from "@/components/chat-room-info";
import RoomChat from "@/components/room-chat";

export const chatContext = React.createContext();

const Chat = () => {

    const msgs = ['hello', 'hi', 'how are you', 'I am fine', 'what about you', 'I am good', 'bye', 'goodbye', 'see you later', 'ok', 'thanks', 'thank you', 'welcome', 'you are welcome', 'good morning', 'good afternoon'];

    const chatRef = useRef();
    const roomInfoRef = useRef();
    const [messages, setMessages] = useState(msgs);

    return (
        <Container m='0' p='0' h='100vh' maxW='100%' bgColor='white'>
            <Grid templateColumns='repeat(12, 1fr)' h='100%'>
                <GridItem colSpan={3} overflowY='auto' paddingTop='15px' borderLeft='1px solid gray' boxShadow='rgba(0, 0, 0, 0.15) 5px -1px 2.6px'>
                    <Box h='100%' display='flex' flexDir='column' padding='2'>
                        <Room hover={true} RoomName='Web Devolpoment' />
                        <Room hover={true} RoomName='Learn java' />
                        <Room hover={true} RoomName='From zero to hero python' />
                        <Room hover={true} RoomName='Basic of Graphics design' />
                        <Room hover={true} RoomName='Introduction in DevOps' />
                        <Room hover={true} RoomName='React' />
                        <Room hover={true} RoomName='Nextjs' />
                        <Room hover={true} RoomName='30 day backend' />
                        <Room hover={true} RoomName='MERN Stack' />
                    </Box>
                </GridItem>
                <GridItem ref={chatRef} colSpan={6} borderLeft='1px solid gray' h='100vh'>
                    <chatContext.Provider value={{messages, setMessages, roomInfoRef, chatRef}}>
                        <RoomChat roomName='Web Devolpoment' ChangeLayout={true} icon={<CiMenuKebab />} ShowPopover={true} />
                    </chatContext.Provider>
                </GridItem>
                <GridItem colSpan={3} borderLeft='1px solid gray' boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px' ref={roomInfoRef}>
                    <RoomInfo />
                </GridItem>
            </Grid>
        </Container>
    );
}

export default Chat;