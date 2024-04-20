'use client';

import React, { useState } from 'react';
import { Flex, Stack, Container, VStack, Text, Checkbox, Link, Button, Image } from '@chakra-ui/react';
import Header from '@/components/Form header/Header';
import FormInput from '@/components/Form input/FormInput';
import { useContext } from 'react';
import { LoginContext } from '@/app/providers/LoginProvider';

const SignUpPage = () => {

    const {
        email, 
        setEmail, 
        password, 
        setPassword, 
        username, 
        setUsername, 
        confirmPassword,
        setConfirmPassword
    } = useContext(LoginContext);

    const onSubmit = (e) => {
        console.log(email, username, password, confirmPassword);
    }

    return (
        <div 
            style = {{ 
                    color: '100%', 
                    zIndex: '50', 
                    display: 'flex', 
                    height: '100%', 
                    justifyContent: 'center', 
                    alignItems: 'center'
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
                    <Container 
                        w='100%' 
                        h='100%' 
                        display='flex' 
                        justifyContent='center'
                    >
                        <VStack 
                            h='100%' 
                            w='90%' 
                            align='self-start' 
                            justifyContent='center'
                        >
                            <Header title='Sign Up' />
                            <FormInput 
                                type='text' 
                                placeholder='Username' 
                                onchange={e =>{setUsername(e.target.value)}}
                            />
                            <FormInput 
                                type='email' 
                                placeholder='Email' 
                                onchange={e =>{setEmail(e.target.value)}}
                            />
                            <FormInput 
                                type='password' 
                                placeholder='Password' 
                                onchange={e => setPassword(e.target.value)} 
                            />
                            <FormInput 
                                type='password' 
                                placeholder='Confirm Password' 
                                onchange={e => setConfirmPassword(e.target.value)}
                            />
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
                                onClick={onSubmit}
                            >
                                Sign Up
                            </Button>
                            <Text 
                                textAlign='center' 
                                mt='5'
                            >
                                I have already account !! 
                                <span style={{color: 'blue'}}>
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
                   <Image src="/illustration.png" alt="illustration" w='800px' zIndex='1' />
                </Container>
            </Flex>
        </div>
    );
}

export default SignUpPage;