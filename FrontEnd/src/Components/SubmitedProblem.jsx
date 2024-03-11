import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  IconButton,
  Snackbar,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import '../index.css';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import ResponsiveAppBar from './Navbar';
import { Link, useParams } from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import { IoCopyOutline } from "react-icons/io5";
import { IoIosCheckmarkCircle } from "react-icons/io";
import axios from 'axios';
const ProblemSolutionPage = () => {
  const [Copied, setCopied] = useState(false);
  const [Icon, setIcon] = useState(false);
  const [solution, setsolution] = useState({});
  const { id } = useParams();
  useEffect(() => {
    async function fecthData() {
      try {
        const res = await axios.get(`/Solution/${id}`);
        if (res.data.status === 200) {
          setsolution(res.data.Data[0]);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fecthData();
  }, [])
 


  const handleCopyCode = () => {
    setIcon(!Icon);
    setTimeout(() => {
      setIcon(Icon);
    }, 1000);
    setCopied(!Copied);
  };
  const handleCopySnackbarClose = () => {
    setCopied(false);
  };
  const getVerdictColor = (verdict) => {
    switch (verdict) {
      case 'AC':
        return { color: 'green', text: 'Accepted', value: 'AC' };
      case 'WA':
        return { color: 'red', text: 'Wrong Answer', value: 'WA' };
      case 'TLE':
        return { color: 'orange', text: 'Time Limit Exceeded', value: 'TLE' };
      case 'CE':
        return { color: 'blue', text: 'Compilation Error', value: 'CE' };
      default:
        return { color: 'black', text: verdict };
    }
  };
  return (
    <>
      <ResponsiveAppBar />
      <center>
        <Box
          sx={{
            display: 'flex',
            justifySelf: 'center',

            flexDirection: 'column', // Stack elements on smaller screens
            // Use breakpoints for flexible width
            marginTop: '6rem',
            marginBottom: '4rem',
            width: '100%',
            maxWidth: { xs: '100%', sm: '700px', md: '800px', lg: '900px', xl: '1000px' },
          }}
        >
          <Box sx={{ maxWidth: '100%' }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Submission
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ display: 'flex', fontSize: '1rem', gap: 2, alignItems: 'center' }}>
                  Verdict:
                  <span className={getVerdictColor(solution.verdict).value} >
                    {getVerdictColor(solution.verdict).text}
                  </span>
                  Contest Name:<Link> {solution.ContestName}</Link>
                  Problem Name:  <span className={'CE'} >
                    {solution.ProblemName}
                  </span>  User Name:{solution.UserName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ position: 'relative' }}>
                  <Paper elevation={3}>
                    <AceEditor
                      mode={solution.Language === 'cpp' ? 'c_cpp' : solution.Language || 'c_cpp'}
                      theme="monokai"
                      name="code-editor"
                      value={solution.Code}
                      editorProps={{ $blockScrolling: true, readOnly: true }}
                      fontSize={18}
                      readOnly={true}
                      width="100%"// Specify the mode based on your use case
                    />
                  </Paper>

                  {/* IconButton with circular check icon */}
                  <CopyToClipboard text={solution.Code} onCopy={() => handleCopyCode()}>
                    <IconButton sx={{ position: 'absolute', top: 0, right: 0 }}>
                      {Icon ? <IoIosCheckmarkCircle style={{color:'lightgreen'}} /> : <IoCopyOutline style={{ color: 'white' }} />}
                    </IconButton>
                  </CopyToClipboard>
                </Card>
              </Grid>
              {solution.CompilationError && <Grid item xs={12}>
                <Card sx={{ display: 'flex', padding: '1rem', minHeight: '4rem' }} >
                  <b>Compilation Error</b><br />
                  <Typography>
                    <pre>{solution.CompilationError}</pre>
                  </Typography>
                </Card>
              </Grid>}
            </Grid>
            <br />
            <Grid item xs={12}>
              <TableContainer sx={{ border: 1 }} component={Paper}>
                <TableRow sx={{ display: 'flex' }}>
                  <TableCell>Status <span className={getVerdictColor(solution.verdict).value} >
                    {getVerdictColor(solution.verdict).text}
                  </span></TableCell>
                </TableRow>
                <Table sx={{ minWidth: '100%', borderCollapse: 'collapse' }} style={{ backgroundColor: solution.verdict === 'AC' ? '#abf7b1' : 'pink' }} aria-label="simple table">
                  <TableHead >
                    <TableRow sx={{ border: 1 }} />
                    <TableRow  >
                      <TableCell>Task</TableCell>
                      <TableCell align="right">Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {solution.Result && solution.Result.map((testcase, index) => (
                      <>
                        <TableRow sx={{ border: 1 }} />
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell align="right">{testcase.maxtime}</TableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Box>
        </Box>
      </center>
      <Snackbar
        open={Copied}
        autoHideDuration={2000}
        onClose={handleCopySnackbarClose}
        message="Copied to clipboard!"
        action={
          <IconButton size="small" color="inherit" onClick={handleCopySnackbarClose}>
            <Box component="span">x</Box>
          </IconButton>
        }
      />
    </>
  );
};

export default ProblemSolutionPage;
