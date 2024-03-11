import React, { useEffect, useState } from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import ResponsiveAppBar from './Navbar';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import TimerCell from './Timer';
import TimerOnCell from './TimerOnGoining';
import { BsEmojiFrownFill } from "react-icons/bs";
import { useTheme } from '@emotion/react';

const StyledTableHead = styled(TableHead)(({ theme }) => ({
    background: theme.palette.primary.light,
}));
const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
const contests = [
    {
        id: 1,
        name: 'Contest 1',
        startTime: new Date(2023, 11, 15, 10, 0),
        endTime: new Date(2023, 11, 15, 12, 0),
        status: 'upcoming',
    },
    {
        id: 2,
        name: 'Contest 2',
        startTime: new Date(2023, 11, 10, 14, 0),
        endTime: new Date(2023, 11, 10, 16, 0),
        status: 'completed',
    },
    {
        id: 3,
        name: 'Contest 3',
        startTime: new Date(2023, 11, 12, 9, 0),
        endTime: new Date(2023, 11, 12, 11, 0),
        status: 'ongoing',
    },
    // Add more contests as needed
];

const ContestPage = () => {
    const theme = useTheme();
    const [upcomingContests, setupcomingContests] = useState([]);
    const [completedContests, setcompletedContest] = useState([]);
    const [ongoingContests, setongoingContests] = useState([]);
    useEffect(() => {
        async function fetchDetails() {
            try {
                const result = await fetch('/Contest');
                const res = await result.json();
                if (res.status === 200) {
                    if (res.upcomingContests !== 402) {
                        setupcomingContests(res.UpcomingContest);
                    }
                    if (res.completedContests !== 402) {
                        setcompletedContest(res.CompletedContest);
                    } if (res.OnGoingProblemList !== 402) {
                        setongoingContests(res.OnGoingProblemList);
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }
        fetchDetails();
    }, [])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <>
            <ResponsiveAppBar />
            <Container style={{ marginTop: '8rem' }} maxWidth="lg" >
                <Typography variant="h5" gutterBottom>
                    Upcoming Contests
                </Typography>
                <Paper>
                    {(
                        <>
                            <TableContainer component={Paper}>
                                <Table>
                                    <StyledTableHead>
                                        <TableRow >
                                            <TableCell>
                                                <Typography color={'white'} variant="h6" gutterBottom>
                                                    Contest Name
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color={'white'} variant="h6" gutterBottom>
                                                    Start Time
                                                </Typography>
                                            </TableCell>
                                            <TableCell> <Typography color={'white'} variant="h6" gutterBottom>
                                                Duration
                                            </Typography></TableCell>
                                            <TableCell> <Typography color={'white'} variant="h6" gutterBottom>
                                                Starts in
                                            </Typography></TableCell>
                                        </TableRow>
                                    </StyledTableHead>
                                    <TableBody>
                                        {upcomingContests.length > 0 ? upcomingContests.map((contest, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{contest.contestname}</TableCell>
                                                <TableCell>{new Date(contest.constesttime).toLocaleDateString('en', options)}</TableCell>
                                                <TableCell>{contest.Duration}</TableCell>
                                                <TimerCell startTime={contest.constesttime} />
                                            </TableRow>
                                        )) : <>
                                            {/* <BsEmojiFrownFill color='indigo' size={100} /> */}
                                            <TableRow key={1}>
                                                <TableCell colSpan={1}></TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                    <Typography variant="body">No Upcoming Contests...</Typography>
                                                </TableCell>
                                            </TableRow>
                                        </>}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </>
                    )}
                </Paper>
                <Typography margin={1} variant="h5" gutterBottom>
                    Ongoing Contests
                </Typography>
                <Paper style={{ marginTop: '20px' }}>
                    {(
                        <>
                            <TableContainer component={Paper}>
                                <Table>
                                    <StyledTableHead>
                                        <TableRow >
                                            <TableCell>
                                                <Typography color={'white'} variant="h6" gutterBottom>
                                                    Contest Name
                                                </Typography>
                                            </TableCell>
                                            <TableCell> <Typography color={'white'} variant="h6" gutterBottom>
                                                Duration
                                            </Typography></TableCell>
                                            <TableCell> <Typography color={'white'} variant="h6" gutterBottom>
                                                Ends in
                                            </Typography></TableCell>
                                        </TableRow>
                                    </StyledTableHead>
                                    <TableBody>
                                        {ongoingContests.length > 0 ? ongoingContests.map((contest, index) => (

                                            <TableRow key={index}>
                                                <TableCell><Link to={`/Contests/${contest.contestname}`}>{contest.contestname}</Link></TableCell>
                                                <TableCell>{contest.Duration}</TableCell>
                                                <TimerCell startTime={contest.Endtime} />
                                            </TableRow>
                                        )) : <>
                                            {/* <BsEmojiFrownFill color='indigo' size={100} /> */}
                                            <TableRow key={1}>
                                                <TableCell></TableCell>
                                                <TableCell > <Typography variant='body'>No Ongoing Contests...</Typography></TableCell>
                                            </TableRow></>
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </>
                    )}
                </Paper>

                <Typography margin={1} variant="h5" gutterBottom>
                    Completed Contests
                </Typography>
                <Paper style={{ marginTop: '20px' }}>
                    {completedContests.length > 0 ? (
                        <>
                            <TableContainer component={Paper}>
                                <Table>
                                    <StyledTableHead>
                                        <TableRow >
                                            <TableCell>
                                                <Typography color={'white'} variant="h6" gutterBottom>
                                                    Contest Name
                                                </Typography>
                                            </TableCell>

                                        </TableRow>
                                    </StyledTableHead>
                                    <TableBody>
                                        {completedContests.map((contest, index) => (
                                            <TableRow key={index}>
                                                <TableCell> <Link to={`/Contest/${contest.contestname}`}>{contest.contestname}</Link></TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </>
                    ) : (
                        <BsEmojiFrownFill />
                    )}
                </Paper>
            </Container >
        </>
    );
};

export default ContestPage;
