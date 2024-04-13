import { ListItem } from '@chakra-ui/react';

const Item = ({ item, color, _hover, transition, mrT }) => {
    return (
        <ListItem color={color} _hover={_hover || {}} transition={ transition || ''} marginTop={mrT || '0'}>
            {item}
        </ListItem>
    );
}

export default Item;