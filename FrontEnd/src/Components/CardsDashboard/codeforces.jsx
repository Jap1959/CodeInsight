import React from 'react';
import { Card, CardContent, Typography, Paper } from '@mui/material';
const CodeForcesCard = ({ username, rank, maxRank, rating }) => (
    <Card>
        <CardContent>
            <Typography variant="h5" component="div">
                Codeforces
            </Typography>
            <Typography color="text.secondary">
                <strong>Username:</strong> {username}
            </Typography>
            <Typography color="text.secondary">
                <strong>Rank:</strong> {rank}
            </Typography>
            <Typography color="text.secondary">
                <strong>Max Rank:</strong> {maxRank}
            </Typography>
            <Typography color="text.secondary">
                <strong>Rating:</strong> {rating}
            </Typography>
        </CardContent>
    </Card>
);
export default CodeForcesCard;