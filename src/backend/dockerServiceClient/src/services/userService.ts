import axios from 'axios';

interface LoginInput 
{
    email: string;
}
interface RegisterInput 
{
    email: string;
    username: string;
}
export const GetUserDatabase = async (email: string) => 
{
    const loginInput: LoginInput = { email };
    const response = await axios.post('http://database:3000/api/login', loginInput);
    return response.data;
};

export const GetJiraTickets = async (email: string) => 
{
    const loginInput: LoginInput = { email };
    const response = await axios.post('http://metrics:8080/api/missions', loginInput);
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
    const loginInput: LoginInput = { email };
    const response = await axios.post('http://imageservice:9090/api/init', loginInput);
    return response.data;
};