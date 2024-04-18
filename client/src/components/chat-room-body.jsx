import {
    Box,
    Text
} from "@chakra-ui/react";

const RoomBody = ({ messages }) => {
    return (
        <Box w='100%' height='82%' paddingInline='5' bgColor='white' boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px' borderRadius='15px' overflowY='auto' display='flex' flexDir='column-reverse' >
            {messages.map((msg, index) => {
                return (
                    <Box key={index} w='fit-content' padding='15px' bgColor='whitesmoke' borderRadius='15px' marginBottom='10px'>
                        <Text>{msg}</Text>
                    </Box> 
                );
            })}
        </Box>
    );
}

export default RoomBody;