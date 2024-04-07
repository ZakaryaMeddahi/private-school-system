'use client'

import { GridItem, Grid, Container, Box, VStack, Wrap, WrapItem, Center, Text } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { MdOutlineContentPaste } from "react-icons/md";


const Session = () => {
    const boxRef = useRef();
    const gridRef = useRef();
    const GridItemRef = useRef();
    const [count, setCount] = useState(0);

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
            console.log(GridItemRef.current.style);
            GridItemRef.current.style.gridColumn = '1/4';
            GridItemRef.current.style.gridRow = '1/4';
            setCount(1);
        }

        if(GridItemRef.current && count === 1) {
            GridItemRef.current.style.gridColumn = '1/2';
            GridItemRef.current.style.gridRow = '1/2';
            setCount(0);
        }
    }

    return(
        <Container ref={gridRef} w="100%" h="100%" maxW="100%" maxH="100%" display='grid' gridTemplateColumns='1fr' p={0} m={0}>
            <Box w='100%' h='100%' onClick={onGridClick}>
                <VStack align='stretch' height='100%' w='100%'>
                    <Box h='90%'>
                        <Grid templateColumns="repeat(3, 1fr)" templateRows='repeat(3, 1fr)' p='25px' height='100%' gap={4}>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="tomato" h='100%' borderRadius='15px'></GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="tomato" h='100%' borderRadius='15px'></GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="tomato" h='100%' borderRadius='15px'></GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="tomato" h='100%' borderRadius='15px'></GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="tomato" h='100%' borderRadius='15px'></GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="tomato" h='100%' borderRadius='15px'></GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="tomato" h='100%' borderRadius='15px'></GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="tomato" h='100%' borderRadius='15px'></GridItem>
                            <GridItem ref={GridItemRef} onClick={changeGrid} bg="tomato" h='100%' borderRadius='15px'></GridItem>
                        </Grid>
                    </Box>
                    <Box h='6%' border='1px solid black' w='100%' display='flex' justifyContent='space-around'>
                        <Box bgColor='yellowgreen' h='100%' w='250px' borderRadius='10px'>
                            <Center h='100%'>
                                <MdOutlineContentPaste size='30px'/>
                                <Text>Ulaklaflahfw</Text>
                            </Center>
                        </Box>
                        <Box bgColor='yellowgreen' h='100%' w='250px' borderRadius='10px'>1</Box>
                        <Box bgColor='yellowgreen' h='100%' w='250px' borderRadius='10px'>1</Box>
                    </Box>
                </VStack>
            </Box>
            <Box ref={boxRef} display='none' bgColor='mediumpurple' w='100%' h='100%'></Box>
        </Container>

    );
}

export default Session;