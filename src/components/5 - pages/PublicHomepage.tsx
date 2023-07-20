import React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const styles: { [key: string]: React.CSSProperties } = {
    root: {
        flexGrow: 1,
        marginTop: '20px'
    },
    title: {
        fontWeight: 'bold',
        marginBottom: '20px'
    },
    subtitle: {
        marginBottom: '20px'
    },
    loginButton: {
        textDecoration: 'none',
        color: '#323232',
        marginRight: '10px',
        marginBottom: '10px',
        padding: '10px 20px',
        borderRadius: '5px',
        border: '1px solid #323232',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    },
}

const PublicHomepage = () => {
  
    return (
        <Container maxWidth="md" sx={styles.root}>
            <Grid container spacing={4} alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                    <Typography variant="h3" align="center" sx={styles.title}>Twitter Content Generator</Typography>
                    <Typography variant="h5" align="center" sx={styles.subtitle}>Generate top-performing Twitter content with ease</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Link to="/login" style={styles.loginButton}>
                        Login
                    </Link>
                    <Link to="/signup" style={styles.loginButton}>
                        Sign Up
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PublicHomepage;