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
import AuthLayout from '@/components/auth/AuthLayout';
import AuthBrandPanel from '@/components/auth/AuthBrandPanel';
import SocialLoginButton from '@/components/auth/SocialLoginButton';
import PasswordInput from '@/components/auth/PasswordInput';

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
    <AuthLayout brandPanel={<AuthBrandPanel />}>
      <Header
        title="Create your account"
        subtitle="Start your learning journey with NEXA."
      />

      <div className="flex flex-col gap-4">
        <SocialLoginButton />

        <div className="flex items-center gap-3 text-xs text-[#64748B]">
          <div className="h-px flex-1 bg-[#E2E8F0]" />
          OR
          <div className="h-px flex-1 bg-[#E2E8F0]" />
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div className="w-full sm:w-[48%]">
              <FormInput
                label="First Name"
                type="text"
                placeholder="First name"
                autoComplete="given-name"
                onchange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <ErrorMessage errorMessage={firstNameErrorMessage} />
            </div>
            <div className="w-full sm:w-[48%]">
              <FormInput
                label="Last Name"
                type="text"
                placeholder="Last name"
                autoComplete="family-name"
                onchange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              <ErrorMessage errorMessage={lastNameErrorMessage} />
            </div>
          </div>

          <div>
            <FormInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              onchange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <ErrorMessage errorMessage={emailErrorMessage} />
          </div>

          <div>
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              autoComplete="new-password"
              onchange={(e) => setPassword(e.target.value)}
            />
            <ErrorMessage errorMessage={passwordErrorMessage} />
          </div>

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            autoComplete="new-password"
            onchange={(e) => setConfirmPassword(e.target.value)}
          />
          <ErrorMessage errorMessage={errorMessage} />

          <Button
            type="submit"
            className="h-11 w-full rounded-lg bg-[#4338CA] text-sm font-semibold text-white hover:bg-[#4338CA]/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <p className="text-center text-sm text-[#64748B]">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-[#4338CA] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
