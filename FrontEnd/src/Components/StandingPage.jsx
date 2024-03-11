import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
    Typography,
    Card,
    Grid,
} from '@mui/material';
import { SiBookmeter } from "react-icons/si";
import { AiFillGolden } from "react-icons/ai";
import ResponsiveAppBar from './Navbar';
import { useParams } from 'react-router-dom';
import { userContext } from '../App';
import { IoTrophySharp } from "react-icons/io5";
import theme from '../Theme';

const StandingsTable = () => {
    const [data, setData] = useState([]);
    const [Problem, setProblem] = useState([]);
    const [userRanks, setRanks] = useState({});
    const [userRank, setuserRanks] = useState('');
    const [index, setIndex] = useState(1);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const { ContestName } = useParams();
    const { state } = useContext(userContext);

    useEffect(() => {
        async function FetchData() {
            try {
                const res = await fetch(`/Standing/${index}/${ContestName}`);
                const result = await res.json();
                console.log(result);
                if (result.status === 200) {
                    const ranks = [...result.Data.result];
                    setRanks(ranks.find((r) => r.UserName === state.UserName));
                    setuserRanks(ranks.findIndex((r) => r.UserName === state.UserName));
                    setData([...result.Data.result]);
                    setProblem([...result.Data.result1]);
                    setPage(result.Data.pages)
                }
            } catch (e) {
                console.log(e);
            }
        }
        FetchData();
    }, [])
    const getcharcater = (idx) => {
        const characterCode = 65 + parseInt(idx);
        const character = String.fromCharCode(characterCode);
        return character;
    }
    const handleChangePage = (event, newPage) => {
        setIndex(newPage);
    };



    return (
        <>
            <ResponsiveAppBar />
            <center>
                <Paper elevation={1} sx={{ backgroundColor: theme.palette.primary.light, padding: '5rem', marginTop: '2rem', marginBottom: '1rem', textAlign: 'start' }}>

                    <Typography color={'wheat'} variant="h4">
                        <IoTrophySharp /> Ranks - {ContestName}
                    </Typography>
                    <br />
                    <Card sx={{ padding: '1rem', maxWidth: '25rem', backgroundColor: '#5750DC' }}>
                        <Grid container justifyContent={'space-evenly'} >
                            <Grid item xs={4}>
                                <Typography color={'white'} gap={1} variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <SiBookmeter gap={1} />
                                    Rank:{userRank !== -1 ? userRank + 1 : 'NA'}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography color={'white'} variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <AiFillGolden size={30} gap={2} />
                                    Score: {userRanks ? userRanks.TotalScore : 'NA'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Paper>
                <Box sx={{ width: '94%', maxWidth: 'xl', marginTop: '1%' }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Rank</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Penalty</TableCell>
                                    <TableCell>Score</TableCell>
                                    {Problem && Problem.map((element, idx) => (
                                        <TableCell key={idx}>{getcharcater(idx).toString()}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>


                            <TableBody>
                                {data.map((row, index) => (

                                    <TableRow key={index + 1}>
                                        <TableCell>{index + 1 + (page - 1) * rowsPerPage}</TableCell>
                                        <TableCell>{row.UserName}</TableCell>
                                        <TableCell>{row.penalty}</TableCell>
                                        <TableCell>{row.TotalScore}</TableCell>

                                        {row.Problems.map((problem, index) => (
                                            <>

                                                <TableCell sx={{ display: 'flex', flexDirection: 'column' }}>
                                                    <div className='AC'>{problem.score}</div>
                                                    <span style={{ fontSize: '0.65rem' }}>{problem.TimeStamp}</span>
                                                </TableCell>
                                            </>

                                        ))}

                                        {/* Add more cells for other problem scores */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination
                        count={page}
                        page={index}
                        onChange={handleChangePage}
                        component="div"
                    />
                </Box>
            </center>
        </>
    );
};

export default StandingsTable;
