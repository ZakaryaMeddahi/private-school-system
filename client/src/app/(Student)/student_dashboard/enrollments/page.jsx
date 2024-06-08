'use client';

import { Box } from '@chakra-ui/react';
import CardForCourse from '@/components/CardForCourse';
import { Courses } from '@/app/(Student)/student_dashboard/course/page';

const EnrollmentsPage = () => {
    return (
        <Box
            marginTop='25px'
            w='100%'
            display='grid'
            gridTemplateColumns='repeat(3, 1fr)'
            gridTemplateRows='1fr'
            gap={5}
        >
            <CardForCourse {...Courses[0]} Role='student' Enroll={true} />
            <CardForCourse {...Courses[1]} Role='student' Enroll={true} />
            <CardForCourse {...Courses[2]} Role='student' Enroll={true} />
        </Box>
    );
}

export default EnrollmentsPage;