import { 
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    Image,
    Text,
    Divider
} from '@chakra-ui/react';

const CourseCard = () => {
    return (
        <Card maxW='md'>
            <CardHeader>
                <Image src='https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='course image' borderRadius='8' />
            </CardHeader>
            
            <CardBody>
                <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'> 
                    <Box display='flex' flexDirection='row' alignItems='center' gap='5px'>
                        <Avatar size='sm' />
                        <Text>Author</Text>
                    </Box>
                    <Box>
                        <Text color='#FCC128'>Web Dev</Text>
                    </Box>
                </Box>
                <Box>
                    <Heading size='md' color='#213E69' >Web Development</Heading>
                    <Text color='#213E69'>This page will introduce you to the fundamental concepts of routing </Text>
                </Box>
            </CardBody>

            <CardFooter justifyContent='end'>
                <Button bgColor='#234C51' color='white' w='180px' textAlign='center'>Enroll</Button>
            </CardFooter>
        </Card>
    );
}

export default CourseCard;