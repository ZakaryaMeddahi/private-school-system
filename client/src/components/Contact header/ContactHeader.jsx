import { Box, Heading, Text } from '@chakra-ui/react';

const ContactHeader = ({ title, Txt, textAlign, HColor, HFontSize, TColor, hfW, tfW}) => {
    return (
        <Box w='100%' textAlign={textAlign || ''}>
            <Heading color={HColor} fontSize={HFontSize} fontWeight={hfW || '700'}>{title}</Heading>
            <Text color={TColor} fontSize='18' fontWeight={ tfW || '400'} marginTop='3'>{Txt}</Text>
        </Box>
    );
}

export default ContactHeader;