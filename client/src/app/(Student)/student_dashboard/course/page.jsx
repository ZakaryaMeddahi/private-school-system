'use client';

import { Box, Center, Container, HStack } from "@chakra-ui/react";
import CardForCourse from "@/components/CardForCourse";

const CoursePage = () => {

  return (
    <Container
            padding={25}
            maxW='100%' 
            h='100%'
            display='grid'
            gridTemplateColumns='repeat(4, 1fr)'
            gap={5}
            overflowY={'auto'}
        >
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
            <CardForCourse />
        </Container>
    );
}

export default CoursePage;