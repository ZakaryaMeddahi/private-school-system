import { Button } from '@/components/ui/button';
import EditableField from '@/components/editable-field';
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

  const handelUpdateTopic = (value: string) => {
    setTopics(
      topics.map((t) => {
        if (t.id === topic.id) {
          t.title = value;
        }
        return t;
      })
    );
  };
  return (
    <div className="mb-3.75 flex flex-row items-center rounded-[7px] bg-[#00000015] p-2.5">
      <EditableField defaultValue={topic.title} className="w-full" onChange={handelUpdateTopic} />
      <Button
        variant="destructive"
        className="h-8.75 p-0 shadow-[0_2px_10px_grey]"
        onClick={handelRemoveTopic}
      >
        <BsTrash />
      </Button>
    </div>
  );
}
export default Topic;
