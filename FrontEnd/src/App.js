import React, { createContext, useEffect, useReducer, useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { reducer, initialState } from "./MiddleWare/reducer";
import './App.css';
import HomePage from "./HomePage";
import LoginPage from "./Components/Login/Login";
import SignupPage from "./Components/Signup/Signup";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import LeaderBoardList from "./Components/LeaderBoard";
import Dashboard from "./Components/Dashboard";
import ContestPage from "./Components/ContestPage";
import UserDashboard from "./Components/userDashboard";
import ProfilePage from "./Components/Profile";
import ProblemList from "./Components/ProblemList";
import ContestBox from "./Components/AddContest";
import ProblemForm from "./Components/AddProblem";
import QuestionForm from "./Components/AddQuestion.jsx";
import CodeEditor from "./Components/TextEditor";
import ProblemPage from "./Components/ProblemPage";
import ProtectedComponent from "./Components/Proctected/ProtectedRoute";
import SubmissionPage from "./Components/Submission";
import ProblemSubmissionPage from "./Components/ProblemSubmission";
import ProblemSolutionPage from "./Components/SubmitedProblem";
import ContestSubmissionPage from "./Components/ContestSubmission";
import UserSubmissionPage from "./Components/UserSubmission";
import StandingsPage from "./Components/StandingPage";
import OnGoingProblemList from "./Components/ContestOngoing";
import LoginRequired from "./Components/Proctected/Proctected";
import Fulscrean from "./Components/Fullscrean.jsx";
import Navbar from "./HomePageStudent";
export const userContext = createContext();

function Navigation() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await axios.get('/token');
        if (res.data.login === true) {
          dispatch({ type: "USER", payload: { login: res.data.login, usertype: res.data.usertype, UserName: res.data.UserName } });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDetails();
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <userContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/Home" element={<Navbar />} />
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/Login" element={<LoginPage />} />
          <Route exact path="/Profile/:id" element={<Dashboard />} />
          <Route exact path="/Dashboard" element={<UserDashboard />} />
          <Route exact path="/Register" element={<SignupPage />} />
          <Route exact path="/LeaderBoard" element={<LeaderBoardList />} />
          <Route exact path="/Contests" element={<ContestPage />} />
          <Route exact path="/Profile" element={<ProfilePage />} />
          <Route exact path="/AddContest" element={<ProtectedComponent> <ContestBox /></ProtectedComponent>} />
          <Route exact path="/AddProblem" element={<ProtectedComponent> <ProblemForm /> </ProtectedComponent>} />
          <Route exact path="/Addquestion" element={<ProtectedComponent> <QuestionForm /> </ProtectedComponent>} />
          <Route exact path="/Submit/:ContestName" element={<CodeEditor />} />
          <Route exact path="/Problem/:ContestName/:ProblemName" element={<ProblemPage />} />
          <Route exact path="/Submissions" element={<LoginRequired><UserSubmissionPage /></LoginRequired>} />
          <Route exact path="/Submissions/:ContestName" element={<ContestSubmissionPage />} />
          <Route exact path="/Submissions/:ContestName/:ProblemName" element={<ProblemSubmissionPage />} />
          <Route exact path="/Solution/:id" element={<ProblemSolutionPage />} />
          <Route exact path="/Contests/:ContestName" element={<OnGoingProblemList />} />
          <Route exact path="/Contest/:ContestName" element={<ProblemList />} />
          <Route exact path="/Standings/:ContestName" element={<StandingsPage />} />
          <Route exact path="/fullscrean" element={<Fulscrean />} />
          <Route exact path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default Navigation;
