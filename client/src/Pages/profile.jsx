import CardForCourse from '@/components/CardForCourse';
import Media from '@/components/Socials/Media';
import { Box, Heading, Text, Badge, Button, Image } from '@chakra-ui/react';
import { FaFacebookF, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';

const ProfilePage = ({ FullName, UserName, Bio, Role, courses }) => {
  return (
    <Box
      w='100%'
      h='100%'
      paddingInline='200px'
      display='flex'
      flexDir='column'
      gap={5}
      overflowY='auto'
    >
      <Box
        h='10%'
        w='100%'
        display='flex'
        flexDir='column'
        justifyContent='center'
        alignItems={'flex-end'}
      >
        <Button bgColor='#234C51' color='white'>
          + Edit Profile
        </Button>
      </Box>
      <Box h='fit-content'>
        <Box w='100%' display='grid' gridTemplateColumns='1fr 0.5fr' gap={5}>
          <Box display='flex' flexDir='column' gap='10px'>
            <Heading size='lg' color='#213E69'>
              {FullName}
            </Heading>
            {/* <Text fontSize={16} color='#898C81' >{UserName}</Text> */}
            <Badge
              colorScheme={Role === 'student' ? 'blue' : 'red'}
              w={'fit-content'}
              paddingInline='5px'
            >
              {Role}
            </Badge>
            <Box w='100%' marginTop='10px'>
              <Text fontSize={16} w='650px' color='#898C81'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore quod repudiandae nesciunt aspernatur recusandae cumque
                autem tempora natus corrupti deserunt, consequatur eveniet
                exercitationem quisquam non, suscipit quibusdam, laboriosam
                repellendus ipsum.
              </Text>
            </Box>
            <Box display='flex' gap={3}>
              <Media
                icon={<FaFacebookF />}
                w='32px'
                h='32px'
                bgcolor='transparent'
                hover={{ backgroundColor: 'whiteSmoke' }}
              />
              <Media
                icon={<FaWhatsapp size='25px' />}
                w='32px'
                h='32px'
                bgcolor='transparent'
                hover={{ backgroundColor: 'whiteSmoke' }}
              />
              <Media
                icon={<FaLinkedinIn />}
                w='32px'
                h='32px'
                bgcolor='transparent'
                hover={{ backgroundColor: 'whiteSmoke' }}
              />
            </Box>
          </Box>
          <Box h={'300px'} display='flex' justifyContent='flex-end'>
            <Image
              src='/profile.jpeg'
              borderRadius={'15px'}
              boxShadow='rgb(148 146 146) 6px 7px 8px'
            />
          </Box>
        </Box>
      </Box>
      <Box
        marginTop='25px'
        w='100%'
        display='grid'
        gridTemplateColumns='repeat(3, 1fr)'
        gridTemplateRows='1fr'
        gap={5}
      >
        {courses.map((course) => {
          return <CardForCourse key={course.id} course={course} />;
        })}
      </Box>
    </Box>
  );
};

export default ProfilePage;
