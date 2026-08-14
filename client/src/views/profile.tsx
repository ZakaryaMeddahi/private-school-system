'use client';

import CardForCourse from '@/components/CardForCourse';
import Media from '@/components/Socials/Media';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FaFacebookF, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';

const ProfilePage = ({ userId, FullName, UserName, Bio, Role, courses }) => {
  const router = useRouter()

  return (
    <div className="flex h-full w-full flex-col gap-5 overflow-y-auto px-50">
      <div className="flex h-[10%] w-full flex-col items-end justify-center">
        <Button
          className="bg-[#234C51] text-white hover:bg-[#234C51]/90"
          onClick={() => {
            router.push(`/student_dashboard/profile/${userId}/edit_profile`);
          }}
        >
          + Edit Profile
        </Button>
      </div>
      <div className="h-fit">
        <div className="grid w-full grid-cols-[1fr_0.5fr] gap-5">
          <div className="flex flex-col gap-2.5">
            <h2 className="text-lg font-semibold text-[#213E69]">
              {FullName}
            </h2>
            <Badge className={`w-fit px-1.25 ${Role === 'student' ? 'bg-blue-500' : 'bg-red-500'}`}>
              {Role}
            </Badge>
            <div className="mt-2.5 w-full">
              <p className="text-base text-[#898C81]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore quod repudiandae nesciunt aspernatur recusandae cumque
                autem tempora natus corrupti deserunt, consequatur eveniet
                exercitationem quisquam non, suscipit quibusdam, laboriosam
                repellendus ipsum.
              </p>
            </div>
            <div className="flex gap-3">
              <Media
                icon={<FaFacebookF />}
                w='32px'
                h='32px'
                bgcolor='transparent'
              />
              <Media
                icon={<FaWhatsapp size='25px' />}
                w='32px'
                h='32px'
                bgcolor='transparent'
              />
              <Media
                icon={<FaLinkedinIn />}
                w='32px'
                h='32px'
                bgcolor='transparent'
              />
            </div>
          </div>
          <div className="flex h-75 justify-end">
            <img
              src='/profile.jpeg'
              className="rounded-[15px] shadow-[rgb(148,146,146)_6px_7px_8px]"
            />
          </div>
        </div>
      </div>
      <div className="mt-6.25 grid w-full grid-cols-3 grid-rows-1 gap-5">
        {courses.map((course) => {
          return (
            <CardForCourse
              key={course.id}
              teacher={course.teacher}
              Course={course}
              Role='student'
              Enroll={true}
            />
          );
        }
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
