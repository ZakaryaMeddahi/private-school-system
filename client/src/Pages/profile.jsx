import { Box, Heading, Text, Badge, Button } from "@chakra-ui/react";

const ProfilePage = ({FullName, UserName, Bio, Role}) => {
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
                            <Heading size='lg'>{FullName}</Heading>
                            <Text fontSize={20} >{UserName}</Text>
                            <Badge colorScheme={Role === "Student"?'blue':'red'} w={'fit-content'} paddingInline='5px' >{Role}</Badge>
                        </Box>
                    </Box>
                    <Box width='50%' display='flex' justifyContent='end' >
                        <Button colorScheme='red'>Edit Profile</Button>
                    </Box>
                </Box>
                <Box
                    marginTop={'20px'}
                    w='95%'
                >
                    <Text fontSize={20}> {Bio} </Text>
                </Box>
            </Box>
        </Box>
    );
}

export default ProfilePage;