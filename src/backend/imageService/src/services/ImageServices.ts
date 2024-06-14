import axios from 'axios';

interface PathInput 
{
    email: string;
    path: string | undefined;
}

export const SetUserPathImage = async (email: string, path: string | undefined) => 
{
    const loginInput: PathInput = { email, path};
    const response = await axios.post('http://database:3000/api/setimagepath', loginInput);
    return response.data;
};