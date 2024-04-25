import { Box, Heading, Text, Badge, Button } from "@chakra-ui/react";

const ProfilePage = () => {
    return (
        <Box
            w='100%'
            h='100%'
            paddingBlock='50px'
            paddingInline='50px'
            >
            <Box
                w='100%'
                h='100%'
                padding={50}
            >
                <Box
                    width='100%'
                    display='flex'
                    flexDir='row'
                    gap='20'
                    alignItems='center'
                >
                    <Box
                        display='flex'
                        flexDir='row'
                        gap={5}
                        alignItems={'center'}
                    >
                        <Box
                            width='100px'
                            h={'100px'}
                            borderRadius={'50%'}
                            border='1px solid black'
                        >
                            {/* imgae profile */}
                        </Box>
                        <Box display='flex' flexDir='column'>
                            <Heading size='lg'>Abdelali Sid Ahmed</Heading>
                            <Text fontSize={20} >SidAhmed001</Text>
                            <Badge colorScheme='blue' w={'fit-content'} paddingInline='5px' >Student</Badge>
                        </Box>
                    </Box>
                    <Box width='50%' display='flex' justifyContent='end' >
                        <Button colorScheme='blue'>Edit Profile</Button>
                    </Box>
                </Box>
                <Box
                    marginTop={'20px'}
                    w='95%'
                >
                    <Text fontSize={20}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, 
                        libero sit amet volutpat hendrerit, nunc sem fermentum felis, nec tincidunt nunc mi ac nunc. 
                    </Text>
                </Box>
            </Box>
        </Box>
    );
}

export default ProfilePage;