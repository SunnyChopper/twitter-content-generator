import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Grid, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';

const styles: { [key: string]: React.CSSProperties } = {
    drawer: {
        width: '250px'
    }
}

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setIsOpen(open);
    };

    const list = () => (
        <Grid
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            sx={styles.drawer}
        >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', marginTop: '10px' }}>
                Menu
            </Typography>
            <List component="nav">
                {['Dashboard', 'Avatars', 'Generate', 'Files'].map((text, index) => (
                <ListItem button key={text} component={RouterLink} to={`/${text.toLowerCase()}`}>
                    <ListItemText primary={text} />
                </ListItem>
                ))}
            </List>
        </Grid>
    );

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>
                <Drawer open={isOpen} onClose={toggleDrawer(false)}>
                    {list()}
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};

export default Header;