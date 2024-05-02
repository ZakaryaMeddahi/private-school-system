'use client';

import { Box, Button, Input, Text } from '@chakra-ui/react';
import { IoCloseSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

const Enrollments = [
    {
        id: 1,
        student: "John Doe",
        course: "Math",
        grade: "A",
        date: '5/2/2024 7:57:55'
    },
    {
        id: 2,
        student: "Jane Doe",
        course: "Science",
        grade: "B",
        date: '5/2/2024 7:57:55'
    },
    {
        id: 3,
        student: "John Smith",
        course: "History",
        grade: "C",
        date: '5/2/2024 7:57:55'
    },
    {
        id: 3,
        student: "John Smith",
        course: "History",
        grade: "C",
        date: '5/2/2024 7:57:55'
    },
    {
        id: 3,
        student: "John Smith",
        course: "History",
        grade: "C",
        date: '5/2/2024 7:57:55'
    },
    {
        id: 3,
        student: "John Smith",
        course: "History",
        grade: "C",
        date: '5/2/2024 7:57:55'
    },
    {
        id: 3,
        student: "John Smith",
        course: "History",
        grade: "C",
        date: '5/2/2024 7:57:55'
    },
    {
        id: 3,
        student: "John Smith",
        course: "History",
        grade: "C",
        date: '5/2/2024 7:57:55'
    },
    {
        id: 3,
        student: "John Smith",
        course: "History",
        grade: "C",
        date: '5/2/2024 7:57:55'
    },
    {
        id: 3,
        student: "John Smith",
        course: "History",
        grade: "C",
        date: '5/2/2024 7:57:55'
    },
    {
        id: 3,
        student: "John Smith",
        course: "History",
        grade: "C",
        date: '5/2/2024 7:57:55'
    },
    {
        id: 3,
        student: "John Smith",
        course: "History",
        grade: "C",
        date: '5/2/2024 7:57:55'
    },
    {
        id: 3,
        student: "John Smith",
        course: "History",
        grade: "C",
        date: '5/2/2024 7:57:55'
    },
    {
        id: 3,
        student: "John Smith",
        course: "History",
        grade: "C",
        date: '5/2/2024 7:57:55'
    },
    {
        id: 3,
        student: "John Smith",
        course: "History",
        grade: "C",
        date: '5/2/2024 7:57:55'
    },
    {
        id: 3,
        student: "John Smith",
        course: "History",
        grade: "C",
        date: '5/2/2024 7:57:55'
    },
    {
        id: 3,
        student: "John Smith",
        course: "History",
        grade: "C",
        date: '5/2/2024 7:57:55'
    },
    {
        id: 3,
        student: "John Smith",
        course: "History",
        grade: "C",
        date: '5/2/2024 7:57:55'
    },
    {
        id: 3,
        student: "John Smith",
        course: "History",
        grade: "C",
        date: '5/2/2024 7:57:55'
    },
    {
        id: 3,
        student: "John Smith",
        course: "History",
        grade: "C",
        date: '5/2/2024 7:57:55'
    },
    {
        id: 3,
        student: "John Smith",
        course: "History",
        grade: "C",
        date: '5/2/2024 7:57:55'
    },
    {
        id: 3,
        student: "John Smith",
        course: "History",
        grade: "C",
        date: '5/2/2024 7:57:55'
    },
    {
        id: 3,
        student: "John Smith",
        course: "History",
        grade: "C",
        date: '5/2/2024 7:57:55'
    },
    {
        id: 3,
        student: "John Smith",
        course: "History",
        grade: "C",
        date: '5/2/2024 7:57:55'
    },
]

const EnrollmentPage = () => {

    const SearchRequest = (Search) => {
        console.log(Search);
    }

    return (
        <Box
            width="100%"
            height="100vh"
            paddingInline='50px'
            display='flex'
            flexDirection='column'
        >
            <Box
                h={'fit-content'}
               paddingBlock='25px'
            >
                <Input 
                    placeholder="Search Student Request" 
                    w='500px' 
                    borderColor='black'
                    onChange={e => SearchRequest(e.target.value)} 
                />
            </Box>
            <Box
                w='100%'
                flex={1}
                display='grid'
                gridTemplateColumns={'1fr 1fr'}
                gap={'10px'}
                overflowY={'auto'}
            >
                {
                    Enrollments.map((enrollment, index) => (  
                        <Box
                            id={enrollment.id}
                            key={index}
                            h={'fit-content'}
                            paddingBlock='10px'
                            paddingInline='25px'
                            boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}
                            bgColor={'white'}
                            borderRadius='5px'
                            display={'flex'}
                            flexDir={'column'}
                            gap={'10px'}
                        >
                            <Box
                                w={'100%'}
                                display={'flex'}
                                flexDirection={'row'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <Box
                                    display={'flex'}
                                    flexDirection={'row'}
                                    gap={'10px'}
                                    alignItems={'center'}
                                >
                                    <Box 
                                        w={'45px'}
                                        h={'45px'}
                                        borderRadius={'50%'}
                                        display={'flex'}
                                        justifyContent={'center'}
                                        alignItems={'center'}   
                                        border={'1px solid black'}
                                    >
                                            A
                                    </Box>
                                    <Box
                                        display={'flex'}
                                        flexDirection={'column'}
                                        gap={'5px'}
                                    >
                                        <Text fontSize={'18px'} fontWeight='500' color={'#213E69'}>{enrollment.student}</Text>
                                        <Text color={'#848484'}>{enrollment.date}</Text>
                                    </Box>
                                </Box>
                                <Box 
                                    display={'flex'}
                                    flexDirection={'row'}
                                    gap={'10px'}
                                >
                                    <Button bgColor='#234C51' w={'50px'} borderRadius={'15px'} >
                                        <FaCheck color='white' />
                                    </Button>
                                    <Button colorScheme='red' w={'50px'} borderRadius={'15px'} >
                                        <IoCloseSharp size='35px' />
                                    </Button>
                                </Box>
                            </Box>
                            <Box>
                                <Text fontSize='20px' color='#848484' ><span style={{color: '#213E69', fontSize: '24px', fontWeight: '500'}} >Course:</span> {enrollment.course} </Text>
                            </Box>
                        </Box>
                    ))
                }
            </Box>
        </Box>
    );
}

export default EnrollmentPage;