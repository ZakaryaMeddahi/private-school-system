import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';

function CreateCourse() {
  return (
    <Container maxW='100%' p='0' m='0' scrollY= 'auto' display='flex' flexDirection='column'>
      {/* <Heading>Create Course</Heading> */}

      <Stack w='100%' flexDirection='row' justifyContent='space-between'>
        <Stack>
          <Heading as='h5'>Title</Heading>
          <Input placeholder='Title' />

          <Heading>Description</Heading>
          {/* <Heading>Description</Heading>
          <Heading>Description</Heading>
          <Heading>Description</Heading>
          <Heading>Description</Heading> */}
          <Textarea placeholder='Description' />

          <Heading>Price</Heading>
          <Input placeholder='Price' />

          <Heading>Enrollments</Heading>
          <Stack>
            <Box>
              <Text>Start Date</Text>
              <Input placeholder='Start Date' type='date' />
            </Box>

            <Box>
              <Text>End Date</Text>
              <Input placeholder='End Date' type='date' />
            </Box>
          </Stack>

          <Text>Requirements</Text>
          <Textarea placeholder='- Access to a computer with internet connection' />

          <Box>
            <Stack flexDirection='row'>
              {/* <Heading>Topics</Heading> */}
              <Input placeholder='Topic' />
              <Button>Add</Button>
            </Stack>
          </Box>
        </Stack>
        <Card maxW='md' height='fit-content'>
          <CardHeader>
            <Image
              src='https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt='course image'
              borderRadius='8'
            />
          </CardHeader>

          <CardBody>
            <Box
              display='flex'
              flexDirection='row'
              justifyContent='space-between'
              alignItems='center'
            >
              <Box
                display='flex'
                flexDirection='row'
                alignItems='center'
                gap='5px'
              >
                <Avatar size='sm' />
                <Text>Author</Text>
              </Box>
              <Box>
                <Text color='#FCC128'>Web Dev</Text>
              </Box>
            </Box>
            <Box>
              <Heading size='md' color='#213E69'>
                Web Development
              </Heading>
              <Text color='#213E69'>
                This page will introduce you to the fundamental concepts of
                routing{' '}
              </Text>
            </Box>
          </CardBody>

          <CardFooter justifyContent='end'>
            <Button
              bgColor='#234C51'
              color='white'
              w='180px'
              textAlign='center'
            >
              Enroll
            </Button>
          </CardFooter>
        </Card>
      </Stack>
      <Stack>
        <Button>Create</Button>
      </Stack>
    </Container>
  );
}
export default CreateCourse;
