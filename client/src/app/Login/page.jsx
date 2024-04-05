import { Button, Checkbox, Container, Flex, Image, Stack, Text, VStack } from "@chakra-ui/react";
import Header from "@/components/Form header/Header";
import FormInput from "@/components/Form input/FormInput";

const Login = () => {
    return(
        <div style={{color: '100%', zIndex: '50', display: 'grid', height: '100%', justifyItems: 'center', alignItems: 'center'}}>
            <Flex color='white' bg='#FCC128' height='90%' w='80%' borderRadius='50px'>
                <Stack maxW='container.lg' w='650px' height='100%' bg='#1C1D21' p='25' zIndex={1} borderLeftRadius='50px'>
                    <Container w='100%' h='100%' display='flex' justifyContent='center'>
                        <VStack h='100%' w='90%' align='self-start' justifyContent='center'>
                            <Header title='Login' />
                            <FormInput type='email' placeholder='Email' />
                            <FormInput type='password' placeholder='Password' />
                            <Stack direction='row' justify='space-between' w='100%'>
                                <Checkbox colorScheme='green' size='lg'>Remember me</Checkbox>
                                <Text color='white'>Forgot password?</Text>
                            </Stack>
                            <Button size='lg' w='100%' mt='5' fontSize='16px' border='none' borderRadius='12' bgColor='#234C51' color='white'>Login</Button>
                            <Text textAlign='center' mt='5'>Don't have an account? <a href='/register'>Register</a></Text>
                        </VStack>
                    </Container>
                </Stack>
                <Container flex={1} bg='transparent' display='flex' justifyContent='center' alignItems='center'>
                 {/* <Box position='absolute' top='5%' right='5.6%'>
                        <Image src="/vector.png" alt="vector" borderRadius='50px' w='80%'/>
                    </Box>    
                    <Box position='absolute' bottom='9.4%' right='-2.25%'>
                        <Image src="/vector1.png" alt="vector1" w='70%' borderBottomEndRadius='50px'/>
                    </Box>
                    <Box position='absolute' bottom='30%' left='33%'>
                        <Image src="/vector2.png" alt="vector2" />
                    </Box>
                    <Box position='absolute' bottom='10%' right='25%'>
                        <Image src="/vector3.png" alt="vector3"/>
                    </Box>
                    <Box position='absolute' top='25%' right='8%'>
                        <Image src="/vector4.png" alt="vector4" w='80%'/>
                    </Box>    
                    <Box position='absolute' top='5%' right='19.5%'>
                        <Image src="/vector5.png" alt="vector5" w='80%'/>
                    </Box> */}
                    <Image src="/illustration.png" alt="illustration" w='100%' zIndex='1' />
                </Container>
            </Flex>
        </div>
    );
}

export default Login;