import { ListItem } from '@chakra-ui/react';

const Item = ({ item }) => {
    return (
        <ListItem color='gray' _hover={{color: 'white'}} transition='all 0.6s ease'>
            <a href='/'>{item}</a>
        </ListItem>
    );
}

export default Item;