import { Wrap, WrapItem, Image, Heading } from '@chakra-ui/react';

const Logo = ({ boxSize, fontSize }) => {
    return (
        <Wrap spacing={0}>
            <WrapItem alignItems='center'>
                <Image boxSize={boxSize || '60px'} src='/1-removebg-preview.png' />
            </WrapItem>
            <WrapItem alignItems='center'>
                <Heading as='h1' size='lg' fontSize={ fontSize || '24px'} color="white">Education</Heading>
            </WrapItem>
        </Wrap>
    );
}

export default Logo;