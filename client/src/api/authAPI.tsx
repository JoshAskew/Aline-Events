import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {

  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    
    console.log(response);

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error('Failed to login');
    }

    return data;
  } catch (error) {
    console.error(error);
    return Promise.reject('Failed to login');
  }
};



export { login };
