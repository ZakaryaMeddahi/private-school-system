'use client';

import { useEffect, useRef, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { Box, Button, Image, Text, Drawer,  DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Input, FormControl } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { IoMdClose } from "react-icons/io";

const Teachers = [
    {
        id: 1,
        firstName: 'Abdelali',
        lastName: 'Sid Ahmed',
        email: 'ex@gmail.com',
        adress: 'Tenes,Chlef',
        role: 'Teacher',
        status: 'Active',
        lastLogin: '4/30/2024 11:15:35',
        createdAt: '4/30/2024 11:15:35',
        updatedAt: '4/30/2024 11:15:35'
    },
    {
        id: 2,
        firstName: 'Sid',
        lastName: 'Ahmed',
        email: 'ex@gmail.com',
        adress: 'Tenes,Chlef',
        role: 'Teacher',
        status: 'Active',
        lastLogin: '4/30/2024 11:15:35',
        createdAt: '4/30/2024 11:15:35',
        updatedAt: '4/30/2024 11:15:35'
    },
    {
        id: 3,
        firstName: 'Abdelali',
        lastName: 'Nadir',
        email: 'ex@gmail.com',
        adress: 'Tenes,Chlef',
        role: 'Teacher',
        status: 'Active',
        lastLogin: '4/30/2024 11:15:35',
        createdAt: '4/30/2024 11:15:35',
        updatedAt: '4/30/2024 11:15:35'
    },
    {
        id: 4,
        firstName: 'Abdelali',
        lastName: 'Sid Ahmed',
        email: '    ',
        adress: 'Tenes,Chlef',
        role: 'Teacher',
        status: 'Active',
        lastLogin: '4/30/2024 11:15:35',
        createdAt: '4/30/2024 11:15:35',
        updatedAt: '4/30/2024 11:15:35'
    },
    {
        id: 5,
        firstName: 'Abdelali',
        lastName: 'Sid Ahmed',
        email: '',
        adress: 'Tenes,Chlef',
        role: 'Teacher',
        status: 'Active',
        lastLogin: '4/30/2024 11:15:35',
        createdAt: '4/30/2024 11:15:35',
        updatedAt: '4/30/2024 11:15:35'
    },
    {
        id: 25,
        firstName: 'Abdelali',
        lastName: 'Sid Ahmed',
        email: '',
        adress: 'Tenes,Chlef',
        role: 'Teacher',
        status: 'Active',
        lastLogin: '4/30/2024 11:15:35',
        createdAt: '4/30/2024 11:15:35',
        updatedAt: '4/30/2024 11:15:35'
    },
    {
        id: 55,
        firstName: 'Abdelali',
        lastName: 'Sid Ahmed',
        email: '',
        adress: 'Tenes,Chlef',
        role: 'Teacher',
        status: 'Active',
        lastLogin: '4/30/2024 11:15:35',
        createdAt: '4/30/2024 11:15:35',
        updatedAt: '4/30/2024 11:15:35'
    },
]

const TeachersPage = () => {

    const [teacherFirstName, setTeacherFirstName] = useState('');
    const [teacherLastName, setTeacherLastName] = useState('');
    const [teacherEmail, setTeacherEmail] = useState('');

    const [teachers, setTeachers] = useState(Teachers);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [adress, setAdress] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');
    const [lastLogin, setLastLogin] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    
    const boxRef = useRef();
    const gridRef = useRef();

    const getTeacher = (id) => {

        Teachers.forEach((teacher) => {

            if(teacher.id === Number(id) ) {
                setFirstName(teacher.firstName);
                setLastName(teacher.lastName);
                setEmail(teacher.email);
                setAdress(teacher.adress);
                setRole(teacher.role);
                setStatus(teacher.status);
                setLastLogin(teacher.lastLogin);
                setCreatedAt(teacher.createdAt);
                setUpdatedAt(teacher.updatedAt);
            }
        })
    }

    const openTab = () => {
        if(gridRef.current && boxRef.current) {
            boxRef.current.style.display = 'flex';
            gridRef.current.style.gridTemplateColumns = '1fr 0.6fr';
        }
    }
    
    const closeTab = () => {
        if(gridRef.current && boxRef.current) {
            boxRef.current.style.display = 'none';
            gridRef.current.style.gridTemplateColumns = '1fr';
        }
    }

    const deleteTeacher = (id) => {
        const newTeachers = [];
        teachers.filter((teacher) => {
            if(teacher.id !== Number(id)) {
                newTeachers.push(teacher);
            }
        })
        setTeachers(newTeachers);
    }

    const SearchTeacher = (value) => {
        const newTeachers = [];
        Teachers.filter((teacher) => {
            if(teacher.firstName.toLowerCase().includes(value.toLowerCase()) || teacher.lastName.toLowerCase().includes(value.toLowerCase())) {
                newTeachers.push(teacher);
            }
        })
        setTeachers(newTeachers);
    }

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
                    placeholder="Search Teacher" 
                    w='500px' 
                    borderColor='black'
                    onChange={e => SearchTeacher(e.target.value)} 
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
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Create account for teacher</DrawerHeader>

                <DrawerBody>
                    <FormControl display='flex' flexDirection='column' gap='15px' >
                        <Input placeholder='First Name' onChange={e => setTeacherFirstName(e.target.value)} />
                        <Input placeholder='Last Name' onChange={e => setTeacherLastName(e.target.value)} />
                        <Input type='email' placeholder='Teacher Email' onChange={e => setTeacherEmail(e.target.value)} />
                    </FormControl>
                </DrawerBody>

                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={onClose}>
                    Cancel
                    </Button>
                    <Button colorScheme='blue' onClick={() => {
                        console.log(teacherFirstName, teacherLastName, teacherEmail);
                    }}>Save</Button>
                </DrawerFooter>
                </DrawerContent>
            </Drawer>
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
                    {
                        teachers.map((teacher, index) => {
                            const id = teacher.id;
                            return (
                                <Box
                                    id={id}
                                    key={id}
                                    className='teacher-card'
                                    width={'100%'}
                                    display='flex'
                                    flexDirection={'row'}
                                    justifyContent={'space-between'}
                                    borderBottom={'1px solid #E2E8F0'}
                                    _hover={{bgColor: 'whiteSmoke'}}
                                    paddingBlock={'10px'}
                                    onClick={() => {
                                        const teachers = document.querySelectorAll('.teacher-card');

                                        teachers.forEach((teacher) => {
                                            teacher.addEventListener('click', (e) => {
                                                const id = e.target.id;
                                                getTeacher(id);
                                                openTab();
                                            })
                                        })
                                    }}
                                >
                                    <Box
                                        display='flex'
                                        flexDirection={'row'}
                                        gap={5}
                                    >
                                        <Box
                                            display='flex'
                                            justifyContent='center'
                                            alignItems='center'
                                            width={'50px'}
                                            height={'50px'}
                                            bgColor={'#E2E8F0'}
                                            borderRadius={'50%'}
                                        >
                                            <Text fontSize={18} fontWeight={500}>{teacher.firstName[0]}</Text>
                                        </Box>
                                        <Box
                                            display='flex'
                                            flexDirection='column'
                                            justifyContent='center'
                                        >
                                            <Text fontSize={18} fontWeight={500}>{`${teacher.firstName} ${teacher.lastName}`}</Text>
                                        </Box>
                                    </Box>
                                    <Box
                                        display='flex'
                                        flexDirection={'row'}
                                        gap={5}
                                        >
                                        <Box
                                            className='delete-teacher'
                                            display='flex'
                                            justifyContent='center'
                                            alignItems='center'
                                            width={'50px'}
                                            height={'50px'}
                                            _hover={{bgColor: 'white'}}
                                            borderRadius={'50%'}
                                            onClick={() => {
                                                const teachers  = document.querySelectorAll('.teacher-card');

                                                teachers.forEach((teacher) => {
                                                    teacher.addEventListener('click', () => {
                                                        const id = teacher.id;
                                                        console.log(id);
                                                        deleteTeacher(id);
                                                    })
                                                })
                                            }}
                                        >
                                            <MdDelete fontSize={24} color='red' />
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        })
                    }
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
                            <Text> <span style={{fontWeight: '700'}}> First Name: </span> {firstName}</Text>
                            <Text> <span style={{fontWeight: '700'}}> Last Name: </span> {lastName}</Text>
                        </Box>
                        <Text> <span style={{fontWeight: '700'}}> Email: </span> {email}</Text>
                        <Text> <span style={{fontWeight: '700'}}> Adress: </span> {adress}</Text>
                        <Text> <span style={{fontWeight: '700'}}> Role: </span> {role}</Text>
                        <Text> <span style={{fontWeight: '700'}}> Status: </span> {status}</Text>
                        <Text> <span style={{fontWeight: '700'}}> Last Login: </span> {lastLogin}</Text>
                        <Text> <span style={{fontWeight: '700'}}> Created At: </span> {createdAt}</Text>
                        <Text> <span style={{fontWeight: '700'}}> Updated At: </span> {updatedAt}</Text>
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
                                    console.log('Delete Teacher');
                                }}
                            >
                                Delete Teacher
                            </Button>
                            <Button colorScheme='blue'>View Profile</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default TeachersPage;