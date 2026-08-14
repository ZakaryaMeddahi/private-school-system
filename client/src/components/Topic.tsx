import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Stack,
} from '@chakra-ui/react';
import { BsTrash } from 'react-icons/bs';

function Topic({ topic, topics, setTopics, useSoftDelete }) {
  console.log(topic);

  const handelRemoveTopic = () => {
    if(useSoftDelete) {
      setTopics(
        topics.map((t) => {
          if (t.id === topic.id) {
            t.isDeleted = true;
          }
          return t;
        })
      );
      return;
    }
    setTopics(topics.filter((t) => t.id !== topic.id));
  };

  const handelUpdateTopic = (e) => {
    setTopics(
      topics.map((t) => {
        if (t.id === topic.id) {
          t.title = e.target.value;
        }
        return t;
      })
    );
  };
  return (
    <Stack
      flexDirection='row'
      alignItems='center'
      mb='15px'
      p='10px'
      bgColor='#00000015'
      borderRadius='7px'
    >
      <Editable defaultValue={topic.title} w='100%'>
        <EditablePreview />
        <EditableInput onChange={handelUpdateTopic} />
      </Editable>
      <Button
        colorScheme='red'
        h='35px'
        p='0'
        boxShadow='0 2px 10px grey'
        onClick={handelRemoveTopic}
      >
        <BsTrash />
      </Button>
    </Stack>
  );
}
export default Topic;
