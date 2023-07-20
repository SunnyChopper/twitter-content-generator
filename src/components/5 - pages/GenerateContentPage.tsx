import React from 'react';

import Grid from '@mui/material/Grid';

import ContentSuggestion from '../3 - organisms/ContentSuggestion';
import Header from '../4 - templates/Header';

interface GenerateContentPageProps { }

const GenerateContentPage: React.FC<GenerateContentPageProps> = (props) => { 
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid container item  maxWidth="lg" sx={{ margin: 'auto' }}>
                <ContentSuggestion />
            </Grid>
        </Grid>
    )
}

export default GenerateContentPage;