import { StreamingContext } from '@/views/Room';
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
    <div
      className="size-12.5 cursor-pointer place-items-center rounded-full bg-[#E6E5E5]"
      style={{
        display: state.isScreenSharing ? 'none' : 'grid',
      }}
      onClick={handleCamera}
    >
      {cam ? <CiVideoOn size='30px' /> : <CiVideoOff size='30px' />}
    </div>
  );
}
export default CameraButton;
