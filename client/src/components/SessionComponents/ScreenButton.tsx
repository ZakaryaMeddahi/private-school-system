import { StreamingContext } from '@/views/Room';
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
      const screenTrack = await AgoraRTC.createScreenVideoTrack({}, 'disable');
      if (localCameraTrackRef.current) {
        await clientRef.current?.unpublish([localCameraTrackRef.current]);
      }
      // dispatch({ type: UPDATE_SHARING, payload: { isSharing: true } });
      updateSharing(true);
      localCameraTrackRef.current?.close();
      localCameraTrackRef.current = undefined;
      localScreenTrackRef.current = screenTrack;
      localScreenTrackRef.current?.play(localVideoRef.current!);
      await clientRef.current?.publish([screenTrack]);
      setIsSharing(true);
    } else {
      if (localScreenTrackRef.current) {
        await clientRef.current?.unpublish([localScreenTrackRef.current]);
      }
      // dispatch({ type: UPDATE_SHARING, payload: { isSharing: false } });
      updateSharing(false);
      localScreenTrackRef.current?.close();
      localScreenTrackRef.current = undefined;
      const cameraTrack = await AgoraRTC.createCameraVideoTrack({});
      localCameraTrackRef.current = cameraTrack;
      localCameraTrackRef.current?.play(localVideoRef.current!);
      await clientRef.current?.publish([cameraTrack]);
      setIsSharing(false);
    }
  };

  return (
    <div
      className="flex size-12.5 cursor-pointer items-center justify-center rounded-full bg-[#E6E5E5]"
      onClick={handleScreenSharing}
    >
      {isSharing ? <LuScreenShare size='25px' /> : <LuScreenShareOff size='25px' />}
    </div>
  );
}
export default ScreenButton;
