const amqp = require('amqplib');
const Consume = require('./CompileQueue');

async function sendCodeToCompileQueue(code, language, testCases, TimeLimit, id, Starttime, EndTime) {
    try {

        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const compileQueue = 'compile_queue';
        await channel.assertQueue(compileQueue, { durable: false });

        const messageObject = {
            code,
            language,
            testCases,
            TimeLimit,
            id,
            Starttime,
            EndTime,
        };

        const messageString = JSON.stringify(messageObject);

        channel.sendToQueue(compileQueue, Buffer.from(messageString));

        await Consume.consumeCompileQueue();
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error:', error.message);
    }
}
module.exports = { sendCodeToCompileQueue };