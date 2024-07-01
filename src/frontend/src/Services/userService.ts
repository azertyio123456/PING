import axios from 'axios';

export const GetDashboard = async (username: string) => {
  const loginInput = { username };

  try {
    const response = await axios.post('/api/user-dashboard', {email: username});
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const GetUserDatabase = async (username: string, email: string) => {
  const loginInput = { username, email };
  const response = await axios.post('/api/get', loginInput);
  return response.data;
};
