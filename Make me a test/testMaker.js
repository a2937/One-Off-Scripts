import { promises as fs } from "fs";
import * as readline from "readline";

const myArgs = process.argv.slice(2); 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
  

console.log("Simple automated test creator\n");
console.log("All generated tests will be written to generatedTests.txt when this app is finished"); 


let target = "sampleTests.txt";


if(myArgs.length === 0)
{
    rl.question('What is the name of the file with the tests : ', (fileName) => {
       target = fileName; 
       rl.close();
    });
}
else 
{
    target = myArgs[0].trim(); 
}



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


await fs.writeFile("generatedTests.txt",fullOutput); 
