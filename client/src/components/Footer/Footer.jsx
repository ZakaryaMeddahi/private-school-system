'use client'

import Logo from '../Logo/Logo';
import { 
    Container,
    Grid, 
    GridItem, 
    Divider, 
    Flex, 
    Spacer, 
    Box, 
    Text, 
    Heading, 
    UnorderedList, 
    ListItem
} from '@chakra-ui/react';

const Footer = () => {
    return (
        <Container w='100%' h='500px' maxW='100%' paddingBlock='20px' paddingInline='50px' bgColor='black' color='white' > 
            <Grid maxW='100%' height='80%' templateColumns='repeat(12, 1fr)' gap='10' p='15' alignContent='center' justifyItems='center' alignItems='center'>
                <GridItem colSpan={6}>
                    <Logo boxSize='120px' fontSize='32px' />
                    <Text color='white' fontSize='16px' marginBlock='20px' marginLeft='30px' width='450px'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id.
                    </Text>
                </GridItem>
                <GridItem colSpan={2}>
                    <Heading as='h3' fontSize='24px' marginBottom='15px'>Links</Heading>
                    <UnorderedList listStyleType='none' margin='0' lineHeight='1.7'>
                        <ListItem color='gray' _hover={{color: 'white'}} transition='all 0.6s ease'><a href='/'>Home</a></ListItem>
                        <ListItem color='gray' _hover={{color: 'white'}} transition='all 0.6s ease'><a href='/about'>About</a></ListItem>
                        <ListItem color='gray' _hover={{color: 'white'}} transition='all 0.6s ease'><a href='/courses'>Courses</a></ListItem>
                        <ListItem color='gray' _hover={{color: 'white'}} transition='all 0.6s ease'><a href='/contact'>Contact</a></ListItem>
                    </UnorderedList>
                </GridItem>
                <GridItem colSpan={2}>
                    <Heading as='h3' fontSize='24px' marginBottom='15px'>Links</Heading>
                    <UnorderedList listStyleType='none' margin='0' lineHeight='1.7'>
                        <ListItem color='gray' _hover={{color: 'white'}} transition='all 0.6s ease'><a href='/'>Home</a></ListItem>
                        <ListItem color='gray' _hover={{color: 'white'}} transition='all 0.6s ease'><a href='/about'>About</a></ListItem>
                        <ListItem color='gray' _hover={{color: 'white'}} transition='all 0.6s ease'><a href='/courses'>Courses</a></ListItem>
                        <ListItem color='gray' _hover={{color: 'white'}} transition='all 0.6s ease'><a href='/contact'>Contact</a></ListItem>
                    </UnorderedList>
                </GridItem>
                <GridItem colSpan={2}>
                    <Heading as='h3' fontSize='24px' marginBottom='15px'>Links</Heading>
                    <UnorderedList listStyleType='none' margin='0' lineHeight='1.7'>
                        <ListItem color='gray' _hover={{color: 'white'}} transition='all 0.6s ease'><a href='/'>Home</a></ListItem>
                        <ListItem color='gray' _hover={{color: 'white'}} transition='all 0.6s ease'><a href='/about'>About</a></ListItem>
                        <ListItem color='gray' _hover={{color: 'white'}} transition='all 0.6s ease'><a href='/courses'>Courses</a></ListItem>
                        <ListItem color='gray' _hover={{color: 'white'}} transition='all 0.6s ease'><a href='/contact'>Contact</a></ListItem>
                    </UnorderedList>
                </GridItem>
            </Grid>
            <Divider marginBlock='20px' />
            <Flex maxW='100%' height='10%' paddingInline='60px'>
                <Box w='40%' height='100%' display='flex' alignItems='center' justifyContent='center'>
                    <Text fontSize='16px' color='gray' marginBlock='10px'>© 2024 Education. All rights reserved</Text>
                </Box>
                <Spacer />
                <Box w='40%' height='100%'></Box>
            </Flex>
        </Container>
    );
}

export default Footer;