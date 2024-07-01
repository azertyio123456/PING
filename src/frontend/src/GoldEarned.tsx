// src/components/GoldEarned.tsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { GetDashboard } from './Services/userService';

const fetchGoldData = async (): Promise<number> => {
  const result = await GetDashboard("MAXIMUS");
  if (result && result.userInfo && result.userInfo.gamification) {
    const goldArray = result.userInfo.gamification.gold || [];
    const totalGold = goldArray.reduce((acc: number, curr: number) => acc + curr, 0);
    return totalGold;
  }
  return 0;
};

const GoldEarned: React.FC = () => {
  const [gold, setGold] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const goldData = await fetchGoldData();
      setGold(goldData);
    };

    fetchData();

    const interval = setInterval(fetchData, 5000); // Rafraîchit toutes les 5 secondes
    return () => clearInterval(interval);
  }, []);

  return (
    <Card sx={{ background: 'rgba(33, 33, 33, 0.9)', color: '#fff' }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontFamily: 'Orbitron, sans-serif' }}>
          Nombre de gold gagné 24H
        </Typography>
        <Typography variant="h4" mt={2} sx={{ color: '#FFD700' }}>
          {gold}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GoldEarned;
