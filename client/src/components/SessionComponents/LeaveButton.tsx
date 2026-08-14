import { StreamingContext } from '@/views/Room';
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
    resetUsers,
  } = value;

  const endCall = async () => {
    const role = localStorage.getItem('role');
    if (role === 'teacher') {
      (clientRef.current as any)?.emit('end-session');
    } else {
      (clientRef.current as any)?.emit('leave-session');
    }

    resetUsers();

    localCameraTrackRef.current?.close();
    localCameraTrackRef.current = undefined;
    localScreenTrackRef.current?.close();
    localScreenTrackRef.current = undefined;
    localAudioTrackRef.current?.close();
    localAudioTrackRef.current = undefined;
    clientRef.current?.leave();
  };

  return (
    <div
      className="flex size-12.5 cursor-pointer items-center justify-center rounded-full bg-[#F95252]"
      onClick={() => {
        endCall();
        setSessionStarted(false);
      }}
    >
      <MdOutlineCall size='30px' />
    </div>
  );
}
export default LeaveButton;
