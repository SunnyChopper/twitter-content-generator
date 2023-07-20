import React from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import AvatarCard from '../3 - organisms/AvatarCard';

interface AvatarCardsProps {
    onClickCard: (id: string) => void;
}

const AvatarCards: React.FC<AvatarCardsProps> = (props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5">Avatars</Typography>
            </Grid>
            <Grid container item xs={12} spacing={3}>
                {Array.from(Array(10).keys()).map((i) => { 
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                            <AvatarCard onClickCard={props.onClickCard} />
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>
    )
}

export default AvatarCards;