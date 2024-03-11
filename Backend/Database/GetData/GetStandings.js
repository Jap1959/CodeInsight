const Schema = require('../Schemas');

const GetStandings = async (idx, ContestName) => {
    try {
        var index = parseInt(idx);
        var Pagesize = 10;
        const count = await Schema.Standing.countDocuments({ ContestName: ContestName });
        var pages = parseInt(count) / parseInt(Pagesize);
        if (parseInt(count) % parseInt(Pagesize) !== 0)
            pages = pages + 1;
        pages = parseInt(pages);
        const result = await Schema.Standing.find({ ContestName: ContestName }).sort({ TotalScore: -1, pentaly: 1 }).skip(Pagesize * (index - 1)).limit(Pagesize);
        const result1 = await Schema.Problem.findOne({ ContestName: ContestName }).distinct('ProblemName');
        if (result != null) {

            return ({ result, result1, pages });
        }
    } catch (e) {
        console.log(e);
    }
}
module.exports = { GetStandings };