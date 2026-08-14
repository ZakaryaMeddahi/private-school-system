import NoiseButton from './NoiseButton';
import { Box, Center } from '@chakra-ui/react';
import CameraButton from './CameraButton';
import MicButton from './MicButton';
import LeaveButton from './LeaveButton';
import ScreenButton from './ScreenButton';

function ControlPanel() {
  return (
    <Box
      display='flex'
      flexDir='row'
      alignItems='center'
      gap='15px'
      paddingInline='25px'
      paddingBlock='10px'
      bgColor='whitesmoke'
      w='fit-content'
      borderRadius='10px'
      mb='20px'
    >
      {/* <Box w='50px' height='50px' borderRadius='50px' bgColor='#E6E5E5'> */}
      <NoiseButton />
      {/* </Box> */}
      {/* <Box w='50px' height='50px' borderRadius='50px' bgColor='#E6E5E5'> */}
      <ScreenButton />
      {/* </Box> */}
      {/* <Box w='50px' height='50px' borderRadius='50px' bgColor='#E6E5E5' onClick={onVideoClick}> */}
      <CameraButton />
      {/* </Box> */}
      {/* <Box w='50px' height='50px' borderRadius='50px' bgColor='#E6E5E5' onClick={onMicClick}> */}
      <MicButton />
      {/* </Box> */}
      {/* <Box w='50px' height='50px' borderRadius='50px' bgColor='#F95252'> */}
      <LeaveButton />
      {/* </Box> */}
    </Box>
  );
}
export default ControlPanel;
