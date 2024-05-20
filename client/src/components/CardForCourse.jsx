import { Box, Image, Text, Button, Heading } from '@chakra-ui/react';
import Link from 'next/link';

const Student = ({price, Enroll}) => {
    return (
        <Box
            w='100%'
            display='flex'
            flexDirection='row'
            alignItems='center'
            justifyContent={Enroll? 'flex-end':'space-between'}
        >
            {Enroll?
                <Button bgColor='#234C51' color='white'>Join Room</Button>
                :
                <>
                    <Button bgColor='#234C51' color='white'>Enroll</Button>
                    <Text fontWeight='bold' color={'#FCC128'}>{price == 0? "free": `${price} DZ`}</Text>
                </>
            }
        </Box>
    );
}

const Teacher = () => {
    return (
        <Box
            w='100%'
            display='flex'
            flexDirection='row'
            alignItems='center'
            justifyContent={'space-between'}
        >
            <Button colorScheme={'red'} color='white'>Delete Course</Button>
            <Button bgColor='#234C51' color='white'>View Course Detials</Button>
        </Box>
    );
}

const CardForCourse = ({ w, teacher, Course, Role, Enroll }) => {

    console.log(Course);

    return (
        <Link href='/course_details'>
            <Box
                w={ w || 'fit-content'}
                height={'fit-content'}
                borderRadius='25px'
                paddingBlock='25px'
                paddingInline='15px'
                bgColor={'white'}
                display='flex'
                flexDirection='column'
                gap='15px'
                boxShadow='rgba(0, 0, 0, 0.1) 0px 0px 14px 1px'
                _hover={{
                    transform: 'scale(1.05)',
                    transition: 'transform 0.5s'
                }}
            >
                <Box display='flex' alignItems='center' justifyContent='center'>
                    {/*<Image
                        src={Course?.file?.url1 || '../Private-School-default-image.png'}
                        h={'300px'}
                        borderRadius='25px'
                    /> */}
                </Box>
                <Box
                    w='100%'
                    display='flex'
                    flexDirection='row'
                    alignItems='center'
                    gap='15px'
                >
                    <Box
                        w='32px'
                        h='32px'
                        borderRadius='50%'
                        bgColor='whitesmoke'
                        display={'flex'}
                        alignItems='center'
                        justifyContent='center'
                    >
                        A
                    </Box>
                    <Text fontWeight='500'>{`${teacher.user.firstName} ${teacher.user.lastName}`}</Text>
                </Box>
                <Text fontSize='32px' fontWeight='bold' color='#213E69'>{Course.title}</Text>
                <Text
                    color='GrayText'
                >
                    {Course.description.slice(0, 100) + '...'}
                </Text>
                {
                    Role === 'student' ? <Student price={Course.price} Enroll={Enroll} />
                    :
                    <Teacher />
                }
            </Box>
        </Link>
    );
}

export default CardForCourse;
