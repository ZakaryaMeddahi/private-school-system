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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Center,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { IoMdClose } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import UserCard from '@/components/UserCard';

// const Teachers = [
//     {
//         id: 1,
//         firstName: 'Abdelali',
//         lastName: 'Sid Ahmed',
//         email: 'ex@gmail.com',
//         adress: 'Tenes,Chlef',
//         role: 'Teacher',
//         status: 'Active',
//         lastLogin: '4/30/2024 11:15:35',
//         createdAt: '4/30/2024 11:15:35',
//         updatedAt: '4/30/2024 11:15:35'
//     },
//     {
//         id: 2,
//         firstName: 'Sid',
//         lastName: 'Ahmed',
//         email: 'ex@gmail.com',
//         adress: 'Tenes,Chlef',
//         role: 'Teacher',
//         status: 'Active',
//         lastLogin: '4/30/2024 11:15:35',
//         createdAt: '4/30/2024 11:15:35',
//         updatedAt: '4/30/2024 11:15:35'
//     },
//     {
//         id: 3,
//         firstName: 'Abdelali',
//         lastName: 'Nadir',
//         email: 'ex@gmail.com',
//         adress: 'Tenes,Chlef',
//         role: 'Teacher',
//         status: 'Active',
//         lastLogin: '4/30/2024 11:15:35',
//         createdAt: '4/30/2024 11:15:35',
//         updatedAt: '4/30/2024 11:15:35'
//     },
//     {
//         id: 4,
//         firstName: 'Abdelali',
//         lastName: 'Sid Ahmed',
//         email: '    ',
//         adress: 'Tenes,Chlef',
//         role: 'Teacher',
//         status: 'Active',
//         lastLogin: '4/30/2024 11:15:35',
//         createdAt: '4/30/2024 11:15:35',
//         updatedAt: '4/30/2024 11:15:35'
//     },
//     {
//         id: 5,
//         firstName: 'Abdelali',
//         lastName: 'Sid Ahmed',
//         email: '',
//         adress: 'Tenes,Chlef',
//         role: 'Teacher',
//         status: 'Active',
//         lastLogin: '4/30/2024 11:15:35',
//         createdAt: '4/30/2024 11:15:35',
//         updatedAt: '4/30/2024 11:15:35'
//     },
//     {
//         id: 25,
//         firstName: 'Abdelali',
//         lastName: 'Sid Ahmed',
//         email: '',
//         adress: 'Tenes,Chlef',
//         role: 'Teacher',
//         status: 'Active',
//         lastLogin: '4/30/2024 11:15:35',
//         createdAt: '4/30/2024 11:15:35',
//         updatedAt: '4/30/2024 11:15:35'
//     },
//     {
//         id: 55,
//         firstName: 'Abdelali',
//         lastName: 'Sid Ahmed',
//         email: '',
//         adress: 'Tenes,Chlef',
//         role: 'Teacher',
//         status: 'Active',
//         lastLogin: '4/30/2024 11:15:35',
//         createdAt: '4/30/2024 11:15:35',
//         updatedAt: '4/30/2024 11:15:35'
//     },
// ]

const TeachersPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [teachers, setTeachers] = useState([]);
  const [teacherFirstName, setTeacherFirstName] = useState('');
  const [teacherLastName, setTeacherLastName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');

  const [profilePicture, setProfilePicture] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [isActive, setIsActive] = useState(null);
  const [lastLogin, setLastLogin] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');

  const [displaySuccessAlert, setDisplaySuccessAlert] = useState(false);
  const [displayErrorAlert, setDisplayErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Cannot create account');
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const boxRef = useRef();
  const gridRef = useRef();

  // time util
  const convertTime = (time) => {
    if (!time) return null;
    const date = new Date(time);
    return date.toLocaleString().replace(',', '');
  };

  const getTeacher = (id) => {
    teachers.forEach((teacher) => {
      if (teacher.id === id) {
        setProfilePicture(teacher.profilePicture);
        setFirstName(teacher.firstName);
        setLastName(teacher.lastName);
        setEmail(teacher.email);
        setAddress(teacher.address);
        setRole(teacher.role);
        setIsActive(teacher.isActive);
        setLastLogin(teacher.lastLogging);
        setCreatedAt(teacher.createdAt);
        setUpdatedAt(teacher.updatedAt);
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

  const deleteTeacher = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/teachers/${id}`,
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
        // setDisplayErrorAlert(true);
        // setTimeout(() => {
        //   setDisplayErrorAlert(false);
        // }, 3000);
        throw new Error(data.message);
      }

      const newTeachers = [];
      teachers.filter((teacher) => {
        if (teacher.id !== id) {
          newTeachers.push(teacher);
        }
      });
      setTeachers(newTeachers);
    } catch (error) {
      console.error(error);
    }
  };

  const SearchTeacher = async (value) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/teachers?search=${value}`,
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

      setTeachers(data);
    } catch (error) {
      console.error(error);
    }
    // const newTeachers = [];
    // // add search functionality (send get request with the required queries)
    // teachers.filter((teacher) => {
    //   if (
    //     teacher.firstName.toLowerCase().includes(value.toLowerCase()) ||
    //     teacher.lastName.toLowerCase().includes(value.toLowerCase())
    //   ) {
    //     newTeachers.push(teacher);
    //   }
    // });
    // setTeachers(newTeachers);
  };

  const createTeacher = async () => {
    try {
      if (!teacherFirstName || !teacherLastName || !teacherEmail) {
        setDisplayErrorAlert(true);
        setTimeout(() => {
          setDisplayErrorAlert(false);
        }, 3000);
        throw new Error('Please fill all fields');
      }

      setIsSubmitting(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/teachers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            firstName: teacherFirstName,
            lastName: teacherLastName,
            email: teacherEmail,
          }),
        }
      );

      if (!response.ok) {
        response.status === 401 && router.push('/login');
        const data = await response.json();
        setDisplayErrorAlert(true);
        setTimeout(() => {
          setDisplayErrorAlert(false);
        }, 3000);
        throw new Error(data.message);
      }

      const { data } = await response.json();

      console.log(data);

      setTeachers((prev) => {
        return [...prev, data];
      });

      setTeacherFirstName('');
      setTeacherLastName('');
      setTeacherEmail('');

      setDisplaySuccessAlert(true);

      setIsSubmitting(false);

      setTimeout(() => {
        setDisplaySuccessAlert(false);
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/teachers`,
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

        setTeachers(data);
      } catch (error) {
        setErrorMessage(error.message);
        console.error(error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <Box h={'100%'} paddingInline='50px'>
      <Box
        w={'100%'}
        h={'10%'}
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Input
          placeholder='Search Teacher'
          w='500px'
          borderColor='black'
          onChange={(e) => SearchTeacher(e.target.value)}
        />
        <Button
          ref={btnRef}
          bgColor={'#234C51'}
          color={'white'}
          onClick={onOpen}
        >
          + Add Teacher
        </Button>
      </Box>
      {/* create account for teacher */}
      <Drawer
        size='sm'
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create teacher's account</DrawerHeader>

          <DrawerBody>
            <FormControl display='flex' flexDirection='column' gap='15px'>
              <Input
                value={teacherFirstName}
                placeholder='First Name'
                onChange={(e) => setTeacherFirstName(e.target.value)}
              />
              <Input
                value={teacherLastName}
                placeholder='Last Name'
                onChange={(e) => setTeacherLastName(e.target.value)}
              />
              <Input
                value={teacherEmail}
                type='email'
                placeholder='Teacher Email'
                onChange={(e) => setTeacherEmail(e.target.value)}
              />
            </FormControl>
          </DrawerBody>

          <DrawerFooter display='flex' flexDirection='column'>
            {displaySuccessAlert && (
              <Alert
                status='success'
                variant='subtle'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='100px'
                marginBottom='30px'
                borderRadius='10px'
              >
                <AlertIcon boxSize='25px' mr={0} />
                {/* <AlertTitle mt={4} mb={1} fontSize='lg'>
                Application submitted!
              </AlertTitle> */}
                <AlertDescription maxWidth='sm'>
                  Created successfully
                </AlertDescription>
              </Alert>
            )}
            {displayErrorAlert && (
              <Alert
                status='error'
                variant='subtle'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='100px'
                marginBottom='30px'
                borderRadius='10px'
              >
                <AlertIcon boxSize='25px' mr={0} />
                {/* <AlertTitle mt={4} mb={1} fontSize='lg'>
                Application submitted!
              </AlertTitle> */}
                <AlertDescription maxWidth='sm'>
                  {errorMessage}
                </AlertDescription>
              </Alert>
            )}
            <Box w='100%' display='flex' justifyContent='space-between'>
              <Button
                variant='outline'
                paddingInline='20px'
                mr={3}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                isLoading={isSubmitting ? true : false}
                loadingText='Saving'
                colorScheme='blue'
                paddingInline='20px'
                onClick={createTeacher}
              >
                Save
              </Button>
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Box
        ref={gridRef}
        // w='100%'
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
          {teachers.map((teacher) => {
            const id = teacher.id;
            return (
              <UserCard
                key={teacher.id}
                user={teacher}
                getUser={getTeacher}
                deleteUser={deleteTeacher}
                openTab={openTab}
              />
            );
          })}
        </Box>
        <Box
          display='none'
          ref={boxRef}
          // w='100%'
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
          >
            <IoMdClose size={'25px'} cursor='pointer' onClick={closeTab} />
          </Box>
          <Center>
            <Image
              h='200px'
              w='200px'
              mb='20px'
              borderRadius='50%'
              src={profilePicture || '/user.png'}
            />
          </Center>
          <Box
            paddingRight='50px'
            display='flex'
            flexDirection='column'
            gap='15px'
            paddingBlock='10px'
          >
            <Box
              w='100%'
              display={'flex'}
              flexDirection='row'
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Text>
                {' '}
                <span style={{ fontWeight: '700' }}> First name: </span>{' '}
                {firstName}
              </Text>
              <Text>
                {' '}
                <span style={{ fontWeight: '700' }}> Last name: </span>{' '}
                {lastName}
              </Text>
            </Box>
            <Text>
              {' '}
              <span style={{ fontWeight: '700' }}> Email: </span> {email}
            </Text>
            <Text display={address ? 'block' : 'none'}>
              {' '}
              <span style={{ fontWeight: '700' }}> Address: </span> {address}
            </Text>
            <Text>
              {' '}
              <span style={{ fontWeight: '700' }}> Role: </span> {role}
            </Text>
            <Text>
              {' '}
              <span style={{ fontWeight: '700' }}> Status: </span>{' '}
              {isActive ? 'Active' : 'Inactive'}
            </Text>
            {lastLogin && (
              <Text>
                {' '}
                <span style={{ fontWeight: '700' }}>
                  {' '}
                  Last login date:{' '}
                </span>{' '}
                {convertTime(lastLogin)}
              </Text>
            )}
            <Text>
              {' '}
              <span style={{ fontWeight: '700' }}> Created at: </span>{' '}
              {convertTime(createdAt)}
            </Text>
            <Text>
              {' '}
              <span style={{ fontWeight: '700' }}> Updated at: </span>{' '}
              {convertTime(updatedAt)}
            </Text>
            {/* <Box
              display='flex'
              flexDir='row'
              justifyContent='space-between'
              alignItems='center'
              marginTop='25px'
            >
              <Button
                colorScheme='red'
                onClick={onDeleteAlertOpen}
              >
                Delete Teacher
              </Button>
              <Button colorScheme='blue'>View Profile</Button>
            </Box> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TeachersPage;
