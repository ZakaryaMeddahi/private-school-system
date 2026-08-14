'use client';

import CardForCourse from '@/components/CardForCourse';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const EnrollmentCourse = () => {

    const [enrollments, setEnrollments] = useState<any[]>([]);
    const [enrollStatus, setEnrollStatus] = useState(false);
    const router = useRouter();

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
        <div className="grid h-full max-w-full grid-cols-3 gap-5 overflow-y-auto p-6.25">
            {enrollments.map(enrollment => {
                return (
                      <CardForCourse
                          key={enrollment.course.id}
                          Course={enrollment.course}
                          teacher={enrollment.course.teacher}
                          Role='student'
                          Enroll={true}
                      />
                    );
            })}
        </div>
    );
}

export default EnrollmentCourse;