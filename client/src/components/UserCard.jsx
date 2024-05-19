import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import { MdDelete } from "react-icons/md";

function UserCard({ user, getUser, deleteUser, openTab }) {

  const {
    isOpen: isDeleteAlertOpen,
    onOpen: onDeleteAlertOpen,
    onClose: onDeleteAlertClose,
  } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onDeleteAlertClose}
        isOpen={isDeleteAlertOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete Teacher?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to remove this teacher account?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onDeleteAlertClose}>
              No
            </Button>
            <Button colorScheme='red' ml={3} onClick={() => deleteUser(user.id)}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Box
        className='teacher-card'
        width={'100%'}
        display='flex'
        flexDirection={'row'}
        justifyContent={'space-between'}
        borderBottom={'1px solid #E2E8F0'}
        _hover={{ bgColor: 'whiteSmoke' }}
        paddingBlock={'10px'}
        cursor='pointer'
        onClick={() => {
          getUser(user.id);
          openTab();
        }}
      >
        <Box display='flex' flexDirection={'row'} gap={5}>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            width={'50px'}
            height={'50px'}
            bgColor={'#E2E8F0'}
            borderRadius={'50%'}
          >
            <Text fontSize={18} fontWeight={500}>
              {user?.firstName && user?.firstName[0]}
            </Text>
          </Box>
          <Box display='flex' flexDirection='column' justifyContent='center'>
            <Text
              fontSize={18}
              fontWeight={500}
            >{`${user.firstName} ${user.lastName}`}</Text>
          </Box>
        </Box>
        <Box display='flex' flexDirection={'row'} gap={5}>
          <Box
            className='delete-teacher'
            display='flex'
            justifyContent='center'
            alignItems='center'
            width={'50px'}
            height={'50px'}
            // _hover={{ bgColor: 'white' }}
            borderRadius={'50%'}
            // onClick={() => deleteTeacher(id)}
          >
            <IconButton
              icon={<MdDelete fontSize={24} color='red' />}
              onClick={onDeleteAlertOpen}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default UserCard;
