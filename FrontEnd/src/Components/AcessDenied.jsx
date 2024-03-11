import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // You can use the appropriate routing library

const AccessDeniedPage = () => {
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Access Denied
                </Typography>
                <Typography variant="body1" align="center" paragraph>
                    You do not have the necessary permissions to access this page.
                </Typography>
                <Button component={Link} to="/" variant="contained" color="primary">
                    Go to Home
                </Button>
            </Box>
        </Container>
    );
};

export default AccessDeniedPage;
