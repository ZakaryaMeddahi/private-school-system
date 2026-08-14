'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/form-header/Header';
import FormInput from '@/components/form-input/FormInput';
import { useContext } from 'react';
import { LoginContext } from '@/app/providers/LoginProvider';
import { useRouter } from 'next/navigation';
import ErrorMessage from '@/components/ErrorMessage';

const SignUpPage = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    confirmPassword,
    setConfirmPassword,
  } = useContext(LoginContext);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      setIsSubmitting(true);

      console.log(firstName);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            firstName,
            lastName,
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

      router.push('/login');

      //   console.log(email, password, confirmPassword);
    } catch (error) {
      setIsSubmitting(false);
      console.error(error.message.split(','));
      error.message
        .toLowerCase()
        .split(',')
        .forEach((message) => {
          if (message.includes('email')) setEmailErrorMessage(message);
          else if (message.includes('password'))
            setPasswordErrorMessage(message);
          else if (message.includes('firstname'))
            setFirstNameErrorMessage(message);
          else if (message.includes('lastname'))
            setLastNameErrorMessage(message);
          else setErrorMessage(message);
        });
      // setErrorMessage(error.message);
    }
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
      <div className="flex h-[90%] w-4/5 flex-row-reverse rounded-[25px] text-white" style={{ backgroundColor: '#FCC128' }}>
        <div className="z-1 flex h-full w-[51%] max-w-3xl flex-col rounded-r-[25px] bg-[#1C1D21] p-6.25">
          <div className="flex h-full w-full justify-center">
            <div className="flex h-full w-[90%] flex-col items-start justify-center gap-2">
              <Header title='Sign Up' />
              <div className="flex w-full flex-row justify-between">
                <div className="w-[48%]">
                  <FormInput
                    type='text'
                    placeholder='First Name'
                    onchange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  <ErrorMessage errorMessage={firstNameErrorMessage} />
                </div>
                <div className="w-[48%]">
                  <FormInput
                    type='text'
                    placeholder='Last Name'
                    onchange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                  <ErrorMessage errorMessage={lastNameErrorMessage} />
                </div>
              </div>
              <div className="w-full">
                <FormInput
                  type='email'
                  placeholder='Email'
                  onchange={(e) => {
                    setEmail(e.target.value);
                  }}
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
              <FormInput
                type='password'
                placeholder='Confirm Password'
                onchange={(e) => setConfirmPassword(e.target.value)}
              />
              <ErrorMessage errorMessage={errorMessage} />
              <Button
                className="h-auto w-full rounded-[7px] bg-[#234C51] py-2.5 text-base text-white hover:bg-[#234C51]/90"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? 'Sign Up...' : 'Sign Up'}
              </Button>
              <p className="mt-5 text-center">
                I already have an account !!
                <span style={{ color: 'blue' }}>
                  <Link href='/login'> Sign in</Link>
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

export default SignUpPage;
