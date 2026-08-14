import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { useDisclosure } from '@/hooks/use-disclosure';
import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

function CourseCard({ course, getCourse, deleteCourse, openTab }) {
  const { id, title } = course;

  const {
    isOpen: isDeleteAlertOpen,
    onOpen: onDeleteAlertOpen,
    onClose: onDeleteAlertClose,
  } = useDisclosure();

  return (
    <>
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={(open) => !open && onDeleteAlertClose()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete course?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this course?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={() => deleteCourse(id)}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div
        className="flex w-full flex-row justify-between border-b border-[#E2E8F0] py-2.5 cursor-pointer hover:bg-[whitesmoke]"
        onClick={() => {
          getCourse(id);
          openTab();
        }}
      >
        <div className="flex flex-row gap-5">
          <div className="flex size-12.5 items-center justify-center rounded-full bg-[#E2E8F0]">
            <span className="text-lg font-medium">
              {title[0]}
            </span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-lg font-medium">
              {title}
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <div className="flex size-12.5 items-center justify-center rounded-[5px] hover:bg-white">
            <Link href={`/update_course/${id}`}>
              <FaRegEdit fontSize={24} color='gray' />
            </Link>
          </div>
          <div
            className="flex size-12.5 cursor-pointer items-center justify-center rounded-full hover:bg-white"
            onClick={onDeleteAlertOpen}
          >
            <MdDelete fontSize={24} color='red' />
          </div>
        </div>
      </div>
    </>
  );
}
export default CourseCard;
