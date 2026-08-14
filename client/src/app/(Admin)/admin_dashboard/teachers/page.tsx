'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useDisclosure } from '@/hooks/use-disclosure';
import { IoMdClose } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import UserCard from '@/components/UserCard';

// time util
export const convertTime = (time) => {
  const date = new Date(time);
  return date.toLocaleString().replace(',', '');
};

const TeachersPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [teachers, setTeachers] = useState<any[]>([]);
  const [teacherFirstName, setTeacherFirstName] = useState('');
  const [teacherLastName, setTeacherLastName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');

  const [profilePicture, setProfilePicture] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [isActive, setIsActive] = useState(null);
  const [lastLogin, setLastLogin] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');

  const [displaySuccessAlert, setDisplaySuccessAlert] = useState(false);
  const [displayErrorAlert, setDisplayErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Cannot create account');
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const boxRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // time util
  const convertTime = (time) => {
    if (!time) return null;
    const date = new Date(time);
    return date.toLocaleString().replace(',', '');
  };

  const getTeacher = (id) => {
    teachers.forEach((teacher) => {
      if (teacher.id === id) {
        setProfilePicture(teacher.profilePicture);
        setFirstName(teacher.firstName);
        setLastName(teacher.lastName);
        setEmail(teacher.email);
        setAddress(teacher.address);
        setRole(teacher.role);
        setIsActive(teacher.isActive);
        setLastLogin(teacher.lastLogging);
        setCreatedAt(teacher.createdAt);
        setUpdatedAt(teacher.updatedAt);
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

  const deleteTeacher = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/teachers/${id}`,
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

      const newTeachers: any[] = [];
      teachers.filter((teacher) => {
        if (teacher.id !== id) {
          newTeachers.push(teacher);
        }
      });
      setTeachers(newTeachers);
    } catch (error) {
      console.error(error);
    }
  };

  const SearchTeacher = async (value) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/teachers?search=${value}`,
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

      setTeachers(data);
    } catch (error) {
      console.error(error);
    }
    // const newTeachers = [];
    // // add search functionality (send get request with the required queries)
    // teachers.filter((teacher) => {
    //   if (
    //     teacher.firstName.toLowerCase().includes(value.toLowerCase()) ||
    //     teacher.lastName.toLowerCase().includes(value.toLowerCase())
    //   ) {
    //     newTeachers.push(teacher);
    //   }
    // });
    // setTeachers(newTeachers);
  };

  const createTeacher = async () => {
    try {
      if (!teacherFirstName || !teacherLastName || !teacherEmail) {
        setDisplayErrorAlert(true);
        setTimeout(() => {
          setDisplayErrorAlert(false);
        }, 3000);
        throw new Error('Please fill all fields');
      }

      setIsSubmitting(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/teachers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            firstName: teacherFirstName,
            lastName: teacherLastName,
            email: teacherEmail,
          }),
        }
      );

      if (!response.ok) {
        response.status === 401 && router.push('/login');
        const data = await response.json();
        setDisplayErrorAlert(true);
        setTimeout(() => {
          setDisplayErrorAlert(false);
        }, 3000);
        throw new Error(data.message);
      }

      const { data } = await response.json();

      console.log(data);

      setTeachers((prev) => {
        return [...prev, data];
      });

      setTeacherFirstName('');
      setTeacherLastName('');
      setTeacherEmail('');

      setDisplaySuccessAlert(true);

      setIsSubmitting(false);

      setTimeout(() => {
        setDisplaySuccessAlert(false);
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/teachers`,
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

        setTeachers(data);
      } catch (error) {
        setErrorMessage(error.message);
        console.error(error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="h-full px-12.5">
      <div className="flex h-[10%] w-full flex-row items-center justify-between">
        <Input
          placeholder='Search Teacher'
          className="w-125 border-black"
          onChange={(e) => SearchTeacher(e.target.value)}
        />
        <Button
          className="bg-[#234C51] text-white hover:bg-[#234C51]/90"
          onClick={onOpen}
        >
          + Add Teacher
        </Button>
      </div>
      <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create teacher&#39;s account</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-3.75 px-4">
            <Input
              value={teacherFirstName}
              placeholder='First Name'
              onChange={(e) => setTeacherFirstName(e.target.value)}
            />
            <Input
              value={teacherLastName}
              placeholder='Last Name'
              onChange={(e) => setTeacherLastName(e.target.value)}
            />
            <Input
              value={teacherEmail}
              type='email'
              placeholder='Teacher Email'
              onChange={(e) => setTeacherEmail(e.target.value)}
            />
          </div>

          <SheetFooter>
            {displaySuccessAlert && (
              <Alert className="mb-7.5 h-25 flex-col items-center justify-center rounded-[10px] text-center">
                <AlertDescription className="max-w-sm">
                  Created successfully
                </AlertDescription>
              </Alert>
            )}
            {displayErrorAlert && (
              <Alert variant="destructive" className="mb-7.5 h-25 flex-col items-center justify-center rounded-[10px] text-center">
                <AlertDescription className="max-w-sm">
                  {errorMessage}
                </AlertDescription>
              </Alert>
            )}
            <div className="flex w-full justify-between">
              <Button
                variant='outline'
                className="mr-3 px-5"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                disabled={isSubmitting}
                className="bg-blue-500 px-5 hover:bg-blue-600"
                onClick={createTeacher}
              >
                {isSubmitting ? 'Saving' : 'Save'}
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <div ref={gridRef} className="grid h-[82vh] grid-cols-1 gap-5">
        <div className="flex h-full w-full flex-col overflow-y-auto">
          {teachers.map((teacher) => {
            return (
              <UserCard
                key={teacher.id}
                user={teacher}
                getUser={getTeacher}
                deleteUser={deleteTeacher}
                openTab={openTab}
              />
            );
          })}
        </div>
        <div ref={boxRef} className="hidden h-full flex-col gap-5 overflow-y-auto bg-white">
          <div className="flex w-full flex-row justify-end p-2.5">
            <IoMdClose size={'25px'} cursor='pointer' onClick={closeTab} />
          </div>
          <div className="flex items-center justify-center">
            <img
              className="mb-5 size-50 rounded-full object-cover"
              src={profilePicture || '/user.png'}
            />
          </div>
          <div className="flex flex-col gap-3.75 py-2.5 pr-12.5">
            <div className="flex w-full flex-row items-center justify-between">
              <p>
                {' '}
                <span style={{ fontWeight: '700' }}> First name: </span>{' '}
                {firstName}
              </p>
              <p>
                {' '}
                <span style={{ fontWeight: '700' }}> Last name: </span>{' '}
                {lastName}
              </p>
            </div>
            <p>
              {' '}
              <span style={{ fontWeight: '700' }}> Email: </span> {email}
            </p>
            <p style={{ display: address ? 'block' : 'none' }}>
              {' '}
              <span style={{ fontWeight: '700' }}> Address: </span> {address}
            </p>
            <p>
              {' '}
              <span style={{ fontWeight: '700' }}> Role: </span> {role}
            </p>
            <p>
              {' '}
              <span style={{ fontWeight: '700' }}> Status: </span>{' '}
              {isActive ? 'Active' : 'Inactive'}
            </p>
            {lastLogin && (
              <p>
                {' '}
                <span style={{ fontWeight: '700' }}>
                  {' '}
                  Last login date:{' '}
                </span>{' '}
                {convertTime(lastLogin)}
              </p>
            )}
            <p>
              {' '}
              <span style={{ fontWeight: '700' }}> Created at: </span>{' '}
              {convertTime(createdAt)}
            </p>
            <p>
              {' '}
              <span style={{ fontWeight: '700' }}> Updated at: </span>{' '}
              {convertTime(updatedAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersPage;
