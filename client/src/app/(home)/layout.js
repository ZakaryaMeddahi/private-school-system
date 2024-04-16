'use client';


import Logo from "@/components/Logo/Logo";
import { Box, Center, Divider, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { IoChatbubblesOutline } from "react-icons/io5";
import { MdOutlineNotifications } from "react-icons/md";


const Layout = ({ children }) => {

    return (
        <Grid templateColumns='auto 1fr' height='100%'>
            <GridItem height='100%' w='300px' bgColor='#F1F2ED'>
                <Box w='100%' display='flex' flexDir='row' justifyContent='space-between' alignItems='center' padding='15'>
                    <Logo color='black' fontSize='20px' fontWeight='500' boxSize='70px' />
                    <MdOutlineKeyboardDoubleArrowLeft color="#898C81" size='25px'/>
                </Box>
                <Divider borderColor='#898C81' />
                <Box w='100%' h='89%' display='flex' flexDir='column' justifyContent='space-between'>
                    <Box>
                        <Box w='100%' display='flex' flexDir='row' gap='5' alignItems='center' paddingLeft='30' h='70px' _hover={{bgColor: 'white'}}>
                            <HiOutlineAcademicCap color="#898C81" size='23px' />
                            <Text color='#898C81'>Courses</Text>
                        </Box>
                        <Box w='100%' display='flex' flexDir='row' gap='5' alignItems='center' paddingLeft='30' h='70px' _hover={{bgColor: 'white'}} >
                            <HiOutlineAcademicCap color="#898C81" size='23px' />
                            <Text color='#898C81'>Courses</Text>
                        </Box>
                        <Box w='100%' display='flex' flexDir='row' gap='5' alignItems='center' paddingLeft='30' h='70px' _hover={{bgColor: 'white'}} >
                            <HiOutlineAcademicCap color="#898C81" size='23px' />
                            <Text color='#898C81'>Courses</Text>
                        </Box>
                        <Box w='100%' display='flex' flexDir='row' gap='5' alignItems='center' paddingLeft='30' h='70px' _hover={{bgColor: 'white'}} >
                            <HiOutlineAcademicCap color="#898C81" size='23px' />
                            <Text color='#898C81'>Courses</Text>
                        </Box>
                        <Box w='100%' display='flex' flexDir='row' gap='5' alignItems='center' paddingLeft='30' h='70px' _hover={{bgColor: 'white'}} >
                            <HiOutlineAcademicCap color="#898C81" size='23px' />
                            <Text color='#898C81'>Courses</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box w='100%' display='flex' flexDir='row' gap='5' alignItems='center' paddingLeft='30' h='70px' _hover={{bgColor: 'white'}} >
                            <IoChatbubblesOutline color="#898C81" size='23px' />
                            <Text color='#898C81'>Chat</Text>
                        </Box>
                        <Box w='100%' display='flex' flexDir='row' gap='5' alignItems='center' paddingLeft='30' h='70px' _hover={{bgColor: 'white'}} >
                            <MdOutlineNotifications color="#898C81" size='23px' />
                            <Text color='#898C81'>Notification</Text>
                        </Box>
                        <Divider borderColor='#898C81' />
                        <Box w='100%' display='flex' flexDirection='row' padding='15px' gap='10px' alignItems='center'>
                            <Box w='50px' h='50px' borderRadius='50px' bgColor='#D8D9D4'>
                                <Center height='100%'>
                                    AS
                                </Center>
                            </Box>
                            <Box>
                                <Heading fontSize='20px' fontWeight='400' color='black'>Adeyemi Samuel</Heading>
                                <Text fontSize='14px' color='#898C81'>Student@gmail.com</Text>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </GridItem>
            <GridItem>{children}</GridItem>
        </Grid>
    );
}

export default Layout;