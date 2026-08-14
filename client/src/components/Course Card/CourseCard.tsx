'use-client';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Image,
  Text,
  Divider,
  Stack,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const CourseCard = ({ courseId, course }) => {
  const { difficulty, duration, durationUnit, language, teacher, file } =
    course;
  const [enrollment, setEnrollment] = useState({});
  const [enrolled, setEnrolled] = useState(false);
  const router = useRouter();
  const roleRef = useRef();

  const enroll = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/${courseId}/enrollments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) {
        response.status === 401 && router.push('/login');
        const data = await response.json();
        throw new Error(data.message);
      }

      const { data } = await response.json();

      console.log(data);

      setEnrolled(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    roleRef.current = localStorage.getItem('role');
    const checkEnrollment = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/${courseId}/enrollments/status`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (!response.ok) {
          response.status === 401 && router.push('/login');
          const data = await response.json();
          throw new Error(data.message);
        }

        const { data } = await response.json();
        setEnrollment(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    checkEnrollment();
  }, [enrolled]);

  return (
    <Card maxW='md'>
      <CardHeader>
        <Image
          src={file?.url || '../../Private-School-default-image.png'}
          alt='course image'
          borderRadius='8'
        />
      </CardHeader>

      <CardBody>
        <Box
          display='flex'
          flexDirection='row'
          justifyContent='start'
          alignItems='center'
        >
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            gap='5px'
            mb='30px'
          >
            <Avatar size='sm' mr='10px' />
            <Text>
              {teacher?.user?.firstName} {teacher?.user?.lastName}
            </Text>
          </Box>
          {/* <Box>
            <Text color='#FCC128'>Web Dev</Text>
          </Box> */}
        </Box>
        <Box>
          <Heading size='md' color='#213E69' mb='20px'>
            {course.title}
          </Heading>
          <Stack flexDir='row' color='#213E69' mb='20px'>
            <Text fontWeight='600'>Language: </Text> <Text>{language}</Text>
          </Stack>
          <Stack flexDir='row' color='#213E69' mb='20px'>
            <Text fontWeight='600'>Duration: </Text>
            <Text>
              {duration} {durationUnit}
            </Text>
          </Stack>
          <Stack flexDir='row' color='#213E69'>
            <Text fontWeight='600'>Difficulty: </Text> <Text>{difficulty}</Text>
          </Stack>
        </Box>
      </CardBody>
      {roleRef.current === 'student' && (
        <CardFooter justifyContent='end'>
          {!enrollment.isEnrolled ? (
            <Button
              bgColor='#234C51'
              color='white'
              w='180px'
              textAlign='center'
              _hover={{ bgColor: '#234C5180' }}
              onClick={enroll}
            >
              Enroll
            </Button>
          ) : enrollment.status === 'approved' ? (
            <Button
              bgColor='#234C51'
              color='white'
              w='180px'
              textAlign='center'
              _hover={{ bgColor: '#234C5150' }}
              onClick={() => {
                router.push(`/chat`);
              }}
            >
              chat rooms
            </Button>
          ) : (
            <Button
              bgColor='#234C51'
              color='white'
              w='180px'
              textAlign='center'
              isDisabled={true}
              _hover={{ bgColor: '#234C51' }}
            >
              {enrollment.status}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default CourseCard;
