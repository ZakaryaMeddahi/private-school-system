'use client'

import { Box, Image, Text, Button, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Admin = ({ To }) => {
  return (
    <Box
      w='100%'
      display='flex'
      flexDirection='row'
      alignItems='center'
      justifyContent={'flex-end'}
    >
      <Link href={To}>
        <Button bgColor='#234C51' color='white'>
          Course Details
        </Button>
      </Link>
    </Box>
  );
};
const Student = ({ courseId, price, Enroll }) => {
  const [enrollment, setEnrollment] = useState({});
  const [enrolled, setEnrolled] = useState(false);
  const router = useRouter();
  // const roleRef = useRef();

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
    // roleRef.current = localStorage.getItem('role');
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
    <Box
      w='100%'
      display='flex'
      flexDirection='row'
      alignItems='center'
      justifyContent={Enroll ? 'flex-end' : 'space-between'}
    >
      {/* {Enroll ? (
        <Button bgColor='#234C51' color='white'>
          Join Room
        </Button>
      ) : (
        <>
          <Button bgColor='#234C51' color='white'>
            Enroll
          </Button>
          <Text fontWeight='bold' color={'#FCC128'}>
            {price == 0 ? 'free' : `${price} DZ`}
          </Text>
        </>
      )} */}
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
    </Box>
  );
};

const Teacher = ({ To }) => {
  return (
    <Box
      w='100%'
      display='flex'
      flexDirection='row'
      alignItems='center'
      justifyContent={'space-between'}
    >
      <Button colorScheme={'red'} color='white'>
        Delete Course
      </Button>
      <Link href={To}>
        <Button bgColor='#234C51' color='white'>
          Course Detials
        </Button>
      </Link>
    </Box>
  );
};

const CardForCourse = ({ w, teacher, Course, Role, Enroll }) => {
  const course_details = `/course_details/${Course.id}`;
  return (
    <Link href={course_details}>
      <Box
        w={w || 'fit-content'}
        height={'fit-content'}
        borderRadius='25px'
        paddingBlock='25px'
        paddingInline='15px'
        bgColor={'white'}
        display='flex'
        flexDirection='column'
        gap='15px'
        boxShadow='rgba(0, 0, 0, 0.1) 0px 0px 14px 1px'
        _hover={{
          transform: 'scale(1.05)',
          transition: 'transform 0.5s',
        }}
      >
        <Box display='flex' alignItems='center' justifyContent='center'>
          {/*<Image
                        src={Course?.file?.url1 || '../Private-School-default-image.png'}
                        h={'300px'}
                        borderRadius='25px'
                    /> */}
        </Box>
        <Box
          w='100%'
          display='flex'
          flexDirection='row'
          alignItems='center'
          gap='15px'
        >
          <Box
            w='32px'
            h='32px'
            borderRadius='50%'
            bgColor='whitesmoke'
            display={'flex'}
            alignItems='center'
            justifyContent='center'
          >
            A
          </Box>
          <Text fontWeight='500'>{`${teacher?.user.firstName} ${teacher?.user.lastName}`}</Text>
        </Box>
        <Text fontSize='32px' fontWeight='bold' color='#213E69'>
          {Course?.title}
        </Text>
        <Text color='GrayText'>
          {Course?.description.slice(0, 100) + '...'}
        </Text>
        {Role === 'student' ? (
          <Student courseId={Course.id} price={Course.price} Enroll={Enroll} />
        ) : Role === 'teacher' ? (
          <Teacher To={course_details} />
        ) : (
          <Admin To={course_details} />
        )}
      </Box>
    </Link>
  );
};

export default CardForCourse;
