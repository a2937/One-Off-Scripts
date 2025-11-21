import { promises as fs } from "fs";

const target = "sampleTests.txt";

const targetFramework = "mocha"; 

const testSuitesFormat = {
    'mocha' : 'describe("Generated Tests", () => {\n@testCases})'
}


const testFormats = {
    'mocha' : "\tit(`@funcCall should return @output`, () =>\n\t{\n\t\tassert.strictEqual(@funcCall,@output);\n\t})"
}

const separator = "->"; 


async function generateTestContents() 
{
    const fileContents = await fs.readFile(target, { encoding: "utf8" });

    const testCases = fileContents.split("\n").filter(x => x.trim() != "");

    let output = testSuitesFormat[targetFramework];

    const testFormat = testFormats[targetFramework];

    let testCasesOutput = "";

    for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i].trim().split(separator);
        testCasesOutput += testFormat.replaceAll("@funcCall", testCase[0]).replaceAll("@output", testCase[1]) + "\n";
    }

    const fullOutput = output.replace("@testCases", testCasesOutput);
    return fullOutput;
}


const fullOutput = await generateTestContents(); 


fs.writeFile("generatedTests.txt",fullOutput); 



