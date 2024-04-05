import { Button, Heading, Text, VStack } from '@chakra-ui/react';

const Header = () => {
    return(
        <VStack marginBottom='25' spacing='15' align='flex-start' width='100%'>
            <Heading size='lg' fontSize='50px' marginBottom='25'>Login</Heading>
            <Text fontSize='18px' color='gray'>Enter your account details</Text>
            <Button fontSize='16px' size='lg' w='100%' border='none' borderRadius='12' bgColor='#333437' color='white'>
                Login with Google
            </Button>
        </VStack>
    );
}

export default Header;