import ProfilePage from "@/Pages/profile";

const profile = async () => {

    const token = localStorage.getItem('token');

    console.log(token);

    const response = await fetch('http://localhost:8080/api/v1/students/account/me', {
        Authorization: `Bearer ${token}`
    })

    if (response.status === 200) {
        const { data } = await response.json();
        console.log(data);
    }

    const [FullName, setFullName] = useState('');
    const [UserName, setUserName] = useState('');
    const [Bio, setBio] = useState('');
    const [Role, setRole] = useState('');

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