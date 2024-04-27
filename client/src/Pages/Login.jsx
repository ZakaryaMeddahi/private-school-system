'use client';

import {
  Button,
  Checkbox,
  Container,
  Flex,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Header from '@/components/Form header/Header';
import FormInput from '@/components/Form input/FormInput';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { LoginContext } from '@/app/providers/LoginProvider';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { email, setEmail, password, setPassword } = useContext(LoginContext);
  const [checkbox, setCheckbox] = useState(false);
  const router = useRouter();

  const handleCheckbox = () => {
    setCheckbox(!checkbox);
  };

  const handleSubmit = async (e) => {
    try {
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
        throw new Error('Something went wrong');
      }

      const { data } = await response.json();

      console.log(data);

      if (checkbox) {
        localStorage.setItem('token', data.access_token);
      }

      localStorage.setItem('userId', data.id);
      localStorage.setItem('role', data.role);

      if (data.role === 'student') {
        console.log('this user is student');
        router.push('/student_dashboard');
      }
    } catch (error) {
      console.error(error);
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
      <Flex color='white' bg='#FCC128' height='90%' w='80%' borderRadius='50px'>
        <Stack
          maxW='container.lg'
          w='51%'
          height='100%'
          bg='#1C1D21'
          p='25'
          zIndex={1}
          borderLeftRadius='50px'
        >
          <Container w='100%' h='100%' display='flex' justifyContent='center'>
            <VStack h='100%' w='90%' align='self-start' justifyContent='center'>
              <Header title='Login' />
              <FormInput
                type='email'
                placeholder='Email'
                onchange={(e) => {
                  setEmail(e.target.value);
                  console.log('hello');
                }}
              />
              <FormInput
                type='password'
                placeholder='Password'
                onchange={(e) => setPassword(e.target.value)}
              />
              <Stack direction='row' justify='space-between' w='100%'>
                <Checkbox
                  colorScheme='blue'
                  size='lg'
                  onChange={handleCheckbox}
                >
                  Remember me
                </Checkbox>
                <Link href='/forgot-password'>
                  <Text color='blue'>Forgot password?</Text>
                </Link>
              </Stack>
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
                Login
              </Button>
              <Text textAlign='center' mt='5'>
                Don't have an account?
                <span style={{ color: 'blue' }}>
                  <Link href='/signup'> Register</Link>
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

export default LoginPage;
