import { Wrap, WrapItem, Image, Heading } from '@chakra-ui/react';

const Logo = ({ boxSize, fontSize, color, fontWeight }) => {
    return (
        <Wrap spacing={0} zIndex='1'>
            <WrapItem alignItems='center'>
                <Image boxSize={boxSize || '60px'} src='/1-removebg-preview.png' />
            </WrapItem>
            <WrapItem alignItems='center'>
                <Heading 
                    fontWeight={fontWeight || '700'} 
                    as='h1' 
                    size='lg' 
                    fontSize={ fontSize || '24px'} 
                    color={ color || "#213E69"}
                >
                    Education
                </Heading>
            </WrapItem>
        </Wrap>
    );
}

export default Logo;