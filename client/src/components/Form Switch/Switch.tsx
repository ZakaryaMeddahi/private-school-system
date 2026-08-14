import { Button, Stack, Text } from '@chakra-ui/react';

const FormSwitch = ({ text, linkText, link }) => {
    return (
        <Stack direction='row' spacing={4}>
            <Text fontSize='sm'>{text}</Text>
            <Button fontSize='sm'>{linkText}</Button>
        </Stack>
    );
}

export default FormSwitch;