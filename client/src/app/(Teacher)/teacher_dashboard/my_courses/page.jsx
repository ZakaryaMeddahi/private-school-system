'use client';

import { useEffect, useRef, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { Box, Button, Image, Text, Drawer,  DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Input, FormControl } from '@chakra-ui/react';
import { IoMdClose } from "react-icons/io";
import Link from 'next/link';
import { FaRegEdit } from "react-icons/fa";


const Courses = [
    {
        id: 1,
        title: 'UI/UX',
        description: 'This is a course for Designers',
        teacher: 'Abdelali Sid Ahmed',
        status: 'Active',
        createdAt: '4/30/2024 11:15:35',
        updatedAt: '4/30/2024 11:15:35'
    },
    {
        id: 2,
        title: 'NextJs',
        description: 'This is a course for Developers',
        teacher: 'Abdelali Sid Ahmed',
        status: 'Active',
        createdAt: '4/30/2024 11:15:35',
        updatedAt: '4/30/2024 11:15:35'
    },
    {
        id: 3,
        title: 'NestJs',
        description: 'This is a course for Developers',
        teacher: 'Abdelali Sid Ahmed',
        status: 'Active',
        createdAt: '4/30/2024 11:15:35',
        updatedAt: '4/30/2024 11:15:35'
    },
]

const MyCourses = () => {

    const [courses, setCourses] = useState(Courses);
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [courseTeacher, setCourseTeacher] = useState('');
    const [courseStatus, setCourseStatus] = useState('');
    const [courseCreatedAt, setCourseCreatedAt] = useState('');
    const [courseUpdatedAt, setCourseUpdatedAt] = useState('');
    
    const boxRef = useRef();
    const gridRef = useRef();

    const getCourse = (id) => {

        Courses.forEach((Course) => {

            if(Course.id === Number(id) ) {
                setCourseTitle(Course.title);
                setCourseDescription(Course.description);
                setCourseTeacher(Course.teacher);
                setCourseStatus(Course.status);
                setCourseCreatedAt(Course.createdAt);
                setCourseUpdatedAt(Course.updatedAt);
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

    const deleteCourse = (id) => {
        const newCourses = [];
        courses.filter((Course) => {
            if(Course.id !== Number(id)) {
                newCourses.push(Course);
            }
        })
        setCourses(newCourses);
    }

    return (
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
                    <Button 
                        bgColor={'#234C51'} 
                        color={'white'}
                    > 
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
                    {
                        courses.map((course, index) => {
                            const id = course.id;
                            return (
                                <Box
                                    id={id}
                                    key={id}
                                    className='course-card'
                                    width={'100%'}
                                    display='flex'
                                    flexDirection={'row'}
                                    justifyContent={'space-between'}
                                    borderBottom={'1px solid #E2E8F0'}
                                    _hover={{bgColor: 'whiteSmoke'}}
                                    paddingBlock={'10px'}
                                    onClick={() => {
                                        const courses = document.querySelectorAll('.course-card');

                                        courses.forEach((course) => {
                                            course.addEventListener('click', (e) => {
                                                const id = e.target.id;
                                                getCourse(id);
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
                                            <Text fontSize={18} fontWeight={500}>{course.title[0]}</Text>
                                        </Box>
                                        <Box
                                            display='flex'
                                            flexDirection='column'
                                            justifyContent='center'
                                        >
                                            <Text fontSize={18} fontWeight={500}>{course.title}</Text>
                                        </Box>
                                    </Box>
                                    <Box
                                        display='flex'
                                        flexDirection={'row'}
                                        gap={5}
                                        >
                                        <Box
                                            className='delete-Course'
                                            display='flex'
                                            justifyContent='center'
                                            alignItems='center'
                                            width={'50px'}
                                            height={'50px'}
                                            _hover={{bgColor: 'white'}}
                                            borderRadius={'50%'}
                                            onClick={() => {
                                                const courses  = document.querySelectorAll('.course-card');

                                                courses.forEach((course) => {
                                                    teacher.addEventListener('click', () => {
                                                        const id = course.id;
                                                        console.log(id);
                                                        deleteCourse(id);
                                                    })
                                                })
                                            }}
                                        >
                                            <Link href='/update_course'>
                                                <FaRegEdit fontSize={24} color='gray' />
                                            </Link>
                                        </Box>
                                        <Box
                                            className='delete-Course'
                                            display='flex'
                                            justifyContent='center'
                                            alignItems='center'
                                            width={'50px'}
                                            height={'50px'}
                                            _hover={{bgColor: 'white'}}
                                            borderRadius={'50%'}
                                            onClick={() => {
                                                const courses  = document.querySelectorAll('.course-card');

                                                courses.forEach((course) => {
                                                    teacher.addEventListener('click', () => {
                                                        const id = course.id;
                                                        console.log(id);
                                                        deleteCourse(id);
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
                    <Image src='/ui-ux-unsplash.jpg' w='100%' />
                    <Box
                        paddingRight='50px'
                        display='flex'
                        flexDirection='column'
                        gap='15px'
                        paddingBlock='10px'
                    >
                        <Text> <span style={{fontWeight: '700'}}> Course Title: </span> {courseTitle}</Text>
                        <Text> <span style={{fontWeight: '700'}}> Course Teacher: </span> {courseTeacher}</Text>
                        <Text> <span style={{fontWeight: '700'}}> Description: </span> {courseDescription}</Text>
                        <Text> <span style={{fontWeight: '700'}}> Status: </span> {courseStatus}</Text>
                        <Text> <span style={{fontWeight: '700'}}> Created At: </span> {courseCreatedAt}</Text>
                        <Text> <span style={{fontWeight: '700'}}> Updated At: </span> {courseUpdatedAt}</Text>
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
                                    console.log('Delete Course');
                                }}
                            >
                                Delete Course
                            </Button>
                            <Link href='/course_details'>
                                <Button colorScheme='blue'>View Course Details</Button>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default MyCourses;