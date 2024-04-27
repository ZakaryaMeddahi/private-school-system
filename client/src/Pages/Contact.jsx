import {
    Container,
    Grid,
    GridItem,
    Box,
    Button
} from '@chakra-ui/react';
import { PiPhoneCallFill } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram, BsWhatsapp } from "react-icons/bs";
import RowInput from '@/components/RowInput';
import ContactInput from '@/components/Contact Input/ContactInput';
import ContactHeader from '@/components/Contact header/ContactHeader';
import ContactInfo from '@/components/Contact info/ContactInfo';
import Media from '@/components/Socials/Media';

const ContactPage = () => {
    return (
        <Container m='0' p='0' maxW='100%' display='flex' flexDirection='column' alignItems='center' marginBlock='50px'>
            {/* <ContactHeader title='Contact Us' Txt='Any question or remarks? Just write us a message!' textAlign='center' HColor='#F6AF03' HFontSize='40' TColor='#717171' tfW='500'/> */}
            <ContactHeader title='Contact Us' Txt='Any question or remarks? Just write us a message!' textAlign='center' HColor='#F6AF03' HFontSize='40' TColor='#717171' tfW='500'/>
            <Grid templateColumns="auto 1fr" gap={6} width='1196px' height='667' bgColor='#FFFFFF' borderRadius='10' marginBlock='50px' p='5' boxShadow='rgba(0, 0, 0, 0.35) 0px 5px 15px'>
                <GridItem bgColor='#011C2B' h='100%' w='491px' color='white' borderRadius='10' padding='30px' display='grid' justifyContent='space-between'>
                    <ContactHeader title='Contact Information' Txt='Feel free to contact us for any question or remarks. We will be happy to help you.' HColor='white' HFontSize='28' TColor='#C9C9C9' hfW='600'/>
                    <Box display='grid'>
                        <ContactInfo icon={<PiPhoneCallFill size='25' />} info='+1 234 567 890' />
                        <ContactInfo icon={<MdEmail size='25' />} info='ex@gmail.com' />
                        <ContactInfo icon={<FaLocationDot size='25' />} info='1234 Street Name, City Name' />
                    </Box>
                    <Box display='flex' flexDir='row' gap='5' alignItems='end'>
                        <Media icon={<FaFacebookF size='25' />} />
                        <Media icon={<BsInstagram size='25' />} />
                        <Media icon={<BsWhatsapp size='25' />} />
                    </Box>
                </GridItem>
                <GridItem w='100%'>
                    <RowInput label_I1='First Name' label_I2='Last Name' placeholder_I1='|' placeholder_I2='Sid' />
                    <RowInput label_I1='Email' label_I2='Phone' placeholder_I1='ex@gmail.com' placeholder_I2='+1 234 567 89' />
                    <ContactInput label='Subject' placeholder='Write your Subject' mT='30px' />
                    <ContactInput label='Message' placeholder='Write your message..' mT='40px' imT='40px'/>
                    <Box display='flex' justifyContent='flex-end' marginTop='40px'>
                        <Button bgColor='#011C2A' color='white' fontSize='16px' fontWeight='500' padding='10px 30px' _hover={{backgroundColor: '#F6AF03', color: 'black'}} >Send Message</Button> 
                    </Box>
                </GridItem>
            </Grid>
        </Container>
    );
}

export default ContactPage;