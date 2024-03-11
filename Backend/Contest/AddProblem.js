const Schema = require('../Database/Schemas');
const fs = require('fs');
const Problemadd = async (data, TestCaseInput, TestCaseOutput, problemdecription, sampleTestInput, sampleTestOutput, Constraints, TimeLimit, res) => {
    try {
        const newProblem = new Schema.Problem({
            ProblemName: data.problemName,
            ContestName: data.contestName,
            ProblemDescrption: problemdecription,
            SampleInput: sampleTestInput,
            SampleOutput: sampleTestOutput,
            TestcasesInput: TestCaseInput,
            TestcasesOutput: TestCaseOutput,
            Constraints: Constraints,
            TimeLimit: parseFloat(TimeLimit),
        });

        const updatedData = await newProblem.save();
        if (updatedData !== null) {
            return ({ status: 200, message: "Submitted successfully" });
        } else {
            return ({ status: 422, message: "Some error occurred" });
        }
    } catch (error) {
        console.error('Error:', error);
        return ({ status: 500, message: 'Internal server error' });
    }
}
async function handleFileUpload(req, res) {
    try {
        const data = req.body;
        const problemdecriptionContent = fs.readFileSync(`D:/CodeInsights/Backend/uploads/${data.problemName}ProblemDescription.txt`, 'utf8');
        const sampleTestInputContent = fs.readFileSync(`D:/CodeInsights/Backend/uploads/${data.problemName}Sampleinput.txt`, 'utf8');
        const sampleTestOutputContent = fs.readFileSync(`D:/CodeInsights/Backend/uploads/${data.problemName}Sampleoutput.txt`, 'utf8');
        const TestCaseInput = [];
        const TestCaseOutput = [];
        for (let i = 0; i < data.TestcaseLength; i++) {
            const inputContent = fs.readFileSync(`D:/CodeInsights/Backend/uploads/${data.problemName}Testcase${i + 1}input.txt`, 'utf8');
            const outputContent = fs.readFileSync(`D:/CodeInsights/Backend/uploads/${data.problemName}Testcase${i + 1}output.txt`, 'utf8');
            TestCaseInput.push(inputContent);
            TestCaseOutput.push(outputContent);
        }
        try {
            fs.unlinkSync(`D:/CodeInsights/Backend/uploads/${data.problemName}ProblemDescription.txt`);
            fs.unlinkSync(`D:/CodeInsights/Backend/uploads/${data.problemName}Sampleinput.txt`);
            fs.unlinkSync(`D:/CodeInsights/Backend/uploads/${data.problemName}Sampleoutput.txt`);
            for (let i = 0; i < data.TestcaseLength; i++) {
                fs.unlinkSync(`D:/CodeInsights/Backend/uploads/${data.problemName}Testcase${i + 1}input.txt`);
                fs.unlinkSync(`D:/CodeInsights/Backend/uploads/${data.problemName}Testcase${i + 1}output.txt`);
            }
        } catch (error) {
            console.error('Error unlinking files:', error.message);
        }
        const result = await Problemadd(data, TestCaseInput, TestCaseOutput, problemdecriptionContent, sampleTestInputContent, sampleTestOutputContent, data.Constraints, data.TimeLimit);
        
        return result;
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = { handleFileUpload };