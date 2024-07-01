// src/components/CompilationErrors.tsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const generateRandomData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    name: `Month ${i + 1}`,
    errors: Math.floor(Math.random() * 50),
  }));
};

const CompilationErrors: React.FC = () => {
  const [data, setData] = useState(generateRandomData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateRandomData());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card sx={{ background: 'rgba(33, 33, 33, 0.9)', color: '#fff' }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontFamily: 'Orbitron, sans-serif' }}>
          Compilation erreurs
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="errors" stroke="#ff7300" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CompilationErrors;
