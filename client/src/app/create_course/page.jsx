'use client';

import '@fontsource/raleway/400.css';
import '@fontsource/open-sans/700.css';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ChakraProvider,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import theme from '../themes/courseTheme';
import { IoAdd, IoAddCircle, IoAddCircleSharp } from 'react-icons/io5';
import { BsTrash } from 'react-icons/bs';
import { useId, useState } from 'react';
import Topic from '@/components/Topic';
import { v4 as uuidv4 } from 'uuid';

function CreateCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [startDate, setStartDate] = useState(Date.now());
  const [deadline, setDeadline] = useState('');
  const [requirements, setRequirements] = useState('');
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [language, setLanguage] = useState('English');
  const [period, setPeriod] = useState('2 weeks');
  const [enrollmentsLimit, setEnrollmentsLimit] = useState(500);
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addTopic = () => {
    if (topic === '') {
      return;
    }

    const id = uuidv4();

    const newTopic = {
      id,
      title: topic,
    };

    setTopic('');
    setTopics([...topics, newTopic]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handle submit');
    console.log(
      title,
      description,
      price,
      startDate,
      deadline,
      requirements,
      difficulty,
      language,
      enrollmentsLimit,
      topics
    );

    setIsSubmitting(true);

    // remove ids from topics
    const newTopics = topics.map((topic) => {
      delete topic.id;
      return topic;
    });

    const token = localStorage.getItem('token');

    const formData = new FormData();

    formData.append('file', file);

    formData.append(
      'data',
      JSON.stringify({
        title,
        description,
        price,
        //startDate,
        deadline,
        requirements,
        difficulty,
        language,
        duration: Number(period.split(' ')[0]),
        durationUnit: period.split(' ')[1],
        enrollmentsLimit,
        topics: newTopics,
      })
    );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      console.log('error');
    }

    const data = await response.json();

    console.log(data);

    setIsSubmitting(false);
  };

  return (
    <ChakraProvider theme={theme}>
      <Container maxW='100%' paddingInline='15%' paddingBlock='40px'>
        <Heading
          as='h2'
          textAlign='center'
          bgGradient='linear(to-l, #ffffff, #213E69)'
          bgClip='text'
          mb='40px'
        >
          New Course
        </Heading>

        <form onSubmit={handleSubmit}>
          <FormControl>
            <Stack w='100%' flexDirection='row' justifyContent='space-between'>
              <Stack width='50%'>
                <Stack
                  flexDirection='row'
                  justifyContent='space-between'
                  style={{ marginBottom: '40px' }}
                >
                  <FormLabel fontWeight='700' color='#213E69' margin='auto 0'>
                    Title
                  </FormLabel>
                  <Input
                    placeholder='A Complete Node-JS Course'
                    w='80%'
                    onChange={(e) => setTitle(e.currentTarget.value)}
                  />
                </Stack>

                <Stack
                  flexDirection='row'
                  justifyContent='space-between'
                  style={{ marginBottom: '40px' }}
                >
                  <FormLabel
                    fontWeight='700'
                    color='#213E69'
                    margin='0'
                    mt='8px'
                  >
                    Description
                  </FormLabel>
                  <Textarea
                    placeholder='Description'
                    w='80%'
                    onChange={(e) => setDescription(e.currentTarget.value)}
                  />
                </Stack>

                <Stack
                  flexDirection='row'
                  justifyContent='space-between'
                  style={{ marginBottom: '40px' }}
                >
                  <FormLabel fontWeight='700' color='#213E69' margin='auto 0'>
                    Price
                  </FormLabel>
                  <Input
                    placeholder='Price'
                    w='80%'
                    onChange={(e) => setPrice(Number(e.currentTarget.value))}
                  />
                </Stack>

                <Text fontWeight='700' color='#213E69'>
                  Enrollments Dates
                </Text>
                <Stack flexDirection='column' style={{ marginBottom: '40px' }}>
                  {/* <Stack flexDirection='row' justifyContent='space-between'>
                    <FormLabel margin='auto 0'>Start</FormLabel>
                    <Input
                      placeholder='Start Date'
                      type='date'
                      w='200px'
                      onChange={(e) => setStartDate(e.currentTarget.value)}
                    />
                  </Stack> */}

                  <Stack flexDirection='row' justifyContent='space-between'>
                    <FormLabel margin='auto 0'>Deadline</FormLabel>
                    <Input
                      type='date'
                      w='200px'
                      onChange={(e) => setDeadline(e.currentTarget.value)}
                    />
                  </Stack>
                </Stack>

                <Stack>
                  <FormLabel fontWeight='700' color='#213E69'>
                    Requirements
                  </FormLabel>
                  <Textarea
                    placeholder='- Access to a computer with internet connection'
                    style={{ marginBottom: '40px' }}
                    onChange={(e) => setRequirements(e.currentTarget.value)}
                  />
                </Stack>

                <Box mb='40px'>
                  <Stack flexDirection='row' mb='20px'>
                    <FormLabel fontWeight='700' color='#213E69' margin='auto 0'>
                      Topics
                    </FormLabel>
                    <Input
                      placeholder='Introduction to Node-JS'
                      onChange={(e) => setTopic(e.currentTarget.value)}
                    />
                    <Button colorScheme='teal' w='150px' onClick={addTopic}>
                      Add
                    </Button>
                  </Stack>
                  <Box>
                    {topics.map((topic) => (
                      <Topic
                        key={topic.id}
                        topic={topic}
                        topics={topics}
                        setTopics={setTopics}
                        useSoftDelete={false}
                      />
                    ))}
                  </Box>
                </Box>
              </Stack>
              <Card maxW='sm' height='fit-content'>
                <CardHeader display='flex' flexDirection='column' gap='10px'>
                  <Image
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : './Private-School-default-image.png'
                    }
                    alt='course image'
                    h='200px'
                    borderRadius='8'
                  ></Image>
                  <FormLabel
                    color='#fff'
                    backgroundColor='teal'
                    width='100%'
                    padding='11px'
                    borderRadius='5px'
                    textAlign='center'
                    cursor='pointer'
                    htmlFor='course-file'
                  >
                    <Input
                      id='course-file'
                      type='file'
                      display='none'
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    Upload Image
                  </FormLabel>
                </CardHeader>

                <CardBody>
                  <Box
                    display='flex'
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                    gap='10px'
                    mb='20px'
                  >
                    <FormLabel color='#213E69' margin='auto 0'>
                      Difficulty:
                    </FormLabel>
                    <Select
                      value={difficulty}
                      w='180px'
                      onChange={(e) => setDifficulty(e.currentTarget.value)}
                    >
                      <option>easy</option>
                      <option>medium</option>
                      <option>hard</option>
                    </Select>
                  </Box>
                  <Box
                    display='flex'
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                    gap='10px'
                    mb='20px'
                  >
                    <FormLabel color='#213E69' margin='auto 0'>
                      Period:
                    </FormLabel>
                    <Select
                      value={period}
                      w='180px'
                      onChange={(e) => setPeriod(e.currentTarget.value)}
                    >
                      <option>2 weeks</option>
                      <option>3 weeks</option>
                      <option>4 weeks</option>
                      <option>2 months</option>
                      <option>3 months</option>
                      <option>4 months</option>
                      <option>5 months</option>
                      <option>6 months</option>
                    </Select>
                  </Box>
                  <Box
                    display='flex'
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                    gap='10px'
                    mb='20px'
                  >
                    <FormLabel color='#213E69' margin='auto 0'>
                      Language:
                    </FormLabel>
                    <Select
                      value={language}
                      w='180px'
                      onChange={(e) => setLanguage(e.currentTarget.value)}
                    >
                      <option>English</option>
                      <option>Arabic</option>
                      <option>French</option>
                    </Select>
                  </Box>
                  <Box
                    display='flex'
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                    gap='10px'
                    mb='20px'
                  >
                    <FormLabel color='#213E69' margin='auto 0'>
                      Enrollments Limit:
                    </FormLabel>
                    <Input
                      value={enrollmentsLimit}
                      placeholder='500'
                      w='180px'
                      onChange={(e) =>
                        setEnrollmentsLimit(e.currentTarget.value)
                      }
                    />
                  </Box>
                </CardBody>
              </Card>
            </Stack>
            <Stack flexDirection='row' justifyContent='end'>
              <Button
                isLoading={isSubmitting && true}
                type='submit'
                w='150px'
                colorScheme='teal'
              >
                Done
              </Button>
            </Stack>
          </FormControl>
        </form>
      </Container>
    </ChakraProvider>
  );
}
export default CreateCourse;
