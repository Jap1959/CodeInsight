import React, { useEffect, useState } from 'react';
import { Typography, Container, Box, Grid, List, ListItem, ListItemText, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ResponsiveAppBar from './Navbar';

const quizData = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'Berlin', 'London', 'Madrid'],
    correctAnswer: 'Paris',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Mars', 'Venus', 'Mercury', 'Jupiter'],
    correctAnswer: 'Mars',
  },
  {
    question: 'What is the largest mammal?',
    options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
    correctAnswer: 'Blue Whale',
  },
  {
    question: 'Who wrote "To Kill a Mockingbird"?',
    options: ['J.K. Rowling', 'Harper Lee', 'Stephen King', 'Charles Dickens'],
    correctAnswer: 'Harper Lee',
  },
  {
    question: 'What is the chemical symbol for water?',
    options: ['H2O', 'CO2', 'NaCl', 'CH4'],
    correctAnswer: 'H2O',
  },
  {
    question: 'What is the capital of Australia?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
    correctAnswer: 'Canberra',
  },
];


const styles = {
  questionContainer: {
    marginBottom: '24px',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '24px',
  },
};

function Quiz() {

// const [quizData,setQuizData]=useState([])
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await axios.get('/GetContestNames');
  //       if (res.data.status === 200) {
  //         (res.data.Data);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   fetchData();
  // }, []);




  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const Name = searchParams.get('name');
  console.log(Name)

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(quizData.length).fill(''));

  const handleNextPage = () => {
    if (currentPage < quizData.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAnswerChange = (event) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentPage] = event.target.value;
    setSelectedAnswers(updatedAnswers);
  };

  const handleClearAnswer = () => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentPage] = '';
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    console.log('Selected answers:', selectedAnswers);
  };

  return (
    <>
    <ResponsiveAppBar />
    <Container>
      <Box mt={20} mb={4}>
        <Typography variant="h4" gutterBottom>
          Quiz ({Name})
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} style={styles.questionContainer}>
          <Typography variant="body1">
            Question {currentPage + 1}: {quizData[currentPage].question}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <List>
            <RadioGroup value={selectedAnswers[currentPage]} onChange={handleAnswerChange}>
              {quizData[currentPage].options.map((option, index) => (
                <ListItem key={index}>
                  <FormControlLabel
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                </ListItem>
              ))}
            </RadioGroup>
          </List>
        </Grid>
        <Grid item xs={12} style={styles.pagination}>
          <Button onClick={handlePrevPage} disabled={currentPage === 0}>
            {currentPage > 0 && "Previous"}
          </Button>
          <Typography variant="body1">
            Page {currentPage + 1} of {quizData.length}
          </Typography>
          <Button onClick={handleClearAnswer} variant="contained" color="secondary">
            Clear Answer
          </Button>
          <Button onClick={handleNextPage} disabled={currentPage === quizData.length - 1}>
            Next
          </Button>
          {currentPage === quizData.length - 1 && (
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
    </>
  );
}

export default Quiz;
