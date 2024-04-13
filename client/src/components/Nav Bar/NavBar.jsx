'use client';

import { Grid, GridItem, HStack, Button } from '@chakra-ui/react'
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
        <Grid templateColumns='repeat(12, 1fr)' gap={6} bg='black' color='white' p={4} alignItems='center'>
            <GridItem colSpan={2}>
                <Logo />          
            </GridItem>
            <GridItem colSpan={5} alignItems='center'>
                <HStack spacing={4} justifyContent='center'>
                    <Link href='/'>Home</Link>
                    <Link href='/'>About</Link>
                    <Link href='/'>Courses</Link>
                    <Link href='/'>Contact</Link>
                </HStack>
            </GridItem>
            <GridItem colSpan={3}>
                <HStack spacing='5px' bgColor='white' paddingLeft='10' p='1' borderRadius='8'>
                    <IoMdSearch color='black' size='30px' />
                    <input ref={inputRef} type="search" name="" id="" style={{color: 'black', paddingLeft: '10px', paddingBlock: '5px', width: '100%', backgroundColor: 'transparent'}} onFocus={onFocus} />
                </HStack>
            </GridItem>
            <GridItem colSpan={2} display='grid' justifyItems='center'> 
            <Button bgColor='#234C51' color='white' w='60%' variant='solid' _hover={{bgColor: 'transparent', border: '1px solid #234C51', transition: 'background-color 0.5s ease, border 0.5s ease'}}>Login</Button>
            </GridItem>
        </Grid>
    );
}

export default NavBar;