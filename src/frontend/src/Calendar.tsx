// src/components/Calendar.tsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Calendar: React.FC = () => {
  return (
    <Card sx={{ background: 'rgba(33, 33, 33, 0.9)', color: '#fff' }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontFamily: 'Orbitron, sans-serif' }}>
          Calendrier
        </Typography>
        {/* Add calendar code here */}
      </CardContent>
    </Card>
  );
};

export default Calendar;
