import { StreamingContext } from '@/Pages/Room';
import { Center } from '@chakra-ui/react';
import { AIDenoiserExtension } from 'agora-extension-ai-denoiser';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { useContext } from 'react';
import { RiVoiceprintFill } from 'react-icons/ri';

function NoiseButton() {
  const value = useContext(StreamingContext);
  const { localAudioTrackRef } = value;

  const handleNoiseSuppression = async () => {
    let denoiser = new AIDenoiserExtension({
      assetsPath: '/node_modules/agora-extension-ai-denoiser/external/',
    });

    if (!denoiser.checkCompatibility()) {
      // The extension might not be supported in the current browser. You can stop executing further code logic
      console.error('Does not support AI Denoiser!');
    }

    AgoraRTC.registerExtensions([denoiser]);
    denoiser.onloaderror = (e) => {
      console.error(e);
      processor = null;
    };
    let processor = denoiser.createProcessor();

    localAudioTrackRef.current
      .pipe(processor)
      .pipe(localAudioTrackRef.current.processorDestination);
    await processor.enable();
  };

  return (
    <Center
      w='50px'
      height='50px'
      borderRadius='50px'
      bgColor='#E6E5E5'
      cursor='pointer'
      onClick={handleNoiseSuppression}
    >
      <RiVoiceprintFill size='30px' />
    </Center>
  );
}
export default NoiseButton;
