'use client';

import { useEffect, useRef, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import {
  Box,
  Button,
  Image,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  FormControl,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
} from '@chakra-ui/react';
import { IoMdClose } from 'react-icons/io';
import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';
import CourseCard from '@/components/CourseCard';

// const Courses = [
//     {
//         id: 1,
//         title: 'UI/UX',
//         description: 'This is a course for Designers',
//         teacher: 'Abdelali Sid Ahmed',
//         status: 'Active',
//         createdAt: '4/30/2024 11:15:35',
//         updatedAt: '4/30/2024 11:15:35'
//     },
//     {
//         id: 2,
//         title: 'NextJs',
//         description: 'This is a course for Developers',
//         teacher: 'Abdelali Sid Ahmed',
//         status: 'Active',
//         createdAt: '4/30/2024 11:15:35',
//         updatedAt: '4/30/2024 11:15:35'
//     },
//     {
//         id: 3,
//         title: 'NestJs',
//         description: 'This is a course for Developers',
//         teacher: 'Abdelali Sid Ahmed',
//         status: 'Active',
//         createdAt: '4/30/2024 11:15:35',
//         updatedAt: '4/30/2024 11:15:35'
//     },
// ]

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseTeacher, setCourseTeacher] = useState('');
  const [courseStatus, setCourseStatus] = useState('');
  const [courseImage, setCourseImage] = useState('');
  const [courseCreatedAt, setCourseCreatedAt] = useState('');
  const [courseUpdatedAt, setCourseUpdatedAt] = useState('');

  const boxRef = useRef();
  const gridRef = useRef();

  const {
    isOpen: isDeleteAlertOpen,
    onOpen: onDeleteAlertOpen,
    onClose: onDeleteAlertClose,
  } = useDisclosure();
  const cancelRef = useRef();

  const getCourse = (id) => {
    courses.forEach((course) => {
      if (course.id === id) {
        setCourseId(course.id);
        setCourseTitle(course.title);
        setCourseDescription(course.description);
        setCourseTeacher(
          `${course.teacher.user.firstName} ${course.teacher.user.lastName}`
        );
        setCourseStatus(course.status);
        setCourseImage(course.file.url);
        setCourseCreatedAt(course.createdAt);
        setCourseUpdatedAt(course.updatedAt);
      }
    });
  };

  const openTab = () => {
    if (gridRef.current && boxRef.current) {
      boxRef.current.style.display = 'flex';
      gridRef.current.style.gridTemplateColumns = '1fr 0.6fr';
    }
  };

  const closeTab = () => {
    if (gridRef.current && boxRef.current) {
      boxRef.current.style.display = 'none';
      gridRef.current.style.gridTemplateColumns = '1fr';
    }
  };

  const deleteCourse = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/${id}`,
        {
          method: 'DELETE',
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

      const newCourses = courses.filter((course) => course.id !== id);
      setCourses(newCourses);
      closeTab()
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/chats`,
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

        console.log(data);

        setCourses(data);
      } catch (error) {
        setErrorMessage(error.message);
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onDeleteAlertClose}
        isOpen={isDeleteAlertOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete course?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to remove this course?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onDeleteAlertClose}>
              No
            </Button>
            <Button
              colorScheme='red'
              ml={3}
              onClick={() => deleteCourse(courseId)}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Box h={'100%'} paddingInline='50px'>
        <Box
          w={'100%'}
          h={'10%'}
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'flex-end'}
        >
          <Link href='/create_course'>
            <Button bgColor={'#234C51'} color={'white'}>
              + Create Course
            </Button>
          </Link>
        </Box>
        <Box
          ref={gridRef}
          w='100%'
          h='82vh'
          display='grid'
          gridTemplateColumns='1fr'
          gap={5}
        >
          <Box
            w='100%'
            h='100%'
            display='flex'
            flexDir='column'
            overflowY={'auto'}
          >
            {courses.map((course) => {
              return (
                <CourseCard
                  key={course.id}
                  course={course}
                  getCourse={getCourse}
                  deleteCourse={deleteCourse}
                  openTab={openTab}
                />
              );
            })}
          </Box>
          <Box
            display='none'
            ref={boxRef}
            w='100%'
            h='100%'
            bgColor={'white'}
            flexDir='column'
            gap={5}
            overflowY={'auto'}
          >
            <Box
              w='100%'
              display='flex'
              flexDirection='row'
              justifyContent='flex-end'
              padding={'10px'}
              cursor='pointer'
            >
              <IoMdClose size={'25px'} onClick={closeTab} />
            </Box>
            <Image src={courseImage || '/ui-ux-unsplash.jpg'} w='100%' />
            <Box
              paddingRight='50px'
              display='flex'
              flexDirection='column'
              gap='15px'
              paddingBlock='10px'
            >
              <Text>
                {' '}
                <span style={{ fontWeight: '700' }}> Course Title: </span>{' '}
                {courseTitle}
              </Text>
              <Text>
                {' '}
                <span style={{ fontWeight: '700' }}>
                  {' '}
                  Course Teacher:{' '}
                </span>{' '}
                {courseTeacher}
              </Text>
              <Text>
                {' '}
                <span style={{ fontWeight: '700' }}> Description: </span>{' '}
                {courseDescription}
              </Text>
              <Text>
                {' '}
                <span style={{ fontWeight: '700' }}> Created At: </span>{' '}
                {courseCreatedAt}
              </Text>
              <Text>
                {' '}
                <span style={{ fontWeight: '700' }}> Updated At: </span>{' '}
                {courseUpdatedAt}
              </Text>
              <Box
                display='flex'
                flexDir='row'
                justifyContent='space-between'
                alignItems='center'
                marginTop='25px'
              >
                <Button colorScheme='red' onClick={onDeleteAlertOpen}>
                  Delete Course
                </Button>
                <Link href={`/course_details/${courseId}`}>
                  <Button colorScheme='blue'>View Course Details</Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MyCourses;
