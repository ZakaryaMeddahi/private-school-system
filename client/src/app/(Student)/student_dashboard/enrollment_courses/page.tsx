'use client';

import { Container } from '@chakra-ui/react';
import CardForCourse from '@/components/CardForCourse';
import { useState, useEffect } from 'react';

const EnrollmentCourse = () => {

    const [enrollments, setEnrollments] = useState([]);
    const [enrollStatus, setEnrollStatus] = useState(false);

    useEffect(() => {
      const fetchEnrollments = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/enrollments/me`,
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
          setEnrollments(data);
        } catch (error) {
          console.error(error);
        }
      };
  
      
    fetchEnrollments();
    }, [])

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
            {enrollments.map(enrollment => {
              // if (!enrollment.enrollmentStatus === "pending") {
                return (
                      <CardForCourse 
                          key={enrollment.course.id} 
                          Course={enrollment.course} 
                          teacher={enrollment.course.teacher}  
                          Role='student' 
                          Enroll={true} 
                      />
                    );
              // }

            })}
        </Container>
    );
}

export default EnrollmentCourse;