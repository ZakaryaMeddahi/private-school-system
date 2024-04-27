'use client';

import {
  GridItem,
  Grid,
  Container,
  Box,
  VStack,
  Wrap,
  WrapItem,
  Center,
  Text,
  AspectRatio,
} from '@chakra-ui/react';
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  MdOutlineContentPaste,
  MdOutlineMicNone,
  MdOutlineMicOff,
  MdOutlineCall,
} from 'react-icons/md';
import { CiVideoOn, CiVideoOff } from 'react-icons/ci';
import { RiVoiceprintFill } from 'react-icons/ri';
import { PiScreencast } from 'react-icons/pi';
import { BsChat } from 'react-icons/bs';
import { IoPersonOutline } from 'react-icons/io5';
import RoomHeader from '@/components/room-header';
import { MdClose } from 'react-icons/md';
import RoomBody from '@/components/chat-room-body';
import RoomChat from '@/components/room-chat';
import { msgs } from './Chat';
import { ChatContext } from '@/app/providers/ChatProvider';
import ControlPanel from '@/components/SessionComponents/ControlPanel';
import {
  ADD_USER,
  REMOVE_USER,
  UPDATE_SCREEN,
  UPDATE_SHARING,
} from '@/actions';
import reducer from '@/reducer';
import AgoraRTC from 'agora-rtc-sdk-ng';
import VideosList from '@/components/SessionComponents/VideosList';

// no

export const StreamingContext = createContext();

const defaultState = {
  users: [],
  isScreenSharing: false,
  isScreenFull: false,
};

const options = {
  appId: process.env.NEXT_PUBLIC_APP_ID,
  channel: 'private-school',
  token: null,
};

