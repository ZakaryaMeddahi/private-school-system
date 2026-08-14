/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';

function Video({ user, changeGrid }) {
  const videoRef = useRef(null);
  const [isScreenFull, setIsScreenFull] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    if (user.videoTrack) {
      console.log('****************');
      if (videoRef.current) {
        user.videoTrack.play(videoRef.current);
        console.log('---------------------create video tag---------------');
      }
      setIsSharing(true);
    }

    console.log(user);

    // if (user.audioTrack) {
    //   console.log('****************');
    //   user.audioTrack.play();
    // }

    return () => {
      if (user.videoTrack) {
        user.videoTrack.stop();
      }

      // if (user.audioTrack) {
      //   user.audioTrack.stop();
      // }
    };
  });

  return (
    <div onClick={(e) => changeGrid(e)} className="h-fit rounded-[15px] bg-gray-200">
      {isSharing ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: '100%',
            borderRadius: '15px',
          }}
          onClick={() => setIsScreenFull(!isScreenFull)}
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <img src='../../1-removebg-preview.png' className="size-57.5" />
        </div>
      )}
    </div>
  );
}
export default Video;
