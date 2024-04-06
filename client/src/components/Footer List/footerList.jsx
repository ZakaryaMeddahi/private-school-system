import { Heading, ListItem, UnorderedList } from '@chakra-ui/react';

const FooterList = ({ children, title }) => {
    return (
        <>
            <Heading as='h3' fontSize='24px' marginBottom='15px'>{title}</Heading>
            <UnorderedList listStyleType='none' margin='0' lineHeight='1.7'>
                {children.map((child) => child)}
            </UnorderedList>
        </>
    );
}

export default FooterList;