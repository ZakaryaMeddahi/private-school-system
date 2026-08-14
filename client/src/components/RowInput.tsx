import {
    Box,
} from '@chakra-ui/react';
import ContactInput from './Contact Input/ContactInput';

const RowInput = ({ label_I1, type_I1, placeholder_I1, label_I2, type_I2, placeholder_I2 }) => {
    return (
        <Box display='flex' flexDir='row' width='100%' gap='10' marginTop='40px'>
            <ContactInput label={label_I1} type={type_I1 || 'text'} placeholder={ placeholder_I1 || ''} />
            <ContactInput label={label_I2} type={type_I2 || 'text'} placeholder={ placeholder_I2 || ''} />
        </Box>
    );
}

export default RowInput;