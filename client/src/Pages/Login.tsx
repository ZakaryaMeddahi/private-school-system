'use client';

import { Button } from '@/components/ui/button';
import Header from '@/components/form-header/Header';
import FormInput from '@/components/form-input/FormInput';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { LoginContext } from '@/app/providers/LoginProvider';
import { useRouter } from 'next/navigation';
import ErrorMessage from '@/components/ErrorMessage';

const LoginPage = () => {
  const { email, setEmail, password, setPassword } = useContext(LoginContext);
  const [checkbox, setCheckbox] = useState(false);
  const router = useRouter();
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckbox = () => {
    setCheckbox(!checkbox);
  };

  const handleSubmit = async (e) => {
    try {
      setIsSubmitting(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const { data } = await response.json();

      console.log(data);

      // if (checkbox) {
      //   localStorage.setItem('token', data.access_token);
      // }

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('userId', data.id);
      localStorage.setItem('role', data.role);

      if (data.role === 'student') {
        console.log('this user is student');
        router.push('/student_dashboard');
      }

      if (data.role === 'teacher') {
        console.log('this user is teacher');
        router.push('/teacher_dashboard');
      }

      if (data.role === 'admin') {
        console.log('this user is admin');
        router.push('/admin_dashboard');
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
      error.message
        .toLowerCase()
        .split(',')
        .forEach((message) => {
          if (message.includes('email')) setEmailErrorMessage(message);
          else if (message.includes('password'))
            setPasswordErrorMessage(message);
          else setErrorMessage(message);
        });
      // setErrorMessage(error.message);
    }

    console.log(email, password);
  };

  return (
    <div
      style={{
        color: '100%',
        zIndex: '50',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="flex h-[90%] w-4/5 rounded-[50px] text-white" style={{ backgroundColor: '#FCC128' }}>
        <div className="z-1 flex h-full w-[51%] max-w-3xl flex-col rounded-l-[50px] bg-[#1C1D21] p-6.25">
          <div className="flex h-full w-full justify-center">
            <div className="flex h-full w-[90%] flex-col items-start justify-center gap-2">
              <Header title='Login' />
              <div className="w-full">
                <FormInput
                  type='text'
                  placeholder='Email'
                  onchange={(e) => setEmail(e.target.value)}
                />
                <ErrorMessage errorMessage={emailErrorMessage} />
              </div>
              <div className="w-full">
                <FormInput
                  type='password'
                  placeholder='Password'
                  onchange={(e) => setPassword(e.target.value)}
                />
                <ErrorMessage errorMessage={passwordErrorMessage} />
              </div>
              <ErrorMessage errorMessage={errorMessage} />
              <Button
                className="h-auto w-full rounded-[7px] bg-[#234C51] py-2.5 text-base text-white hover:bg-[#234C51]/90"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? 'Login...' : 'Login'}
              </Button>
              <p className="mt-5 text-center">
                Don&#39;t have an account?
                <span style={{ color: 'blue' }}>
                  <Link href='/signup'> Register</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex max-w-full flex-1 items-center justify-center bg-transparent">
          <img
            src='/illustration.png'
            alt='illustration'
            className="z-1 w-200"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
