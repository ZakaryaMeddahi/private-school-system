import { Box, Text } from '@chakra-ui/react';

function ErrorMessage({ errorMessage }) {
  return (
    <Box
      visibility={errorMessage !== '' ? 'visible' : 'hidden'}
      width='100%'
      height='25px'
      backgroundColor='#ff000030'
      color='white'
      padding='0 10px'
      borderRadius='2px'
      display='flex'
      alignItems='center'
    >
      <Text fontSize='xs'>{errorMessage}</Text>
    </Box>
  );
}
export default ErrorMessage;
