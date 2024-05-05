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
} from '@chakra-ui/react';
import { IoMdClose } from 'react-icons/io';
// import { useDisclosure } from '@chakra-ui/react';

// const Students = [
//   {
//     id: 1,
//     firstName: 'Abdelali',
//     lastName: 'Sid Ahmed',
//     email: 'ex@gmail.com',
//     adress: 'Tenes,Chlef',
//     role: 'Student',
//     status: 'Active',
//     lastLogin: '4/30/2024 11:15:35',
//     createdAt: '4/30/2024 11:15:35',
//     updatedAt: '4/30/2024 11:15:35',
//   },
//   {
//     id: 2,
//     firstName: 'Sid',
//     lastName: 'Ahmed',
//     email: 'ex@gmail.com',
//     adress: 'Tenes,Chlef',
//     role: 'Student',
//     status: 'Active',
//     lastLogin: '4/30/2024 11:15:35',
//     createdAt: '4/30/2024 11:15:35',
//     updatedAt: '4/30/2024 11:15:35',
//   },
//   {
//     id: 3,
//     firstName: 'Abdelali',
//     lastName: 'Nadir',
//     email: 'ex@gmail.com',
//     adress: 'Tenes,Chlef',
//     role: 'Student',
//     status: 'Active',
//     lastLogin: '4/30/2024 11:15:35',
//     createdAt: '4/30/2024 11:15:35',
//     updatedAt: '4/30/2024 11:15:35',
//   },
//   {
//     id: 4,
//     firstName: 'Abdelali',
//     lastName: 'Sid Ahmed',
//     email: '    ',
//     adress: 'Tenes,Chlef',
//     role: 'Student',
//     status: 'Active',
//     lastLogin: '4/30/2024 11:15:35',
//     createdAt: '4/30/2024 11:15:35',
//     updatedAt: '4/30/2024 11:15:35',
//   },
//   {
//     id: 5,
//     firstName: 'Abdelali',
//     lastName: 'Sid Ahmed',
//     email: '',
//     adress: 'Tenes,Chlef',
//     role: 'Student',
//     status: 'Active',
//     lastLogin: '4/30/2024 11:15:35',
//     createdAt: '4/30/2024 11:15:35',
//     updatedAt: '4/30/2024 11:15:35',
//   },
//   {
//     id: 25,
//     firstName: 'Abdelali',
//     lastName: 'Sid Ahmed',
//     email: '',
//     adress: 'Tenes,Chlef',
//     role: 'Student',
//     status: 'Active',
//     lastLogin: '4/30/2024 11:15:35',
//     createdAt: '4/30/2024 11:15:35',
//     updatedAt: '4/30/2024 11:15:35',
//   },
//   {
//     id: 55,
//     firstName: 'Abdelali',
//     lastName: 'Sid Ahmed',
//     email: '',
//     adress: 'Tenes,Chlef',
//     role: 'Student',
//     status: 'Active',
//     lastLogin: '4/30/2024 11:15:35',
//     createdAt: '4/30/2024 11:15:35',
//     updatedAt: '4/30/2024 11:15:35',
//   },
// ];

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [adress, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [lastLogin, setLastLogin] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');

  const boxRef = useRef();
  const gridRef = useRef();

  const getStudent = (id) => {
    students.forEach((student) => {
      if (student.id === Number(id)) {
        setFirstName(student.firstName);
        setLastName(student.lastName);
        setEmail(student.email);
        setAddress(student.adress);
        setRole(student.role);
        setStatus(student.status);
        setLastLogin(student.lastLogin);
        setCreatedAt(student.createdAt);
        setUpdatedAt(student.updatedAt);
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

  const deleteStudent = (id) => {
    const newStudents = [];
    students.filter((student) => {
      if (student.id !== Number(id)) {
        newStudents.push(student);
      }
    });
    setStudents(newStudents);
  };

  const SearchStudent = (value) => {
    const newStudents = [];
    Students.filter((student) => {
      if (
        student.firstName.toLowerCase().includes(value.toLowerCase()) ||
        student.lastName.toLowerCase().includes(value.toLowerCase())
      ) {
        newStudents.push(student);
      }
    });
    setStudents(newStudents);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/students`,
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
          const { data } = await response.json();
          throw new Error(data.message);
        }

        const { data } = await response.json();

        setStudents(data.students);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <Box h={'100%'} paddingInline='50px'>
      <Box
        w={'100%'}
        h={'10%'}
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'flex-start'}
      >
        <Input
          placeholder='Search Student'
          w='500px'
          borderColor='black'
          onChange={(e) => SearchStudent(e.target.value)}
        />
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
          {students?.map((student, index) => {
            const id = student.id;
            return (
              <Box
                id={id}
                key={id}
                className='student-card'
                width={'100%'}
                display='flex'
                flexDirection={'row'}
                justifyContent={'space-between'}
                borderBottom={'1px solid #E2E8F0'}
                _hover={{ bgColor: 'whiteSmoke' }}
                paddingBlock={'10px'}
                onClick={() => {
                  const students = document.querySelectorAll('.student-card');

                  students.forEach((student) => {
                    student.addEventListener('click', (e) => {
                      const id = e.target.id;
                      getStudent(id);
                      openTab();
                    });
                  });
                }}
              >
                <Box display='flex' flexDirection={'row'} gap={5}>
                  <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    width={'50px'}
                    height={'50px'}
                    bgColor={'#E2E8F0'}
                    borderRadius={'50%'}
                  >
                    <Text fontSize={18} fontWeight={500}>
                      {student.firstName[0]}
                    </Text>
                  </Box>
                  <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                  >
                    <Text
                      fontSize={18}
                      fontWeight={500}
                    >{`${student.firstName} ${student.lastName}`}</Text>
                  </Box>
                </Box>
                <Box display='flex' flexDirection={'row'} gap={5}>
                  <Box
                    className='delete-student'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    width={'50px'}
                    height={'50px'}
                    _hover={{ bgColor: 'white' }}
                    borderRadius={'50%'}
                    onClick={() => {
                      const students =
                        document.querySelectorAll('.student-card');

                      students.forEach((student) => {
                        student.addEventListener('click', () => {
                          const id = student.id;
                          console.log(id);
                          deleteStudent(id);
                        });
                      });
                    }}
                  >
                    <MdDelete fontSize={24} color='red' />
                  </Box>
                </Box>
              </Box>
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
          >
            <IoMdClose size={'25px'} onClick={closeTab} />
          </Box>
          <Image src='/profile.jpeg' w='100%' />
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
                <span style={{ fontWeight: '700' }}> First Name: </span>{' '}
                {firstName}
              </Text>
              <Text>
                {' '}
                <span style={{ fontWeight: '700' }}> Last Name: </span>{' '}
                {lastName}
              </Text>
            </Box>
            <Text>
              {' '}
              <span style={{ fontWeight: '700' }}> Email: </span> {email}
            </Text>
            <Text>
              {' '}
              <span style={{ fontWeight: '700' }}> Adress: </span> {adress}
            </Text>
            <Text>
              {' '}
              <span style={{ fontWeight: '700' }}> Role: </span> {role}
            </Text>
            <Text>
              {' '}
              <span style={{ fontWeight: '700' }}> Status: </span> {status}
            </Text>
            <Text>
              {' '}
              <span style={{ fontWeight: '700' }}> Last Login: </span>{' '}
              {lastLogin}
            </Text>
            <Text>
              {' '}
              <span style={{ fontWeight: '700' }}> Created At: </span>{' '}
              {createdAt}
            </Text>
            <Text>
              {' '}
              <span style={{ fontWeight: '700' }}> Updated At: </span>{' '}
              {updatedAt}
            </Text>
            <Box
              display='flex'
              flexDir='row'
              justifyContent='space-between'
              alignItems='center'
              marginTop='25px'
            >
              <Button
                colorScheme='red'
                onClick={() => {
                  console.log('Delete stuent');
                }}
              >
                Delete student
              </Button>
              <Button colorScheme='blue'>View Profile</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentsPage;
