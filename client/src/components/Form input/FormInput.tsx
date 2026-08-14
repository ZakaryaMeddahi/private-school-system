import { FormControl } from '@chakra-ui/react';

const FormInput = ({ type, placeholder, onchange}) => {
    return (
        <FormControl isRequired width='100%' marginBottom='3'>
            <input
                onChange    ={onchange}
                type={type} 
                placeholder={placeholder} 
                style={{
                    width: '100%', 
                    paddingBlock: '10px', 
                    fontSize: '16px', 
                    color: 'white', 
                    border: 'none', 
                    backgroundColor: 'transparent', 
                    borderBottom: '1px solid gray'
                }} 
            />
        </FormControl>
    );
}

export default FormInput;