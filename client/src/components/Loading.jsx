import { Center, Image, ScaleFade, keyframes } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function Loading() {
  const router = useRouter();
  const scale = keyframes`
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  `;
  useEffect(() => {
    const id = setTimeout(() => {
      router.replace('/login');
    }, 2000);

    return () => clearTimeout(id);
  }, []);
  return (
    <Center height='90vh'>
      <Image src='./logo.png' boxSize='14rem' animation={`${scale} 2s infinite`} />
    </Center>
  );
}
export default Loading;
