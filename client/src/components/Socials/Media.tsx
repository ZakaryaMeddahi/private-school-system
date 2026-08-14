import { Box, Center } from '@chakra-ui/react';

const Media = ({ icon, w, h, bgcolor, hover }) => {
    return (
        <Box width={w || '50px'} height={ h || '50px'} borderRadius='25px' bgColor={ bgcolor || '#F6AF03'} _hover={ hover || {backgroundColor: 'transparent', border: '2px solid #F6AF03'}}>
            <Center h='100%'>
                {icon}
            </Center>
        </Box>
    );
}

export default Media;