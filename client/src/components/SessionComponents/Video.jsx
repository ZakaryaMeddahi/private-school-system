/* eslint-disable react/prop-types */
import { GridItem } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

function Video({ user }) {
  const videoRef = useRef(null);
  const [isScreenFull, setIsScreenFull] = useState(false);

  useEffect(() => {
    if (user.videoTrack) {
      console.log('****************');
      user.videoTrack.play(videoRef.current);
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
    <GridItem>
      <video
        // className="video remote-video"
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: isScreenFull ? '1000px' : '100%',
          height: isScreenFull ? '600px' : '100%',
        }}
        onClick={() => setIsScreenFull(!isScreenFull)}
      />
    </GridItem>
  );
}
export default Video;
