'use client';

import CourseCard from '@/components/Course Card/CourseCard';
import Item from '@/components/Item/Item';
import WhatDoYouLearn from '@/components/What do you learn/WhatDoYouLearn';
import { Container, Heading, UnorderedList, Text, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

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
          {/* <UnorderedList marginBottom='25px'>
        <Item item='Basic knowledge of HTML, CSS, and JavaScript' mrT='5' />
        <Item item='A computer with internet connection' mrT='3' />
        <Item item='A text editor' mrT='3' />
      </UnorderedList> */}
          <Box mb='45px'>{course.requirements}</Box>
          {/* <Heading marginBottom='20px'>What do you learn</Heading>
      <WhatDoYouLearn desc='Build responsive websites' />
      <WhatDoYouLearn desc='Build full-stack web applications' />
      <WhatDoYouLearn desc='Understand how the web works' />
      <WhatDoYouLearn desc='Understand how to use databases' />
      <WhatDoYouLearn desc='Understand how to use APIs' />
      <WhatDoYouLearn desc='Understand how to deploy websites' />
      <WhatDoYouLearn desc='Understand how to use authentication' />
      <WhatDoYouLearn desc='Understand how to use websockets' />
      <WhatDoYouLearn desc='Understand how to use state management' />
      <WhatDoYouLearn desc='Understand how to use testing' />
      <WhatDoYouLearn desc='Understand how to use CI/CD' />
      <WhatDoYouLearn desc='Understand how to use Docker' />
      <WhatDoYouLearn desc='Understand how to use Kubernetes' />
      <WhatDoYouLearn desc='Understand how to use microservices' />
      <WhatDoYouLearn desc='Understand how to use serverless' />
      <WhatDoYouLearn desc='Understand how to use GraphQL' />
      <WhatDoYouLearn desc='Understand how to use TypeScript' />
      <WhatDoYouLearn desc='Understand how to use Next.js' />
      <WhatDoYouLearn desc='Understand how to use Gatsby' /> */}
        </Box>
        <CourseCard courseId={courseId} course={course} />
        {/* kdjalf */}
        {/* <Box w='500px' h='500px' position='absolute' right='50' bgColor='yellowgreen'></Box> */}
      </Box>
    </Container>
  );
};

export default CourseDetailsPage;
