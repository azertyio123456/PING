import axios from 'axios';

interface LoginInput 
{
    username: string;
}
interface RegisterInput 
{
    email: string;
    username: string;
}
export const GetUserDatabase = async (username: string) => 
{
    const loginInput: LoginInput = { username };
    const response = await axios.post('http://database:3000/api/login', loginInput);
    return response.data;
};

export const GetJiraTickets = async (email: string) => 
{
    const response = await axios.post('http://metrics:8080/api/missions', { email });
    return response.data;
};
export const InitUserDB = async (email: string, username: string) => 
{
    const registerInput: RegisterInput = { email, username };
    const response = await axios.post('http://database:3000/api/register', registerInput);
    return response.data;
};

export const InitAvatar = async (email: string) => 
{
    const response = await axios.post('http://imageservice:9090/api/init',  { email });
    return response.data;
};
export const GetAllUserFromDB = async () => 
{
    const response = await axios.post('http://database:3000/api/getAll');
    return response.data;
};
export const UpdateUserDatabase = async (user : any) => 
{
    const response = await axios.post('http://database:3000/api/update', user);
    return response.data;
};