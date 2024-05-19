export const GetUser = async () => {
    const token = localStorage.getItem('token');

    console.log(token);

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/students/account/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    const { data } = await response.json();
    console.log(data);
    return data;
}