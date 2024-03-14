import React, { useState } from 'react';
import { Typography, Container, Box, Grid, List, ListItem, ListItemText, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';

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

  return (
    <Container>
      <Box mt={2} mb={4}>
        <Typography variant="h4" gutterBottom>
          Quiz
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
          <Button onClick={handleClearAnswer} variant="outlined" color="secondary">
            Clear Answer
          </Button>
          <Button onClick={handleNextPage} disabled={currentPage === quizData.length - 1}>
            {currentPage < quizData.length - 1 ? "Next" : "Finish"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Quiz;
