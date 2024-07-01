// src/pages/Dashboard.tsx
import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import Layout from './Layout';
import ExperienceChart from './ExperienceChart';
import CompilationErrors from './CompilationErrors';
import CodeLines from './CodeLines';
import Calendar from './Calendar';
import Missions from './Missions';
import WinsLosses from './WinsLosses';
import GoldEarned from './GoldEarned';

import { GetDashboard } from './Services/userService';

const Dashboard: React.FC = () => {
  useEffect(() => {
    const fetchDashboard = async () => {
      const result = await GetDashboard("MAXIMUS");
      console.log("Get Dashboard Test: ", result);
    };
    
    fetchDashboard();
  }, []);

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ExperienceChart />
        </Grid>
        <Grid item xs={6}>
          <CompilationErrors />
        </Grid>
        <Grid item xs={6}>
          <CodeLines />
        </Grid>
        <Grid item xs={12}>
          <Calendar />
        </Grid>
        <Grid item xs={12}>
          <Missions />
        </Grid>
        <Grid item xs={6}>
          <WinsLosses />
        </Grid>
        <Grid item xs={6}>
          <GoldEarned />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
