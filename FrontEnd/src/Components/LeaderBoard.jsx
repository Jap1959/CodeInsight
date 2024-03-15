import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Container, Paper, CircularProgress, Link, Alert } from '@mui/material';
import ResponsiveAppBar from './Navbar';
import axios from 'axios';

const columns = [
    { field: 'rank', headerName: 'Rank', width: 100 },
    { field: 'username', headerName: 'Username', width: 250 },
    { field: 'codechef', headerName: 'Codechef solved', width: 250 },
    { field: 'codeforces', headerName: 'CodeForces solved', width: 250 },
    { field: 'leetcode', headerName: 'Leetcode solved', width: 240 },
    { field: 'total', headerName: 'Total solved', width: 200 },
    {
        field: 'profile',
        headerName: 'Profile',
        width: 150,
        renderCell: (params) => (
            <Link style={{ textDecoration: 'none' }} href={`/Profile/${params.row.id}`} color="primary">
                View
            </Link>
        ),
    },
];


const LeaderBoard = () => {
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const [alert, setAlert] = useState({
        severity: '',
        message: '',
    });
    // Simulate a data fetching delay
    useEffect(() => {
      
        fetchData();
    }, []);
    async function fetchData() {
        try {
            const res = await axios.get('/UserList');

            if (res.data.status === 200) {

                if (rows.length === 0) {
                    let i = 1;
                    let rowdata = [];
                    await Promise.all(res.data.Data.map(async (data) => {
                        let leaderboard = { id: i, rank: i, username: 'User1', codechef: 0, codeforces: 0, leetcode: 0, total: 0, id: '' };
                        leaderboard.rank = i;
                        leaderboard.codechef = data.codechef;
                        leaderboard.codeforces = data.codeforces;
                        leaderboard.leetcode = data.leetcode;
                        leaderboard.total = data.total;
                        leaderboard.id = data.id;
                        leaderboard.username = data.username;
                        i++;
                        rowdata.push(leaderboard);
                    }));
                    setRows(rowdata);
                }
                setLoading(false);
            } else {

                setLoading(false);
            }
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <ResponsiveAppBar />
                <Alert style={{ marginTop: '5rem' }} severity={alert.severity}>{alert.message}</Alert>
            </div>
            <Container maxWidth="xl" style={{ marginTop: '2rem' }}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h4" gutterBottom>
                        Leaderboard
                    </Typography>
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                            <CircularProgress />
                        </div>
                    ) : (
                        <div style={{ width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                disableSelectionOnClick
                            />
                        </div>
                    )}
                </Paper>
            </Container>
        </>
    );
};

export default LeaderBoard;
