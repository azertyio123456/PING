// src/pages/Profil.tsx
import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Avatar, Paper, LinearProgress } from '@mui/material';
import Layout from './Layout';
import profileImage from './assets/profil.webp';
import itemImage1 from './assets/profil.webp';
import itemImage2 from './assets/profil.webp';
import itemImage3 from './assets/profil.webp';
import itemImage4 from './assets/profil.webp';
import itemImage5 from './assets/profil.webp';

const items = [
  { name: 'Sword of Destiny', icon: itemImage1 },
  { name: 'Shield of Valor', icon: itemImage2 },
  { name: 'Potion of Healing', icon: itemImage3 },
  { name: 'Ring of Power', icon: itemImage4 },
  { name: 'Magic Wand', icon: itemImage5 },
];

const Profile: React.FC = () => {
  return (
    <Layout>
      <Card
        sx={{
          background: 'linear-gradient(135deg, #1e1e1e, #121212)',
          color: '#fff',
          minHeight: '70vh',
          borderRadius: 2,
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
          p: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            sx={{ fontFamily: 'Orbitron, sans-serif', mb: 3, color: '#FFD700' }}
          >
            Profil
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <Avatar src={profileImage} sx={{ width: 150, height: 150, mb: 2 }} />
                <Typography variant="h6">sei_dnl</Typography>
                <Typography variant="body1">Level: 20</Typography>
                <Box width="100%" mt={1}>
                  <Typography variant="body2">Health</Typography>
                  <LinearProgress variant="determinate" value={80} sx={{ height: 10, borderRadius: 5 }} />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box display="flex" justifyContent="center">
                <img
                  src={profileImage}
                  alt="Avatar"
                  style={{ borderRadius: '10px', maxHeight: '400px', maxWidth: '100%', border: '2px solid #FFD700' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap={2}>
                <Box width="100%">
                  <Typography variant="body2">XP</Typography>
                  <LinearProgress variant="determinate" value={(1500 / 2000) * 100} sx={{ height: 10, borderRadius: 5, mb: 1 }} />
                  <Typography variant="body2">1500 / 2000</Typography>
                </Box>
                <Box width="100%">
                  <Typography variant="body2" sx={{ color: '#FFD700' }}>Gold</Typography>
                  <Typography variant="h5" sx={{ color: '#FFD700' }}>300</Typography>
                </Box>
                <Box width="100%">
                  <Typography variant="body2" sx={{ color: '#4caf50' }}>Wins</Typography>
                  <Typography variant="h5" sx={{ color: '#4caf50' }}>45</Typography>
                </Box>
                <Box width="100%">
                  <Typography variant="body2" sx={{ color: '#f44336' }}>Losses</Typography>
                  <Typography variant="h5" sx={{ color: '#f44336' }}>10</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  mt: 2,
                  display: 'flex',
                  justifyContent: 'space-around',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  borderRadius: 2,
                }}
              >
                {items.map((item, index) => (
                  <Box key={index} display="flex" flexDirection="column" alignItems="center">
                    <Avatar src={item.icon} sx={{ width: 56, height: 56, mb: 1 }} />
                    <Typography variant="body2" align="center">
                      {item.name}
                    </Typography>
                  </Box>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Profile;
