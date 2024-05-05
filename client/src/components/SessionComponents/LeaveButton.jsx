import { StreamingContext } from '@/Pages/Room';
import { Center } from '@chakra-ui/react';
import { useContext } from 'react';
import { MdOutlineCall } from 'react-icons/md';

function LeaveButton() {
  const value = useContext(StreamingContext);

  const {
    localCameraTrackRef,
    localScreenTrackRef,
    localAudioTrackRef,
    clientRef,
    sessionStarted,
    setSessionStarted,
  } = value;

  const endCall = async () => {
    localCameraTrackRef.current?.close();
    localCameraTrackRef.current = null;
    localScreenTrackRef.current?.close();
    localScreenTrackRef.current = null;
    localAudioTrackRef.current?.close();
    localAudioTrackRef.current = null;
    clientRef.current.leave();
  };

  return (
    <Center
      w='50px'
      height='50px'
      borderRadius='50px'
      bgColor='#F95252'
      cursor='pointer'
      onClick={() => {
        endCall();
        setSessionStarted(false);
      }}
    >
      <MdOutlineCall size='30px' />
    </Center>
  );
}
export default LeaveButton;
