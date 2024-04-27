import ProfilePage from "@/Pages/profile";

const profile = () => {
    return (
        <>
            <ProfilePage 
                FullName='ABDELALI Sid Ahmed' 
                UserName='SidAhmed001' 
                Bio='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, 
                libero sit amet volutpat hendrerit, nunc sem fermentum felis, nec tincidunt nunc mi ac nunc.'
                Role='Student'
            />
        </>
    );
}

export default profile;