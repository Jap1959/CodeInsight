import React from 'react';
import { Card, CardContent, Typography, Paper } from '@mui/material';

const CodeChefCard = ({ username, rating, maxRating, stars }) => (
    <Card>
        <CardContent>
            <Typography variant="h5" component="div">
                CodeChef
            </Typography>
            <Typography color="text.secondary">
                <strong>Username:</strong> {username}
            </Typography>
            <Typography color="text.secondary">
                <strong>Rating:</strong> {rating}
            </Typography>
            <Typography color="text.secondary">
                <strong>Max Rating:</strong> {maxRating}
            </Typography>
            <Typography color="text.secondary">
                <strong>Stars:</strong> {stars}
            </Typography>
        </CardContent>
    </Card>
);

export default CodeChefCard;
