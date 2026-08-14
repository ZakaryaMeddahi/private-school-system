import { Box, Text } from '@chakra-ui/react';

const ContactInfo = ({ icon, info }) => {
    return (
        <Box display='flex' gap='15' flexDir='row' alignItems='center'>
            {icon}
            <Text fontSize='18'>{info}</Text>
        </Box>
    );
}

export default ContactInfo;