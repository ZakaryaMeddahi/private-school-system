export const GetUser = async () => {
  try {
    const token = localStorage.getItem('token');

    console.log(token);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/students/account/me`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Error getting user');
    }

    const { data } = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
