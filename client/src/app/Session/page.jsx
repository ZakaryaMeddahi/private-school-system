'use client'

import { GridItem, Grid, Container, Box, VStack, Wrap, WrapItem, Center, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { MdOutlineContentPaste, MdOutlineMicNone, MdOutlineMicOff, MdOutlineCall } from "react-icons/md";
import { CiVideoOn, CiVideoOff } from "react-icons/ci";
import { RiVoiceprintFill } from "react-icons/ri";
import { PiScreencast } from "react-icons/pi";
import { BsChat } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";


// no

const Session = () => {
    const boxRef = useRef();
    const gridRef = useRef();
    const GridItemRef = useRef();
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
        if(GridItemRef.current && count === 0) {
            GridItemRef.current.style.gridColumn = '1/5';
            GridItemRef.current.style.gridRow = '1/4';
            setCount(1);
        }
        
        if(GridItemRef.current && count === 1) {
            GridItemRef.current.class = 'css-1xsb7mh';
            GridItemRef.current.style.gridColumn = '1/2';
            GridItemRef.current.style.gridRow = '1/2';
            setCount(0);
        }
    }

    return(
        <Container ref={gridRef} w="100%" h="100%" maxW="100%" maxH="100%" display='grid' gridTemplateColumns='1fr' p={0} m={0}>
            <Box w='100%' h='100%'>
                <VStack align='stretch' height='100%' w='100%'>
                    <Box h='90%'>
                        <Grid templateColumns="repeat(4, 1fr)" templateRows='repeat(3, 1fr)' p='25px' height='100%' gap={4}>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="#2F2E2E" h='100%' borderRadius='15px'>
                                <Center h='100%' w='100%'>
                                    <Box height='120px' w='120px' borderRadius='60px' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="#2F2E2E" h='100%' borderRadius='15px'>
                                <Center h='100%' w='100%'>
                                    <Box height='120px' w='120px' borderRadius='60px' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="#2F2E2E" h='100%' borderRadius='15px'>
                                <Center h='100%' w='100%'>
                                    <Box height='120px' w='120px' borderRadius='60px' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="#2F2E2E" h='100%' borderRadius='15px'>
                                <Center h='100%' w='100%'>
                                    <Box height='120px' w='120px' borderRadius='60px' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="#2F2E2E" h='100%' borderRadius='15px'>
                                <Center h='100%' w='100%'>
                                    <Box height='120px' w='120px' borderRadius='60px' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="#2F2E2E" h='100%' borderRadius='15px'>
                                <Center h='100%' w='100%'>
                                    <Box height='120px' w='120px' borderRadius='60px' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="#2F2E2E" h='100%' borderRadius='15px'>
                                <Center h='100%' w='100%'>
                                    <Box height='120px' w='120px' borderRadius='60px' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="#2F2E2E" h='100%' borderRadius='15px'>
                                <Center h='100%' w='100%'>
                                    <Box height='120px' w='120px' borderRadius='60px' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="#2F2E2E" h='100%' borderRadius='15px'>
                                <Center h='100%' w='100%'>
                                    <Box height='120px' w='120px' borderRadius='60px' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                            <GridItem bg="#2F2E2E" h='100%' borderRadius='15px'>
                                <Center h='100%' w='100%'>
                                    <Box height='120px' w='120px' borderRadius='60px' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                            <GridItem bg="#2F2E2E" h='100%' borderRadius='15px'>
                                <Center h='100%' w='100%'>
                                    <Box height='120px' w='120px' borderRadius='60px' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                            <GridItem bg="#2F2E2E" h='100%' borderRadius='15px'>
                                <Center h='100%' w='100%'>
                                    <Box height='120px' w='120px' borderRadius='60px' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                            <GridItem bg="#2F2E2E" h='100%' borderRadius='15px'>
                                <Center h='100%' w='100%'>
                                    <Box height='120px' w='120px' borderRadius='60px' bgColor='#D9D9D9'></Box>
                                </Center>
                            </GridItem>
                        </Grid>
                    </Box>
                    <Box h='6%' w='100%' display='flex' justifyContent='space-around'>
                        <Box bgColor='#D9D9D9' h='100%' w='250px' borderRadius='10px'>
                            <Center h='100%' gap='15'>
                                <MdOutlineContentPaste size='30px'/>
                                <Text>Ulaklaflahfw</Text>
                            </Center>
                        </Box>
                        <Box bgColor='#D9D9D9' display='flex' flexDir='row' alignItems='center' gap='15px' paddingInline='25px' paddingBlock='10px' h='100%' w='fit-content' borderRadius='10px'>
                            <Box w='50px' height='50px' borderRadius='50px' bgColor='#E6E5E5'>
                                <Center h='100%'>
                                    <RiVoiceprintFill size='30px'/>
                                </Center>
                            </Box>
                            <Box w='50px' height='50px' borderRadius='50px' bgColor='#E6E5E5'>
                                <Center h='100%'>
                                    <PiScreencast size='30px'/>
                                </Center>
                            </Box>
                            <Box w='50px' height='50px' borderRadius='50px' bgColor='#E6E5E5' onClick={onVideoClick}>
                                <Center h='100%'>
                                    { videoOn ? <CiVideoOn size='30px'/> : <CiVideoOff size='30px'/> }
                                </Center>
                            </Box>
                            <Box w='50px' height='50px' borderRadius='50px' bgColor='#E6E5E5' onClick={onMicClick}>
                                <Center h='100%'>
                                    { micOn ? <MdOutlineMicNone size='30px'/> : <MdOutlineMicOff size='30px'/> }
                                </Center>
                            </Box>
                            <Box w='50px' height='50px' borderRadius='50px' bgColor='#F95252'>
                                <Center h='100%'>
                                    <MdOutlineCall size='30px'/>
                                </Center>
                            </Box>
                        </Box>
                        <Box bgColor='#D9D9D9' h='100%' w='fit-content' p='15' borderRadius='10px' display='flex' flexDir='row' gap='15' alignItems='center'>
                            <Box w='50px' height='50px' borderRadius='50px' bgColor='#E6E5E5' onClick={onGridClick}>
                                <Center h='100%'>
                                    <BsChat size='25px'/>
                                </Center>
                            </Box>
                            <Box w='50px' height='50px' borderRadius='50px' bgColor='#E6E5E5' onClick={onGridClick}>
                                <Center h='100%'>
                                    <IoPersonOutline size='25px'/>
                                </Center>
                            </Box>
                        </Box>
                    </Box>
                </VStack>
            </Box>
            <Box ref={boxRef} display='none' bgColor='gray' w='100%' h='100%'></Box>
        </Container>

    );
}

export default Session;