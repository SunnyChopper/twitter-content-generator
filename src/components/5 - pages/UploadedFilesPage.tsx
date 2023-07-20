import React from 'react';

import Grid from '@mui/material/Grid';

import Header from '../4 - templates/Header';
import UploadedFilesTable from '../3 - organisms/UploadedFilesTable';

interface UploadedFilesPageProps { }

const UploadedFilesPage: React.FC<UploadedFilesPageProps> = (props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid container item maxWidth="lg" sx={{ margin: 'auto' }}>
                <UploadedFilesTable
                    actionType='CRUD'
                    handleClickCreateAvatar={() => { }}
                    handleClickEdit={() => { }}
                    handleClickDelete={() => { }}
                    handleClickGenerate={() => { }}
                    showTitle={true}
                    showUploadButton={true}
                />
            </Grid>
        </Grid>
    )
}

export default UploadedFilesPage;