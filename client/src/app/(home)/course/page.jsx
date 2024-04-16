'use client';

import CourseCard from "@/components/Course Card/CourseCard";
import { Box, Center, Container, HStack } from "@chakra-ui/react";
import { IoMdSearch } from "react-icons/io";
import { useRef } from "react";

const CoursePage = () => {
  
  const inputRef = useRef();
  
  const onFocus = () => {
    if(inputRef.current) {
        inputRef.current.style.outline = 'none';
        console.log(inputRef.current.style);
    }
  }

  return (
      <Container height='100vh' m='0' p='0' maxW='100%' overflowY='auto'>
        <Box h='250px' display='flex' alignItems='center' justifyContent='center' marginInline='36px'>
          <Center>
              <HStack w='500px' spacing='5px' bgColor='white' paddingLeft='10' p='1' borderRadius='8' border='1px solid black' boxShadow='rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'>
                <IoMdSearch color='black' size='30px' />
                <input ref={inputRef} type="search" name="" id="" style={{color: 'black', paddingLeft: '10px', paddingBlock: '5px', width: '100%', backgroundColor: 'transparent'}} onFocus={onFocus} />
              </HStack>
          </Center>
        </Box>
        <Box display='grid' gridTemplateColumns='1fr 1fr 1fr' w='100%' justifyItems='center' rowGap='5'>
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </Box>
      </Container>
    );
}

export default CoursePage;