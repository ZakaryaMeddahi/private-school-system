'use client';

import CourseDetailsPage from '@/Pages/CourseDetails';
import { useEffect, useState } from 'react';

const Course_Details = ({ params }: { params: Promise<{ courseId: string }> }) => {
  const [courseId, setCourseId] = useState('');

  useEffect(() => {
    params.then(({ courseId }) => setCourseId(courseId));
  }, [params]);

  return <CourseDetailsPage courseId={courseId}/>;
};

export default Course_Details;
