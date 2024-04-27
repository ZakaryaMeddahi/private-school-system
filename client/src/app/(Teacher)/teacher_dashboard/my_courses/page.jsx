'use client';

import Room from "@/components/Room/Room";
import { Box } from "@chakra-ui/react";
import { useRef } from "react";

const MyCourses = () => {

    const boxRef = useRef();

    const changeLayout = () => {
        if (boxRef.current) {
            boxRef.current.style.gridColumn = '1/2';
        }
    }

    return (
        <Box
            w='100%'
            h='100%'
            paddingInline='50px'
            paddingBlock='20px'
            display='grid'
            gridTemplateColumns='1fr 0.75fr'
            gap={5}
        >
            <Box 
                display='flex'
                flexDir='column'
                overflowY={'auto'}
                gridColumn='1/3'
                ref={boxRef}
            >
                <Box onClick={changeLayout}>
                    <Room RoomName='Web Dev' hover='true' />
                </Box>
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
                <Room RoomName='Web Dev' hover='true' />
            </Box>
            <Box bgColor='red' ></Box>
        </Box>
    );
}

export default MyCourses;