import { Box, Button, Center, Checkbox, Container, Flex, FormControl, FormLabel, HStack, Heading, Image, Stack, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import Header from "@/components/Form header/Header";
import FormInput from "@/components/Form input/FormInput";
import FormSwitch from "@/components/Form Switch/Switch";

const Login = () => {
    return(
        <div style={{color: '100%', zIndex: '50', display: 'grid', height: '100%', justifyItems: 'center', alignItems: 'center'}}>
            <Flex color='white' bg='#FCC128' height='80%' w='80%' borderRadius='50px'>
                <Stack maxW='container.lg' height='100%' bg='#1C1D21' p='25' w='40%' zIndex={1} borderLeftRadius='50px'>
                    <Wrap spacing={4}>
                        <WrapItem alignItems='center'>
                            <Image boxSize='100px' src='/1-removebg-preview.png' />
                        </WrapItem>
                        <WrapItem alignItems='center'>
                            <Heading as='h1' size='lg'>Education</Heading>
                        </WrapItem>
                    </Wrap>
                    <Container w='100%' h='100%' display='flex' alignItems='center' justifyContent='center'>
                        <VStack w='100%' paddingInline='75' spacing='24px' align='self-start'>
                            <Header title='Login' />
                            <FormInput type='email' placeholder='Email' />
                            <FormInput type='password' placeholder='Password' />
                            <Stack direction='row' justify='space-between' w='100%'>
                                <Checkbox colorScheme='green' size='lg'>Remember me</Checkbox>
                                <Text color='white'>Forgot password?</Text>
                            </Stack>
                            <Button size='lg' w='100%' mt='5' fontSize='16px' paddingBlock='10' border='none' borderRadius='12' bgColor='#234C51' color='white'>Login</Button>
                            <Text textAlign='center' mt='5'>Don't have an account? <a href='/register'>Register</a></Text>
                        </VStack>
                    </Container>
                </Stack>
                <Container w='60%' bg='transparent'>
                    <Box position='absolute' top='97' right='105'>
                        <Image src="/vector.png" alt="vector" borderRadius='50px' w='80%'/>
                    </Box>    
                    <Box position='absolute' bottom='90' right='-42'>
                        <Image src="/vector1.png" alt="vector1" w='70%' borderBottomEndRadius='50px'/>
                    </Box>
                    <Box position='absolute' bottom='350' left='650'>
                        <Image src="/vector2.png" alt="vector2" />
                    </Box>
                    <Box position='absolute' bottom='100' right='440'>
                        <Image src="/vector3.png" alt="vector3"/>
                    </Box>
                    <Box position='absolute' top='240' right='152'>
                        <Image src="/vector4.png" alt="vector4" w='80%'/>
                    </Box>    
                    <Box position='absolute' top='97' right='365'>
                        <Image src="/vector5.png" alt="vector5" w='80%'/>
                    </Box>    
                    <Box zIndex={25} pos='absolute' right='250' bottom='100'>
                        <Image src="/illustration.png" alt="illustration" w='110%' />
                    </Box>
                </Container>
            </Flex>
        </div>
    );
}

export default Login;