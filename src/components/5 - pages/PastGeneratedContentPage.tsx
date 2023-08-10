import Header from '../4 - templates/Header';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

interface PastGeneratedContentPageProps {

}

const PastGeneratedContentPage: React.FC<PastGeneratedContentPageProps> = (props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item container maxWidth="lg" sx={{ margin:'auto' }}>
                <Grid item xs={12}>
                    <Typography variant="h4">Past Generated Content</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PastGeneratedContentPage;