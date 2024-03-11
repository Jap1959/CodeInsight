import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  Snackbar,
  Tabs,
  Tab
} from '@mui/material';
import axios from 'axios';
import AceEditor from 'react-ace';
import MuiAlert from '@mui/material/Alert';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';

import 'ace-builds/src-noconflict/theme-monokai';
import { usehistory, useNavigate, useParams } from 'react-router-dom';
import ResponsiveAppBar from './Navbar';

const CodeEditor = () => {
  const [code, setCode] = useState(`#include <iostream>\n\nint main() {\n  // Your C++ code here\n  return 0;\n}`);
  const [language, setLanguage] = useState('cpp');
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [Time, setTime] = useState('');
  const [EndTime, setEndTime] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { ContestName } = useParams();
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
  const [value, setValue] = useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    // Redirect or perform actions based on the selected tab
    switch (newValue) {
      case 0:
        history(`/Contest/${ContestName}`);
        break;
      case 1:
        history(`/Submissions/${ContestName}`);
        break;
      case 2:
        history(`/submit/${ContestName}`);
        break;
      case 3:
        history(`/Standings/${ContestName}`);
        break;
      default:
        break;
    }
  };
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
      <ResponsiveAppBar />

      <Box sx={{ borderBottom: 1, borderColor: 'divider',marginTop:'7rem',maxWidth:'md',marginLeft:'2rem' }}>
        <Tabs
          value={value} onChange={handleChange} >
          <Tab value={0} label="Dashboard" />
          <Tab value={1} label="Submissions" />
          <Tab value={2} label="Submit" />
          <Tab value={3} label="Standings" />
        </Tabs>
      </Box>
      <Container sx={{ marginTop: '2rem' }} maxWidth="md">
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={snackbarSeverity}
          onClose={handleSnackbarClose}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};
export default CodeEditor;