import RoomPage from '@/Pages/Room';

const Room = ({ params }) => {
  const { roomId } = params;
  console.log('room id: ', roomId);
  return <RoomPage roomId={roomId} />;
};

export default Room;
