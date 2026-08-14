'use client';

import { useEffect, useState } from 'react';
import { GetUser } from '@/Lib/getUser';
import ProfilePage from '@/Pages/profile';

const Profile = ({ params }) => {
  const { userId } = params;

  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [UserName, setUserName] = useState('');
  const [Bio, setBio] = useState('');
  const [Role, setRole] = useState('');
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

      const FetcheMyCourses = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses`,
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
  
          setCourses(data);
        } catch (error) {
          console.error(error);
        }
      };

    FetcheMyCourses();
  }, []);

  console.log(courses);

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

export default Profile;
