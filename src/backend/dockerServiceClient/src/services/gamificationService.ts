import axios from 'axios';

export const fetchLeaderboard = async () =>
{
    try
    {
        const response = await axios.get('http://gamification:7000/api/gamification/leaderboard');
        return response.data;
    }
    catch (error)
    {
        throw new Error('Failed to fetch leaderboard');
    }
};

export const initiateBattle = async () =>
{
    try
    {
        const response = await axios.post('http://gamification:7000/api/gamification/battle');
        return response.data;
    }
    catch (error)
    {
        throw new Error('Failed to initiate battle');
    }
};
