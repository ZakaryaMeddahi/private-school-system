'use client';

import {
    Box,
    Grid,
    GridItem,
    Container,
    Divider,
} from '@chakra-ui/react';
import Room from '@/components/Room/Room';

import { CiMenuKebab } from 'react-icons/ci';
import { IoMdArrowBack } from "react-icons/io";

import React, { useContext } from 'react';

import RoomInfo from '@/components/chat-room-info';
import RoomChat from '@/components/room-chat';
import { ChatContext } from '@/app/providers/ChatProvider';
import Link from 'next/link';

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
                    borderLeft='1px solid gray'
                    boxShadow='rgba(0, 0, 0, 0.15) 5px -1px 2.6px'
                >
                    <Box
                        h='100%'
                        display='flex'
                        flexDir='column'
                        padding='2'
                    >
                        <Box
                            display='flex'
                            flexDirection='row'
                            alignItems='center'
                            justifyContent='flex-start'
                            paddingBlock='10px'
                        >
                            <Link href='/student_dashboard'>
                                <Box 
                                    w={'50px'}
                                    h={'50px'}
                                    display={'flex'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    borderRadius={'50%'}
                                    marginLeft={'5px'}
                                    _hover={{bgColor: 'whiteSmoke'}}

                                >
                                    <IoMdArrowBack size='28px' />
                                </Box>
                            </Link>
                            <Box
                                w='100%'
                                display={'flex'}
                                flexDirection={'column'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <Box
                                    fontSize='20px'
                                    fontWeight='600'
                                    textAlign='center'
                                >
                                    Chat Rooms
                                </Box>
                                <Box
                                    fontSize='14px'
                                    fontWeight='400'
                                >
                                    Select a room to start chat
                                </Box>
                            </Box>
                        </Box>
                        <Divider borderColor='black' />
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
