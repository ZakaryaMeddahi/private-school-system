'use client';

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
  Text,
  Image,
  Stack,
  TabIndicator,
} from '@chakra-ui/react';
import Room from '@/components/Room/Room';
import { useEffect, useRef } from 'react';
import Message from './Message';

const RoomInfo = ({
  teacherInfo,
  members,
  pinnedMessages,
  setPinnedMessages,
  chatNamespace,
  selectedCourse,
}) => {
  const userIdRef = useRef();
  console.log('====================================');
  console.log('FROM RoomInfo : ', teacherInfo);
  console.log('====================================');
  console.log('====================================');
  console.log('====================================');
  console.log('====================================');
  console.log('FROM RoomInfo : ', pinnedMessages);
  console.log('====================================');
  console.log('====================================');
  console.log('====================================');

  useEffect(() => {
    userIdRef.current = localStorage.getItem('userId');
  });

  return (
    <Box>
      {/* <Room RoomName='Web Devolpoment' hover={false} /> */}
      <Tabs isFitted variant='enclosed' marginTop='20px'>
        <TabList h='70px' mb='5px'>
          <Tab>Pinned Resources</Tab>
          <Tab>Members</Tab>
          {/* <Tab>Teacher</Tab> */}
        </TabList>
        {/* <TabIndicator
          mt='-1.5px'
          height='2px'
          bg='blue.500'
          borderRadius='1px'
        /> */}
        <TabPanels>
          <TabPanel h='calc(100vh - 95px)' overflowY='auto'>
            {/* <Box h='100%' w='100%' overflowY='auto'> */}
            {pinnedMessages.map((msg) => {
              return (
                <Message
                  key={msg.id}
                  msg={msg}
                  userIdRef={userIdRef}
                  isPinned={true}
                  pinnedMessages={pinnedMessages}
                  setPinnedMessages={setPinnedMessages}
                  chatNamespace={chatNamespace}
                  selectedCourse={selectedCourse}
                />
                // <Box
                //   className='chat'
                //   key={msg.id}
                //   w='100%'
                //   padding='14px 15px'
                //   bgColor={
                //     msg.sender.id === userIdRef.current
                //       ? 'blue.100'
                //       : 'gray.100'
                //   }
                //   color={
                //     msg.sender.id === userIdRef.current
                //       ? 'blue.900'
                //       : 'gray.900'
                //   }
                //   borderRadius='5px'
                //   marginBottom='15px'
                // >
                //   <Text>{msg.content}</Text>
                // </Box>
              );
            })}
            {/* </Box> */}
            {/* <Accordion defaultIndex={[0]} allowMultiple>
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </AccordionItem>
            </Accordion> */}
          </TabPanel>
          <TabPanel>
            <Stack
              key={selectedCourse?.teacher.id}
              w='100%'
              flexDir='row'
              alignItems='center'
              gap='15px'
              padding='10px'
              borderRadius='10px'
              cursor='pointer'
              _hover={{ bgColor: 'gray.100' }}
            >
              <Image
                border='1.2px solid blue'
                borderRadius='full'
                boxSize='35px'
                src={selectedCourse?.teacher.profilePicture || './logo.png'}
                alt={
                  selectedCourse?.teacher.user.firstName +
                  ' ' +
                  selectedCourse?.teacher.user.lastName
                }
              />
              <Text fontSize='sm' fontWeight='600' color='black.500'>
                {selectedCourse?.teacher.user.firstName +
                  ' ' +
                  selectedCourse?.teacher.user.lastName}
              </Text>
            </Stack>
            {members.map((member) => {
              return (
                <Stack
                  key={member.id}
                  w='100%'
                  flexDir='row'
                  alignItems='center'
                  gap='15px'
                  padding='10px'
                  borderRadius='10px'
                  cursor='pointer'
                  _hover={{ bgColor: 'gray.100' }}
                >
                  <Image
                    border='1.2px solid blue'
                    borderRadius='full'
                    boxSize='35px'
                    src={member.profilePicture || './logo.png'}
                    alt={member.user.firstName + ' ' + member.user.lastName}
                  />
                  <Text fontSize='sm' fontWeight='600' color='black.500'>
                    {member.user.firstName + ' ' + member.user.lastName}
                  </Text>
                </Stack>
              );
            })}
          </TabPanel>
          {/* <TabPanel>
            <Stack
              w='100%'
              alignItems='center'
              padding='10px'
              paddingBlock='20px'
              borderRadius='10px'
              boxShadow='0 2px 10px rgba(0,0,0,0.2)'
              // cursor='pointer'
              bgColor='gray.100'
            >
              <Image
                borderRadius='full'
                boxShadow='0 2px 4px 0 rgba(0,0,0,0.1)'
                boxSize='120px'
                border='3px solid gray'
                mb='15px'
                src={teacherInfo.profilePicture || './logo.png'}
                alt={
                  teacherInfo?.user?.firstName +
                  ' ' +
                  teacherInfo?.user?.lastName
                }
              />
              <Text fontWeight='600'>
                {teacherInfo?.user?.firstName +
                  ' ' +
                  teacherInfo?.user?.lastName}
              </Text>
              <Text fontSize='xs'>{teacherInfo?.user?.email}</Text>
              <Stack bgColor='blue.100' p='20px' borderRadius='10px'>
                <Text color='blue.700' fontSize='md' fontWeight='bold'>
                  Bio
                </Text>
                {teacherInfo?.user?.biography ? (
                  <Text>{teacherInfo?.user?.biography}</Text>
                ) : (
                  <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consectetur earum vel, odit ipsam molestiae excepturi
                    placeat nobis? Quisquam illo consequuntur laudantium modi
                    quasi quidem adipisci libero, deserunt ipsum est. Et.
                  </Text>
                )}
              </Stack>
            </Stack>
          </TabPanel> */}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default RoomInfo;
