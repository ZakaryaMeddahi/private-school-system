'use client';

import { Box, Button, Input, Text } from '@chakra-ui/react';
import { IoCloseSharp } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import EnrollmentCard from '@/components/EnrollmentCard';

const Enrollments = [
  {
    id: 1,
    student: 'John Doe',
    course: 'Math',
    grade: 'A',
    date: '5/2/2024 7:57:55',
  },
  {
    id: 2,
    student: 'Sid Ahmed',
    course: 'Database Design',
    grade: 'B',
    date: '5/2/2024 7:57:55',
  },
  {
    id: 3,
    student: 'Zakarya',
    course: 'System Design',
    grade: 'C',
    date: '5/2/2024 7:57:55',
  },
  // {
  //     id: 3,
  //     student: "John Smith",
  //     course: "History",
  //     grade: "C",
  //     date: '5/2/2024 7:57:55'
  // },
  // {
  //     id: 3,
  //     student: "John Smith",
  //     course: "History",
  //     grade: "C",
  //     date: '5/2/2024 7:57:55'
  // },
  // {
  //     id: 3,
  //     student: "John Smith",
  //     course: "History",
  //     grade: "C",
  //     date: '5/2/2024 7:57:55'
  // },
  // {
  //     id: 3,
  //     student: "John Smith",
  //     course: "History",
  //     grade: "C",
  //     date: '5/2/2024 7:57:55'
  // },
  // {
  //     id: 3,
  //     student: "John Smith",
  //     course: "History",
  //     grade: "C",
  //     date: '5/2/2024 7:57:55'
  // },
  // {
  //     id: 3,
  //     student: "John Smith",
  //     course: "History",
  //     grade: "C",
  //     date: '5/2/2024 7:57:55'
  // },
  // {
  //     id: 3,
  //     student: "John Smith",
  //     course: "History",
  //     grade: "C",
  //     date: '5/2/2024 7:57:55'
  // },
  // {
  //     id: 3,
  //     student: "John Smith",
  //     course: "History",
  //     grade: "C",
  //     date: '5/2/2024 7:57:55'
  // },
  // {
  //     id: 3,
  //     student: "John Smith",
  //     course: "History",
  //     grade: "C",
  //     date: '5/2/2024 7:57:55'
  // },
  // {
  //     id: 3,
  //     student: "John Smith",
  //     course: "History",
  //     grade: "C",
  //     date: '5/2/2024 7:57:55'
  // },
  // {
  //     id: 3,
  //     student: "John Smith",
  //     course: "History",
  //     grade: "C",
  //     date: '5/2/2024 7:57:55'
  // },
  // {
  //     id: 3,
  //     student: "John Smith",
  //     course: "History",
  //     grade: "C",
  //     date: '5/2/2024 7:57:55'
  // },
  // {
  //     id: 3,
  //     student: "John Smith",
  //     course: "History",
  //     grade: "C",
  //     date: '5/2/2024 7:57:55'
  // },
  // {
  //     id: 3,
  //     student: "John Smith",
  //     course: "History",
  //     grade: "C",
  //     date: '5/2/2024 7:57:55'
  // },
  // {
  //     id: 3,
  //     student: "John Smith",
  //     course: "History",
  //     grade: "C",
  //     date: '5/2/2024 7:57:55'
  // },
  // {
  //     id: 3,
  //     student: "John Smith",
  //     course: "History",
  //     grade: "C",
  //     date: '5/2/2024 7:57:55'
  // },
  // {
  //     id: 3,
  //     student: "John Smith",
  //     course: "History",
  //     grade: "C",
  //     date: '5/2/2024 7:57:55'
  // },
  // {
  //     id: 3,
  //     student: "John Smith",
  //     course: "History",
  //     grade: "C",
  //     date: '5/2/2024 7:57:55'
  // },
  // {
  //     id: 3,
  //     student: "John Smith",
  //     course: "History",
  //     grade: "C",
  //     date: '5/2/2024 7:57:55'
  // },
  // {
  //     id: 3,
  //     student: "John Smith",
  //     course: "History",
  //     grade: "C",
  //     date: '5/2/2024 7:57:55'
  // },
  // {
  //     id: 3,
  //     student: "John Smith",
  //     course: "History",
  //     grade: "C",
  //     date: '5/2/2024 7:57:55'
  // },
];

const EnrollmentPage = () => {
  const [enrollments, setEnrollments] = useState([]);

  const SearchRequest = (Search) => {
    console.log(Search);
  };

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/enrollments`,
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

        const pendingEnrollments = data.filter(
          (e) => e.enrollmentStatus === 'pending'
        );

        console.log(pendingEnrollments);

        setEnrollments(pendingEnrollments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <Box
      width='100%'
      height='100vh'
      paddingInline='50px'
      display='flex'
      flexDirection='column'
    >
      <Box h={'fit-content'} paddingBlock='25px'>
        <Input
          placeholder='Search Student Request'
          w='500px'
          borderColor='black'
          onChange={(e) => SearchRequest(e.target.value)}
        />
      </Box>
      <Box
        w='100%'
        // flex={1}
        display='grid'
        gridTemplateColumns={'1fr 1fr'}
        gap={'10px'}
        overflowY={'auto'}
        padding={5}
      >
        {enrollments.map((enrollment) => (
          <EnrollmentCard
            key={enrollment.id}
            enrollment={enrollment}
            enrollments={enrollments}
            setEnrollments={setEnrollments}
          />
        ))}
      </Box>
    </Box>
  );
};

export default EnrollmentPage;
