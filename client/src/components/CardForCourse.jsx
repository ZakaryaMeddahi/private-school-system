import { Box, Text } from '@chakra-ui/react';

const CardForCourse = ({ course }) => {
    return (
        <Box 
            w='100%'
            h='100%'
            bgColor={'#F5F5F5'}
            borderRadius='10px'
            p={15}
            display='flex'
            flexDir={'column'}
            gap={3}
        >
            <Box>
                <Text fontWeight={700} fontSize={20} color='#213E69'>Web Developoment</Text>
                <Text color='#898C81'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Laboriosam suscipit at nihil veritatis quo, atque nemo
                </Text>
            </Box>
            <Box
                gap={5}
                display='flex'
                flexDirection='row'
                alignItems='center'
            >
                <Box
                    w={'35px'}
                    h={'35px'}
                    borderRadius={'50%'}
                    bgColor={'yellowgreen'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    As
                </Box>
                <Box>
                    <Text fontWeight={500}>Asabeneh Yetayeh</Text>
                    <Text>Teacher</Text>
                </Box>
            </Box>
        </Box>
    );
}

export default CardForCourse;