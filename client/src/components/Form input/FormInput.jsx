import { FormControl } from '@chakra-ui/react';

const FormInput = ({ type, placeholder }) => {
    return (
        <FormControl isRequired width='100%'>
            <input type={type} placeholder={placeholder} style={{width: '100%', paddingBlock: '10px', fontSize: '18px', color: 'white', border: 'none', backgroundColor: 'transparent', borderBottom: '1px solid gray'}} />
        </FormControl>
    );
}

export default FormInput;