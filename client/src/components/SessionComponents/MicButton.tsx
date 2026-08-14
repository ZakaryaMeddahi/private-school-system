import { StreamingContext } from '@/views/Room';
import { useContext, useState } from 'react';
import { MdOutlineMicNone, MdOutlineMicOff } from 'react-icons/md';

function MicButton() {
  const value = useContext(StreamingContext);
  const { localAudioTrackRef } = value;
  const [mic, setMic] = useState(false);

  const handleMicrophone = async () => {
    if (localAudioTrackRef.current?.muted) {
      console.log('on');
      setMic(true);
      await localAudioTrackRef.current?.setMuted(false);
    } else {
      console.log('off');
      setMic(false);
      await localAudioTrackRef.current?.setMuted(true);
    }
  };

  // const [micOn, setMicOn] = useState(false);

  // const onMicClick = () => {
  //   setMicOn(!micOn);
  // };

  return (
    <div
      className="flex size-12.5 cursor-pointer items-center justify-center rounded-full bg-[#E6E5E5]"
      onClick={handleMicrophone}
    >
      {mic ? <MdOutlineMicNone size='30px' /> : <MdOutlineMicOff size='30px' />}
    </div>
  );
}
export default MicButton;
