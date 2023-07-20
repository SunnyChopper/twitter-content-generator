import React from 'react';

import LoginForm from '../3 - organisms/LoginForm';

import Grid from '@mui/material/Grid';

const styles: { [key: string]: React.CSSProperties } = {
    centeredLoginContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)'
    }
};

interface LoginPageProps { }

// Component: LoginPage
// Atomic Design Component Type: Page
// Requirements:
// 1. Should have a subtle gray background, similar to the Apple homepage
// 2. A soft, rounded white box in the center of the page, which contains the <Login /> component
// 3. A handler function that is passed to the <Login /> component that will handle the login process
// 4. If the user is logged in, redirect them to the homepage
// 5. If the user is not logged in, display the <Login /> component
const LoginPage: React.FC<LoginPageProps> = (props: LoginPageProps) => {
    return (
        <Grid container spacing={0} alignItems="center" justifyContent="center" sx={{ height: '100vh', backgroundColor: '#f5f5f5' }}>
            <Grid item xs={12} sm={8} md={6} lg={4} xl={3} sx={styles.centeredLoginContainer}>
                <LoginForm onClick={() => {}} />
            </Grid>
        </Grid>
    );
};

export default LoginPage;