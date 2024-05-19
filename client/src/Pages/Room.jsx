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
  Button,
  Img,
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
  RESET_USERS,
  UPDATE_SCREEN,
  UPDATE_SHARING,
} from '@/actions';
import reducer from '@/reducer';
import AgoraRTC from 'agora-rtc-sdk-ng';
import VideosList from '@/components/SessionComponents/VideosList';
import { useRouter } from 'next/navigation';
import io from 'socket.io-client';

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

const APP_ID = process.env.NEXT_PUBLIC_APP_ID;

const SessionPage = ({ roomId }) => {
  const {
    roomInfoRef,
    chatRef,
    messages,
    setMessages,
    courses,
    setCourses,
    selectedCourse,
    setSelectedCourse,
    teacherInfo,
    setTeacherInfo,
    members,
    setMembers,
    pinnedMessages,
    setPinnedMessages,
  } = useContext(ChatContext);

  // Streaming refs
  const clientRef = useRef();
  const localVideoRef = useRef();
  const localCameraTrackRef = useRef();
  const localScreenTrackRef = useRef();
  const localAudioTrackRef = useRef();

  const chatNamespace = useRef(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const uidRef = useRef(null);

  const [state, dispatch] = useReducer(reducer, defaultState);

  const resetUsers = () => {
    dispatch({ type: RESET_USERS });
  };

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

  // session
  const joinChannel = async (session) => {
    try {
      const { agoraChannel, agoraToken } = session;
      const client = AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' });
      clientRef.current = client;
      // TODO: use channel name and token form session object
      // TODO: use userId as UID
      await client.join(APP_ID, agoraChannel, agoraToken, uidRef.current);
      const localVideoTrack = await AgoraRTC.createCameraVideoTrack({});
      const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      localCameraTrackRef.current = localVideoTrack;
      localAudioTrackRef.current = localAudioTrack;
      localVideoTrack.play(localVideoRef.current);
      // mute mic and camera by default
      localAudioTrack.setMuted(true);
      // localVideoTrack.setMuted(true);
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
        user.audioTrack?.play();
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
      console.log('user with id: ', user.uid, ' left');
      removeUser(user.uid);
    });
  };

  const startSession = () => {
    chatNamespace.current.emit('start-session', { roomId });
    chatNamespace.current.once('session-started', (data) => {
      const { session } = data;
      joinChannel(session);
      listen();
      setSessionStarted(true);
    });
  };

  const joinSession = () => {
    chatNamespace.current.emit('join-session', { roomId });
    chatNamespace.current.once('joined-session', (data) => {
      const {
        data: { session },
      } = data;
      console.log(data);
      console.log(session);
      joinChannel(session);
      listen();
      setSessionStarted(true);
      console.log('session joined');
    });
  };

  useEffect(() => {
    // chat
    const token = localStorage.getItem('token');
    uidRef.current = localStorage.getItem('userId');

    // ! I need course id and room id
    // ? I can get course id from selectedCourse
    // ? I can get room id from params
    const fetchMessages = async (courseId, roomId) => {
      try {
        setMessages([]);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/${courseId}/rooms/${roomId}/messages`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (!response.ok) {
          response.status === 401 && router.push('/login');
          const data = await response.json();
          console.log(data);
          throw new Error(data.message);
        }

        const { data } = await response.json();

        console.log('messages', data);

        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };

    chatNamespace.current = io(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms`, {
      query: { token: `Bearer ${token}` },
      transports: ['websocket'],
    });

    chatNamespace.current.on('connect', () => {
      console.log('Connected to socket');

      chatNamespace.current.emit('join-room', { roomId });

      chatNamespace.current.on('user-joined', (data) => {
        console.log('====================================');
        console.log('Joined Room : ', data);
        console.log('====================================');
      });

      chatNamespace.current.on('message', (data) => {
        console.log('====================================');
        console.log('FROM Chat : ', data);
        console.log('====================================');
        const message = data.message;
        setMessages((prev) => [...prev, message]);
        setIsLoading(false);
      });

      chatNamespace.current.on('message-updated', (data) => {
        console.log('====================================');
        console.log('FROM Chat (update message) : ', data);
        console.log('====================================');
        const message = data.message;
        setMessages((prev) => {
          const index = prev.findIndex((msg) => msg.id === message.id);
          prev[index] = message;
          console.log(message);
          return [...prev];
        });
      });

      chatNamespace.current.on('message-removed', (data) => {
        console.log('====================================');
        console.log('FROM Chat (delete message) : ', data);
        console.log('====================================');
        const messageId = data.messageId;
        setMessages((prev) => {
          return prev.filter((msg) => msg.id !== messageId);
        });
      });
    });
    // joinChannel();
    // listen();
    fetchMessages(selectedCourse.id, roomId);
    console.log(
      '========================================================================'
    );
    console.log(selectedCourse);
    console.log(
      '========================================================================'
    );
    return () => {
      clientRef.current?.leave();
      chatNamespace.current.emit('leave-room', {
        roomId,
      });
      chatNamespace.current.disconnect();
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
  // const { messages, roomInfoRef, chatRef, setMessages } =
  //   useContext(ChatContext);

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
                // onClick={() => updateScreen()}
                onClick={(e) => changeGrid(e)}
                bg='gray.200'
                // h='300px'
                borderRadius='15px'
                // boxShadow='0px 0px 15px 0px rgba(0,0,0,0.5);'
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
                {sessionStarted ? (
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{
                      // width: state.isScreenFull ? '1000px' : '100%',
                      height: state.isScreenFull ? '600px' : '100%',
                      borderRadius: '15px',
                      transform: state.isScreenSharing
                        ? 'rotateY(0deg)'
                        : 'rotateY(180deg)',
                    }}
                    //   onClick={() => updateScreen()}
                    //   onClick={(e) => changeGrid(e)}
                    //   onClick={() => updateScreen()}
                  ></video>
                ) : (
                  <Center h='100%'>
                    <Img src='../1-removebg-preview.png' boxSize='230px' />
                  </Center>
                )}
              </GridItem>
              <VideosList
                users={state.users}
                GridItemRef={GridItemRef}
                changeGrid={changeGrid}
              />
            </Grid>
          </Box>
          <Box
            w='100%'
            display='flex'
            justifyContent='space-around'
            alignItems='center'
          >
            {/* <Box > */}
            {/* <Center h='100%' w='250px' borderRadius='10px' gap='15'>
              <MdOutlineContentPaste size='30px' cursor='pointer' />
              <Text>Slug</Text>
            </Center> */}
            {/* </Box> */}
            {localStorage.getItem('role') === 'teacher' ? (
              <Button
                colorScheme='teal'
                isDisabled={sessionStarted}
                onClick={() => startSession()}
              >
                start session
              </Button>
            ) : (
              <Button
                colorScheme='teal'
                isDisabled={sessionStarted}
                onClick={() => joinSession()}
              >
                join session
              </Button>
            )}
            <StreamingContext.Provider
              value={{
                clientRef,
                localVideoRef,
                localScreenTrackRef,
                localCameraTrackRef,
                localAudioTrackRef,
                state,
                updateSharing,
                sessionStarted,
                setSessionStarted,
                resetUsers,
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
          roomName={selectedCourse.title}
          // look i change this from msgsg to messages i use the ones i got from provider
          // messages={msgs}
          messages={messages}
          setMessages={setMessages}
          chatNamespace={chatNamespace}
          image={selectedCourse?.file?.url || '../logo.png'}
          ChangeLayout={false}
          icon={<MdClose size='25px' color='gray' />}
          ShowPopover={false}
          selectedCourse={selectedCourse}
          chatId={selectedCourse.rooms[0].id}
          isChatSession={true}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          fileUploading={false}
        />
      </Box>
    </Container>
  );
};

export default SessionPage;
