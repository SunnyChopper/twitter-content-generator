import React from 'react';
import { Routes, Route } from 'react-router-dom';


import Grid from '@mui/material/Grid';

import UserDashboard from '../4 - templates/UserDashboard';
import Header from '../4 - templates/Header';

interface UserDashboardPageProps { }

const UserDashboardPage: React.FC<UserDashboardPageProps> = (props) => { 
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid container item xs={12}>
                <UserDashboard />
            </Grid>
        </Grid>
    )
}

export default UserDashboardPage;