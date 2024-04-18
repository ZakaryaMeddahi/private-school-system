import {
    Box,
    Center,
    Input,
} from '@chakra-ui/react';
import { IoIosSend } from 'react-icons/io';
import { chatContext } from '@/Pages/Chat/Chat';
import React, { useContext, useState } from 'react';


const MessageInput = () => {
    const {messages, setMessages} = useContext(chatContext);
    const [message, setMessage] = useState('');

    const sendMsg = () => {
        setMessages([message, ...messages]);
    }

    return (
        <Box paddingInline='3' w='100%' height='8%' bgColor='white' boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px' borderRadius='15px' display='grid' gridTemplateColumns='1fr auto' alignItems='center' gap='15'>
            <Input placeholder='Basic usage' w='100%'  border='none' onChange={e => setMessage(e.target.value)}/>
            <Box w='45px' height='45px' borderRadius='50px' _hover={{bgColor: 'whitesmoke'}} onClick={sendMsg}>
                <Center h='100%'>
                    <IoIosSend size='25px' color="gray" />
                </Center>
            </Box>
        </Box>
    );
}

export default MessageInput;