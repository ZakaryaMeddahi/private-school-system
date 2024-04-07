'use client'

import { GridItem, Grid, Container, Box } from '@chakra-ui/react';
import { useRef } from 'react';

const Session = () => {
    const parentDiv = useRef();
    const leftdiv = useRef();
    const gridItem = useRef();
    const onclick = () => {
        
        if (gridItem.current) {
            console.log(parentDiv.current.style);
            gridItem.current.style.gridRow = "1 / 4";
            gridItem.current.style.gridColumn = "1 / 4";

        }
    }

    return (
        <Grid ref={parentDiv} width='100%' height='100%' templateColumns='3fr 1fr'>
        
            <GridItem bgColor='darkcyan' w='100%' height='100%' display='grid' gridTemplateRows='1fr auto' onClick={() => {leftdiv.current.style.display = 'block'}}>
                <Grid templateColumns='repeat(3, 1fr)' templateRows='repeat(3,1fr)' gap='15'  w='80%' h='80%'>
                    <GridItem ref={gridItem} bg='tomato' borderRadius='15px' onClick={onclick}></GridItem>
                    <GridItem bg='tomato' borderRadius='15px'></GridItem>
                    <GridItem bg='tomato' borderRadius='15px'></GridItem>
                    <GridItem bg='tomato' borderRadius='15px'></GridItem>
                    <GridItem bg='tomato' borderRadius='15px'></GridItem>
                    <GridItem bg='tomato' borderRadius='15px'></GridItem>
                    <GridItem bg='tomato' borderRadius='15px'></GridItem>
                    <GridItem bg='tomato' borderRadius='15px'></GridItem>
                    <GridItem bg='tomato' borderRadius='15px'></GridItem>
                </Grid>
                <Box bgColor='blueviolet' width='100%' height='50px'></Box>
            </GridItem>
            <GridItem ref={leftdiv} bgColor='yellowgreen' display='none' onClick={() => {leftdiv.current.style.display = 'none'}}></GridItem>

        </Grid>
    );
}

export default Session;