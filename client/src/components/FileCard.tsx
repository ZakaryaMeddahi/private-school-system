import {
  Box,
  Fade,
  IconButton,
  SlideFade,
  Stack,
  Text,
} from '@chakra-ui/react';
import { CgClose } from 'react-icons/cg';

function FileCard({ file, setFile }) {
  return (
    <Fade in={file ? true : false}>
      <Stack
        w='250px'
        padding='14px 15px'
        bgColor='gray.200'
        color='blue.900'
        borderRadius='5px'
        marginBottom='15px'
        boxShadow='0 2px 4px 0 rgba(0, 0, 0, 0.1)'
        position='absolute'
        bottom={file ? '60px' : '0'}
        left='20px'
      >
        <Stack flexDir='row'>
          <Text fontSize='sm' color='blue.500'>Attachment</Text>
          <IconButton
            icon={<CgClose />}
            w='25px'
            h='25px'
            variant='ghost'
            size='sm'
            ml='auto'
            color='blue.600'
            onClick={() => setFile(null)}
          />
        </Stack>

        <Text minH='70px' bgColor='gray.300' padding='10px' borderRadius='5px'>
          {file?.name}
        </Text>
      </Stack>
    </Fade>
  );
}
export default FileCard;
