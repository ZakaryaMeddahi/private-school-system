'use client';

import ProfilePage from "@/Pages/profile";
import { useEffect, useState } from "react";
import { GetUser } from "../../../../../Lib/getUser";

const profile = () => {
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [UserName, setUserName] = useState('');
    const [Bio, setBio] = useState('');
    const [Role, setRole] = useState('');

    useEffect(() => {
        GetUser()
            .then(data => {
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setBio(data.biography);
                setRole(data.role);

                console.log(data);
            })
            .catch(err => console.log(err.message));
    }, []);
    

    return (
        <>
            <ProfilePage 
                FullName={`${FirstName} ${LastName}`} 
                UserName='SidAhmed001' 
                Bio={!Bio?'': Bio}
                Role={Role}
            />
        </>
    );
}

export default profile;