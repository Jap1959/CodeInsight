import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Container,
    Grid,
    Typography,
    Box,
    Snackbar,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import MuiAlert from '@mui/material/Alert';
import ResponsiveAppBar from './Navbar';
import axios from 'axios';

const ContestForm = () => {
    const [contestName, setContestName] = useState('');
    const [contestDate, setContestDate] = useState(getFormattedDate());
    const [contestStartTime, setContestStartTime] = useState(getFormattedTime());
    const [contestEndTime, setContestEndTime] = useState(getFormattedTime());
    const [hostName, setHostName] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        // You can set initial values here or fetch them from an API
        setContestDate(getFormattedDate());
        setContestStartTime(getFormattedTime());
        setContestEndTime(getFormattedTime());
    }, []);

    function getFormattedDate() {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;

        return `${year}-${month}-${day}`;
    }

    function getFormattedTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();

        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${formattedHours}:${formattedMinutes}`;
    }

    const theme = useTheme();

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const Data = { contestName, contestDate, contestStartTime, contestEndTime, hostName };
        try {
            const res = await axios.post('/AddContest', Data);
            console.log(res);
            if (res.data.Data.Status === 200) {
                console.log('success');
                handleSnackbar(res.data.Data.message, 'success');
            } else {
                console.log('error');
                handleSnackbar(res.data.Data.message, 'error');
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false); // Set loading state to false after response is received or in case of an error
        }
    };

    return (
        <>
            <ResponsiveAppBar />
            <center>
                <Container maxWidth="sm" sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh', // 100% of the viewport height
                }} >
                    <Box
                        sx={{
                            marginTop: '2rem',
                            padding: '2rem',
                            borderRadius: '8px',
                            boxShadow: `0 0 10px ${theme.palette.primary.main}`,
                        }}
                    >
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">Contest Information</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Contest Name"
                                        variant="outlined"
                                        value={contestName}
                                        onChange={(e) => setContestName(e.target.value)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        label="Contest Date"
                                        variant="outlined"
                                        value={contestDate}
                                        onChange={(e) => setContestDate(e.target.value)}
                                        required
                                        sx={{ marginTop: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        type="time"
                                        label="Contest Start Time"
                                        variant="outlined"
                                        value={contestStartTime}
                                        onChange={(e) => setContestStartTime(e.target.value)}
                                        placeholder="HH:mm"
                                        required
                                        sx={{ marginTop: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        type="time"
                                        label="Contest End Time"
                                        variant="outlined"
                                        value={contestEndTime}
                                        onChange={(e) => setContestEndTime(e.target.value)}
                                        placeholder="HH:mm"
                                        required
                                        sx={{ marginTop: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        label="Host Name"
                                        variant="outlined"
                                        value={hostName}
                                        onChange={(e) => setHostName(e.target.value)}
                                        required
                                        sx={{ marginTop: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <center>
                                        <Button type="submit" variant="contained" disabled={loading} color="primary">
                                            Submit
                                        </Button>
                                    </center>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Container>
            </center>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    severity={snackbarSeverity}
                    onClose={handleSnackbarClose}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </>
    );
};

export default ContestForm;
