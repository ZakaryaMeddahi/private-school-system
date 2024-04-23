import { StreamingContext } from '@/Pages/Session';
import { Center } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { MdOutlineMicNone, MdOutlineMicOff } from 'react-icons/md';

function MicButton() {
  const value = useContext(StreamingContext);
  const { localAudioTrackRef } = value;
  const [mic, setMic] = useState(true);

  const handleMicrophone = async () => {
    if (localAudioTrackRef.current.muted) {
      console.log('on');
      setMic(true);
      await localAudioTrackRef.current.setMuted(false);
    } else {
      console.log('off');
      setMic(false);
      await localAudioTrackRef.current.setMuted(true);
    }
  };

  // const [micOn, setMicOn] = useState(false);

  // const onMicClick = () => {
  //   setMicOn(!micOn);
  // };

  return (
    <Center
      w='50px'
      height='50px'
      borderRadius='50px'
      bgColor='#E6E5E5'
      cursor='pointer'
      onClick={handleMicrophone}
    >
      {mic ? <MdOutlineMicNone size='30px' /> : <MdOutlineMicOff size='30px' />}
    </Center>
  );
}
export default MicButton;
