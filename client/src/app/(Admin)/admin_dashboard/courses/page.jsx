'use client';

import { Box, Center, Container, HStack, Input } from '@chakra-ui/react';
import CardForCourse from '@/components/CardForCourse';
import { useContext, useEffect, useState } from 'react';
// import { AdminContext } from '../../layout';

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  // const {search, setSearch} = useContext(AdminContext);
  const { search, setSearch } = useState('');

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

  const searchCourses = async (value) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses?search=${value}`,
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
          placeholder='Search Course'
          w='500px'
          borderColor='black'
          onChange={(e) => searchCourses(e.target.value)}
        />
      </Box>
      <Container
        padding={25}
        maxW='100%'
        h='100%'
        display={'grid'}
        gridTemplateColumns='repeat(3, 1fr)'
        gap={5}
        overflowY={'auto'}
      >
        {courses.map((course) => {
          console.log(course);
          return <CardForCourse key={course.id} Course={course} teacher={course.teacher} Role='admin' />;
        })}
      </Container>
    </Box>
  );
};

export default CoursePage;
