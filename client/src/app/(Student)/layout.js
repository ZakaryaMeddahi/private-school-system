'use client';

import Logo from '@/components/Logo/Logo';
import {
  Box,
  Divider,
  Text,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from '@chakra-ui/react';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { LuLogOut } from 'react-icons/lu';
import { TbSmartHome } from 'react-icons/tb';
import { CgProfile } from 'react-icons/cg';
import Link from 'next/link';
import { MdKeyboardArrowDown } from 'react-icons/md';

export const StudentContext = createContext();

const Layout = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [search, setSearch] = useState('');

  const inputRef = useRef();

  const onFocus = () => {
    if (inputRef.current) {
      inputRef.current.style.outline = 'none';
      console.log(inputRef.current.style);
    }
  };

  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
  }, []);

  return (
    <Box w='100%' h='100vh' display='flex'>
      {/* Sid bar */}
      <Box w='25%' h='100%' bgColor='#F1F2ED' display='flex' flexDir='column'>
        <Box paddingRight='25px' w='100%'>
          <Logo fontSize='20px' fontWeight='500' />
        </Box>
        <Divider borderColor='#898C81' />
        <Box w='100%' h='100%' display='flex' flexDir='column'>
          <Link href='/student_dashboard'>
            <Box
              w='100%'
              display='flex'
              flexDir='row'
              gap='5'
              alignItems='center'
              paddingLeft='30'
              minH='70px'
              maxH='80px'
              _hover={{ bgColor: 'whiteSmoke' }}
            >
              <TbSmartHome color='#898C81' size='23px' />
              <Text color='#898C81'>Overview</Text>
            </Box>
          </Link>
          <Link href='/student_dashboard/course'>
            <Box
              w='100%'
              display='flex'
              flexDir='row'
              gap='5'
              alignItems='center'
              paddingLeft='30'
              minH='70px'
              maxH='80px'
              _hover={{ bgColor: 'whiteSmoke' }}
            >
              <HiOutlineAcademicCap color='#898C81' size='23px' />
              <Text color='#898C81'>Courses</Text>
            </Box>
          </Link>
          <Box
            w='100%'
            display='flex'
            flexDir='row'
            gap='5'
            alignItems='center'
            paddingLeft='30'
            minH='70px'
            maxH='80px'
            _hover={{ bgColor: 'whiteSmoke' }}
          >
            <HiOutlineAcademicCap color='#898C81' size='23px' />
            <Text color='#898C81'>Enrolled in courses</Text>
          </Box>
        </Box>
        <Box w='100%' height='fit-content' display='flex' flexDir='column'>
          <Link href='/chat'>
            <Box
              w='100%'
              display='flex'
              flexDir='row'
              gap='5'
              alignItems='center'
              paddingLeft='30'
              minH='70px'
              maxH='80px'
              _hover={{ bgColor: 'whiteSmoke' }}
            >
              <IoChatbubblesOutline color='#898C81' size='23px' />
              <Text color='#898C81'>Chat</Text>
            </Box>
          </Link>
          <Link href={`/student_dashboard/profile/${userId}`}>
            <Box
              w='100%'
              display='flex'
              flexDir='row'
              gap='5'
              alignItems='center'
              paddingLeft='30'
              minH='70px'
              maxH='80px'
              _hover={{ bgColor: 'whiteSmoke' }}
            >
              <CgProfile color='#898C81' size='23px' />
              <Text color='#898C81'>Profile</Text>
            </Box>
          </Link>
          <Divider borderColor='#898C81' />
          <Link href='/'>
            <Box
              w='100%'
              display='flex'
              flexDir='row'
              gap='5'
              alignItems='center'
              paddingLeft='30'
              minH='70px'
              maxH='80px'
              _hover={{ bgColor: 'whiteSmoke' }}
            >
              <Box transform='scaleX(-1)'>
                <LuLogOut color='#898C81' size='23px' transform='scaleX(-1)' />
              </Box>
              <Text color='#898C81'>Logout</Text>
            </Box>
          </Link>
        </Box>
      </Box>
      <Box w='100%' h='100%' display='flex' flexDir='column'>
        {/* header bar */}
        <Box
          w='100%'
          h='8%'
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          paddingInline={50}
          paddingBlock={0}
          marginTop={'10px'}
        >
          <Input
            placeholder='Search'
            w='500px'
            borderColor='black'
            onChange={(e) => setSearch(e.target.value)}
          />
          <Box display='flex' alignItems={'center'} gap={2}>
            <Box
              w={'40px'}
              h={'40px'}
              borderRadius='50%'
              bgColor='#D8D9D4'
              display='flex'
              alignItems='center'
              justifyContent='center'
              paddingBlock={5}
            >
              AS
            </Box>
            <Popover>
              <PopoverTrigger>
                <Box
                  w={'40px'}
                  h={'40px'}
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                >
                  <MdKeyboardArrowDown color='black' size='20px' />
                </Box>
              </PopoverTrigger>
              <PopoverContent w='180px' left='-60px'>
                <PopoverArrow left='43px !important' />
                <PopoverCloseButton />
                <Link href={`/student_dashboard/profile/${userId}`}>
                  <PopoverHeader>Profile</PopoverHeader>
                </Link>
                <Link href='/'>
                  <PopoverHeader>Logout</PopoverHeader>
                </Link>
              </PopoverContent>
            </Popover>
          </Box>
        </Box>
        {/* body */}
        <Box w={'100%'} h={'93%'}>
          <StudentContext.Provider value={{ search, setSearch }}>
            {children}
          </StudentContext.Provider>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;

// createdAt
// : 
// "2024-04-25T11:45:37.357Z"
// deadline
// : 
// "2024-12-11T23:00:00.000Z"
// description
// : 
// "In this course you will learn how to create a backend applicaton using Express js"
// difficulty
// : 
// "easy"
// duration
// : 
// 1
// durationUnit
// : 
// "months"
// id
// : 
// "39"
// language
// : 
// "English"
// price
// : 
// 100
// requirements
// : 
// null
// title
// : 
// "Node Js Course"
// topics
// : 
// [{…}]
// updatedAt
// : 
// "2024-04-25T11:45:37.357Z"