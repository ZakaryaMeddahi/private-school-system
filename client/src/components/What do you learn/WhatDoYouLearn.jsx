import { Box, Text } from '@chakra-ui/react';
import { FaCheck, FaCheckCircle } from "react-icons/fa";

const WhatDoYouLearn = ({ desc }) => {
    return (
        <Box display='flex' flexDir='row' gap='15' marginTop='2' alignItems='center'>
            <FaCheck />
            <Text>{desc}</Text>
        </Box>
    );
}

export default WhatDoYouLearn;