/* eslint-disable react/prop-types */
import { Center, GridItem, Img } from '@chakra-ui/react';
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
    <GridItem onClick={() => changeGrid()} bg='gray.200' borderRadius='15px'>
      {isSharing ? (
        <video
          // className="video remote-video"
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: isScreenFull ? '1000px' : '100%',
            height: isScreenFull ? '600px' : '100%',
            borderRadius: '15px',
          }}
          onClick={() => setIsScreenFull(!isScreenFull)}
        />
      ) : (
        <Center h='100%'>
          <Img src='../../1-removebg-preview.png' boxSize='230px' />
        </Center>
      )}
    </GridItem>
  );
}
export default Video;
