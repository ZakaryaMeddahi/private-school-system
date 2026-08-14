'use client';

import { Button } from '@/components/ui/button';
import {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
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
import AgoraRTC, {
  IAgoraRTCClient,
  ICameraVideoTrack,
  ILocalVideoTrack,
  IMicrophoneAudioTrack,
} from 'agora-rtc-sdk-ng';
import VideosList from '@/components/SessionComponents/VideosList';
import { useRouter } from 'next/navigation';
import io, { Socket } from 'socket.io-client';

interface StreamingState {
  users: any[];
  isScreenSharing: boolean;
  isScreenFull: boolean;
}

interface StreamingContextValue {
  clientRef: MutableRefObject<IAgoraRTCClient | undefined>;
  localVideoRef: MutableRefObject<HTMLVideoElement | null>;
  localScreenTrackRef: MutableRefObject<ILocalVideoTrack | undefined>;
  localCameraTrackRef: MutableRefObject<ICameraVideoTrack | undefined>;
  localAudioTrackRef: MutableRefObject<IMicrophoneAudioTrack | undefined>;
  state: StreamingState;
  updateSharing: (isSharing: boolean) => void;
  sessionStarted: boolean;
  setSessionStarted: Dispatch<SetStateAction<boolean>>;
  resetUsers: () => void;
}

const defaultState: StreamingState = {
  users: [],
  isScreenSharing: false,
  isScreenFull: false,
};

export const StreamingContext = createContext<StreamingContextValue>({
  clientRef: { current: undefined },
  localVideoRef: { current: null },
  localScreenTrackRef: { current: undefined },
  localCameraTrackRef: { current: undefined },
  localAudioTrackRef: { current: undefined },
  state: defaultState,
  updateSharing: () => {},
  sessionStarted: false,
  setSessionStarted: () => {},
  resetUsers: () => {},
});

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
  const clientRef = useRef<IAgoraRTCClient>();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localCameraTrackRef = useRef<ICameraVideoTrack>();
  const localScreenTrackRef = useRef<ILocalVideoTrack>();
  const localAudioTrackRef = useRef<IMicrophoneAudioTrack>();

  const chatNamespace = useRef<Socket | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const uidRef = useRef<string | null>(null);

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
      await client.join(APP_ID as string, agoraChannel, agoraToken, uidRef.current);
      const localVideoTrack = await AgoraRTC.createCameraVideoTrack({});
      const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      localCameraTrackRef.current = localVideoTrack;
      localAudioTrackRef.current = localAudioTrack;
      localVideoTrack.play(localVideoRef.current!);
      // mute mic and camera by default
      localAudioTrack.setMuted(true);
      // localVideoTrack.setMuted(true);
      await clientRef.current!.publish([localAudioTrack, localVideoTrack]);
    } catch (error) {
      console.error(error);
    }
  };

  const listen = () => {
    clientRef.current?.on('user-published', async (user, mediaType) => {
      await clientRef.current?.subscribe(user, mediaType);

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
    chatNamespace.current!.emit('start-session', { roomId });
    chatNamespace.current!.once('session-started', (data) => {
      const { session } = data;
      joinChannel(session);
      listen();
      setSessionStarted(true);
    });
  };

  const joinSession = () => {
    chatNamespace.current!.emit('join-session', { roomId });
    chatNamespace.current!.once('joined-session', (data) => {
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

      chatNamespace.current!.emit('join-room', { roomId });

      chatNamespace.current!.on('user-joined', (data) => {
        console.log('====================================');
        console.log('Joined Room : ', data);
        console.log('====================================');
      });

      chatNamespace.current!.on('message', (data) => {
        console.log('====================================');
        console.log('FROM Chat : ', data);
        console.log('====================================');
        const message = data.message;
        setMessages((prev) => [...prev, message]);
        setIsLoading(false);
      });

      chatNamespace.current!.on('message-updated', (data) => {
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

      chatNamespace.current!.on('message-removed', (data) => {
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
    fetchMessages(selectedCourse!.id, roomId);
    console.log(
      '========================================================================'
    );
    console.log(selectedCourse);
    console.log(
      '========================================================================'
    );
    return () => {
      clientRef.current?.leave();
      chatNamespace.current!.emit('leave-room', {
        roomId,
      });
      chatNamespace.current!.disconnect();
    };
  }, []);

  // *************************

  const boxRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const GridItemRef = useRef<HTMLDivElement>(null);
  const ProfileRef = useRef<HTMLDivElement>(null);
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
      console.log(e.currentTarget.style);
      e.currentTarget.style.gridArea = '';
      state.isScreenFull = false;
    } else {
      //   e.currentTarget.class = 'css-1xsb7mh';
      e.currentTarget.style.gridColumn = '1/4';
      e.currentTarget.style.gridRow = '1/4';
      state.isScreenFull = true;
    }
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
    <div ref={gridRef} className="m-0 grid h-full max-h-full w-full max-w-full grid-cols-1 p-0">
      <div className="h-full w-full">
        <div className="flex h-full w-full flex-col items-stretch gap-0">
          <div className="h-full">
            <div className="grid h-full grid-cols-4 grid-rows-3 gap-4 p-6.25">
              <div
                ref={GridItemRef}
                onClick={(e) => changeGrid(e)}
                className="h-fit rounded-[15px] bg-gray-200"
              >
                {sessionStarted ? (
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{
                      width: '100%',
                      borderRadius: '15px',
                      transform: state.isScreenSharing
                        ? 'rotateY(0deg)'
                        : 'rotateY(180deg)',
                    }}
                  ></video>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <img src='../1-removebg-preview.png' className="size-57.5" />
                  </div>
                )}
              </div>
              <VideosList
                users={state.users}
                changeGrid={changeGrid}
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-around">
            {localStorage.getItem('role') === 'teacher' ? (
              <Button
                className="bg-teal-600 hover:bg-teal-700"
                disabled={sessionStarted}
                onClick={() => startSession()}
              >
                start session
              </Button>
            ) : (
              <Button
                className="bg-teal-600 hover:bg-teal-700"
                disabled={sessionStarted}
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
            <div className="flex h-full w-fit flex-row items-center gap-3.75 rounded-[10px] p-3.75">
              <div
                className="flex size-12.5 items-center justify-center rounded-full bg-[#E6E5E5]"
                onClick={onGridClick}
              >
                <BsChat size='25px' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref={boxRef} className="hidden h-full w-full bg-white">
        <RoomChat
          roomName={selectedCourse!.title}
          messages={messages}
          setMessages={setMessages}
          chatNamespace={chatNamespace}
          image={selectedCourse?.file?.url || '../logo.png'}
          ChangeLayout={false}
          icon={<MdClose size='25px' color='gray' />}
          ShowPopover={false}
          selectedCourse={selectedCourse}
          chatId={selectedCourse!.rooms![0].id}
          isChatSession={true}
          pinnedMessages={pinnedMessages}
          setPinnedMessages={setPinnedMessages}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          fileUploading={false}
        />
      </div>
    </div>
  );
};

export default SessionPage;
