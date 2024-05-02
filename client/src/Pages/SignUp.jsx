'use client';

import React, { useState } from 'react';
import {
  Flex,
  Stack,
  Container,
  VStack,
  Text,
  Checkbox,
  Link,
  Button,
  Image,
  Box,
} from '@chakra-ui/react';
import Header from '@/components/Form header/Header';
import FormInput from '@/components/Form input/FormInput';
import { useContext } from 'react';
import { LoginContext } from '@/app/providers/LoginProvider';
import { redirect, useRouter } from 'next/navigation';
import { TbRosetteNumber0 } from 'react-icons/tb';
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

  const handleSubmit = async (e) => {
    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

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

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('userId', data.id);
      localStorage.setItem('role', data.role);

      router.push('/student_dashboard');

      //   console.log(email, password, confirmPassword);
    } catch (error) {
      console.error(error.message.split(','));
      error.message
        .toLowerCase()
        .split(',')
        .forEach((message) => {
          if (message.includes('email')) setEmailErrorMessage(message);
          else if (message.includes('password')) setPasswordErrorMessage(message);
          else if (message.includes('firstname')) setFirstNameErrorMessage(message);
          else if (message.includes('lastname')) setLastNameErrorMessage(message);
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
      <Flex
        flexDir='row-reverse'
        color='white'
        bg='#FCC128'
        height='90%'
        w='80%'
        borderRadius='25px'
      >
        <Stack
          maxW='container.lg'
          w='51%'
          height='100%'
          bg='#1C1D21'
          p='25'
          zIndex={1}
          borderRightRadius='25px'
        >
          <Container w='100%' h='100%' display='flex' justifyContent='center'>
            <VStack h='100%' w='90%' align='self-start' justifyContent='center'>
              <Header title='Sign Up' />
              <Box w='100%'>
                <FormInput
                  type='text'
                  placeholder='First Name'
                  onchange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <ErrorMessage errorMessage={firstNameErrorMessage} />
              </Box>
              <Box w='100%'>
                <FormInput
                  type='text'
                  placeholder='Last Name'
                  onchange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                <ErrorMessage errorMessage={lastNameErrorMessage} />
              </Box>
              <Box w='100%'>
                <FormInput
                  type='email'
                  placeholder='Email'
                  onchange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <ErrorMessage errorMessage={emailErrorMessage} />
              </Box>
              <Box w='100%'>
                <FormInput
                  type='password'
                  placeholder='Password'
                  onchange={(e) => setPassword(e.target.value)}
                />
                <ErrorMessage errorMessage={passwordErrorMessage} />
              </Box>
              <FormInput
                type='password'
                placeholder='Confirm Password'
                onchange={(e) => setConfirmPassword(e.target.value)}
              />
              <ErrorMessage errorMessage={errorMessage} />
              {/* <ErrorMessage errorMessage={errorMessage} /> */}
              {/* <Stack direction='row' justify='space-between' w='100%'>
                                <Checkbox colorScheme='blue' size='lg'>Remember me</Checkbox>
                                <Link href='/forgot-password'>
                                    <Text color='blue'>Forgot password?</Text>
                                </Link>
                            </Stack> */}
              <Button
                size='lg'
                w='100%'
                mt='5'
                fontSize='16px'
                border='none'
                borderRadius='12'
                bgColor='#234C51'
                color='white'
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
              <Text textAlign='center' mt='5'>
                I already have an account !!
                <span style={{ color: 'blue' }}>
                  <Link href='/login'> Sign in</Link>
                </span>
              </Text>
            </VStack>
          </Container>
        </Stack>
        <Container
          flex={1}
          bg='transparent'
          display='flex'
          justifyContent='center'
          alignItems='center'
          maxW='100%'
        >
          <Image
            src='/illustration.png'
            alt='illustration'
            w='800px'
            zIndex='1'
          />
        </Container>
      </Flex>
    </div>
  );
};

export default SignUpPage;
