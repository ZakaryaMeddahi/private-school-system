import {
    Box,
    Center,
    Input,
} from '@chakra-ui/react';
import { IoIosSend } from 'react-icons/io';
import { msgsContext } from '@/Pages/Chat/Chat';
import React, { useContext, useState } from 'react';


const MessageInput = () => {
    const {messages, setMessages} = useContext(msgsContext);
    const [message, setMessage] = useState('');

    const sendMsg = () => {
        setMessages([message, ...messages]);
    }

    return (
        <>
            <Input placeholder='Basic usage' w='100%'  border='none' onChange={e => setMessage(e.target.value)}/>
            <Box w='45px' height='45px' borderRadius='50px' _hover={{bgColor: 'whitesmoke'}} onClick={sendMsg}>
                <Center h='100%'>
                    <IoIosSend size='25px' color="gray" />
                </Center>
            </Box>
        </>
    );
}

export default MessageInput;