'use client';

import { useEffect, useState } from "react";
// import Calendar from "react-calendar";
import { Badge, Box, Heading, Text } from "@chakra-ui/react";
import { GetUser } from "@/Lib/getUser";

const Overview = () => {

    const [value, onChange] = useState(new Date());
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        GetUser()
            .then(data => {
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setRole(data.role);
            })
            .catch(err => console.log(err.message));
    }, []);

    const FullName = `${firstName} ${lastName}`;

    return (
        <Box 
            paddingBlock='20px'
            paddingInline='50px' 
            h='100%'  
            display='flex' 
            flexDir='column'
            overflowY='auto'
        >
            <Box 
                h='100%' 
                display='grid'
                gridTemplateColumns='1fr 0.5fr'
                gap={5}
            >
                <Box
                    h='100%'
                    display='flex'
                    flexDir='column'
                    gap={5}
                >
                    <Box 
                        h='250px' 
                        borderRadius='25px' 
                        bgColor='white' 
                        boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'
                    >
                        <Box
                            display='flex'
                            flexDir='column'
                            padding='20px'
                            h={'100%'}
                            justifyContent={'center'}
                        >
                            <Heading fontSize='64px'>Welcome Back</Heading>
                            <Text fontSize='24px' fontWeight='500'>{FullName}</Text>
                        </Box>
                    </Box>
                    <Box 
                        flex={1} 
                        borderRadius='25px' 
                        display='grid'
                        gridTemplateColumns={'1fr 1fr'}
                        gridTemplateRows={'1fr 1fr'}
                        gap={5}
                    >
                        <Box bgColor={'white'} boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px' borderRadius='15px' ></Box>
                        <Box bgColor={'white'} boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px' borderRadius='15px' ></Box>
                        <Box bgColor={'white'} boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px' borderRadius='15px' ></Box>
                        <Box bgColor={'white'} boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px' borderRadius='15px' ></Box>
                    </Box>
                </Box>
                <Box
                    h='100%'
                    display={'flex'}
                    flexDir='column'
                    gap={5}
                >
                    <Box 
                        w={'100%'}
                        h='50%' 
                        borderRadius='25px' 
                        bgColor='white' 
                        boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px' 
                        display='flex'
                        flexDir='column'
                        alignItems={'center'}
                        justifyContent={'center'}
                        gap={10}
                    >
                        <Box w='32' h='32' border='1px solid black' borderRadius='50%'></Box>
                        <Box textAlign='center'>
                            <Heading fontSize='32px'>{FullName}</Heading>
                            <Text>SidAhmed001</Text>
                            <Badge colorScheme='blue' paddingInline={3}>{role}</Badge>
                        </Box>
                    </Box>
                    <Box 
                        h='50%' 
                        borderRadius='25px' 
                        bgColor='white' 
                        boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px' 
                    >                        

                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Overview;