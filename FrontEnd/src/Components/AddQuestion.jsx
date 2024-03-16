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
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const ProblemAddForm = () => {
  const if1=0;
  
  const [questions, setQuestions] = useState([{ text: '', options: ['', '', '', ''], correctAnswer: ''}]);
  const [formData, setFormData] = useState('');
  const [contestName, setContestName] = useState([]);
  const [contesTtitle, setContesttitle] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('/GetContestNames');
        if (res.data.status === 200) {
          setContestName(res.data.Data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const handleContestChange = (event) => {
    setContesttitle(event.target.value);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '', options: ['', '', '', ''], correctAnswer: ''}]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };


  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const   handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data= JSON.stringify(questions);
      console.log(data);
      const res = await axios.post('/addquestion', questions);
      console.log(res);
      if (res.data.status === 200) {
        console.log('success');
        // handleSnackbar(res.data.message, 'success');
      } else {
        console.log('error');
        // handleSnackbar(res.data.message, 'error');
      }
    } catch (err) {
      console.log(err);
    } finally {

    }
    // setQuestions([{ text: '', options: ['', '', '', ''], correctAnswer: '', timeLimit: '' }]);
  };
  

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <form>
       

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Add Questions</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Contest Name</InputLabel>
                  <Select value={contesTtitle} onChange={handleContestChange} label="Contest Name">
                    {contestName.map((contest, index) => (
                      
                      <MenuItem key={index} value={contest}>
                        {contest}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            {questions.map((question, index) => (
              <Grid item xs={12} key={index}>
              <div className="main_container">
                <TextField
                  fullWidth
                  label={`Question ${index + 1}`}
                  variant="outlined"
                  value={question.text}
                  onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                  required
                />
                <div className="opt-container">
                {question.options.map((option, optionIndex) => (
                  <TextField
                    key={optionIndex}
                    fullWidth
                    label={`Option ${optionIndex + 1}`}
                    variant="outlined"
                    value={option}
                    onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                    required
                  />
                ))}
                </div>
                <TextField
                  fullWidth
                  label="Correct Answer"
                  variant="outlined"
                  value={question.correctAnswer}
                  onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                  required
                />
                </div>
              </Grid>
            ))}
            
            <Grid item xs={12}>
              <IconButton color="primary" onClick={handleAddQuestion} sx={{ marginTop: 2 }}>
                <AddIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <Button  onClick={handleSubmit} variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default ProblemAddForm;
