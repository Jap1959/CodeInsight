import React, { useContext, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Container, TextField, Button, Typography, Link, Alert, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../App';

function LoginPage() {
    const { dispatch } = useContext(userContext);
    const theme = useTheme();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        severity: '',
        message: '',
    });
    const Navigate = useNavigate();
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const validate = () => {
        if (email === '') {
            setAlert({
                severity: 'error',
                message: 'Enter Email',
            });
            return false;
        }
        if (password === '') {
            setAlert({
                severity: 'error',
                message: 'Enter password',
            });
            return false;
        }
        return true;
    }
    const handleLogin = async () => {
        const Data = {
            Email: email,
            Password: password,
        }
        setLoading(true);
        const signin = validate(); // Set loading state to true
        if (signin) {
            console.log(Data);
            axios.post('/Login', Data).then((response) => {
                setLoading(false); // Set loading state to false after response is received
                if (response.data.status === 200) {
                    setAlert({
                        severity: 'success',
                        message: response.data.message,
                    });
                    dispatch({ type: "USER", payload: { login: true } });
                    Navigate('/');
                    window.location.reload();
                } else {
                    setAlert({
                        severity: 'error',
                        message: response.data.message,
                    });
                }
            }).catch((error) => {
                setLoading(false);
                console.log(error);
            });
        }
        else {
            setLoading(false);
        }
    };

    return (
        <>
            <center>
                <Alert severity={alert.severity} >{alert.message}</Alert>
                <Container maxWidth="sm">
                    <Box
                        sx={{
                            bgcolor: 'white',
                            height: '42vh',
                            marginTop: '7rem',
                            padding: '2rem',
                            borderRadius: '8px',
                            boxShadow: `0 0 10px ${theme.palette.primary.main}`,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Typography variant="h4" gutterBottom>
                            Login
                        </Typography>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {loading ? (
                            <CircularProgress color="primary" />
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleLogin}
                                style={{ marginTop: '1rem' }}
                            >
                                Login
                            </Button>
                        )}
                        <Typography variant="body2" style={{ marginTop: '1rem' }}>
                            Don't have an account? <Link href="/Register" style={{ textDecoration: 'none' }}>Sign up</Link>
                        </Typography>
                    </Box>
                </Container>
            </center>
        </>
    );
}
export default LoginPage;
