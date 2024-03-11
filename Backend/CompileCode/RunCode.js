const executeCode = require('../CompileCode/executecode');
const { spawn, exec } = require('child_process');
const fs = require('fs');
async function runCode(code, language, testCases, TimeLimit) {
    return new Promise((resolve, reject) => {
        fs.writeFileSync(`test.${language}`, code);
        if (language === 'cpp') {
            exec(`g++ test.${language} -o test`, (err, stdout, stderr) => {
                if (err) {
                    resolve([{ verdict: 'CE', error: stderr, maxtime: 0.002 }]);
                    return;
                }
                const results = executeCode.executeCPPCode(testCases, TimeLimit);
                resolve(results);
            });
        }
        else if (language === 'java') {
            fs.writeFileSync(`Main.${language}`, code);
            const compileProcess = spawn('javac', [`Main.java`]);
            let compileError = '';

            compileProcess.stderr.on('data', (data) => {
                compileError += data.toString();
            });
            compileProcess.on('close', (code, stderr, stdout, stdin) => {
                if (code === 0) {
                    const results = executeCode.executeJAVACode(testCases, TimeLimit);
                    resolve(results);


                } else {
                    console.error('Java compilation failed.');
                    resolve([{ verdict: "CE", error: compileError,maxtime: 0.002 }]);
                }
            });

        }

    });
}
module.exports = { runCode };