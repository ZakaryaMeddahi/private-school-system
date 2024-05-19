'use client';

import ProfilePage from '@/Pages/profile';
import { useEffect, useState } from 'react';
import { GetUser } from '../../../../../Lib/getUser';

const profile = ({ params }) => {
  const { userId } = params;

  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [UserName, setUserName] = useState('');
  const [Bio, setBio] = useState('');
  const [Role, setRole] = useState('');
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    GetUser()
      .then((data) => {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setBio(data.biography);
        setRole(data.role);

        console.log(data);
      })
      .catch((err) => console.log(err.message));

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
          const data = await response.json();
          throw new Error(data.message);
        }

        const { data } = await response.json();

        console.log(data);

        setEnrollments(data);

        data.forEach((e) => {
          setCourses((prev) => {
            return [...prev, e.course];
          });
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <>
      <ProfilePage
      userId={userId}
        FullName={`${FirstName} ${LastName}`}
        UserName={`${FirstName} ${LastName} ${userId}`}
        Bio={!Bio ? '' : Bio}
        Role={Role}
        courses={courses}
      />
    </>
  );
};

export default profile;
