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
import { Button } from '@/components/ui/button';
import { useDisclosure } from '@/hooks/use-disclosure';
import { MdDelete } from 'react-icons/md';

function UserCard({ user, getUser, deleteUser, openTab }) {
  const userRole = user.role[0].toUpperCase() + user.role.slice(1);

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
            <AlertDialogTitle>Delete {userRole}?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this {user.role} account?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={() => {
                deleteUser(user.id);
                onDeleteAlertClose();
              }}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div
        className="flex w-full flex-row justify-between border-b border-[#E2E8F0] py-2.5 cursor-pointer hover:bg-[whitesmoke]"
        onClick={() => {
          getUser(user.id);
          openTab();
        }}
      >
        <div className="flex flex-row gap-5">
          <div className="flex size-12.5 items-center justify-center rounded-full bg-[#E2E8F0]">
            <span className="text-lg font-medium">
              {user?.firstName && user?.firstName[0]}
            </span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-lg font-medium">{`${user.firstName} ${user.lastName}`}</span>
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <div className="flex size-12.5 items-center justify-center rounded-full">
            <Button variant="ghost" size="icon" onClick={onDeleteAlertOpen}>
              <MdDelete fontSize={24} color='red' />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
export default UserCard;
