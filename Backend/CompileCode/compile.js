const Schema = require("../Database/Schemas");
const SendQueue = require("./QueueCode");
const GetProblem = require("../Contest/GetProblem");
SubmitProblem = async (data, UserName) => {
  const code = data.code.toString();
  const language = data.language;
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const combinedDateTime =
    formattedDate.replace(/\//g, "") + formattedTime.replace(/:/g, "");
  const random = Math.floor(Math.random() * 10) + 1;
  const id = random + combinedDateTime;
  const newSubmission = new Schema.Submission({
    Submissionid: id,
    ContestName: data.ContestName,
    UserName: data.UserName,
    ProblemName: data.Problem,
    Date: currentDate,
    Language: language,
    Code: data.code,
    verdict: "In queue",
    Time: "",
    UserName: UserName,
  });
  await newSubmission.save();
  DateStart = new Date(data.Time);
  DateCurrent = new Date(currentDate);
  EndDate = new Date(data.EndTime);
  let val = DateStart < DateCurrent;
  let val1 = EndDate > DateCurrent;
  let res = true;
  if (val && val1) {
    res = await Standings(UserName, data.ContestName);
  }
  if (res === true) {
    try {
      const Problem = await Schema.Problem.findOne({
        ProblemName: data.Problem,
      });
      const testCases = Problem.TestcasesInput.map((input, index) => ({
        input: input,
        output: Problem.TestcasesOutput[index],
      }));
      const numericValue = parseFloat(Problem.TimeLimit.toString());
      SendQueue.sendCodeToCompileQueue(
        code,
        language,
        testCases,
        numericValue,
        id,
        data.Time,
        data.EndTime,
      );
      return { status: 200, message: "Added to Queue!" };
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    return { status: 422, message: "Try after SomeTime" };
  }
};
const Standings = async (UserName, ContestName) => {
  try {
    const standing = await Schema.Standing.findOne({
      UserName: UserName,
      ContestName: ContestName,
    });

    if (standing !== null) {
      return true;
    } else {
      const Problem = await GetProblem.GetProblemName(ContestName);
      const problems = [];
      Problem.map((element, index) => {
        const Prob = { ProblemName: element, TimeStamp: "", score: 0 };
        problems.push(Prob);
      });
      if (problems.length > 0) {
        const NewStandings = new Schema.Standing({
          UserName: UserName,
          ContestName: ContestName,
          Problems: problems,
          penalty: 0,
          TotalScore: 0,
        });
        const result = await NewStandings.save();
        return true;
      }

      if (result) {
        return true;
      } else {
        return false;
      }
    }
  } catch (e) {}
};

module.exports = { SubmitProblem };
