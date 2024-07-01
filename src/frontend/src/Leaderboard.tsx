// src/pages/Leaderboard.tsx
import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Paper } from '@mui/material';
import Layout from './Layout';
import { styled } from '@mui/system';

const leaderboardData = [
  { id: 1, name: 'GUNNER', score: 5000 },
  { id: 2, name: 'BLADER', score: 4500 },
  { id: 3, name: 'SNIPER', score: 4000 },
  // Add more players as needed
];

const StyledTableCell = styled(TableCell)({
  color: '#fff',
  fontFamily: 'Orbitron, sans-serif',
  fontSize: '1rem',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
});

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

const Leaderboard: React.FC = () => {
  return (
    <Layout>
      <Card sx={{ background: 'linear-gradient(135deg, #1e1e1e, #121212)', color: '#fff', minHeight: '70vh', borderRadius: 2, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)' }}>
        <CardContent>
          <Typography variant="h4" align="center" sx={{ fontFamily: 'Orbitron, sans-serif', mb: 3, color: '#FFD700' }}>
            LeaderBoard
          </Typography>
          <TableContainer component={Paper} sx={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Rank</StyledTableCell>
                  <StyledTableCell align="center">Player</StyledTableCell>
                  <StyledTableCell align="center">Score</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboardData.map((player, index) => (
                  <StyledTableRow key={player.id}>
                    <StyledTableCell align="center">{index + 1}</StyledTableCell>
                    <StyledTableCell align="center">{player.name}</StyledTableCell>
                    <StyledTableCell align="center">{player.score}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Leaderboard;
