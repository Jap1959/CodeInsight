const Schemas = require('../Schemas');


const GetSubmissions = async (idx) => {
    try {
        var index = parseInt(idx);
        var Pagesize = 10;
        const result = await Schemas.Submission.find().skip(Pagesize * (index - 1)).limit(Pagesize);
        result.sort((a, b) => b.Date - a.Date);
        return ({ status: 200, Data: result })
    } catch (error) {
        console.error("Error in getuserdata:", error);
        throw error;
    }
};
const GetUserSubmissions = async (idx, UserName) => {
    try {
        var index = parseInt(idx);
        var Pagesize = 10;
        const count = await Schemas.Submission.countDocuments({ UserName: UserName });
        var pages = parseInt(count) / Pagesize;
        if (parseInt(count) % parseInt(Pagesize) !== 0)
            pages = pages + 1;
        pages = parseInt(pages);
        const result = await Schemas.Submission.find({ UserName: UserName }).sort({ Date: -1 }).skip(Pagesize * (index - 1)).limit(Pagesize);
        result.sort((a, b) => b.Date - a.Date);
        return ({ status: 200, Data: result, Pages: pages })
    } catch (error) {
        console.error("Error in getuserdata:", error);
        throw error;
    }
};
const GetContestSubmissions = async (idx, ContestName) => {
    try {
        var index = parseInt(idx);
        var Pagesize = 10;
        const currentDate = new Date();
        const Started = await Schemas.Contest.countDocuments({ ContestName: ContestName, Endtime: { $lte: currentDate } });
        const count = await Schemas.Submission.countDocuments({ ContestName: ContestName });
        var pages = parseInt(count) / Pagesize;
        if (parseInt(count) % parseInt(Pagesize) !== 0)
            pages = pages + 1;
        pages = parseInt(pages);
        const result = await Schemas.Submission.find({ ContestName: ContestName }).sort({ Date: -1 }).skip(Pagesize * (index - 1)).limit(Pagesize);
        result.sort((a, b) => b.Date - a.Date);
        return ({ status: 200, Data: result, Pages: pages,show:Started })
    } catch (error) {
        console.error("Error in getuserdata:", error);
        throw error;
    }
};
const GetProblemSubmissions = async (idx, ContestName, ProblemName) => {
    try {
        var index = parseInt(idx);
        var Pagesize = 10;
        const currentDate = new Date();
        const Started = await Schemas.Contest.countDocuments({ ContestName: ContestName, Endtime: { $lte: currentDate } });
        const count = await Schemas.Submission.countDocuments({ ContestName: ContestName, ProblemName: ProblemName });
        var pages = parseInt(count) / parseInt(Pagesize);
        if (parseInt(count) % parseInt(Pagesize) !== 0)
            pages = pages + 1;
        const result = await Schemas.Submission.find({ ContestName: ContestName, ProblemName: ProblemName }).sort({ Date: -1 }).skip(Pagesize * (index - 1)).limit(Pagesize);
        result.sort((a, b) => b.Date - a.Date);
        return ({ status: 200, Data: result, Pages: parseInt(pages), show: Started });
    } catch (error) {
        console.error("Error in getuserdata:", error);
        throw error;
    }
};
const GetParticularSubmission = async (id) => {
    try {
        const result = await Schemas.Submission.find({ Submissionid: id });
        return ({ status: 200, Data: result });
    } catch (error) {
        console.error("Error in getuserdata:", error);
        throw error;
    }
};

module.exports = { GetSubmissions, GetParticularSubmission, GetContestSubmissions, GetProblemSubmissions, GetUserSubmissions };
