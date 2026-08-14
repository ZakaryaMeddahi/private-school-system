'use client';

import Media from "@/components/Socials/Media";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaFacebookF, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import { useEffect, useState } from "react";
import { GetUser } from "@/utils/getUser";

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
        <div className="grid h-full w-full grid-cols-[1fr_0.8fr] gap-10">
            <div className="flex flex-col gap-5 rounded-[15px] bg-white p-12.5 shadow-[rgba(0,0,0,0.1)_0px_4px_12px]">
                <div className="flex w-full justify-center">
                    <span className="text-5xl font-bold">Edit Your Profile</span>
                </div>
                <div>
                    <Label>Profile Picture</Label>
                    <Input placeholder='Profile Picture' onChange={(e) => setProfilePicture(e.target.value)} />
                </div>
                <div className="grid w-full grid-cols-2 gap-10">
                    <div>
                        <Label>First Name</Label>
                        <Input placeholder='First Name' onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                    <div>
                        <Label>Last Name</Label>
                        <Input placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} />
                    </div>
                </div>
                <span>Bio</span>
                <Textarea
                    placeholder='Here is a sample placeholder'
                    onChange={(e) => setBio(e.target.value)}
                />
                <div>
                    <Label>Facebook</Label>
                    <Input placeholder='Facebook'  onChange={(e) => setFacebook(e.target.value)}/>
                </div>
                <div>
                    <Label>Whatsapp</Label>
                    <Input placeholder='Whatsapp' onChange={(e) => setWhatsapp(e.target.value)} />
                </div>
                <div>
                    <Label>LinkedIn</Label>
                    <Input placeholder='LinkedIn' onChange={(e) => setLinkedin(e.target.value)} />
                </div>
                <div className="mt-10 flex w-full justify-end">
                    <Button className="bg-[#234C51] text-white hover:bg-[#234C51]/90">Update Profile</Button>
                </div>
            </div>
            <div>
                <div className="flex h-full w-full flex-col items-center gap-3.75 rounded-[15px] bg-white shadow-[rgba(0,0,0,0.1)_0px_4px_12px]">
                    <div className="mt-6.25 size-37.5 rounded-[75px] bg-[#234C51]"></div>
                    <h2 className="text-lg font-semibold text-[#213E69]">{`${firstName} ${lastName}`}</h2>
                    <Badge className="bg-blue-500 px-1.25">Student</Badge>
                    <p className="w-[70%] text-base text-[#898C81]">
                        {bio}
                    </p>
                    <div className="flex gap-3">
                        <Media icon={<FaFacebookF />} w='32px' h='32px' bgcolor='transparent' />
                        <Media icon={<FaWhatsapp size='25px' />} w='32px' h='32px' bgcolor='transparent' />
                        <Media icon={<FaLinkedinIn />} w='32px' h='32px' bgcolor='transparent' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;