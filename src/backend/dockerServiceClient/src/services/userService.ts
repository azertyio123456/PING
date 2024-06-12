import axios from 'axios';

interface LoginInput 
{
    email: string;
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
