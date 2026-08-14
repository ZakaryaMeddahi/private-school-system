'use client';

import Logo from '../Logo/Logo';
import {
  Container,
  Grid,
  GridItem,
  Divider,
  Flex,
  Spacer,
  Box,
  Text,
} from '@chakra-ui/react';
import FooterList from '../Footer List/footerList';
import Item from '../Item/Item';

const Footer = () => {
  return (
    <Container
      w='100%'
      h='500px'
      maxW='100%'
      paddingBlock='20px'
      paddingInline='50px'
      bgColor='#F1F2ED'
      color='#898C81'
    >
      <Grid
        maxW='100%'
        height='80%'
        templateColumns='repeat(12, 1fr)'
        gap='10'
        p='15'
        alignContent='center'
        justifyItems='center'
        alignItems='center'
      >
        <GridItem colSpan={6}>
          <Logo boxSize='120px' fontSize='32px' />
          <Text
            fontSize='16px'
            marginBlock='20px'
            marginLeft='30px'
            width='450px'
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam
            velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate
            commodo lectus, ac blandit elit tincidunt id.
          </Text>
        </GridItem>
        <GridItem colSpan={2}>
          <FooterList title='Links'>
            <Item
              key={1}
              item='Home'
              color='gray'
              _hover={{ color: '#213E69' }}
              transition='all 0.6s ease'
            />
            <Item
              key={2}
              item='About'
              color='gray'
              _hover={{ color: '#213E69' }}
              transition='all 0.6s ease'
            />
            <Item
              key={3}
              item='courses'
              color='gray'
              _hover={{ color: '#213E69' }}
              transition='all 0.6s ease'
            />
            <Item
              key={4}
              item='Contact'
              color='gray'
              _hover={{ color: '#213E69' }}
              transition='all 0.6s ease'
            />
          </FooterList>
        </GridItem>
        <GridItem colSpan={2}>
          <FooterList title='Courses'>
            <Item
              key={1}
              item='Web Development'
              color='gray'
              _hover={{ color: '#213E69' }}
              transition='all 0.6s ease'
            />
            <Item
              key={2}
              item='Mobile Development'
              color='gray'
              _hover={{ color: '#213E69' }}
              transition='all 0.6s ease'
            />
            <Item
              key={3}
              item='Data Science'
              color='gray'
              _hover={{ color: '#213E69' }}
              transition='all 0.6s ease'
            />
            <Item
              key={4}
              item='Artificial Intelligence'
              color='gray'
              _hover={{ color: '#213E69' }}
              transition='all 0.6s ease'
            />
          </FooterList>
        </GridItem>
        <GridItem colSpan={2}>
          <FooterList title='Contact'>
            <Item
              key={1}
              item='Address: 1234 Street Name, City Name, United States'
              color='gray'
              _hover={{ color: '#213E69' }}
              transition='all 0.6s ease'
            />
            <Item
              key={2}
              item='Phone: +123 456 789'
              color='gray'
              _hover={{ color: '#213E69' }}
              transition='all 0.6s ease'
            />
            <Item
              key={3}
              item='Email: ex@gmail.com'
              color='gray'
              _hover={{ color: '#213E69' }}
              transition='all 0.6s ease'
            />
          </FooterList>
        </GridItem>
      </Grid>
      <Divider marginBlock='20px' />
      <Flex maxW='100%' height='10%' paddingInline='60px'>
        <Box
          w='40%'
          height='100%'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Text fontSize='16px' color='gray' marginBlock='10px'>
            © 2024 Education. All rights reserved
          </Text>
        </Box>
        <Spacer />
        <Box w='40%' height='100%'></Box>
      </Flex>
    </Container>
  );
};

export default Footer;
