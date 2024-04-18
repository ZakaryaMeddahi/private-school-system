'use client';


import Logo from "@/components/Logo/Logo";
import { 
    Box,
    Center, 
    Container, 
    Divider, 
    Flex, 
    Grid, 
    GridItem, 
    Heading, 
    Text,
    HStack 
} from "@chakra-ui/react";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { IoChatbubblesOutline } from "react-icons/io5";
import { MdOutlineNotifications } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { useRef } from "react";
import CourseCard from "@/components/Course Card/CourseCard";


const Layout = ({ children }) => {

    const inputRef = useRef();
  
    const onFocus = () => {
        if(inputRef.current) {
            inputRef.current.style.outline = 'none';
            console.log(inputRef.current.style);
        }
    }

    return (
        <Container maxW='100%' h='100vh' margin='0' p='0' display='flex' flexDirection='column'>
            <Box h='100px' bgColor='#F1F2ED'>
                <Flex h='100%' alignItems='center' justifyContent='space-between'>
                    <Box display='flex' alignItems='center' gap='5' paddingLeft='30'>
                        <Logo color='black' fontSize='20px' fontWeight='500'/>
                        <Text color='black' fontSize='20px' fontWeight='500'>Courses</Text>
                    </Box>
                    <Box display='flex' alignItems='center' gap='5' paddingRight='30'>
                        <Box w='50px' h='50px' borderRadius='50px' bgColor='#D8D9D4'>
                            <Center height='100%'>
                                AS
                            </Center>
                        </Box>
                        <Box>
                            <Heading fontSize='20px' fontWeight='400' color='black'>Adeyemi Samuel</Heading>
                            <Text fontSize='14px' color='#898C81'></Text>
                        </Box>
                    </Box>
                </Flex>
            </Box>
            <Box w='100%' height='100%' display='flex' flexDir='row'>
                <Box w='300px' bgColor='#F1F2ED'></Box>
                {children}
                {/* <Box overflowY='auto' w='100%'>{children}</Box> */}
            </Box>
        </Container>
        // <Container m='0' p='0' maxW='100%' overflowY='auto'>
        //     <Box h='80px' bgColor='#F1F2ED' display='grid' gridTemplateColumns='auto 1fr 0.25fr' alignItems='center' justifyItems='center' >
        //         <Logo color='black' fontSize='20px' fontWeight='500'/>
        //         <Box display='flex' alignItems='center' justifyContent='center' marginInline='36px'>
        //             <Center>
        //                 <HStack w='500px' spacing='5px' bgColor='white' paddingLeft='10' p='1' borderRadius='8' border='1px solid black' boxShadow='rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'>
        //                     <IoMdSearch color='black' size='30px' />
        //                     <input ref={inputRef} type="search" name="" id="" style={{color: 'black', paddingLeft: '10px', paddingBlock: '5px', width: '100%', backgroundColor: 'transparent'}} onFocus={onFocus} />
        //                 </HStack>
        //             </Center>
        //         </Box>
        //         <Box display='flex' flexDirection='row' alignItems='center'>
        //             <Box w='50px' h='50px' borderRadius='50px' bgColor='#D8D9D4'>
        //                 <Center height='100%'>
        //                     AS
        //                 </Center>
        //             </Box>
        //             <Box>
        //                 <Heading fontSize='20px' fontWeight='400' color='black'>Adeyemi Samuel</Heading>
        //                 <Text fontSize='14px' color='#898C81'>Student@gmail.com</Text>
        //             </Box>
        //         </Box>
        //     </Box>
        //     <Grid templateColumns='auto 1fr' height='100%'>
        //         <GridItem height='100%' w='300px' bgColor='#F1F2ED'>
        //             <Box w='100%' h='89%' display='flex' flexDir='column' justifyContent='space-between'>
        //                 <Box>
        //                     <Box w='100%' display='flex' flexDir='row' gap='5' alignItems='center' paddingLeft='30' h='70px' _hover={{bgColor: 'white'}}>
        //                         <HiOutlineAcademicCap color="#898C81" size='23px' />
        //                         <Text color='#898C81'>Courses</Text>
        //                     </Box>
        //                     <Box w='100%' display='flex' flexDir='row' gap='5' alignItems='center' paddingLeft='30' h='70px' _hover={{bgColor: 'white'}} >
        //                         <HiOutlineAcademicCap color="#898C81" size='23px' />
        //                         <Text color='#898C81'>Courses</Text>
        //                     </Box>
        //                     <Box w='100%' display='flex' flexDir='row' gap='5' alignItems='center' paddingLeft='30' h='70px' _hover={{bgColor: 'white'}} >
        //                         <HiOutlineAcademicCap color="#898C81" size='23px' />
        //                         <Text color='#898C81'>Courses</Text>
        //                     </Box>
        //                     <Box w='100%' display='flex' flexDir='row' gap='5' alignItems='center' paddingLeft='30' h='70px' _hover={{bgColor: 'white'}} >
        //                         <HiOutlineAcademicCap color="#898C81" size='23px' />
        //                         <Text color='#898C81'>Courses</Text>
        //                     </Box>
        //                     <Box w='100%' display='flex' flexDir='row' gap='5' alignItems='center' paddingLeft='30' h='70px' _hover={{bgColor: 'white'}} >
        //                         <HiOutlineAcademicCap color="#898C81" size='23px' />
        //                         <Text color='#898C81'>Courses</Text>
        //                     </Box>
        //                 </Box>
        //                 <Box>
        //                     <Box w='100%' display='flex' flexDir='row' gap='5' alignItems='center' paddingLeft='30' h='70px' _hover={{bgColor: 'white'}} >
        //                         <IoChatbubblesOutline color="#898C81" size='23px' />
        //                         <Text color='#898C81'>Chat</Text>
        //                     </Box>
        //                     <Box w='100%' display='flex' flexDir='row' gap='5' alignItems='center' paddingLeft='30' h='70px' _hover={{bgColor: 'white'}} >
        //                         <MdOutlineNotifications color="#898C81" size='23px' />
        //                         <Text color='#898C81'>Notification</Text>
        //                     </Box>
        //                 </Box>
        //             </Box>
        //         </GridItem>
        //         <GridItem>{children}</GridItem>
        //     </Grid>
        // </Container>
    );
}

export default Layout;