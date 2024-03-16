import React, { useEffect, useState } from 'react';
import { Box, Card, Grid, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from '@mui/material';
import ResponsiveAppBar from './Navbar';
import { styled } from '@mui/system';
import { PiUsersBold } from "react-icons/pi";
import { Link, useNavigate, useParams } from 'react-router-dom';
import TimerCell from './Timer';
import TimerOnCell from './TimerOnGoining';
const StyledTableHead = styled(TableHead)(({ theme }) => ({
    background: theme.palette.primary.light,
}));


function ProblemList() {
    const [ProblemList, setProblemList] = useState([]);
    const [StartTime, setStartTime] = useState('');
    const [EndTime, setEndTime] = useState('');
    const [contestname] = useState(useParams());
    const [value, setValue] = useState(0);
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);

        // Redirect or perform actions based on the selected tab
        switch (newValue) {
            case 0:
                navigate(`/Contest/${contestname.ContestName}`);
                break;
            case 1:
                navigate(`/Submissions/${contestname.ContestName}`);
                break;
            case 2:
                navigate(`/submit/${contestname.ContestName}`);
                break;
            case 3:
                navigate(`/Standings/${contestname.ContestName}`);
                break;
            default:
                break;
        }
    };
    useEffect(() => {
        async function fetchDetails() {
            try {
                const result = await fetch(`/ProblemList/${contestname.ContestName}`);
                const res = await result.json();
                console.log(res.EndTime);
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
   const queryString = `?name=${encodeURIComponent(contestname.ContestName)}`;;
    return (
        <>
            <ResponsiveAppBar />

            <center>

                <Grid item xs={12}>
                    <Typography sx={{ marginTop: '7rem' }} color={'primary'} variant="h3" gutterBottom>
                        {contestname.ContestName}
                    </Typography>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} >
                            <Tab value={0} label="Dashboard" />
                            <Tab value={1} label="Submissions" />
                            <Tab value={2} label="Submit" />
                            <Tab value={3} label="Standings" />
                        </Tabs>
                    </Box>
                </Grid>
                <Grid container spacing={2}  >
                    <Grid item xs={2}></Grid>
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
                        <TableContainer component={Paper} sx={{ marginTop: '2rem', maxWidth: 'md' }}>
                            <Table>
                                <StyledTableHead>
                                    <TableRow >
                                        <TableCell colSpan={12}>
                                            <Typography color={'white'} variant="h6" gutterBottom>
                                                Aptitude Test
                                            </Typography>
                                        </TableCell>
                                        <TableCell colSpan={1}>
                                            <Typography color={'white'} sx={{ textAlign: 'end' }} variant="h6" gutterBottom>
                                                Submission
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </StyledTableHead>
                                <TableBody>

                                    <TableRow>
                                        <TableCell colSpan={12}> <Link to={`/quiz${queryString}`}>   <Typography variant="h6" gutterBottom>
                                                Aptitude Test 1
                                            </Typography></Link></TableCell>
                                        <TableCell colSpan={1}> <Link to={`/quiz${queryString}`} >   <Typography sx={{ textAlign: 'end' }} variant="h6" gutterBottom>
                                            <PiUsersBold /> X10
                                        </Typography></Link></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'flex', marginTop: '0.5rem', flexDirection: 'column' }}>
                        <br />

                        <Card>
                            {EndTime && <TimerOnCell EndTime={EndTime} Tag={contestname.ContestName} />}
                        </Card>
                    </Grid>
                </Grid>
            </center>
        </>);
}
export default ProblemList;