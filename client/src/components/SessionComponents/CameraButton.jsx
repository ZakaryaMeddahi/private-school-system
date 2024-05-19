import { StreamingContext } from '@/Pages/Room';
import { Center } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { CiVideoOff, CiVideoOn } from 'react-icons/ci';
import { TbRuler } from 'react-icons/tb';

function CameraButton() {
  // console.log(StreamingContext);
  const value = useContext(StreamingContext);
  const {
    localCameraTrackRef,
    state,
    clientRef,
    sessionStarted,
    setSessionStarted,
  } = value;
  const [cam, setCam] = useState(false);

  const handleCamera = () => {
    if (localCameraTrackRef.current?.muted) {
      setCam(true);
      localCameraTrackRef.current?.setMuted(false);
      // setSessionStarted(true)
    } else {
      setCam(false);
      localCameraTrackRef.current?.setMuted(true);
      // setSessionStarted(false)
    }
  };

  return (
    <Center
      w='50px'
      height='50px'
      borderRadius='50px'
      bgColor='#E6E5E5'
      cursor='pointer'
      style={{
        display: state.isScreenSharing ? 'none' : 'grid',
      }}
      onClick={handleCamera}
    >
      {cam ? <CiVideoOn size='30px' /> : <CiVideoOff size='30px' />}
    </Center>
  );
}
export default CameraButton;
