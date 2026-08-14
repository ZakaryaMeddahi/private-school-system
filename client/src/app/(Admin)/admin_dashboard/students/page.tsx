'use client';

import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { IoMdClose } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import UserCard from '@/components/UserCard';
import { convertTime } from '@/app/(Admin)/admin_dashboard/teachers/page';

const StudentsPage = () => {
  const [students, setStudents] = useState<any[]>([]);
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [adress, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [lastLogin, setLastLogin] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');

  const boxRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const getStudent = (id) => {
    students.forEach((student) => {
      if (student.id === id) {
        console.log(student);
        setFirstName(student.firstName);
        setLastName(student.lastName);
        setEmail(student.email);
        setAddress(student.adress);
        setRole(student.role);
        setStatus(student.isActive);
        setLastLogin(student.lastLogging);
        setCreatedAt(student.createdAt);
        setUpdatedAt(student.updatedAt);
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

  const deleteStudent = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/students/${id}`,
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
        // setDisplayErrorAlert(true);
        // setTimeout(() => {
        //   setDisplayErrorAlert(false);
        // }, 3000);
        throw new Error(data.message);
      }

      const newStudents: any[] = [];
      students.filter((student) => {
        if (student.id !== id) {
          newStudents.push(student);
        }
      });
      setStudents(newStudents);
    } catch (error) {
      console.error(error);
    }
  };

  const SearchStudent = async (value) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/students?search=${value}`,
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

      setStudents(data);
    } catch (error) {
      console.error(error);
    }
    // const newStudents = [];
    // Students.filter((student) => {
    //   if (
    //     student.firstName.toLowerCase().includes(value.toLowerCase()) ||
    //     student.lastName.toLowerCase().includes(value.toLowerCase())
    //   ) {
    //     newStudents.push(student);
    //   }
    // });
    // setStudents(newStudents);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/students`,
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

        setStudents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="h-full px-12.5">
      <div className="flex h-[10%] w-full flex-row items-center justify-start">
        <Input
          placeholder='Search Student'
          className="w-125 border-black"
          onChange={(e) => SearchStudent(e.target.value)}
        />
      </div>
      <div ref={gridRef} className="grid h-[82vh] w-full grid-cols-1 gap-5">
        <div className="flex h-full w-full flex-col overflow-y-auto">
          {students?.map((student) => {
            return (
              <UserCard
                key={student.id}
                user={student}
                getUser={getStudent}
                deleteUser={deleteStudent}
                openTab={openTab}
              />
            );
          })}
        </div>
        <div ref={boxRef} className="hidden h-full w-full flex-col gap-5 overflow-y-auto bg-white">
          <div className="flex w-full flex-row justify-end p-2.5">
            <IoMdClose size={'25px'} onClick={closeTab} />
          </div>
          <img src='/profile.jpeg' className="w-full" />
          <div className="flex flex-col gap-3.75 py-2.5 pr-12.5">
            <div className="flex w-full flex-row items-center justify-between">
              <p>
                {' '}
                <span style={{ fontWeight: '700' }}> First Name: </span>{' '}
                {firstName}
              </p>
              <p>
                {' '}
                <span style={{ fontWeight: '700' }}> Last Name: </span>{' '}
                {lastName}
              </p>
            </div>
            <p>
              {' '}
              <span style={{ fontWeight: '700' }}> Email: </span> {email}
            </p>
            <p>
              {' '}
              <span style={{ fontWeight: '700' }}> Adress: </span> {adress}
            </p>
            <p>
              {' '}
              <span style={{ fontWeight: '700' }}> Role: </span> {role}
            </p>
            <p>
              {' '}
              <span style={{ fontWeight: '700' }}> Status: </span>{' '}
              {status ? 'Active' : 'Inactive'}
            </p>
            <p>
              {' '}
              <span style={{ fontWeight: '700' }}> Last Login: </span>{' '}
              {convertTime(lastLogin)}
            </p>
            <p>
              {' '}
              <span style={{ fontWeight: '700' }}> Created At: </span>{' '}
              {convertTime(createdAt)}
            </p>
            <p>
              {' '}
              <span style={{ fontWeight: '700' }}> Updated At: </span>{' '}
              {convertTime(updatedAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;
