'use client';

import React from "react";
import Room from "@/components/Room/Room";
import MessageInput from "@/components/message-input";
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

import { useContext, useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { IoIosSend } from "react-icons/io";
import { MessageContext } from "@/components/message-input";

export const msgsContext = React.createContext();

const Chat = () => {

    const msgs = ['hello', 'hi', 'how are you', 'I am fine', 'what about you', 'I am good', 'bye', 'goodbye', 'see you later', 'ok', 'thanks', 'thank you', 'welcome', 'you are welcome', 'good morning', 'good afternoon'];

    const MenuRef = useRef();
    const chatRef = useRef();
    const roomInfoRef = useRef();
    const [count, setCount] = useState(0);
    const [messages, setMessages] = useState(msgs);
    const [popover, setPopover] = useState(false);

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
                    <Box h='100%' p='20px' display='flex' flexDirection='column' justifyContent='space-between'>
                        <Box w='100%' height='8%' bgColor='white' display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px' borderRadius='15px'>
                            <Box  onClick={changeLayout}>
                                <Room RoomName='Web Devolpoment' hover={false} />
                            </Box>
                            <Box ref={MenuRef} onClick={showPopover} w='45px' height='45px' borderRadius='50px' marginRight='15px' _hover={{bgColor: 'whitesmoke'}}>
                                <Popover>
                                    <PopoverTrigger>
                                        <Center h='100%'>
                                            <CiMenuKebab />
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
                            </Box>
                        </Box>
                        {/* Message */}
                        <Box w='100%' height='82%' paddingInline='5' bgColor='white' boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px' borderRadius='15px' overflowY='auto' display='flex' flexDir='column-reverse' >
                            {messages.map((msg, index) => {
                                return (
                                    <Box key={index} w='fit-content' padding='15px' bgColor='whitesmoke' borderRadius='15px' marginBottom='10px'>
                                        <Text>{msg}</Text>
                                    </Box> 
                                );
                            })}
                        </Box>
                        {/* write your message */}
                        <msgsContext.Provider value={{messages, setMessages}}>
                            <Box paddingInline='3' w='100%' height='8%' bgColor='white' boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px' borderRadius='15px' display='grid' gridTemplateColumns='1fr auto' alignItems='center' gap='15'>
                                <MessageInput />
                            </Box>
                        </msgsContext.Provider>
                    </Box>
                </GridItem>
                <GridItem colSpan={3} borderLeft='1px solid gray' boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px' ref={roomInfoRef}>
                    <Box h='100%'>
                        <Room RoomName='Web Devolpoment' hover={false} />
                        <Tabs isFitted variant='enclosed' marginTop='5'>
                            <TabList mb='1em'>
                                <Tab>Pin Resources</Tab>
                                <Tab>Membres</Tab>
                                <Tab>Teacher</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                <Accordion defaultIndex={[0]} allowMultiple>
                                    <AccordionItem>
                                        <h2>
                                        <AccordionButton>
                                            <Box as='span' flex='1' textAlign='left'>
                                            Media
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat.
                                        </AccordionPanel>
                                    </AccordionItem>

                                    <AccordionItem>
                                        <h2>
                                        <AccordionButton>
                                            <Box as='span' flex='1' textAlign='left'>
                                            Partager
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat.
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                                </TabPanel>
                                <TabPanel>
                                    <p>two!</p>
                                </TabPanel>
                                <TabPanel>
                                    <p>three!</p>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </GridItem>
            </Grid>
        </Container>
    );
}

export default Chat;