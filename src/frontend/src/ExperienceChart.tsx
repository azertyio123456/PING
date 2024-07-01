// src/components/ExperienceChart.tsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GetDashboard } from './Services/userService';


const fetchExperienceData = async (): Promise<Array<{ name: string, exp: number }>> => {
  const result = await GetDashboard("MAXIMUS");
  if (result && result.userInfo && result.userInfo.gamification) {
    const expArray = result.userInfo.gamification.exp || [];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const data = months.map((month, index) => ({
      name: month,
      exp: expArray[index] || 0
    }));
    return data;
  }
  return [];
};

const ExperienceChart: React.FC = () => {
  const [data, setData] = useState<Array<{ name: string, exp: number }>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const experienceData = await fetchExperienceData();
      setData(experienceData);
    };

    fetchData();

    const interval = setInterval(fetchData, 5000); // Rafraîchit toutes les 5 secondes
    return () => clearInterval(interval);
  }, []);

  return (
    <Card sx={{ background: 'rgba(33, 33, 33, 0.9)', color: '#fff' }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontFamily: 'Orbitron, sans-serif' }}>
          Nombre d'Exp gagné
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="exp" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ExperienceChart;
