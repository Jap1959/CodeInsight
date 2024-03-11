const Schema = require('../Database/Schemas');
const GetCompletedContestList = async () => {
    const currentDate = new Date();
    try {
        const result = await Schema.Contest.find({ Endtime: { $lte: currentDate} });
        return ({ status: 200, Data: result });

    }
    catch (error) {
        console.log(error)
    }

}
const GetContestNames = async () => {
    let ContestList = [];
    try {
        const result = await Schema.Contest.find({ constesttime: { $lte: currentDate } });

        return ({ status: 200, Data: ContestList });

    }
    catch (error) {
        console.log(error)
    }

}
const GetOnGoingContestList = async () => {
    const currentDate = new Date();
    try {
        const result = await Schema.Contest.find({ constesttime: { $lte: currentDate }, Endtime: { $gt: currentDate } });
        return ({ status: 200, Data: result });

    }
    catch (error) {
        console.log(error)
    }
}
const GetUpcomingContestList = async () => {
    const currentDate = new Date();
    try {
        const result = await Schema.Contest.find({ constesttime: { $gte: currentDate } }).limit(4);
        return ({ status: 200, Data: result });

    }
    catch (error) {
        console.log(error)
    }

}
module.exports = { GetCompletedContestList, GetUpcomingContestList, GetOnGoingContestList };