const SessionPage = () => {
  // Streaming refs
  const clientRef = useRef();
  const localVideoRef = useRef();
  const localCameraTrackRef = useRef();
  const localScreenTrackRef = useRef();
  const localAudioTrackRef = useRef();

  const [state, dispatch] = useReducer(reducer, defaultState);

  const addUser = (user) => {
    dispatch({ type: ADD_USER, payload: { user } });
  };

  const removeUser = (uid) => {
    dispatch({ type: REMOVE_USER, payload: { uid } });
  };

  const updateSharing = (isSharing) => {
    dispatch({
      type: UPDATE_SHARING,
      payload: { isSharing },
    });
  };

  const updateScreen = () => {
    dispatch({
      type: UPDATE_SCREEN,
      payload: { isSharing: !state.isScreenFull },
    });
  };

  useEffect(() => {
    const joinChannel = async () => {
      try {
        const client = AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' });
        clientRef.current = client;
        await client.join(options.appId, options.channel, options.token);
        const localVideoTrack = await AgoraRTC.createCameraVideoTrack({});
        const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        localCameraTrackRef.current = localVideoTrack;
        localAudioTrackRef.current = localAudioTrack;
        localVideoTrack.play(localVideoRef.current);
        await clientRef.current.publish([localAudioTrack, localVideoTrack]);
      } catch (error) {
        console.error(error);
      }
    };

    const listen = () => {
      clientRef.current?.on('user-published', async (user, mediaType) => {
        await clientRef.current.subscribe(user, mediaType);

        if (mediaType === 'video') {
          // setUsers((users) => {
          //   const prevUsers = users.filter((u) => u.uid !== user.uid);
          //   const newUsers = [...prevUsers, user];
          //   return newUsers;
          // });
          addUser(user);
        }

        if (mediaType === 'audio') {
          user.audioTrack.play();
        }
      });

      clientRef.current?.on('user-unpublished', (user) => {
        console.log(user.uid + 'has unpublished from the channel');
      });

      clientRef.current?.on('user-left', (user) => {
        console.log(user.uid + 'has left the channel');
        // setUsers((users) => {
        //   const newUsers = users.filter((u) => u.uid !== user.uid);
        //   return newUsers;
        // });
        removeUser(user.uid);
      });
    };
    joinChannel();
    listen();
    return () => {
      clientRef.current?.leave();
    };
  }, []);

  // *************************

  const boxRef = useRef();
  const gridRef = useRef();
  const GridItemRef = useRef();
  const ProfileRef = useRef();
  const [count, setCount] = useState(0);
  const [micOn, setMicOn] = useState(false);

  const onMicClick = () => {
    setMicOn(!micOn);
  };

  const onGridClick = () => {
    if (gridRef.current && boxRef.current && count === 0) {
      gridRef.current.style.gridTemplateColumns = '3fr 1fr';
      boxRef.current.style.display = 'flex';
      boxRef.current.style.flexDirection = 'column';
      boxRef.current.style.height = '100vh';
      setCount(1);
    }

    if (gridRef.current && boxRef.current && count === 1) {
      gridRef.current.style.gridTemplateColumns = '1fr';
      boxRef.current.style.display = 'none';
      setCount(0);
    }
  };

  const changeGrid = (e) => {
    if (state.isScreenFull) {
      console.log('minimize size');
      e.currentTarget.style.gridColumn = '1/2';
      e.currentTarget.style.gridRow = '1/2';
    } else {
      //   e.currentTarget.class = 'css-1xsb7mh';
      e.currentTarget.style.gridColumn = '1/5';
      e.currentTarget.style.gridRow = '1/4';
    }

    updateScreen();
    // if (GridItemRef.current && count === 0 && ProfileRef.current) {
    //   console.log(GridItemRef);
    //   ProfileRef.current.style.width = '12%';
    //   ProfileRef.current.style.height = '25%';
    //   GridItemRef.current.style.gridColumn = '1/5';
    //   GridItemRef.current.style.gridRow = '1/4';
    //   setCount(1);
    // }

    // if (GridItemRef.current && count === 1 && ProfileRef.current) {
    //   ProfileRef.current.style.width = '30%';
    //   ProfileRef.current.style.height = '45%';
    //   GridItemRef.current.class = 'css-1xsb7mh';
    //   GridItemRef.current.style.gridColumn = '1/2';
    //   GridItemRef.current.style.gridRow = '1/2';
    //   setCount(0);
    // }
  };

  // I Add this line 👇🏻
  const { messages, roomInfoRef, chatRef, setMessages } =
    useContext(ChatContext);

  return (
    <Container
      ref={gridRef}
      w='100%'
      h='100%'
      maxW='100%'
      maxH='100%'
      display='grid'
      gridTemplateColumns='1fr'
      p={0}
      m={0}
    >
      <Box w='100%' h='100%'>
        <VStack align='stretch' height='100%' w='100%' gap={0}>
          <Box h='100%'>
            <Grid
              templateColumns={[
                'repeat(1, 1fr)',
                'repeat(2, 1fr)',
                'repeat(3, 1fr)',
                'repeat(3, 1fr)',
                'repeat(4, 1fr)',
              ]}
              templateRows='repeat(3, 1fr)'
              p='25px'
              height='100%'
              gap={4}
            >
              <GridItem
                ref={GridItemRef}
                onClick={() => updateScreen()}
                // onClick={(e) => changeGrid(e)}
                bg='#2F2E2E'
                h='100%'
                borderRadius='15px'
              >
                {/* <Center
                                    h='100%'
                                    w='100%'
                                >
                                    <Box
                                        ref={ProfileRef}
                                        height='45%'
                                        w='30%'
                                        borderRadius='50%'
                                        bgColor='#D9D9D9'
                                    ></Box>
                                </Center> */}
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{
                    // width: state.isScreenFull ? '1000px' : '100%',
                    height: state.isScreenFull ? '600px' : '100%',
                    borderRadius: '15px',
                  }}
                  //   onClick={() => updateScreen()}
                  //   onClick={(e) => changeGrid(e)}
                  //   onClick={() => updateScreen()}
                ></video>
              </GridItem>
              <VideosList users={state.users} />
              {/* <GridItem
                                ref={GridItemRef}
                                onClick={changeGrid}
                                bg='#2F2E2E'
                                h='100%'
                                borderRadius='15px'
                                className='hello'
                            >
                                <Center
                                    h='100%'
                                    w='100%'
                                >
                                    <Box
                                        ref={ProfileRef}
                                        height='45%'
                                        w='30%'
                                        borderRadius='50%'
                                        bgColor='#D9D9D9'
                                    ></Box>
                                </Center>
                            </GridItem>
                            <GridItem
                                ref={GridItemRef}
                                onClick={changeGrid}
                                bg='#2F2E2E'
                                h='100%'
                                borderRadius='15px'
                            >
                                <Center
                                    h='100%'
                                    w='100%'
                                >
                                    <Box
                                        ref={ProfileRef}
                                        height='45%'
                                        w='30%'
                                        borderRadius='50%'
                                        bgColor='#D9D9D9'
                                    ></Box>
                                </Center>
                            </GridItem>
                            <GridItem
                                ref={GridItemRef}
                                onClick={changeGrid}
                                bg='#2F2E2E'
                                h='100%'
                                borderRadius='15px'
                            >
                                <Center
                                    h='100%'
                                    w='100%'
                                >
                                    <Box
                                        ref={ProfileRef}
                                        height='45%'
                                        w='30%'
                                        borderRadius='50%'
                                        bgColor='#D9D9D9'
                                    ></Box>
                                </Center>
                            </GridItem>
                            <GridItem
                                ref={GridItemRef}
                                onClick={changeGrid}
                                bg='#2F2E2E'
                                h='100%'
                                borderRadius='15px'
                            >
                                <Center
                                    h='100%'
                                    w='100%'
                                >
                                    <Box
                                        ref={ProfileRef}
                                        height='45%'
                                        w='30%'
                                        borderRadius='50%'
                                        bgColor='#D9D9D9'
                                    ></Box>
                                </Center>
                            </GridItem>
                            <GridItem
                                ref={GridItemRef}
                                onClick={changeGrid}
                                bg='#2F2E2E'
                                h='100%'
                                borderRadius='15px'
                            >
                                <Center
                                    h='100%'
                                    w='100%'
                                >
                                    <Box
                                        ref={ProfileRef}
                                        height='45%'
                                        w='30%'
                                        borderRadius='50%'
                                        bgColor='#D9D9D9'
                                    ></Box>
                                </Center>
                            </GridItem>
                            <GridItem
                                ref={GridItemRef}
                                onClick={changeGrid}
                                bg='#2F2E2E'
                                h='100%'
                                borderRadius='15px'
                            >
                                <Center
                                    h='100%'
                                    w='100%'
                                >
                                    <Box
                                        ref={ProfileRef}
                                        height='45%'
                                        w='30%'
                                        borderRadius='50%'
                                        bgColor='#D9D9D9'
                                    ></Box>
                                </Center>
                            </GridItem>
                            <GridItem
                                ref={GridItemRef}
                                onClick={changeGrid}
                                bg='#2F2E2E'
                                h='100%'
                                borderRadius='15px'
                            >
                                <Center
                                    h='100%'
                                    w='100%'
                                >
                                    <Box
                                        ref={ProfileRef}
                                        height='45%'
                                        w='30%'
                                        borderRadius='50%'
                                        bgColor='#D9D9D9'
                                    ></Box>
                                </Center>
                            </GridItem> */}
              {/* <GridItem
                                ref={GridItemRef}
                                onClick={changeGrid}
                                bg='#2F2E2E'
                                h='100%'
                                borderRadius='15px'
                            >
                                <Center
                                    h='100%'
                                    w='100%'
                                >
                                    <Box
                                        ref={ProfileRef}
                                        height='45%'
                                        w='30%'
                                        borderRadius='50%'
                                        bgColor='#D9D9D9'
                                    ></Box>
                                </Center>
                            </GridItem>
                            <GridItem
                                ref={GridItemRef}
                                onClick={changeGrid}
                                bg='#2F2E2E'
                                h='100%'
                                borderRadius='15px'
                            >
                                <Center
                                    h='100%'
                                    w='100%'
                                >
                                    <Box
                                        ref={ProfileRef}
                                        height='45%'
                                        w='30%'
                                        borderRadius='50%'
                                        bgColor='#D9D9D9'
                                    ></Box>
                                </Center>
                            </GridItem>
                            <GridItem
                                ref={GridItemRef}
                                onClick={changeGrid}
                                bg='#2F2E2E'
                                h='100%'
                                borderRadius='15px'
                            >
                                <Center
                                    h='100%'
                                    w='100%'
                                >
                                    <Box
                                        ref={ProfileRef}
                                        height='45%'
                                        w='30%'
                                        borderRadius='50%'
                                        bgColor='#D9D9D9'
                                    ></Box>
                                </Center>
                            </GridItem>
                            <GridItem
                                ref={GridItemRef}
                                onClick={changeGrid}
                                bg='#2F2E2E'
                                h='100%'
                                borderRadius='15px'
                            >
                                <Center
                                    h='100%'
                                    w='100%'
                                >
                                    <Box
                                        ref={ProfileRef}
                                        height='45%'
                                        w='30%'
                                        borderRadius='50%'
                                        bgColor='#D9D9D9'
                                    ></Box>
                                </Center>
                            </GridItem> */}
            </Grid>
          </Box>
          <Box w='100%' display='flex' justifyContent='space-around'>
            {/* <Box > */}
            <Center h='100%' w='250px' borderRadius='10px' gap='15'>
              <MdOutlineContentPaste size='30px' cursor='pointer' />
              <Text>Slug</Text>
            </Center>
            {/* </Box> */}
            <StreamingContext.Provider
              value={{
                clientRef,
                localVideoRef,
                localScreenTrackRef,
                localCameraTrackRef,
                localAudioTrackRef,
                state,
                updateSharing,
              }}
            >
              <ControlPanel />
            </StreamingContext.Provider>
            <Box
              h='100%'
              w='fit-content'
              p='15'
              borderRadius='10px'
              display='flex'
              flexDir='row'
              gap='15'
              alignItems='center'
            >
              <Box
                w='50px'
                height='50px'
                borderRadius='50px'
                bgColor='#E6E5E5'
                onClick={onGridClick}
              >
                <Center h='100%'>
                  <BsChat size='25px' />
                </Center>
              </Box>
            </Box>
          </Box>
        </VStack>
      </Box>
      <Box ref={boxRef} display='none' bgColor='white' w='100%' h='100%'>
        <RoomChat
          roomName='Room 1'
          // look i change this from msgsg to messages i use the ones i got from provider
          // messages={msgs}
          messages={messages}
          ChangeLayout={false}
          icon={<MdClose size='25px' color='gray' />}
          ShowPopover={false}
        />
      </Box>
    </Container>
  );
};

export default SessionPage;
