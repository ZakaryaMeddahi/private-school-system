'use client';

import CourseCard from "@/components/Course Card/CourseCard";
import { Box, Center, Container, HStack } from "@chakra-ui/react";

const CoursePage = () => {

  return (
    <Box border='1px solid black' w='100%' height='100%' display='grid' gridTemplateColumns='1fr 1fr 1fr' justifyItems='center' rowGap='5'>
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </Box>
    );
}

export default CoursePage;