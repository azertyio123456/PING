// src/components/Layout.tsx
import React, { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ background: 'rgba(0, 0, 0, 0.8)' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: 2 }}>
            Game Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" component={Link} to="/">
            Accueil
          </Button>
          <Button color="inherit" component={Link} to="/leaderboard">
            LeaderBoard
          </Button>
          <Button color="inherit" component={Link} to="/profile">
            Profil
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ flex: 1, py: 3 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
