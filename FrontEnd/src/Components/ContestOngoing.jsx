import React, { useEffect, useState } from 'react';
import { Box, Card, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import ResponsiveAppBar from './Navbar';
import { styled } from '@mui/system';
import { PiUsersBold } from "react-icons/pi";
import { Link, useParams } from 'react-router-dom';
import TimerCell from './Timer';
import TimerOnCell from './TimerOnGoining';
const StyledTableHead = styled(TableHead)(({ theme }) => ({
    background: theme.palette.primary.light,
}));

function OnGoingProblemList() {
    const [ProblemList, setProblemList] = useState([]);
    const [EndTime, setEndTime] = useState('');
    const [contestname] = useState(useParams());
    useEffect(() => {
        async function fetchDetails() {
            try {
                const result = await fetch(`/ProblemList/${contestname.ContestName}`);
                const res = await result.json();
                console.log(res);
                if (res.status === 200) {
                    setProblemList(res.Data);
                    setEndTime(res.EndTime);
                }
            } catch (e) {
                console.error(e);
            }
        }
        fetchDetails();
    }, []);
    return (
        <>
            <ResponsiveAppBar />

            <center>
                <Grid item xs={12}>
                    <Typography sx={{ marginTop: '7rem' }} color={'primary'} variant="h3" gutterBottom>
                        {contestname.ContestName}
                    </Typography>
                </Grid>
                <Grid container spacing={2} >
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                        <TableContainer component={Paper} sx={{ marginTop: '2rem', maxWidth: 'md' }}>
                            <Table>
                                <StyledTableHead>
                                    <TableRow >
                                        <TableCell colSpan={12}>
                                            <Typography color={'white'} variant="h6" gutterBottom>
                                                Problem Name
                                            </Typography>
                                        </TableCell>
                                        <TableCell colSpan={1}>
                                            <Typography color={'white'} sx={{ textAlign: 'end' }} variant="h6" gutterBottom>
                                                Correct Submission
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </StyledTableHead>
                                <TableBody>
                                    {ProblemList.map((problem, index) => (
                                        <TableRow key={index}>
                                            <TableCell colSpan={12}> <Link to={`/Problem/${problem.ContestName}/${problem.ProblemName}`}>   <Typography variant="h6" gutterBottom>
                                                {problem.ProblemName}
                                            </Typography></Link></TableCell>
                                            <TableCell colSpan={1}> <Link to={`/Submissions/${problem.ContestName}/${problem.ProblemName}`}>   <Typography sx={{ textAlign: 'end' }} variant="h6" gutterBottom>
                                                <PiUsersBold /> X{problem.NumberSubmission}
                                            </Typography></Link></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <br />
                        <Card>
                            {EndTime && <TimerOnCell EndTime={EndTime} Tag={'Time Left'} />}
                        </Card>
                    </Grid>
                </Grid>
            </center>
        </>);
}
export default OnGoingProblemList;