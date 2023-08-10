import React from 'react';

import Grid from '@mui/material/Grid';

import AvatarCards from '../4 - templates/AvatarCards';
import Header from '../4 - templates/Header';



interface AvatarsPageProps { }

const AvatarsPage: React.FC<AvatarsPageProps> = (props) => {
    const [selectedAvatar, setSelectedAvatar] = React.useState<string>('');
    

    const handleCardClick = (id: string) => { setSelectedAvatar(id); }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid container item maxWidth="lg" sx={{ margin: 'auto' }}>
                <AvatarCards onClickCard={handleCardClick} />
            </Grid>
        </Grid>
    )
}

export default AvatarsPage;