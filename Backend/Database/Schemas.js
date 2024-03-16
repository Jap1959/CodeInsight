const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
  Password: String,
  codechef: String,
  codeforces: String,
  leetocde: String,
  usertype: {
    type: String,
    default: "Normal",
  },
  userName: String,
  tokens: String,
});
const LeadberboardSchema = new mongoose.Schema({
  Rank: Number,
  codechefsolved: Number,
  codeforcessolved: Number,
  leetcodesolved: Number,
  totalsolved: Number,
  id: String,
});
const StandingSchema = new mongoose.Schema({
  Problems: [{}],
  UserName: String,
  ContestName: String,
  penalty: { type: Number, default: 0 },
  TotalScore: { type: Number, default: 0 },
  flag: { type: Number, default: 0 },
});
const Submissions = new mongoose.Schema({
  Submissionid: String,
  ContestName: String,
  ProblemName: String,
  Code: String,
  verdict: String,
  Time: String,
  Date: Date,
  Result: {},
  Language: String,
  CompilationError: String,
  UserName: String,
});
const Problems = new mongoose.Schema({
  ContestName: String,
  ProblemName: String,
  ProblemDescrption: String,
  SampleInput: String,
  SampleOutput: String,
  TestcasesInput: [],
  TestcasesOutput: [],
  TimeLimit: mongoose.Types.Decimal128,
  Constraints: String,
  NumberSubmission: { type: Number, default: 0 },
});
const contest = new mongoose.Schema({
  contestname: {
    type: String,
    required: true,
  },
  constesttime: Date,
  Endtime: Date,
  Duration: String,
  HostName: String,
  Banner: String,
});
const Contest = mongoose.model("contest", contest);
const Standing = mongoose.model("Standing", StandingSchema);
const Leaderboard = mongoose.model("Leaderboard", LeadberboardSchema);
const Problem = mongoose.model("Problem", Problems);
const User = mongoose.model("User", UserSchema);
const Submission = mongoose.model("Submission", Submissions);
module.exports = { User, Leaderboard, Problem, Contest, Standing, Submission };
