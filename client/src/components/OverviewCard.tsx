import { Box, Heading, Text, Divider } from '@chakra-ui/react';

const OverviewCard = ({ title, value, icon, bgColor }) => {
    return(
        <Box 
            bgColor={bgColor} 
            padding='15px' 
            boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px' 
            borderRadius='15px' 
            display='flex'
            flexDirection={'column'}
            height={'100%'}
            _hover={{
                transform: 'scale(1.05)',
                transition: 'transform 0.5s'
            }}
        >
            <Heading color={"white"} fontWeight='500' marginBottom='5px' >{title}</Heading>
            <Divider borderColor='white' borderWidth='1px' opacity={2} />
            <Box
                display={'flex'}
                flexDir='row'
                gap='15px'
                justifyContent='center'
                flex={1}
                alignItems='center'
                
            >
                <Text 
                    color={"white"} 
                    fontSize='32px' 
                    fontWeight={'bold'}
                    textAlign='center' 
                >
                        {value}
                </Text>
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='flex-end'
                    flex={1}
                >
                    {icon}
                </Box>
            </Box>
        </Box>
    );
}

export default OverviewCard;