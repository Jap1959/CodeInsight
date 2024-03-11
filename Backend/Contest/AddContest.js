const Schema = require('../Database/Schemas');
const formatDate = (date, time) => {
    const CDate = date;
    const CTime = time;
    const dateParts = CDate.split('-');
    const day = parseInt(dateParts[2], 10);
    const month = parseInt(dateParts[1] - 1, 10);
    const year = parseInt(dateParts[0], 10);
    const timeParts = CTime.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const dateTime = new Date(year, month, day, hours, minutes);
    return dateTime;
}
function getTimeDifference(start, end) {
    const timeDiff = Math.abs(end - start); // Difference in milliseconds

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const s = hours + minutes + 'hrs';
    return s;
}
const AddContest = async (data) => {

    const starttime = formatDate(data.contestDate, data.contestStartTime);
    const endtime = formatDate(data.contestDate, data.contestEndTime);
    try {
        const resultquery = await Schema.Contest.find({ contestname: data.contestName });
        if (resultquery.length !== 0) {
            return ({ Status: 422, message: "Contest Name Already Exist,Try Another" });
        }
        const Duration = getTimeDifference(starttime, endtime);
        const newContest = new Schema.Contest({
            contestname: data.contestName,
            constesttime: starttime,
            Endtime: endtime,
            HostName: data.hostName,
            Duration: Duration,
        });
        const NewStandings = await Schema.Standing({
            ContestName: data.contestName,
        });
        const result = await newContest.save();
        if (result !== null) {
            return ({ Status: 200, message: "Contest Added Sucessfully" });
        }
        else {
            return ({ Status: 422, message: "Some Error Ocuured,Try again!" });
        }
    }
    catch (error) {
        console.log(error);
    }
}
const GetContestNames = async () => {

    try {
        const Contest = await Schema.Contest.distinct('contestname');
        return ({ status: 200, Data: Contest });
    } catch (e) {

        console.log(e);
        return ({ status: 400, Error: e });
    }
}
module.exports = { AddContest, GetContestNames };