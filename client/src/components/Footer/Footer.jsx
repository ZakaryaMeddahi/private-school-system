'use client'

import { Container, Grid, GridItem, Divider, Flex, Spacer, Box } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Container w='100%' h='500px' maxW='100%' paddingBlock='20px' paddingInline='50px' bgColor='black'> 
            <Grid maxW='100%' height='80%' bgColor='blue' templateColumns='repeat(12, 1fr)' gap='10' p='15'>
                <GridItem colSpan={6}></GridItem>
                <GridItem colSpan={2} bgColor='green' ></GridItem>
                <GridItem colSpan={2} bgColor='green' ></GridItem>
                <GridItem colSpan={2} bgColor='green' ></GridItem>
            </Grid>
            <Divider marginBlock='20px' />
            <Flex maxW='100%' height='10%' bgColor='yellowgreen' paddingInline='60px'>
                <Box w='40%' height='100%' bgColor='red'></Box>
                <Spacer />
                <Box w='40%' height='100%' bgColor='red'></Box>
            </Flex>
        </Container>
    );
}

export default Footer;