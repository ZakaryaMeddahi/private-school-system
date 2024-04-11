import { Box, Center } from '@chakra-ui/react';

const Media = ({ icon }) => {
    return (
        <Box width='50px' height='50px' borderRadius='25px' bgColor='#F6AF03' _hover={{backgroundColor: 'transparent', border: '2px solid #F6AF03'}}>
            <Center h='100%'>
                {icon}
            </Center>
        </Box>
    );
}

export default Media;