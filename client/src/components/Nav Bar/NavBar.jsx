import { Grid, GridItem, Wrap, WrapItem, Image, Heading, HStack, Button } from '@chakra-ui/react'
import Link from 'next/link'
import Logo from '../Logo/Logo';

const NavBar = () => {
    return(
        <Grid templateColumns='repeat(12, 1fr)' gap={6} bg='black' color='white' p={4} alignItems='center'>
            <GridItem colSpan={2}>
                <Logo />          
            </GridItem>
            <GridItem colSpan={5} alignItems='center' justifyContent='center'>
                <HStack spacing={4}>
                    <Link href='/'>Home</Link>
                    <Link href='/'>About</Link>
                    <Link href='/'>Courses</Link>
                    <Link href='/'>Contact</Link>
                </HStack>
            </GridItem>
            <GridItem colSpan={3}>
                <HStack spacing='24px'>
                    <input type="search" name="" id="" style={{color: 'black', paddingLeft: '10px', paddingBlock: '5px', width: '100%'}} />
                </HStack>
            </GridItem>
            <GridItem colSpan={2}>
                <Button colorScheme='blue' variant='solid'>Login</Button>
                <Button colorScheme='green' variant='solid'>Register</Button>
            </GridItem>
        </Grid>
    );
}

export default NavBar;