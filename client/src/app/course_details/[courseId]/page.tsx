import CourseDetailsPage from '@/Pages/CourseDetails';

const Course_Details = ({ params }) => {
  const { courseId } = params;
  return <CourseDetailsPage courseId={courseId}/>;
};

export default Course_Details;
