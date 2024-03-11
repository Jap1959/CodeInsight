const Schema = require('../Database/Schemas');

const GetProblemList = async (ContestName) => {
    const currentDate = new Date();
    try {
        const result1 = await Schema.Contest.findOne({ contestname: ContestName });
        if (currentDate <= result1.constesttime) {
            return ({ status: 422, Data: "Contest Has Not Started", ConstestTime: result1.constesttime });
        }
        else {
            const result = await Schema.Problem.aggregate([
                {
                    $match: { ContestName: ContestName }
                },
                {
                    $project: {
                        _id: 0, // Exclude _id field from the output
                        ProblemName: '$ProblemName', // Include ProblemName field
                        NumberSubmission: '$NumberSubmission',
                        ContestName: '$ContestName'// Include NumberofSubmission field
                    }
                }
            ]);
            return ({ status: 200, Data: result, StartTime: result1.constesttime, EndTime: result1.Endtime });
        }
    }
    catch (error) {
        console.log(error)
    }

}
const GetProblemName = async (ContestName) => {
    try {
        const result1 = await Schema.Contest.findOne({ contestname: ContestName });
        if (result1 === null) {
            return ({ status: 422, Data: "Contest Has Not Started", ConstestTime: result1.constesttime });
        }
        else {
            const result = await Schema.Problem.find({ ContestName: ContestName }).distinct('ProblemName');
            return result;
        }
    }
    catch (error) {
        console.log(error)
    }
}
const GetProblem = async (ContestName, ProblemName) => {
    try {
        const result = await Schema.Problem.find({ ContestName: ContestName, ProblemName: ProblemName });
        const result1 = await Schema.Problem.find({ ContestName: ContestName });
        return ({ status: 200, Data: result[0], length: result1.length });
    }
    catch (error) {
        console.log(error)
    }

}
module.exports = { GetProblem, GetProblemList, GetProblemName };