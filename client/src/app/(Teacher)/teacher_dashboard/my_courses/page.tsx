'use client';

import { useEffect, useRef, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { useDisclosure } from '@/hooks/use-disclosure';
import { IoMdClose } from 'react-icons/io';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CourseCard from '@/components/CourseCard';

const MyCourses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [courseId, setCourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseTeacher, setCourseTeacher] = useState('');
  const [courseStatus, setCourseStatus] = useState('');
  const [courseImage, setCourseImage] = useState('');
  const [courseCreatedAt, setCourseCreatedAt] = useState('');
  const [courseUpdatedAt, setCourseUpdatedAt] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const boxRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const {
    isOpen: isDeleteAlertOpen,
    onOpen: onDeleteAlertOpen,
    onClose: onDeleteAlertClose,
  } = useDisclosure();

  const getCourse = (id) => {
    courses.forEach((course) => {
      if (course.id === id) {
        setCourseId(course.id);
        setCourseTitle(course.title);
        setCourseDescription(course.description);
        setCourseTeacher(
          `${course.teacher.user.firstName} ${course.teacher.user.lastName}`
        );
        setCourseStatus(course.status);
        setCourseImage(course.file?.url || null);
        setCourseCreatedAt(course.createdAt);
        setCourseUpdatedAt(course.updatedAt);
      }
    });
  };

  const openTab = () => {
    if (gridRef.current && boxRef.current) {
      boxRef.current.style.display = 'flex';
      gridRef.current.style.gridTemplateColumns = '1fr 0.6fr';
    }
  };

  const closeTab = () => {
    if (gridRef.current && boxRef.current) {
      boxRef.current.style.display = 'none';
      gridRef.current.style.gridTemplateColumns = '1fr';
    }
  };

  const deleteCourse = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) {
        response.status === 401 && router.push('/login');
        const data = await response.json();
        throw new Error(data.message);
      }

      const newCourses = courses.filter((course) => course.id !== id);
      setCourses(newCourses);
      closeTab()
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/chats`,
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
          const data = await response.json();
          throw new Error(data.message);
        }

        const { data } = await response.json();

        console.log(data);

        setCourses(data);
      } catch (error) {
        setErrorMessage(error.message);
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={(open) => !open && onDeleteAlertClose()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete course?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this course?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={() => deleteCourse(courseId)}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="h-full px-12.5">
        <div className="flex h-[10%] w-full flex-row items-center justify-end">
          <Link href='/create_course'>
            <Button className="bg-[#234C51] text-white hover:bg-[#234C51]/90">
              + Create Course
            </Button>
          </Link>
        </div>
        <div ref={gridRef} className="grid h-[82vh] w-full grid-cols-1 gap-5">
          <div className="flex h-full w-full flex-col overflow-y-auto">
            {courses.map((course) => {
              return (
                <CourseCard
                  key={course.id}
                  course={course}
                  getCourse={getCourse}
                  deleteCourse={deleteCourse}
                  openTab={openTab}
                />
              );
            })}
          </div>
          <div ref={boxRef} className="hidden h-full w-full flex-col gap-5 overflow-y-auto bg-white">
            <div className="flex w-full cursor-pointer flex-row justify-end p-2.5">
              <IoMdClose size={'25px'} onClick={closeTab} />
            </div>
            <img src={courseImage || '/ui-ux-unsplash.jpg'} className="w-full" />
            <div className="flex flex-col gap-3.75 py-2.5 pr-12.5">
              <p>
                {' '}
                <span style={{ fontWeight: '700' }}> Course Title: </span>{' '}
                {courseTitle}
              </p>
              <p>
                {' '}
                <span style={{ fontWeight: '700' }}>
                  {' '}
                  Course Teacher:{' '}
                </span>{' '}
                {courseTeacher}
              </p>
              <p>
                {' '}
                <span style={{ fontWeight: '700' }}> Description: </span>{' '}
                {courseDescription}
              </p>
              <p>
                {' '}
                <span style={{ fontWeight: '700' }}> Created At: </span>{' '}
                {courseCreatedAt}
              </p>
              <p>
                {' '}
                <span style={{ fontWeight: '700' }}> Updated At: </span>{' '}
                {courseUpdatedAt}
              </p>
              <div className="mt-6.25 flex flex-row items-center justify-between">
                <Button variant="destructive" onClick={onDeleteAlertOpen}>
                  Delete Course
                </Button>
                <Link href={`/course_details/${courseId}`}>
                  <Button className="bg-blue-500 hover:bg-blue-600">View Course Details</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCourses;
