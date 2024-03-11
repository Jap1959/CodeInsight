import React from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';

const LeetCodePieChart = ({ easy, medium, hard }) => {
    const pieData = [
        { id: 0, value: easy, label: 'Easy' },
        { id: 1, value: medium, label: 'Medium' },
        { id: 2, value: hard, label: 'Hard' },
    ];

    return (
        <Container maxWidth="sm" style={{marginTop:'2rem'}} >
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    LeetCode Solved Problems
                </Typography>
                <Box sx={{ display: 'flex' ,justifyContent:'center'}} >
                    <PieChart
                        series={[
                            {
                                data: pieData,
                            },
                        ]}
                        dataKey="count"
                        nameKey="category"
                        width={400}
                        height={300}
                    />
                </Box>
            </Paper>
        </Container>
    );
};

export default LeetCodePieChart;
