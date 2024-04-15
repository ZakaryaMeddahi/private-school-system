'use client';

import { Box, Flex, Avatar, Heading, Image, Divider, Text } from "@chakra-ui/react";
import { useRef } from "react";

const Room = ({ RoomName }) => {

    const boxRef = useRef();

    const RoomFocus = () => {
        if (boxRef.current) {
            console.log(boxRef.current.style);
            boxRef.current.style.backgroundColor =  'rgba(115, 191, 224, 0.25)';
            console.log("Room Focused");
        }
    }

    return (
        <Box ref={boxRef} padding='15px' color='black' borderRadius='15px' _hover={{backgroundColor: 'rgba(128, 128, 128, 0.150)'}} onClick={RoomFocus}>
            <Flex direction='row' gap='15' alignItems='center' >
            <Image
                borderRadius='full'
                boxSize='35px'
                src='https://bit.ly/dan-abramov'
                alt='Dan Abramov'
            />
                <Text size='sm'>{RoomName}</Text>
            </Flex>
        </Box>
    );
}

export default Room;