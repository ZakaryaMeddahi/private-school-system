'use client'

import { GridItem, Grid, Container, Box, VStack, Wrap, WrapItem, Center, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { MdOutlineContentPaste, MdOutlineMicNone, MdOutlineMicOff, MdOutlineCall } from "react-icons/md";
import { CiVideoOn, CiVideoOff } from "react-icons/ci";
import { RiVoiceprintFill } from "react-icons/ri";
import { PiScreencast } from "react-icons/pi";
import { BsChat } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import RoomHeader from '@/components/room-header';
import { MdClose } from "react-icons/md";
import RoomBody from '@/components/chat-room-body';


// no

const Session = () => {
    const boxRef = useRef();
    const gridRef = useRef();
    const GridItemRef = useRef();
    const ProfileRef = useRef();
    const [count, setCount] = useState(0);
    const [micOn, setMicOn] = useState(false);
    const [videoOn, setVideoOn] = useState(false);

    const onVideoClick = () => {
        setVideoOn(!videoOn);
    }

    const onMicClick = () => {
        setMicOn(!micOn);
    }

    const onGridClick = () => {
        if(gridRef.current && boxRef.current && count === 0) {
            gridRef.current.style.gridTemplateColumns = '3fr 1fr';
            boxRef.current.style.display = 'block';
            setCount(1);
        }

        if(gridRef.current && boxRef.current && count === 1) {
            gridRef.current.style.gridTemplateColumns = '1fr';
            boxRef.current.style.display = 'none';
            setCount(0);
        }
    }

    const changeGrid = () => {
        if(GridItemRef.current && count === 0 && ProfileRef.current) {
            console.log(GridItemRef);
            ProfileRef.current.style.width = '12%';
            ProfileRef.current.style.height = '25%';
            GridItemRef.current.style.gridColumn = '1/5';
            GridItemRef.current.style.gridRow = '1/4';
            setCount(1);
        }
        
        if(GridItemRef.current && count === 1 && ProfileRef.current) {
            ProfileRef.current.style.width = '30%';
            ProfileRef.current.style.height = '45%';
            GridItemRef.current.class = 'css-1xsb7mh';
            GridItemRef.current.style.gridColumn = '1/2';
            GridItemRef.current.style.gridRow = '1/2';
            setCount(0);
        }
    }

    return(
        <Container ref={gridRef} w="100%" h="100%" maxW="100%" maxH="100%" display='grid' gridTemplateColumns='1fr' p={0} m={0}>
            <Box w='100%' h='100%'>
                <VStack align='stretch' height='100%' w='100%' gap={0}>
                    <Box h='100%'>
                        <Grid templateColumns="repeat(4, 1fr)" templateRows='repeat(3, 1fr)' p='25px' height='100%' gap={4}>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="#2F2E2E" h='100%' borderRadius='15px'>
                                <Center h='100%' w='100%'>
                                    <Box ref={ProfileRef} height='45%' w='30%' borderRadius='50%' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="#2F2E2E" h='100%' borderRadius='15px' className='hello'>
                                <Center h='100%' w='100%'>
                                    <Box ref={ProfileRef} height='45%' w='30%' borderRadius='50%' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="#2F2E2E" h='100%' borderRadius='15px'>
                                <Center h='100%' w='100%'>
                                    <Box ref={ProfileRef} height='45%' w='30%' borderRadius='50%' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="#2F2E2E" h='100%' borderRadius='15px'>
                                <Center h='100%' w='100%'>
                                    <Box ref={ProfileRef} height='45%' w='30%' borderRadius='50%' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="#2F2E2E" h='100%' borderRadius='15px'>
                                <Center h='100%' w='100%'>
                                    <Box ref={ProfileRef} height='45%' w='30%' borderRadius='50%' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="#2F2E2E" h='100%' borderRadius='15px'>
                                <Center h='100%' w='100%'>
                                    <Box ref={ProfileRef} height='45%' w='30%' borderRadius='50%' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="#2F2E2E" h='100%' borderRadius='15px'>
                                <Center h='100%' w='100%'>
                                    <Box ref={ProfileRef} height='45%' w='30%' borderRadius='50%' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="#2F2E2E" h='100%' borderRadius='15px'>
                                <Center h='100%' w='100%'>
                                    <Box ref={ProfileRef} height='45%' w='30%' borderRadius='50%' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="#2F2E2E" h='100%' borderRadius='15px'>
                                <Center h='100%' w='100%'>
                                    <Box ref={ProfileRef} height='45%' w='30%' borderRadius='50%' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="#2F2E2E" h='100%' borderRadius='15px'>
                                <Center h='100%' w='100%'>
                                    <Box ref={ProfileRef} height='45%' w='30%' borderRadius='50%' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="#2F2E2E" h='100%' borderRadius='15px'>
                                <Center h='100%' w='100%'>
                                    <Box ref={ProfileRef} height='45%' w='30%' borderRadius='50%' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="#2F2E2E" h='100%' borderRadius='15px'>
                                <Center h='100%' w='100%'>
                                    <Box ref={ProfileRef} height='45%' w='30%' borderRadius='50%' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                        </Grid>
                    </Box>
                    <Box w='100%' display='flex' justifyContent='space-around'>
                        {/* <Box > */}
                            <Center h='100%' w='250px' borderRadius='10px' gap='15'>
                                <MdOutlineContentPaste size='30px'/>
                                <Text>Ulaklaflahfw</Text>
                            </Center>
                        {/* </Box> */}
                        <Box display='flex' flexDir='row' alignItems='center' gap='15px' paddingInline='25px' paddingBlock='10px' bgColor='whitesmoke' h='100px' w='fit-content' borderRadius='10px'>
                            {/* <Box w='50px' height='50px' borderRadius='50px' bgColor='#E6E5E5'> */}
                                <Center w='50px' height='50px' borderRadius='50px' bgColor='#E6E5E5'>
                                    <RiVoiceprintFill size='30px'/>
                                </Center>
                            {/* </Box> */}
                            {/* <Box w='50px' height='50px' borderRadius='50px' bgColor='#E6E5E5'> */}
                                <Center w='50px' height='50px' borderRadius='50px' bgColor='#E6E5E5'>
                                    <PiScreencast size='30px'/>
                                </Center>
                            {/* </Box> */}
                            {/* <Box w='50px' height='50px' borderRadius='50px' bgColor='#E6E5E5' onClick={onVideoClick}> */}
                                <Center w='50px' height='50px' borderRadius='50px' bgColor='#E6E5E5'>
                                    { videoOn ? <CiVideoOn size='30px'/> : <CiVideoOff size='30px'/> }
                                </Center>
                            {/* </Box> */}
                            {/* <Box w='50px' height='50px' borderRadius='50px' bgColor='#E6E5E5' onClick={onMicClick}> */}
                                <Center w='50px' height='50px' borderRadius='50px' bgColor='#E6E5E5'>
                                    { micOn ? <MdOutlineMicNone size='30px'/> : <MdOutlineMicOff size='30px'/> }
                                </Center>
                            {/* </Box> */}
                            {/* <Box w='50px' height='50px' borderRadius='50px' bgColor='#F95252'> */}
                                <Center w='50px' height='50px' borderRadius='50px' bgColor='#F95252'>
                                    <MdOutlineCall size='30px'/>
                                </Center>
                            {/* </Box> */}
                        </Box>
                        <Box h='100%' w='fit-content' p='15' borderRadius='10px' display='flex' flexDir='row' gap='15' alignItems='center'>
                            <Box w='50px' height='50px' borderRadius='50px' bgColor='#E6E5E5' onClick={onGridClick}>
                                <Center h='100%'>
                                    <BsChat size='25px'/>
                                </Center>
                            </Box>
                        </Box>
                    </Box>
                </VStack>
            </Box>
            <Box ref={boxRef} display='none' bgColor='gray' w='100%' h='100%'>
                <RoomHeader roomName='Web Devolpoment' ChangeLayout={false} icon={<MdClose />} ShowPopover={false} />
                <RoomBody />
                
            </Box>
        </Container>

    );
}

export default Session;