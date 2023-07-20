import React from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

interface RegisterFormProps { }

const RegisterForm: React.FC<RegisterFormProps> = () => { 
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5">Register</Typography>
            </Grid>
        </Grid>
    )
}

export default RegisterForm;