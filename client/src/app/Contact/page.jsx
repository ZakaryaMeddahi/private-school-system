import {
    Container,
    Heading,
    Text,
    Grid,
    GridItem,
    Box,
    Center
} from '@chakra-ui/react';
import { PiPhoneCallFill } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram, BsWhatsapp } from "react-icons/bs";

const Contact = () => {
    return (
        <Container m='0' p='0' maxW='100%' display='flex' flexDirection='column' alignItems='center'>
            <Box w='100%' textAlign='center' marginTop='40px'>
                <Heading color='#F6AF03' fontSize='40'>Contact Us</Heading>
                <Text color='#717171' fontSize='18' fontWeight='500' marginTop='3'>Any question or remarks? Just write us a message!</Text>
            </Box>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} width='1196px' height='667' bgColor='#FFFFFF' borderRadius='10' marginBlock='50px' p='5' boxShadow='rgba(0, 0, 0, 0.35) 0px 5px 15px'>
                <GridItem bgColor='#011C2B' h='100%' w='491px' color='white' borderRadius='10' padding='30px' display='grid' justifyContent='space-between'>
                    <Box>
                        <Heading fontSize='28' fontWeight='600'>Contact Information</Heading>
                        <Text fontSize='18' color='#C9C9C9' marginTop='3'>Feel free to contact us for any question or remarks. We will be happy to help you.</Text>
                    </Box>
                    <Box display='grid'>
                        <Box display='flex' gap='15' flexDir='row' alignItems='center'>
                            <PiPhoneCallFill size='25' />
                            <Text fontSize='18'>+1 234 567 890</Text>
                        </Box>
                        <Box display='flex' gap='15' flexDir='row' alignItems='center'>
                            <MdEmail size='25' />
                            <Text fontSize='18'>ex@gmail.com</Text>
                        </Box>
                        <Box display='flex' gap='15' flexDir='row' alignItems='center'>
                            <FaLocationDot size='25' />
                            <Text fontSize='18'>1234 Street Name, City Name</Text>
                        </Box>
                    </Box>
                    <Box display='flex' flexDir='row' gap='5' alignItems='end'>
                        <Box width='50px' height='50px' borderRadius='25px' bgColor='#F6AF03' _hover={{backgroundColor: 'white'}}>
                            <Center h='100%'>
                                <FaFacebookF size='25' color='white' />
                            </Center>
                        </Box>
                        <Box width='50px' height='50px' borderRadius='25px' bgColor='#F6AF03' _hover={{backgroundColor: 'white'}}>
                            <Center h='100%'>
                                <BsInstagram size='25' color='white' />
                            </Center>
                        </Box>
                        <Box width='50px' height='50px' borderRadius='25px' bgColor='#F6AF03' _hover={{backgroundColor: 'white'}}>
                            <Center h='100%'>
                                <BsWhatsapp size='25' color='white' />
                            </Center>
                        </Box>
                    </Box>
                </GridItem>
                <GridItem></GridItem>
            </Grid>
        </Container>
    );
}

export default Contact;