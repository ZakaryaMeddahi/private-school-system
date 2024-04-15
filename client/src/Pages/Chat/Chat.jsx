'use client';

import Room from "@/components/Room/Room";
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
    AccordionIcon 
} from "@chakra-ui/react";
import { useRef, useState } from "react";

const Chat = () => {

    const chatRef = useRef();
    const roomInfoRef = useRef();
    const [count, setCount] = useState(0);

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

    return (
        <Container m='0' p='0' h='100vh' maxW='100%' bgColor='white'>
            <Grid templateColumns='repeat(12, 1fr)' h='100%'>
                <GridItem colSpan={3} overflowY='auto' paddingTop='15px' borderLeft='1px solid gray' boxShadow='rgba(0, 0, 0, 0.15) 5px -1px 2.6px'>
                    <Box h='100%' display='flex' flexDir='column' padding='2'>
                        <Room RoomName='Web Devolpoment' />
                        <Room RoomName='Learn java' />
                        <Room RoomName='From zero to hero python' />
                        <Room RoomName='Basic of Graphics design' />
                        <Room RoomName='Introduction in DevOps' />
                        <Room RoomName='React' />
                        <Room RoomName='Nextjs' />
                        <Room RoomName='30 day backend' />
                        <Room RoomName='MERN Stack' />
                    </Box>
                </GridItem>
                <GridItem ref={chatRef} colSpan={6} borderLeft='1px solid gray'>
                    <Box h='100%' p='20px' display='flex' flexDirection='column'>
                        <Box w='100%' height='10%' bgColor='white' boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px' borderRadius='15px' onClick={changeLayout}></Box>
                        <Box w='100%' height='82%' bgColor='white' boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px' borderRadius='15px' overflowY='auto' display='flex' flexDir='column' >
                            
                        </Box>
                        <Box w='100%' height='8%' bgColor='white' boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px' borderRadius='15px'></Box>
                    </Box>
                </GridItem>
                <GridItem colSpan={3} borderLeft='1px solid gray' boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px' ref={roomInfoRef}>
                    <Box h='100%'>
                        <Room RoomName='Web Devolpoment' />
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