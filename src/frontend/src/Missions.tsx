// src/components/Missions.tsx
import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, ListItemIcon, LinearProgress, Box } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

const missions = [
  { id: 78546, exp: 15, progress: 50 },
  { id: 78547, exp: 30, progress: 75 },
  // Add more missions as needed
];

const Missions: React.FC = () => {
  return (
    <Card sx={{ background: 'rgba(33, 33, 33, 0.9)', color: '#fff' }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontFamily: 'Orbitron, sans-serif' }}>
          Missions
        </Typography>
        <List>
          {missions.map((mission) => (
            <ListItem key={mission.id}>
              <ListItemIcon>
                <WorkIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText
                primary={`Finir ticket #${mission.id}`}
                secondary={
                  <Box>
                    {`${mission.exp} exp`}
                    <LinearProgress variant="determinate" value={mission.progress} sx={{ mt: 1 }} />
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Missions;
