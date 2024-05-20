import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRef } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

function CourseCard({ course, getCourse, deleteCourse, openTab }) {
  const { id, title } = course;

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
          <AlertDialogHeader>Delete course?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to remove this course?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onDeleteAlertClose}>
              No
            </Button>
            <Button colorScheme='red' ml={3} onClick={() => deleteCourse(id)}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Box
        width={'100%'}
        display='flex'
        flexDirection={'row'}
        justifyContent={'space-between'}
        borderBottom={'1px solid #E2E8F0'}
        _hover={{ bgColor: 'whiteSmoke' }}
        paddingBlock={'10px'}
        cursor='pointer'
        onClick={() => {
          getCourse(id);
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
              {title[0]}
            </Text>
          </Box>
          <Box display='flex' flexDirection='column' justifyContent='center'>
            <Text fontSize={18} fontWeight={500}>
              {title}
            </Text>
          </Box>
        </Box>
        <Box display='flex' flexDirection={'row'} gap={5}>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            width={'50px'}
            height={'50px'}
            _hover={{ bgColor: 'white' }}
            borderRadius={'5'}
          >
            <Link href={`/update_course/${id}`}>
              <FaRegEdit fontSize={24} color='gray' />
            </Link>
          </Box>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            width={'50px'}
            height={'50px'}
            _hover={{ bgColor: 'white' }}
            borderRadius={'50%'}
            cursor='pointer'
            onClick={onDeleteAlertOpen}
          >
            <MdDelete fontSize={24} color='red' />
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default CourseCard;
