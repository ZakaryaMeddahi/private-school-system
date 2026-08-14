'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import Topic from '@/components/Topic';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

function UpdateCourse({ params }: { params: Promise<{ courseId: string }> }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [startDate, setStartDate] = useState(Date.now());
  const [deadline, setDeadline] = useState('');
  const [requirements, setRequirements] = useState('');
  const [topics, setTopics] = useState<any[]>([]);
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [language, setLanguage] = useState('English');
  const [period, setPeriod] = useState('2 weeks');
  const [enrollmentsLimit, setEnrollmentsLimit] = useState(500);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courseId, setCourseId] = useState('');
  const router = useRouter()

  useEffect(() => {
    params.then((p) => setCourseId(p.courseId));
  }, [params]);

  const addTopic = () => {
    if (topic === '') {
      return;
    }

    const id = uuidv4();

    const newTopic = {
      id,
      title: topic,
      isDeleted: false,
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
      // if topic is newly created
      if(isNaN(topic.id)) {
        delete topic.id;
      }
      return topic;
    });

    const token = localStorage.getItem('token');

    const formData = new FormData();

    formData.append('file', file as File);

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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/${courseId}`,
      {
        method: 'PATCH',
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

    router.push('/teacher_dashboard/my_courses')

    setIsSubmitting(false);
  };

  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = async () => {
      const token = localStorage.getItem('token');

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/${courseId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log('error');
      }

      const { data } = await response.json();

      console.log(data);

      setTitle(data.title);
      setDescription(data.description);
      setPrice(data.price);
      setDeadline(data.deadline);
      setRequirements(data.requirements);
      setDifficulty(data.difficulty);
      setLanguage(data.language);
      setPeriod(`${data.duration} ${data.durationUnit}`);
      setEnrollmentsLimit(data.enrollmentsLimit);
      setTopics(data.topics);
      setImageUrl(data.file?.url || '../../Private-School-default-image.png');
    };

    fetchCourse();
  }, [courseId]);

  return (
    <div className="max-w-full py-10 px-[15%]">
      <h2 className="mb-10 bg-linear-to-l from-white to-[#213E69] bg-clip-text text-center text-2xl font-semibold text-transparent">
        Modify Course
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex w-full flex-row justify-between">
          <div className="flex w-1/2 flex-col">
            <div className="mb-10 flex flex-row justify-between">
              <Label className="my-auto font-bold text-[#213E69]">
                Title
              </Label>
              <Input
                value={title}
                placeholder='A Complete Node-JS Course'
                className="w-4/5"
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
            </div>

            <div className="mb-10 flex flex-row justify-between">
              <Label className="mt-2 font-bold text-[#213E69]">
                Description
              </Label>
              <Textarea
                value={description}
                placeholder='Description'
                className="w-4/5"
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </div>

            <div className="mb-10 flex flex-row justify-between">
              <Label className="my-auto font-bold text-[#213E69]">
                Price
              </Label>
              <Input
                value={price}
                placeholder='Price'
                className="w-4/5"
                onChange={(e) => setPrice(Number(e.currentTarget.value))}
              />
            </div>

            <span className="font-bold text-[#213E69]">
              Enrollments Dates
            </span>
            <div className="mb-10 flex flex-col">
              <div className="flex flex-row justify-between">
                <Label className="my-auto">Deadline</Label>
                <Input
                  value={deadline}
                  type='date'
                  className="w-50"
                  onChange={(e) => setDeadline(e.currentTarget.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-bold text-[#213E69]">
                Requirements
              </Label>
              <Textarea
                value={requirements}
                placeholder='- Access to a computer with internet connection'
                className="mb-10"
                onChange={(e) => setRequirements(e.currentTarget.value)}
              />
            </div>

            <div className="mb-10">
              <div className="mb-5 flex flex-row gap-2.5">
                <Label className="my-auto font-bold text-[#213E69]">
                  Topics
                </Label>
                <Input
                  placeholder='Introduction to Node-JS'
                  onChange={(e) => setTopic(e.currentTarget.value)}
                />
                <Button className="w-37.5 bg-teal-600 hover:bg-teal-700" onClick={addTopic}>
                  Add
                </Button>
              </div>
              <div>
                {topics.map((topic: any) => {
                  if (topic.isDeleted) return null;

                  return (
                    <Topic
                      key={topic.id}
                      topic={topic}
                      topics={topics}
                      setTopics={setTopics}
                      useSoftDelete={true}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="h-fit max-w-sm rounded-xl border shadow-sm">
            <div className="flex flex-col gap-2.5 p-6">
              <img
                src={file ? URL.createObjectURL(file) : imageUrl || undefined}
                alt='course image'
                className="h-50 rounded-lg"
              />
              <Label
                className="w-full cursor-pointer justify-center rounded-[5px] bg-teal-600 p-2.75 text-center text-white"
                htmlFor='course-file'
              >
                <input
                  id='course-file'
                  type='file'
                  accept='image/*'
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                Upload Image
              </Label>
            </div>

            <div className="px-6 pb-6">
              <div className="mb-5 flex flex-row items-center justify-between gap-2.5">
                <Label className="my-auto text-[#213E69]">
                  Difficulty:
                </Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger className="w-45">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">easy</SelectItem>
                    <SelectItem value="medium">medium</SelectItem>
                    <SelectItem value="hard">hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-5 flex flex-row items-center justify-between gap-2.5">
                <Label className="my-auto text-[#213E69]">
                  Period:
                </Label>
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger className="w-45">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2 weeks">2 weeks</SelectItem>
                    <SelectItem value="3 weeks">3 weeks</SelectItem>
                    <SelectItem value="4 weeks">4 weeks</SelectItem>
                    <SelectItem value="2 months">2 months</SelectItem>
                    <SelectItem value="3 months">3 months</SelectItem>
                    <SelectItem value="4 months">4 months</SelectItem>
                    <SelectItem value="5 months">5 months</SelectItem>
                    <SelectItem value="6 months">6 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-5 flex flex-row items-center justify-between gap-2.5">
                <Label className="my-auto text-[#213E69]">
                  Language:
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-45">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Arabic">Arabic</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-5 flex flex-row items-center justify-between gap-2.5">
                <Label className="my-auto text-[#213E69]">
                  Enrollments Limit:
                </Label>
                <Input
                  value={enrollmentsLimit}
                  placeholder='500'
                  className="w-45"
                  onChange={(e) =>
                    setEnrollmentsLimit(Number(e.currentTarget.value))
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end">
          <Button
            disabled={isSubmitting}
            type='submit'
            className="w-37.5 bg-teal-600 hover:bg-teal-700"
          >
            {isSubmitting ? 'Loading...' : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
}
export default UpdateCourse;
