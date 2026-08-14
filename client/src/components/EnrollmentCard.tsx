import { Button } from '@/components/ui/button';
import { FaCheck } from 'react-icons/fa6';
import { IoCloseSharp } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

function EnrollmentCard({ enrollment, enrollments, setEnrollments }) {
  const router = useRouter();

  const updateEnrollment = async (status) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/enrollments/${enrollment.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            enrollmentStatus: status,
          }),
        }
      );

      if (!response.ok) {
        response.status === 401 && router.push('/login');
        const data = await response.json();
        throw new Error(data.message);
      }

      const { data } = await response.json();

      console.log(data);

      setEnrollments(
        enrollments.filter((e) => {
          return e.id !== enrollment.id;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-fit flex-col gap-2.5 rounded-[5px] bg-white px-6.25 py-2.5 shadow-[rgba(0,0,0,0.24)_0px_3px_8px]">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2.5">
          <div className="flex size-11.25 items-center justify-center rounded-full border border-black">
            A
          </div>
          <div className="flex flex-col gap-1.25">
            <span className="text-lg font-medium text-[#213E69]">
              {enrollment?.student.user.firstName}{' '}
              {enrollment?.student.user.lastName}
            </span>
            <span className="text-[#848484]">
              {enrollment?.enrollmentDate.split('T')[0]}
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-2.5">
          <Button
            className="w-12.5 rounded-[15px] bg-[#234C51] hover:bg-[#234C51]/90"
            onClick={() => updateEnrollment('approved')}
          >
            <FaCheck color='white' />
          </Button>
          <Button
            variant="destructive"
            className="w-12.5 rounded-[15px]"
            onClick={() => updateEnrollment('rejected')}
          >
            <IoCloseSharp size='35px' />
          </Button>
        </div>
      </div>
      <div>
        <span className="text-xl text-[#848484]">
          <span
            style={{
              color: '#213E69',
              fontSize: '24px',
              fontWeight: '500',
            }}
          >
            Course:
          </span>{' '}
          {enrollment.course.title}{' '}
        </span>
      </div>
    </div>
  );
}
export default EnrollmentCard;
