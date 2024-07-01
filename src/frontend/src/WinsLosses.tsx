// src/components/WinsLosses.tsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { GetDashboard } from './Services/userService';

interface WinsLossesData {
  wins: number;
  losses: number;
}

const fetchWinsLossesData = async (): Promise<WinsLossesData> => {
  const result = await GetDashboard("MAXIMUS");
  if (result && result.userInfo && result.userInfo.gamification) {
    const victories = result.userInfo.gamification.victory || [];
    const wins = victories.filter((victory: boolean) => victory === true).length;
    console.log("victory : " + victories)
    const losses = victories.filter((victory: boolean) => victory === false).length;
    return { wins, losses };
  }
  return { wins: 0, losses: 0 };
};


const WinsLosses: React.FC = () => {
  const [data, setData] = useState<WinsLossesData>({ wins: 0, losses: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const winsLossesData = await fetchWinsLossesData();
      setData(winsLossesData);
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card sx={{ background: 'rgba(33, 33, 33, 0.9)', color: '#fff' }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontFamily: 'Orbitron, sans-serif' }}>
          Victoires / Défaites 24H
        </Typography>
        <Box display="flex" justifyContent="space-around" alignItems="center" mt={2}>
          <Typography variant="h4" color="green">
            {data.wins}
          </Typography>
          <Typography variant="h4" color="red">
            {data.losses}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WinsLosses;
