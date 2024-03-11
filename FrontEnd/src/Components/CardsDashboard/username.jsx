import React from 'react';
import { Chip, Typography, useTheme, Container } from '@mui/material';

const CenteredH1Chip = ({ username }) => {
    const theme = useTheme();

    const containerStyles = {
        display: 'flex',
        justifyContent: 'center',
        height: '10vh', // Center vertically on the page
    };

    const chipStyles = {
        background: theme.palette.secondary.main,
        borderRadius: '999px',
        height:'4rem',
        padding: '0.5rem',
    };

    const typographyStyles = {
        textTransform: 'capitalize',
        color: 'white',
        textAlign: 'center',
    };

    return (
        <Container style={containerStyles}>
            <Chip
                label={
                    <Typography variant="h2" style={typographyStyles}>
                        {username}
                    </Typography>
                }
                style={chipStyles}
            />
        </Container>
    );
};

export default CenteredH1Chip;
