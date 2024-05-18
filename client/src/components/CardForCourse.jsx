import { Box, Image, Text, Button, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const CardForCourse = ({ course }) => {
  const { title, description, price, file } = course;
  const router = useRouter();
  return (
    <Box
      height={'fit-content'}
      borderRadius='25px'
      paddingBlock='25px'
      paddingInline='15px'
      bgColor={'white'}
      display='flex'
      flexDirection='column'
      gap='15px'
      boxShadow='rgba(0, 0, 0, 0.1) 0px 0px 14px 1px'
    >
      <Box display='flex' alignItems='center' justifyContent='center'>
        <Image
          src={file?.url || '../Private-School-default-image.png'}
          w='90%'
          borderRadius='25px'
        />
      </Box>
      <Box
        w='100%'
        display='flex'
        flexDirection='row'
        alignItems='center'
        gap='15px'
      >
        <Box
          w='32px'
          h='32px'
          borderRadius='50%'
          bgColor='whitesmoke'
          display={'flex'}
          alignItems='center'
          justifyContent='center'
        >
          A
        </Box>
        <Text fontWeight='500'>Abdelali Sid Ahmed</Text>
      </Box>
      <Text fontSize='32px' fontWeight='bold'>
        {title}
      </Text>
      <Text color='GrayText'>{description}</Text>
      <Box
        w='100%'
        display='flex'
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
      >
        <Button
          bgColor='#234C51'
          color='white'
          onClick={() => {
            router.push(`/course_details/${course.id}`);
          }}
        >
          Details
        </Button>
        <Text fontWeight='bold'>{price}$</Text>
      </Box>
    </Box>
    // <Box
    //     w='100%'
    //     h='100%'
    //     bgColor={'#F5F5F5'}
    //     borderRadius='10px'
    //     p={15}
    //     display='flex'
    //     flexDir={'column'}
    //     gap={3}
    // >
    //     <Box>
    //         <Text fontWeight={700} fontSize={20} color='#213E69'>Web Developoment</Text>
    //         <Text color='#898C81'>
    //             Lorem ipsum dolor sit amet consectetur, adipisicing elit.
    //             Laboriosam suscipit at nihil veritatis quo, atque nemo
    //         </Text>
    //     </Box>
    //     <Box
    //         gap={5}
    //         display='flex'
    //         flexDirection='row'
    //         alignItems='center'
    //     >
    //         <Box
    //             w={'35px'}
    //             h={'35px'}
    //             borderRadius={'50%'}
    //             bgColor={'yellowgreen'}
    //             display={'flex'}
    //             justifyContent={'center'}
    //             alignItems={'center'}
    //         >
    //             As
    //         </Box>
    //         <Box>
    //             <Text fontWeight={500}>Asabeneh Yetayeh</Text>
    //             <Text>Teacher</Text>
    //         </Box>
    //     </Box>
    // </Box>
  );
};

export default CardForCourse;
