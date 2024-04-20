'use client';

import { Grid, GridItem, HStack, Button, Text } from '@chakra-ui/react'
import Link from 'next/link'
import Logo from '../Logo/Logo';
import { IoMdSearch } from "react-icons/io";
import { useRef } from 'react';

const NavBar = () => {

    const inputRef = useRef();

    const onFocus = () => {
        if(inputRef.current) {
            inputRef.current.style.outline = 'none';
            console.log(inputRef.current.style);
        }
    }

    return(
        <Grid 
            templateColumns='repeat(12, 1fr)' 
            gap={6} 
            bg='transparent' 
            color='white' p={4} 
            alignItems='center'
            borderBottom='1px solid gray'
        >
            <GridItem colSpan={2}>
                <Logo color='#213E69' />          
            </GridItem>
            <GridItem colSpan={5} alignItems='center'>
                <HStack spacing={12} justifyContent='center' color='GrayText'>
                    <Link href='/course'>
                        <Text _hover={{color: '#FCC128'}}>    
                            Home
                        </Text>
                    </Link>
                    <Link href='/'>
                        <Text _hover={{color: '#FCC128'}}>    
                            About
                        </Text>
                    </Link>
                    <Link href='/course'>
                        <Text _hover={{color: '#FCC128'}}>    
                            Courses
                        </Text>
                    </Link>
                    <Link href='/contact'>
                        <Text _hover={{color: '#FCC128'}}>    
                            Contact
                        </Text>
                    </Link>
                </HStack>
            </GridItem>
            <GridItem colSpan={3}>
                <HStack 
                    spacing='5px' 
                    bgColor='white' 
                    paddingLeft='10' 
                    p='1' 
                    borderRadius='10' 
                    boxShadow='rgba(149, 157, 165, 0.2) 0px 8px 24px'
                >
                    <IoMdSearch color='black' size='30px' />
                    <input 
                        ref={inputRef} 
                        type="search" 
                        name="" 
                        id="" 
                        style={{
                            color: 'black', 
                            paddingLeft: '10px', 
                            paddingBlock: '5px', 
                            width: '100%', 
                            backgroundColor: 'transparent'
                        }} 
                        onFocus={onFocus} 
                    />
                </HStack>
            </GridItem>
            <GridItem colSpan={2} display='grid' justifyItems='center'>
                <Link href='/login' w='100%'>
                    <Button 
                        bgColor='#234C51' 
                        color='white'    
                        variant='solid'
                        _hover={{
                            bgColor: 'transparent', 
                            color: '#234C51', 
                            border: '1px solid #234C51', 
                            transition: 'background-color 0.5s ease, border 0.5s ease'
                        }}
                        >
                        Login
                    </Button>
                </Link>
            </GridItem>
        </Grid>
    );
}

export default NavBar;