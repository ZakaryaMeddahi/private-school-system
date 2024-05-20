import Video from './Video';

function VideosList({ users, changeGrid }) {
  console.log('*****************************');
  console.log('*****************************');
  console.log('*****************************');
  console.log('USERS');
  console.log(users.length);
  console.log(users);
  return (
    <>
      {users.map((user) => (
        <Video key={user.uid} user={user} changeGrid={changeGrid} />
      ))}
    </>
  );
}
export default VideosList;
