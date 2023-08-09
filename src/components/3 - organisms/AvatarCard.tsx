import React from 'react';

// Component: AvatarCard
// Returns: A card with an avatar and a name, which the user can click to see more information.

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';

import { Avatar as AvatarEntity } from 'src/entity/Avatar';

interface AvatarCardProps {
    avatar: AvatarEntity;
    onClickCard?: (id: string) => void;
}

const AvatarCard: React.FC<AvatarCardProps> = (props) => {
    return (
        <Card onClick={() => { if (props.onClickCard) { props.onClickCard('1') }}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://picsum.photos/200/300"
                    alt="random image"
                />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: 'red' }}>A</Avatar>
                                }
                                title={props.avatar.name}
                                subheader={props.avatar.createdAt.toLocaleDateString()}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">{props.avatar.description}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    )
};

export default AvatarCard;