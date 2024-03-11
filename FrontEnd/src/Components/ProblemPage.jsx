import React, { useEffect, useState } from 'react';
import { AppBar, Box, Button, Card, CardContent, Container, CssBaseline, IconButton, Snackbar, Tab, Tabs, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import ResponsiveAppBar from './Navbar';
import { useTheme } from '@emotion/react';
import { IoCopyOutline } from "react-icons/io5";
import axios from 'axios';

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

  return (
    <>
      <CssBaseline />
      <ResponsiveAppBar />

      <Container sx={{ marginTop: '7rem', marginBottom: '2rem' }} maxWidth="lg">

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} >
            <Tab value={0} label="Dashboard" />
            <Tab value={1} label="Submissions" />
            <Tab value={2} label="Submit" />
            <Tab value={3} label="Standings" />
          </Tabs>

        </Box>
        <center style={{ marginTop: '2rem' }}>
          <Typography variant="h4" gutterBottom>
            {Problem.ProblemName}
          </Typography>
        </center>
        <Typography style={{ fontSize: '1.2rem', maxWidth: '100rem' }} paragraph>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{Problem.ProblemDescrption}</pre>
        </Typography>

        <Typography variant="h5" gutterBottom>
          Constraints:
          <pre style={{ whiteSpace: 'pre-wrap' }}>
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
      </Container>
    </>
  );
};

export default ProblemPage;
