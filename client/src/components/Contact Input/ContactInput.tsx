import {
    FormControl,
    FormLabel,
    Input
} from '@chakra-ui/react';

const ContactInput = ({ label, type, placeholder, mT, imT }) => {
    return (
        <FormControl marginTop={mT || '0'}>
            <FormLabel color="#8D8D8D" fontSize='12px' margin={0} >{label}</FormLabel>
            <Input type={type || 'text'} placeholder={ placeholder || ''} border='none' borderBottom='1px solid #8D8D8D' borderRadius='0' p='0' fontSize='14px' marginTop={ imT || '0'}/>
        </FormControl>
    );
}

export default ContactInput;