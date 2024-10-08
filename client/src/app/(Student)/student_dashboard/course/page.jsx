'use client';

import { Box, Center, Container, HStack, Input } from '@chakra-ui/react';
import CardForCourse from '@/components/CardForCourse';
import { useContext, useEffect, useState } from 'react';
import { StudentContext } from '../../layout';

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const { search, setSearch } = useContext(StudentContext);

  // fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses?${search}`,
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

        console.log(data);

        setCourses(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, [search]);

  //   const searchCourses = async (value) => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses?search=${value}`,
  //         {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: `Bearer ${localStorage.getItem('token')}`,
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         response.status === 401 && router.push('/login');
  //         const { data } = await response.json();
  //         throw new Error(data.message);
  //       }

  //       const { data } = await response.json();

  //       console.log(data);

  //       setCourses(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  return (
    <Container
      padding={25}
      maxW='100%'
      h='100%'
      display='grid'
      gridTemplateColumns='repeat(3, 1fr)'
      gap={5}
      overflowY={'auto'}
    >
      {courses.map((course) => {
        return (
          <CardForCourse
            w='100%'
            key={course.id}
            teacher={course.teacher}
            Course={course}
            Role='student'
          />
        );
      })}
    </Container>
  );
};

export default CoursePage;
