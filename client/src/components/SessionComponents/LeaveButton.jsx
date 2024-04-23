import { Center } from '@chakra-ui/react';
import { MdOutlineCall } from 'react-icons/md';

function LeaveButton() {
  return (
    <Center
      w='50px'
      height='50px'
      borderRadius='50px'
      bgColor='#F95252'
      cursor='pointer'
    >
      <MdOutlineCall size='30px' />
    </Center>
  );
}
export default LeaveButton;
