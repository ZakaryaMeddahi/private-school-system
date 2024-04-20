'use client';

import {
    Box,
    Grid,
    GridItem,
    Container,
} from '@chakra-ui/react';
import Room from '@/components/Room/Room';

import { CiMenuKebab } from 'react-icons/ci';

import React, { useContext } from 'react';

import RoomInfo from '@/components/chat-room-info';
import RoomChat from '@/components/room-chat';
import { ChatContext } from '@/app/providers/ChatProvider';

const ChatPage = () => {
    const { messages, roomInfoRef, chatRef, setMessages } =
        useContext(ChatContext);

    console.log('====================================');
    console.log('FROM Chat : ', messages);
    console.log('====================================');

    return (
        <Container
            m='0'
            p='0'
            h='100vh'
            maxW='100%'
            bgColor='white'
        >
            <Grid
                templateColumns='repeat(12, 1fr)'
                h='100%'
            >
                <GridItem
                    colSpan={3}
                    overflowY='auto'
                    paddingTop='15px'
                    borderLeft='1px solid gray'
                    boxShadow='rgba(0, 0, 0, 0.15) 5px -1px 2.6px'
                >
                    <Box
                        h='100%'
                        display='flex'
                        flexDir='column'
                        padding='2'
                    >
                        <Room
                            hover={true}
                            RoomName='Web Devolpoment'
                        />
                        <Room
                            hover={true}
                            RoomName='Learn java'
                        />
                        <Room
                            hover={true}
                            RoomName='From zero to hero python'
                        />
                        <Room
                            hover={true}
                            RoomName='Basic of Graphics design'
                        />
                        <Room
                            hover={true}
                            RoomName='Introduction in DevOps'
                        />
                        <Room
                            hover={true}
                            RoomName='React'
                        />
                        <Room
                            hover={true}
                            RoomName='Nextjs'
                        />
                        <Room
                            hover={true}
                            RoomName='30 day backend'
                        />
                        <Room
                            hover={true}
                            RoomName='MERN Stack'
                        />
                    </Box>
                </GridItem>
                <GridItem
                    ref={chatRef}
                    colSpan={6}
                    borderLeft='1px solid gray'
                    h='100vh'
                >
                    <RoomChat
                        roomName='Web Devolpoment'
                        messages={messages}
                        ChangeLayout={true}
                        icon={<CiMenuKebab />}
                        ShowPopover={true}
                    />
                </GridItem>
                <GridItem
                    colSpan={3}
                    borderLeft='1px solid gray'
                    boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
                    ref={roomInfoRef}
                >
                    <RoomInfo />
                </GridItem>
            </Grid>
        </Container>
    );
};

export default ChatPage;
