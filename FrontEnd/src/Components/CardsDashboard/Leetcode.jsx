import React from 'react';
import { Card, CardContent, Typography, Paper } from '@mui/material';
const LeetCodeCard = ({ username, hardSolved, mediumSolved, easySolved, hardColor, mediumColor, easyColor }) => (
    <Card>
        <CardContent>
            <Typography variant="h5" component="div">
                LeetCode
            </Typography>
            <Typography color="text.secondary">
                <strong>Username:</strong> {username}
            </Typography>
            <Typography  style={{color:'red'}}>
                <strong>Hard Solved:</strong> {hardSolved}
            </Typography>
            <Typography  style={{color:'orange'}}>
                <strong>Medium Solved:</strong> {mediumSolved}
            </Typography>
            <Typography style={{color:'darkgreen'}}>
                <strong>Easy Solved:</strong> {easySolved}
            </Typography>
        </CardContent>
    </Card>
);
export default LeetCodeCard;
