import axios from 'axios';

export const GetPokemonDatabase = async (username: string) => 
{
    const response = await axios.post('http://database:3000/api/pokemon/get', { username });
    return response.data;
};