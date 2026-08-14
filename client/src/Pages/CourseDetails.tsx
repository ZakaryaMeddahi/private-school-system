'use client';

import CardForCourse from '@/components/CardForCourse';
import CourseCard from '@/components/Course Card/CourseCard';
import Item from '@/components/Item/Item';
import WhatDoYouLearn from '@/components/What do you learn/WhatDoYouLearn';
import { Container, Heading, UnorderedList, Text, Box } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

const CourseDetailsPage = ({ courseId }) => {
  const [course, setCourse] = useState({});

  const printScroll = () => {
    console.log(window.innerHeight);
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/${courseId}`,
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

        setCourse(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourse();
  }, []);

  return (
    <Container m='0' p='75px' minH='100vh' maxW='100%' onClick={printScroll}>
      <Box
        display='grid'
        gridTemplateColumns='repeat(2, 1fr)'
        gap='25'
        justifyItems='center'
        maxH='200px'
      >
        <Box paddingTop='50px'>
          <Heading>{course.title}</Heading>
          <Text marginBottom='45px' marginTop='5' lineHeight='1.6'>
            {course.description}
          </Text>
          <Heading> Topics </Heading>
          <UnorderedList marginBottom='45px'>
            {course.topics?.map((topic) => {
              return <Item key={topic.id} item={topic.title} mrT='5' />;
            })}
          </UnorderedList>
          <Heading>Requirements</Heading>
          <Box mb='45px'>{course.requirements}</Box>
        </Box>
        <CourseCard courseId={courseId} course={course} />
      </Box>
    </Container>
  );
};

export default CourseDetailsPage;
