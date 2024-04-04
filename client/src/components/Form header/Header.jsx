import { Button, Heading, Text, Box, Divider, AbsoluteCenter } from '@chakra-ui/react';

const Header = () => {
    return(
        <>
            <Heading size='lg' fontSize='50px'>Login</Heading>
            <Text fontSize='2xl'>Enter your account details</Text>
            <Button fontSize='16px' size='lg' w='100%' paddingBlock='10' border='none' borderRadius='12' bgColor='#333437' color='white'>
                Login with Google
            </Button>
            <Divider />
        </>
    );
}

export default Header;