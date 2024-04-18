import {
    Box,
    GridItem,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react';
import Room from '@/components/Room/Room';
import React, { useContext, useRef } from 'react';
import { roomInfoContext } from '@/Pages/Chat/Chat';


const RoomInfo = () => {

    const roomInfoRef = useContext(roomInfoContext);

    return (
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
    );
}

export default RoomInfo;