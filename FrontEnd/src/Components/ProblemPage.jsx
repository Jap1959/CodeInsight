import React, { useEffect, useState } from 'react';
import {
  AppBar, Box, Button, Card, CardContent, Container, CssBaseline, IconButton, Snackbar, Tab, Tabs, Typography,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  TextField,


} from '@mui/material';
import { usehistory, useNavigate, useParams } from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import ResponsiveAppBar from './Navbar';
import { useTheme } from '@emotion/react';
import { IoCopyOutline } from "react-icons/io5";
import axios from 'axios';
import AceEditor from 'react-ace';


const ProblemPage = () => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const [Problem, setProblem] = useState({});
  const { ContestName, ProblemName } = useParams();
  const [value, setValue] = useState(5);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    // Redirect or perform actions based on the selected tab
    switch (newValue) {
      case 0:
        navigate(`/Contest/${ContestName}`);
        break;
      case 1:
        navigate(`/Submissions/${ContestName}`);
        break;
      case 2:
        navigate(`/submit/${ContestName}`);
        break;
      case 3:
        navigate(`/Standings/${ContestName}`);
        break;
      default:
        break;
    }
  };
  const handleCopySnackbarClose = () => {
    setCopied(false);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/Problem/${ContestName}/${ProblemName}`);
        console.log(res.data.Data);
        if (res.data.status === 200) {
          setProblem(res.data.Data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const formatTextForDisplay = (text) => {
    return text.replace(/\n/g, '<br/>');
  };
  const theme = useTheme();


  const [code, setCode] = useState(`#include <iostream>\n\nint main() {\n  // Your C++ code here\n  return 0;\n}`);
  const [language, setLanguage] = useState('cpp');
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [Time, setTime] = useState('');
  const [EndTime, setEndTime] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedProblem, setSelectedProblem] = useState(0);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const history = useNavigate();
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    if (e.target.value === 'cpp') {

      setCode(`#include <iostream>\n\nint main() {\n  // Your C++ code here\n  return 0;\n}`);
    }
    else if (e.target.value === 'java') {
      setCode(`public class Main { \n  public static void main(String[] args) {\n    // Your Java code here\n\n\n  }\n}`);

    }

  };

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);

  //   // Redirect or perform actions based on the selected tab
  //   switch (newValue) {
  //     case 0:
  //       history(`/Contest/${ContestName}`);
  //       break;
  //     case 1:
  //       history(`/Submissions/${ContestName}`);
  //       break;
  //     case 2:
  //       history(`/submit/${ContestName}`);
  //       break;
  //     case 3:
  //       history(`/Standings/${ContestName}`);
  //       break;
  //     default:
  //       break;
  //   }
  // };
  useEffect(() => {

    async function fetchData() {
      try {

        const res = await axios.get(`/ProblemList/${ContestName}`);
        if (res.data.status === 200) {
          console.log(res.data)
          setSelectedProblems(res.data.Data);
          setTime(res.data.StartTime);
          setEndTime(res.data.EndTime);
        }

      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const handleProblemChange = (event) => {
    setSelectedProblem(event.target.value);
  };
  const handleSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let Problem = selectedProblems[parseInt(selectedProblem)].ProblemName;
      console.log(EndTime);
      const Data = { code, language, Problem, ContestName, Time, EndTime };
      const res = await axios.post('/Submit', Data);
      if (res.data.status === 200) {
        console.log('success');
        handleSnackbar(res.data.message, 'success');
        history(`/Submissions/${ContestName}/${Problem}`);
      } else {
        console.log('error');
        handleSnackbar(res.data.message, 'error');
      }
    } catch (err) {
      console.log(err);
    }
    console.log({ code, language, selectedProblem });
  };


  return (
    <>
      <CssBaseline />
      <ResponsiveAppBar />

      <div className="container">
        <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} >
            <Tab value={0} label="Dashboard" />
            <Tab value={1} label="Submissions" />
            <Tab value={2} label="Submit" />
            <Tab value={3} label="Standings" />
          </Tabs>

        </Box>
        <div className="problem-container">
          <div className="problem-dec">
            <center style={{ marginTop: '2rem' }}>
              <Typography variant="h4" gutterBottom>
                {Problem.ProblemName}
              </Typography>
            </center>
            <Typography style={{ fontSize: '1rem', maxWidth: '100rem' }} paragraph>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{Problem.ProblemDescrption}</pre>
            </Typography>

            <Typography variant="h5" gutterBottom>
              Constraints:
              <pre style={{ fontSize: '1rem', whiteSpace: 'pre-wrap' }}>
                1 &le; T &le; 20<br />
                1 &le; N &le; 10<sup>5</sup><br />
                0 &le; K &le; 10<sup>6</sup><br />
                0 &le; A[i] &le; 10<sup>6</sup><br />
              </pre>
            </Typography>


            <Card sx={{ backgroundColor: '#F9F9F9', marginBottom: '1rem', position: 'relative' }}>
              <CardContent>
                <Typography variant="body1">
                  Input: <br />
                  <pre style={{ whiteSpace: 'pre-wrap' }}>{Problem.SampleInput}</pre>
                </Typography>
              </CardContent>
              <CopyToClipboard text={Problem.SampleInput} onCopy={() => setCopied(true)}>
                <IconButton color="primary" sx={{ position: 'absolute', top: 0, right: 0 }}>
                  <IoCopyOutline />
                </IconButton>
              </CopyToClipboard>
              <Snackbar
                open={copied}
                autoHideDuration={2000}
                onClose={handleCopySnackbarClose}
                message="Copied to clipboard!"
                action={
                  <IconButton size="small" color="inherit" onClick={handleCopySnackbarClose}>
                    <Box component="span">X</Box>
                  </IconButton>
                }
              />
            </Card>

            <Card sx={{ backgroundColor: '#F9F9F9', position: 'relative' }}>
              <CardContent>
                <Typography variant="body1">
                  Sample Output: <br />
                  <pre style={{ whiteSpace: 'pre-wrap' }}>{Problem.SampleOutput}</pre>
                </Typography>
              </CardContent>
              <CopyToClipboard text={Problem.SampleOutput} onCopy={() => setCopied(true)}>
                <IconButton color="primary" sx={{ position: 'absolute', top: 0, right: 0 }}>
                  <IoCopyOutline />
                </IconButton>
              </CopyToClipboard>
              <Snackbar
                open={copied}
                autoHideDuration={2000}
                onClose={handleCopySnackbarClose}
                message="Copied to clipboard!"
                action={
                  <IconButton size="small" color="inherit" onClick={handleCopySnackbarClose}>
                    <Box component="span">X</Box>
                  </IconButton>
                }
              />
            </Card>
          </div>
          <div className="code-container">

            <Container sx={{ marginTop: '2rem',minWidth:"100%"}} maxWidth="md">
              <Box
                sx={{
                  boxShadow: 3,
                  padding: 3,
                  borderRadius: 4,
                  bgcolor: 'background.paper',
                }}
              >
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h5">Code Editor</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel id="language-label">Select Language</InputLabel>
                      <Select
                        labelId="language-label"
                        id="language"
                        value={language}
                        label="Select Language"
                        onChange={handleLanguageChange}
                        fullWidth
                      >
                        <MenuItem value="cpp">C++</MenuItem>
                        <MenuItem value="java">Java</MenuItem>
                        <MenuItem value="python">Python</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel id="problem-label">Select Problem</InputLabel>
                      <Select
                        labelId="problem-label"
                        id="problem"
                        value={selectedProblem}
                        label="Select Problem"
                        required
                        onChange={handleProblemChange}
                        fullWidth
                      >
                        {selectedProblems && selectedProblems.map((problem, index) => (
                          <MenuItem key={index} value={index}>
                            {problem.ProblemName}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={12}>
                      <AceEditor
                        mode={language === 'cpp' ? 'c_cpp' : language}
                        theme="monokai"
                        onChange={(value) => setCode(value)}
                        name="code-editor"
                        value={code}
                        editorProps={{ $blockScrolling: true }}
                        fontSize={14}
                        width="100%"
                        height="400px"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary">
                        Run Code
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Container>
            <Card sx={{ backgroundColor: '#F9F9F9', marginBottom: '1rem', position: 'relative', margin: "20px" }}>
              <CardContent>
                <Typography variant="body1">
                  Input: <br />
                  <TextField multiline minRows={5} fullWidth />
                </Typography>
              </CardContent>
              <CopyToClipboard text={Problem.SampleInput} onCopy={() => setCopied(true)}>
                <IconButton color="primary" sx={{ position: 'absolute', top: 0, right: 0 }}>
                  <IoCopyOutline />
                </IconButton>
              </CopyToClipboard>
              <Snackbar
                open={copied}
                autoHideDuration={2000}
                onClose={handleCopySnackbarClose}
                message="Copied to clipboard!"
                action={
                  <IconButton size="small" color="inherit" onClick={handleCopySnackbarClose}>
                    <Box component="span">X</Box>
                  </IconButton>
                }
              />
            </Card>

            <Card sx={{ backgroundColor: '#F9F9F9', position: 'relative' }}>
              <CardContent>
                <Typography variant="body1">
                  Sample Output: <br />
                  <pre style={{ whiteSpace: 'pre-wrap' }}>{Problem.SampleOutput}</pre>
                </Typography>
              </CardContent>
              <CopyToClipboard text={Problem.SampleOutput} onCopy={() => setCopied(true)}>
                <IconButton color="primary" sx={{ position: 'absolute', top: 0, right: 0 }}>
                  <IoCopyOutline />
                </IconButton>
              </CopyToClipboard>
              <Snackbar
                open={copied}
                autoHideDuration={2000}
                onClose={handleCopySnackbarClose}
                message="Copied to clipboard!"
                action={
                  <IconButton size="small" color="inherit" onClick={handleCopySnackbarClose}>
                    <Box component="span">X</Box>
                  </IconButton>
                }
              />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProblemPage;
