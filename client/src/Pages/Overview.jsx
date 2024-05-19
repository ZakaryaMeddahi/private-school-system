'use client';

import { useEffect, useState } from 'react';
// import Calendar from "react-calendar";
import { Badge, Box, Heading, Text, Divider } from '@chakra-ui/react';
import { GetUser } from '@/Lib/getUser';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import { IoChatbubblesOutline, IoSearch } from 'react-icons/io5';
import { CgInbox } from 'react-icons/cg';
import Link from 'next/link';

const Overview = () => {
  const [value, onChange] = useState(new Date());
  const [userId, setUserId] = useState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    GetUser()
      .then((data) => {
        setUserId(data.id);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setRole(data.role);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const FullName = `${firstName} ${lastName}`;

  return (
    <Box
      paddingBlock='20px'
      paddingInline='50px'
      h='100%'
      display='flex'
      flexDir='column'
      overflowY='auto'
    >
      <Box h='100%' display='grid' gridTemplateColumns='1fr 0.5fr' gap={5}>
        <Box h='100%' display='flex' flexDir='column' gap={5}>
          <Box
            h='250px'
            borderRadius='25px'
            bgColor='white'
            boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'
          >
            <Box
              display='flex'
              flexDir='column'
              padding='20px'
              h={'100%'}
              justifyContent={'center'}
            >
              <Heading fontSize='64px'>Welcome Back</Heading>
              <Text fontSize='24px' fontWeight='500'>
                {FullName}
              </Text>
            </Box>
          </Box>
          <Box
            flex={1}
            borderRadius='25px'
            display='grid'
            gridTemplateColumns={'1fr 1fr'}
            gridTemplateRows={'1fr 1fr'}
            gap={5}
          >
            <Link href='/student_dashboard/course'>
              <Box
                bgColor={'#234C51'}
                padding='15px'
                boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'
                borderRadius='15px'
                display='flex'
                flexDirection={'column'}
              >
                <Heading color={'white'} fontWeight='500' marginBottom='5px'>
                  Courese
                </Heading>
                <Divider borderColor='white' borderWidth='1px' opacity={2} />
                <Box
                  display={'flex'}
                  flexDir='row'
                  gap='15px'
                  justifyContent='center'
                  flex={1}
                  alignItems='center'
                >
                  <Text
                    color={'white'}
                    fontSize='32px'
                    fontWeight={'bold'}
                    textAlign='center'
                  >
                    Explore Our Courses
                  </Text>
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='flex-end'
                    flex={1}
                  >
                    <HiOutlineAcademicCap color='white' size='150px' />
                  </Box>
                </Box>
              </Box>
            </Link>
            <Link href='/chat'>
              <Box
                bgColor={'#FCC128'}
                padding='15px'
                boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'
                borderRadius='15px'
                display='flex'
                flexDirection={'column'}
              >
                <Heading color={'white'} fontWeight='500' marginBottom='5px'>
                  Chat
                </Heading>
                <Divider borderColor='white' borderWidth='1px' opacity={2} />
                <Box
                  display={'flex'}
                  flexDir='row'
                  gap='15px'
                  justifyContent='center'
                  flex={1}
                  alignItems='center'
                >
                  <Text
                    color={'white'}
                    fontSize='32px'
                    fontWeight={'bold'}
                    textAlign='center'
                  >
                    Join Us To Disscuss
                  </Text>
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='flex-end'
                    flex={1}
                  >
                    <IoChatbubblesOutline color='white' size='150px' />
                  </Box>
                </Box>
              </Box>
            </Link>
            <Box
              bgColor={'#FF6647'}
              padding='15px'
              boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'
              borderRadius='15px'
              display='flex'
              flexDirection={'column'}
            >
              <Heading color={'white'} fontWeight='500' marginBottom='5px'>
                Enrollments
              </Heading>
              <Divider borderColor='white' borderWidth='1px' opacity={2} />
              <Box
                display={'flex'}
                flexDir='row'
                gap='15px'
                justifyContent='center'
                flex={1}
                alignItems='center'
              >
                <Text
                  color={'white'}
                  fontSize='32px'
                  fontWeight={'bold'}
                  textAlign='center'
                >
                  Enrolled In courses
                </Text>
                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='flex-end'
                  flex={1}
                >
                  <CgInbox color='white' size='150px' />
                </Box>
              </Box>
            </Box>
            <Link href='/student_dashboard/course'>
              <Box
                bgColor={'#213E69'}
                padding='15px'
                boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'
                borderRadius='15px'
                display='flex'
                flexDirection={'column'}
                cursor='pointer'
              >
                <Heading color={'white'} fontWeight='500' marginBottom='5px'>
                  Search
                </Heading>
                <Divider borderColor='white' borderWidth='1px' opacity={2} />
                <Box
                  display={'flex'}
                  flexDir='row'
                  gap='15px'
                  justifyContent='center'
                  flex={1}
                  alignItems='center'
                >
                  <Text
                    color={'white'}
                    fontSize='32px'
                    fontWeight={'bold'}
                    textAlign='center'
                  >
                    Search For Courses
                  </Text>
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='flex-end'
                    flex={1}
                  >
                    <IoSearch color='white' size='150px' />
                  </Box>
                </Box>
              </Box>
            </Link>
          </Box>
        </Box>
        <Box h='100%' display={'flex'} flexDir='column' gap={5}>
          <Box
            w={'100%'}
            h='50%'
            borderRadius='25px'
            bgColor='white'
            boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'
            display='flex'
            flexDir='column'
            alignItems={'center'}
            justifyContent={'center'}
            gap={10}
          >
            <Box
              w='32'
              h='32'
              border='1px solid black'
              borderRadius='50%'
            ></Box>
            <Box textAlign='center'>
              <Heading fontSize='32px'>{FullName}</Heading>
              <Text textTransform='lowercase'>{FullName}{userId}</Text>
              <Badge colorScheme='blue' paddingInline={3}>
                {role}
              </Badge>
            </Box>
          </Box>
          <Box
            h='50%'
            borderRadius='25px'
            bgColor='white'
            boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'
          ></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Overview;
