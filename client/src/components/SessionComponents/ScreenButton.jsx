import { StreamingContext } from '@/Pages/Room';
import { Center } from '@chakra-ui/react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { useContext, useState } from 'react';
import { LuScreenShare, LuScreenShareOff } from 'react-icons/lu';
import { PiScreencast } from 'react-icons/pi';

function ScreenButton() {
  const value = useContext(StreamingContext);
  const {
    localVideoRef,
    localCameraTrackRef,
    localScreenTrackRef,
    clientRef,
    state,
    updateSharing,
  } = value;
  const [isSharing, setIsSharing] = useState(false);

  const handleScreenSharing = async () => {
    if (!state.isScreenSharing) {
      const screenTrack = await AgoraRTC.createScreenVideoTrack();
      await clientRef.current?.unpublish([localCameraTrackRef.current]);
      // dispatch({ type: UPDATE_SHARING, payload: { isSharing: true } });
      updateSharing(true);
      localCameraTrackRef.current?.close();
      localCameraTrackRef.current = null;
      localScreenTrackRef.current = screenTrack;
      localScreenTrackRef.current?.play(localVideoRef.current);
      await clientRef.current?.publish([screenTrack]);
      setIsSharing(true);
    } else {
      await clientRef.current?.unpublish([localScreenTrackRef.current]);
      // dispatch({ type: UPDATE_SHARING, payload: { isSharing: false } });
      updateSharing(false);
      localScreenTrackRef.current?.close();
      localScreenTrackRef.current = null;
      const cameraTrack = await AgoraRTC.createCameraVideoTrack({});
      localCameraTrackRef.current = cameraTrack;
      localCameraTrackRef.current?.play(localVideoRef.current);
      await clientRef.current?.publish([cameraTrack]);
      setIsSharing(false);
    }
  };

  return (
    <Center
      w='50px'
      height='50px'
      borderRadius='50px'
      bgColor='#E6E5E5'
      cursor='pointer'
      onClick={handleScreenSharing}
    >
      {isSharing ? <LuScreenShare size='25px' /> : <LuScreenShareOff size='25px' />}
      
    </Center>
  );
}
export default ScreenButton;
