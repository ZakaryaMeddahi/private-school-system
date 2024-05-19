import { Button, Heading, Text, VStack } from '@chakra-ui/react';

const Header = ({ title }) => {
    return(
        <VStack marginBottom='3%' spacing='15' align='flex-start' width='100%'>
            <Heading size='lg' fontSize='32px'>{title}</Heading>
            <Text fontSize='18px' color='gray'>Enter your account details</Text>
            <Button 
                fontSize='15px' 
                size='lg'   
                w='100%' 
                border='none' 
                borderRadius='7' 
                bgColor='#333437' 
                color='white'
            >
                Login with Google
            </Button>
        </VStack>
    );
}

export default Header;