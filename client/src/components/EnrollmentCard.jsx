import { Box, Button, Text } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa6';
import { IoCloseSharp } from 'react-icons/io5';

function EnrollmentCard({ enrollment, enrollments, setEnrollments }) {
  const updateEnrollment = async (status) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/enrollments/${enrollment.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) {
        response.status === 401 && router.push('/login');
        const data = await response.json();
        throw new Error(data.message);
      }

      const { data } = await response.json();

      console.log(data);

      setEnrollments(
        enrollments.filter((e) => {
          return e.id !== enrollment.id;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      h={'fit-content'}
      paddingBlock='10px'
      paddingInline='25px'
      boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}
      bgColor={'white'}
      borderRadius='5px'
      display={'flex'}
      flexDir={'column'}
      gap={'10px'}
    >
      <Box
        w={'100%'}
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Box
          display={'flex'}
          flexDirection={'row'}
          gap={'10px'}
          alignItems={'center'}
        >
          <Box
            w={'45px'}
            h={'45px'}
            borderRadius={'50%'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            border={'1px solid black'}
          >
            A
          </Box>
          <Box display={'flex'} flexDirection={'column'} gap={'5px'}>
            <Text fontSize={'18px'} fontWeight='500' color={'#213E69'}>
              {enrollment?.student.user.firstName}{' '}
              {enrollment?.student.user.lastName}
            </Text>
            <Text color={'#848484'}>
              {enrollment?.enrollmentDate.split('T')[0]}
            </Text>
          </Box>
        </Box>
        <Box display={'flex'} flexDirection={'row'} gap={'10px'}>
          <Button
            bgColor='#234C51'
            w={'50px'}
            borderRadius={'15px'}
            onClick={() => updateEnrollment('approved')}
          >
            <FaCheck color='white' />
          </Button>
          <Button
            colorScheme='red'
            w={'50px'}
            borderRadius={'15px'}
            onClick={() => updateEnrollment('rejected')}
          >
            <IoCloseSharp size='35px' />
          </Button>
        </Box>
      </Box>
      <Box>
        <Text fontSize='20px' color='#848484'>
          <span
            style={{
              color: '#213E69',
              fontSize: '24px',
              fontWeight: '500',
            }}
          >
            Course:
          </span>{' '}
          {enrollment.course.title}{' '}
        </Text>
      </Box>
    </Box>
  );
}
export default EnrollmentCard;
