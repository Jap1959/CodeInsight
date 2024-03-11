const amqp = require('amqplib');
const runCode = require('./RunCode'); // Replace with the actual path to your code execution module
const Schema = require('../Database/Schemas');
async function consumeCompileQueue() {
    try {
        // Connect to RabbitMQ server
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        // Declare the compile queue
        const compileQueue = 'compile_queue';
        await channel.assertQueue(compileQueue, { durable: false });

        // Consume messages from the queue
        channel.consume(compileQueue, async (msg) => {
            if (msg) {
                const payload = JSON.parse(msg.content);
                const { code, language, testCases, TimeLimit, id, Starttime, EndTime } = payload;


                // Perform code compilation and testing here
                const results = await runCode.runCode(code, language, testCases, TimeLimit);
                if (results.length > 0) {
                    var CompError = '';
                    var finalverdict = 'AC';
                    var Time = 0;
                    results.forEach((element, index) => {
                        if (element.verdict === 'TLE') {
                            finalverdict = element.verdict;
                        }
                        else if (element.verdict === 'WA') {
                            finalverdict = element.verdict;
                        }
                        else if (element.verdict === 'CE') {
                            finalverdict = element.verdict;
                            CompError = element.error;
                        }
                        else if (element.verdict === 'RE') {
                            finalverdict = element.verdict;
                        }
                        Time = Math.max(Time, parseFloat(element.maxtime));
                    });
                }
                // Handle the result as needed
                try {
                    Time = Time * 1000;
                    Time = Time.toFixed(0);
                    const update = await Schema.Submission.findOneAndUpdate({ Submissionid: id }, {
                        $set: {
                            'Time': Time,
                            'verdict': finalverdict,
                            'Time': Time,
                            'CompilationError': CompError,
                            'Result': results,
                        }
                    }, { new: true });
                    if (finalverdict === 'AC') {
                        const update1 = await Schema.Problem.findOneAndUpdate({ ProblemName: update.ProblemName, ContestName: update.ContestName }, {
                            $inc: { NumberSubmission: 1 },
                        }, { new: true });
                        const currentime = new Date();
                        const start = new Date(Starttime);

                        let differenceInMilliseconds = parseInt(currentime - start);
                        const penalty = parseInt(differenceInMilliseconds / 60000);
                        const hours = Math.floor(penalty / 60);
                        const minutes = Math.floor(penalty % 60);
                        const TimeStamp = hours + ':' + minutes;
                        const end = new Date(EndTime);
                        const currenDate = new Date(currentime);

                        DateStart = new Date(Starttime);
                        DateCurrent = new Date(currentime);
                        EndDate = new Date(EndTime);
                        let val = DateStart < DateCurrent;
                        let val1 = EndDate > DateCurrent;
                        if (val && val1) {
                            try {
                                const result = await Schema.Standing.find({
                                    UserName: update.UserName,
                                    ContestName: update.ContestName,
                                    Problems: {
                                        $elemMatch: {
                                            "ProblemName": update.ProblemName,
                                            "score": { $eq: 0 },
                                        }
                                    }
                                });
                                if (result.length > 0) {
                                    const update2 = await Schema.Standing.findOneAndUpdate({
                                        UserName: update.UserName,
                                        ContestName: update.ContestName,
                                    }, {
                                        $inc: {
                                            penalty: penalty,
                                            TotalScore: 100,
                                        }
                                    }, { new: true });
                                    const update3 = await Schema.Standing.findOneAndUpdate(
                                        { UserName: update.UserName, ContestName: update.ContestName, 'Problems.ProblemName': update.ProblemName },
                                        {
                                            $set: {
                                                'Problems.$.score': 100,
                                                'Problems.$.TimeStamp': TimeStamp,
                                            }
                                        },
                                        { new: true }
                                    );
                                }
                            } catch (e) {
                                console.log(e);
                            }
                        }

                    }
                } catch (e) {
                    console.log(e);
                }
                // Acknowledge the message
                channel.purgeQueue('compile_queue')
                channel.ack(msg);
            }
        });

        // Keep the script running
    } catch (error) {
        console.error('Error:', error.message);
    }
}
module.exports = { consumeCompileQueue };
