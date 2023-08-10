// System
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

// Material UI components
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Grid, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const styles: { [key: string]: React.CSSProperties } = {
    drawer: {
        width: '250px'
    },
    logoutButton: {
        cursor: 'pointer',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '5px',
        padding: '10px 20px',
        marginTop: '20px',
        width: '80%',
        margin: 'auto',
        textAlign: 'center',
        backgroundColor: '#e57373',
        color: '#fff'
    }
}

const Header = () => {
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [isError, setIsError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setIsOpen(open);
    };

    const handleLogout = async () => {
        try {
            await Auth.signOut();
            localStorage.removeItem('jwt');
            navigate('/');
        } catch (error: any) {
            setError(error.message);
            setIsError(true);
        }
    }

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
                {['Dashboard', 'Avatars', 'Content', 'Generate', 'Files', 'Logout'].map((text, index) => {
                    if (text === 'Logout') {
                        return (
                            <ListItem key={index} onClick={handleLogout} sx={styles.logoutButton}>
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    }

                    return (
                        <ListItem key={index} component={RouterLink} to={`/${text.toLowerCase()}`}>
                            <ListItemText primary={text} />
                        </ListItem>
                    )
                })}
                {isError && <Typography variant="body1" color="error">{error}</Typography>}
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