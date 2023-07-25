import { Link, useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import React from 'react';

// Import any Material UI components you need here
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const styles: { [key: string]: React.CSSProperties } = {
    title: {
        fontWeight: 'bold',
        marginBottom: '20px'
    },
    divider: {
        marginBottom: '0px'
    },
    emailContainer: {
        marginBottom: '20px'
    },
    passwordContainer: {
        marginBottom: '20px'
    },
    loginButton: {
        textDecoration: 'none',
        color: '#323232',
        marginRight: '10px',
        marginBottom: '10px',
        padding: '10px 20px',
        borderRadius: '5px',
        border: '1px solid #323232',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    },
    signupLink: {
        textDecoration: 'none',
        color: '#323232',
        marginTop: '10px',
        marginRight: '10px',
        marginBottom: '10px',
        padding: '5px 20px',
        borderRadius: '5px',
        border: '1px solid #323232',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    },
    forgotPasswordLink: {
        textDecoration: 'none',
        color: '#323232',
        marginTop: '10px',
        marginRight: '10px',
        marginBottom: '10px',
        padding: '5px 20px',
        borderRadius: '5px',
        border: '1px solid #323232',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
}

interface LoginProps {
    onClick: () => void;
}

const LoginForm = (props: LoginProps) => {
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [error, setError] = React.useState<string>('');
    const [isError, setIsError] = React.useState<boolean>(false);

    const navigate = useNavigate();

    React.useEffect(() => { 
        const checkToken = async () => { 
            try {
                let userSession = await Auth.currentSession();
                if (userSession.isValid()) {
                    navigate('/dashboard');
                }
            } catch (error: any) {
                setError(error.message);
                setIsError(true);
            }
        }

        checkToken();
    }, []);

    const handleSubmit = async (event: React.MouseEvent) => { 
        event.preventDefault();
        try {
            const user = await Auth.signIn(email, password);
            localStorage.setItem('jwt', user.signInUserSession.accessToken.jwtToken);
            navigate('/dashboard');
        } catch (error: any) {
            setError(error.message);
            setIsError(true);
        }
    }

    

    return (
        <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={12}>
                <Typography variant="h4" align="center" sx={styles.title}>Login</Typography>
            <Divider sx={styles.divider} />
            </Grid>
            <Grid item xs={12} sm={6} sx={styles.emailContainer}>
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(e) => { setEmail(e.target.value) }}
                />
            </Grid>
            <Grid item xs={12} sm={6} sx={styles.passwordContainer}>
                <TextField
                    id="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(e) => { setPassword(e.target.value) }}
                />
            </Grid>
            <Grid item xs={12} sm={6} sx={styles.buttonsContainer}>
                <Divider />
                <Button variant="contained" fullWidth sx={styles.loginButton} onClick={(e) => { handleSubmit(e) }}>Login</Button>
                <Link to="/signup" style={styles.signupLink}>Sign Up</Link>
                <Link to="/forgot-password" style={styles.forgotPasswordLink}>Forgot Password</Link>
                {isError && <Typography variant="body1" color="error">{error}</Typography>}
            </Grid>
        </Grid>
    );
};

export default LoginForm;