'use client';

import CardForCourse from '@/components/CardForCourse';
import CourseCard from '@/components/Course Card/CourseCard';
import Item from '@/components/Item/Item';
import WhatDoYouLearn from '@/components/What do you learn/WhatDoYouLearn';
import { Container, Heading, UnorderedList, Text, Box } from '@chakra-ui/react';

const CourseDetailsPage = () => {

    const printScroll = () => {
        console.log(window.innerHeight);
    }

    return (
        <Container m='0' p='50px' maxW='100%' onClick={printScroll}>
            <Box display='grid' gridTemplateColumns='repeat(2, 1fr)' gap='25' justifyItems='center' maxH='200px'>
                <Box>
                    <Heading > Web Develpoment </Heading>
                    <Text marginBottom='25px' marginTop='5' lineHeight='1.6'>
                        This course is designed to teach you web development from scratch. We will start with the basics of web development and gradually move on to more advanced topics. By the end of this course, you will be able to build full-stack web applications.
                    </Text>
                </Box>
                <CardForCourse w='450px' />
                {/* kdjalf */}
                {/* <Box w='500px' h='500px' position='absolute' right='50' bgColor='yellowgreen'></Box> */}
            </Box>
            <Heading > Topics </Heading>
            <UnorderedList marginBottom='25px'>
                <Item item='Introduction to Web Development' mrT='5' />
                <Item item='HTML' mrT='3' />
                <Item item='CSS' mrT='3' />
                <Item item='JavaScript' mrT='3' />
                <Item item='React' mrT='3' />
                <Item item='Node.js' mrT='3' />
                <Item item='Express' mrT='3' />
                <Item item='MongoDB' mrT='3' />
                <Item item='Mongoose' mrT='3' />
                <Item item='Authentication' mrT='3' />
                <Item item='Deployment' mrT='3' />
            </UnorderedList>
            <Heading > Requirments </Heading>
            <UnorderedList marginBottom='25px'>
                <Item item='Basic knowledge of HTML, CSS, and JavaScript' mrT='5' />
                <Item item='A computer with internet connection' mrT='3' />
                <Item item='A text editor' mrT='3' />
            </UnorderedList>
            <Heading marginBottom='20px'>What do you learn</Heading>
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
            <WhatDoYouLearn desc='Understand how to use Gatsby' />
        </Container>
    );
}

export default CourseDetailsPage;