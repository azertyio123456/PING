// src/services/LeaderboardService.ts
import axios from 'axios';

export const fetchAllUsers = async () =>
{
    try
    {
        const response = await axios.post('http://dockerserviceclient:9000/api/getAll');
        return response.data;
    }
    catch (error)
    {
        console.log("error");
    }
};
export const fetchUsers = async (username: string) =>
{
    try
    {
        const response = await axios.post('http://dockerserviceclient:9000/api/get', {username: username});
        return response.data;
    }
    catch (error)
    {
        console.log(error);
    }
};
export const UpdateUser = async (user : any) =>
{
    try
    {
        console.log("USER BATTLE LOG " + user.battleLog);
        const response = await axios.post('http://database:3000/api/update', {
            email: user.email, 
            gamification: user.gamification, 
            battleLog: user.battleLog
        });
        return response.data;
    }
    catch (error)
    {
        console.error("UpdateUser error: ", error); // Log the error for debugging
    }
};
    
export const fetchUserPokemon = async (username: string) =>
{
    try
    {
        const response = await axios.post('http://dockerserviceclient:9000/api/pokemon/get', { username });
        return response.data;
    }
    catch (error)
    {
        throw new Error(`Failed to fetch pokemon for user ${username}`);
    }
};
