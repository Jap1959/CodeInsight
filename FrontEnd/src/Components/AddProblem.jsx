import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
} from '@mui/material';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import MuiAlert from '@mui/material/Alert';

const ProblemAddForm = () => {
  const [contestName, setContestName] = useState('');
  const [Constraints, setConstraints] = useState('');
  const [problemName, setProblemName] = useState('');
  const [problemDescriptionFile, setProblemDescriptionFile] = useState(null);
  const [sampleInputFile, setSampleInputFile] = useState(null);
  const [sampleOutputFile, setSampleOutputFile] = useState(null);
  const [testCases, setTestCases] = useState([{ inputFile: null, outputFile: null }]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [TimeLimit, setTimelimit] = useState(1);
  const [contestNames, setContestNames] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('/GetContestNames');
        if (res.data.status === 200) {
          setContestNames(res.data.Data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);
  const handleContestChange = (event) => {
    setContestName(event.target.value);
  };

  const handleAddTestCase = () => {
    setTestCases([...testCases, { inputFile: null, outputFile: null }]);
  };

  const handleFileChange = (index, field, file) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index][field] = file;
    setTestCases(updatedTestCases);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleProblemFileChange = (e) => {
    console.log('File input changed:', e.target.files[0]);
    setProblemDescriptionFile(e.target.files[0]);
  };

  const handleSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  const handleSampleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', sampleInputFile, `${problemName}Sampleinput.txt`);
      formData.append('file', sampleOutputFile, `${problemName}Sampleoutput.txt`);
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
      const res = await response.json();
      if (res.status === 200) {
        console.log('success');
        handleSnackbar(res.message, 'success');
      } else {
        console.log('error');
        handleSnackbar(res.message, 'error');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  const handleSubmitTestCase = async (e, idx) => {
    e.preventDefault();
    try {
      console.log(testCases[idx]);
      const formData = new FormData();
      formData.append('file', testCases[idx].inputFile, `${problemName}Testcase${idx + 1}input.txt`);
      formData.append('file', testCases[idx].outputFile, `${problemName}Testcase${idx + 1}output.txt`);
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
      const res = await response.json();
      if (res.status === 200) {
        console.log('success');
        handleSnackbar(res.message, 'success');
      } else {
        console.log('error');
        handleSnackbar(res.message, 'error');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append('file', problemDescriptionFile, `${problemName}ProblemDescription.txt`);
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
      const res = await response.json();
      if (res.status === 200) {
        console.log('success');
        handleSnackbar(res.message, 'success');
      } else {
        console.log('error');
        handleSnackbar(res.message, 'error');
      }
    } catch (err) {
      console.log(err);
    } finally {

    }
  };
  const handleAddProblems = async (e) => {
    e.preventDefault();
    try {
      const TestcaseLength = testCases.length;
      const Data = { contestName, problemName, TestcaseLength, Constraints, TimeLimit };
      const res = await axios.post('/addproblem', Data);
      console.log(res);
      if (res.data.status === 200) {
        console.log('success');
        handleSnackbar(res.data.message, 'success');
      } else {
        console.log('error');
        handleSnackbar(res.data.message, 'error');
      }
    } catch (err) {
      console.log(err);
    } finally {

    }



  }
  return (
    <>
      <Container maxWidth="md">
        <Box
          sx={{
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5">Add Problem</Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Contest Name</InputLabel>
                  <Select value={contestName} onChange={handleContestChange} label="Contest Name">
                    {contestNames.map((contest, index) => (
                      <MenuItem key={index} value={contest}>
                        {contest}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Problem Name"
                  variant="outlined"
                  value={problemName}
                  onChange={(e) => setProblemName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Time Limit (in sec)"
                  variant="outlined"
                  value={TimeLimit}
                  onChange={(e) => setProblemName(e.target.value)}
                // required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="file"
                  label="Problem Description (TXT)"
                  variant="outlined"
                  name='problem'
                  onChange={handleProblemFileChange}
                  InputLabelProps={{ shrink: true }}
                  accept=".txt"
                // required
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" value={'ProblemDescription'} onClick={(e) => handleSubmit(e)} variant="contained" color="primary">
                  Submit Problem Description
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="file"
                  label="Sample Input File (TXT)"
                  variant="outlined"
                  onChange={(e) => setSampleInputFile(e.target.files[0])}
                  InputLabelProps={{ shrink: true }}
                  accept=".txt"
                // required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="file"
                  label="Sample Output File (TXT)"
                  variant="outlined"
                  onChange={(e) => setSampleOutputFile(e.target.files[0])}
                  InputLabelProps={{ shrink: true }}
                  accept=".txt"
                // required
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" onClick={(e) => handleSampleSubmit(e)} variant="contained" color="primary">
                  Submit Sample Input and Output
                </Button>
              </Grid>
              {testCases.map((testCase, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="file"
                      label={`Test Case ${index + 1} - Input File (TXT)`}
                      variant="outlined"
                      onChange={(e) => handleFileChange(index, 'inputFile', e.target.files[0])}
                      InputLabelProps={{ shrink: true }}
                      accept=".txt"
                    // required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="file"
                      label={`Test Case ${index + 1} - Output File (TXT)`}
                      variant="outlined"
                      onChange={(e) => handleFileChange(index, 'outputFile', e.target.files[0])}
                      InputLabelProps={{ shrink: true }}
                      accept=".txt"
                    // required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={(e) => handleSubmitTestCase(e, index)}
                      color="primary"
                    >
                      Submit Test Case {index + 1} Input and Output
                    </Button>
                  </Grid>
                </React.Fragment>
              ))}
              <Grid item xs={12}>
                <IconButton color="primary" onClick={handleAddTestCase} sx={{ marginTop: 2 }}>
                  <AddIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" onClick={handleAddProblems} disabled={loading} variant="contained" color="primary">
                  Submit All
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

export default ProblemAddForm;
