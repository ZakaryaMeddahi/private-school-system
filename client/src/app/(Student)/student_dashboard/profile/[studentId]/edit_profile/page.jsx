'use client';

import Media from "@/components/Socials/Media";
import { Box, FormControl, FormLabel, Input, Text, Textarea, Button, Heading, Badge } from "@chakra-ui/react";
import { FaFacebookF, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import { useEffect, useState } from "react";
import { GetUser } from "@/Lib/getUser";

var data;

const EditProfile = () => {

    useEffect(() => {
        GetUser()
            .then(response => {
                data = response;
                console.log(response);
            })
            .catch(err => console.log(err.message));
    }, []);

    const [profilePicture, setProfilePicture] = useState('/profile.jpeg');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quod repudiandae nesciunt aspernatur recusandae cumque autem tempora natus corrupti deserunt, consequatur eveniet exercitationem quisquam non, suscipit quibusdam, laboriosam repellendus ipsum.');
    const [facebook, setFacebook] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [linkedin, setLinkedin] = useState('');

    return (
        <Box
            w='100%'
            h='100%'
            display='grid'
            gridTemplateColumns='1fr 0.8fr'
            gap={10}
            >
            <Box 
                bgColor='white'
                boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'
                borderRadius='15px'
                display='flex'
                flexDir='column'
                gap={5}
                padding={50}
            >
                <Box
                    w='100%'
                    display='flex'
                    justifyContent='center'
                >
                    <Text fontSize={48} fontWeight={700}>Edit Your Profile</Text>
                </Box>
                <FormControl>
                    <FormLabel>Profile Picture</FormLabel>
                    <Input placeholder='Profile Picture' onChange={(e) => setProfilePicture(e.target.value)} />
                </FormControl>
                <Box
                    w='100%'
                    display='grid'
                    gridTemplateColumns='1fr 1fr'
                    gap={10}
                >
                    <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Input placeholder='First Name' onChange={(e) => setFirstName(e.target.value)}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Last Name</FormLabel>
                        <Input placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} />
                    </FormControl>
                </Box>
                <Text>Bio</Text>
                <Textarea
                    placeholder='Here is a sample placeholder'
                    size='sm'
                    onChange={(e) => setBio(e.target.value)}
                />
                <FormControl>
                    <FormLabel>Facebook</FormLabel>
                    <Input placeholder='Facebook'  onChange={(e) => setFacebook(e.target.value)}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Whatsapp</FormLabel>
                    <Input placeholder='Whatsapp' onChange={(e) => setWhatsapp(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel>LinkedIn</FormLabel>
                    <Input placeholder='LinkedIn' onChange={(e) => setLinkedin(e.target.value)} />
                </FormControl>
                <Box 
                    w='100%'
                    display='flex'
                    justifyContent='flex-end'
                    marginTop={10}
                >
                    <Button bgColor='#234C51' color='white' >Update Profile</Button>
                </Box>
            </Box>
            <Box>
                <Box
                    w='100%'
                    h='100%'
                    bgColor='white'
                    boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'
                    borderRadius='15px'
                    display='flex'
                    flexDirection={'column'}
                    alignItems='center'
                    gap={15}
                >
                    <Box
                        marginTop={'25px'}
                        w='150px'
                        height='150px'
                        display='flex'
                        flexDirection='column'
                        justifyContent='center'
                        alignItems={'center'}
                        borderRadius={'75px'}
                        bgColor={'#234C51'}
                    ></Box>
                    <Heading size='lg' color='#213E69' >{`${firstName} ${lastName}`}</Heading>
                    <Badge colorScheme='blue' paddingInline={5} >Student</Badge>
                    <Text fontSize={16} w='70%' color='#898C81' > 
                        {bio}
                    </Text>
                    <Box
                        display='flex'
                        gap={3}
                    >
                        <Media icon={<FaFacebookF />} w='32px' h='32px' bgcolor='transparent' hover={{backgroundColor: 'whiteSmoke'}} />
                        <Media icon={<FaWhatsapp size='25px' />} w='32px' h='32px' bgcolor='transparent' hover={{backgroundColor: 'whiteSmoke'}} />
                        <Media icon={<FaLinkedinIn />} w='32px' h='32px' bgcolor='transparent' hover={{backgroundColor: 'whiteSmoke'}} />   
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default EditProfile;