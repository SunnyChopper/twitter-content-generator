import React from 'react';

import UploadedFilesTable from '../3 - organisms/UploadedFilesTable';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

const styles: { [key: string]: React.CSSProperties } = {
    title: {
        fontWeight: 'bold',
        marginBottom: '20px'
    },
    divider: {
        marginBottom: '32px'
    },
    uploadedFilesTableContainer: {
        marginBottom: '32px',
        backgroundColor: '#FAFAFA',
        borderRadius: '5px',
        padding: '20px'
    }
}

interface UserDashboardProps { }

const UserDashboard: React.FC<UserDashboardProps> = (props) => {
    return (
        <Grid container spacing={2} maxWidth="lg" sx={{ margin: 'auto' }}>
            <Grid item xs={12}>
                <Typography variant="h5" sx={styles.title}>Dashboard</Typography>
                <Divider sx={styles.divider} />
            </Grid>
            <Grid item xs={12} sx={styles.uploadedFilesTableContainer}>
                <UploadedFilesTable
                    actionType='Display'
                    handleClickCreateAvatar={() => { console.log('clicked create avatar') }}
                    handleClickDelete={() => { console.log('clicked delete') }}
                    handleClickEdit={() => { console.log('clicked edit') }}
                    handleClickGenerate={() => { console.log('clicked generate') }}
                />
            </Grid>
        </Grid>
    );
};

export default UserDashboard;