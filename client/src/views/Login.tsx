'use client';

import { Button } from '@/components/ui/button';
import Header from '@/components/form-header/Header';
import FormInput from '@/components/form-input/FormInput';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { LoginContext } from '@/app/providers/LoginProvider';
import { useRouter } from 'next/navigation';
import ErrorMessage from '@/components/ErrorMessage';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthBrandPanel from '@/components/auth/AuthBrandPanel';
import SocialLoginButton from '@/components/auth/SocialLoginButton';
import PasswordInput from '@/components/auth/PasswordInput';

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
        router.push('/admin');
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
    <AuthLayout brandPanel={<AuthBrandPanel />}>
      <Header
        title="Welcome back"
        subtitle="Sign in to continue your learning journey."
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
          <div>
            <FormInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              onchange={(e) => setEmail(e.target.value)}
            />
            <ErrorMessage errorMessage={emailErrorMessage} />
          </div>

          <div>
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              autoComplete="current-password"
              onchange={(e) => setPassword(e.target.value)}
            />
            <ErrorMessage errorMessage={passwordErrorMessage} />
          </div>

          <div className="-mt-1 flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-[#4338CA] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4338CA]"
            >
              Forgot password?
            </Link>
          </div>

          <ErrorMessage errorMessage={errorMessage} />

          <Button
            type="submit"
            className="h-11 w-full rounded-lg bg-[#4338CA] text-sm font-semibold text-white hover:bg-[#4338CA]/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center text-sm text-[#64748B]">
          Don&#39;t have an account?{' '}
          <Link
            href="/signup"
            className="font-medium text-[#4338CA] hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
