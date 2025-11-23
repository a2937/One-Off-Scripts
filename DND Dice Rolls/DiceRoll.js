const readline = require('node:readline');

const myArgs = process.argv.slice(2); 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
  
function preformDiceRoll(diceCount, sides) {
    let diceTotal = 0;
    let rolledNumbers = [];
    for (let i = 0; i < diceCount; i++) {
        const rolled = Math.floor(Math.random() * sides) + 1;
        rolledNumbers.push(rolled);
        diceTotal += rolled;
    }
    console.log(""); // Blank like for formatting
    console.log("Amount of Dice Rolled: " + diceCount);
    console.log("Sides present: " + sides);
    console.log("Rolled Numbers: " + JSON.stringify(rolledNumbers));
    console.log("Total rolled: " + diceTotal);
}

console.log("Simple DND dice roll generator\n");


if(myArgs.length === 0)
{
    rl.question('Enter how many dice to roll : ', (diceCount) => {
        rl.question('Enter how many sides on each dice: ', (sides) => {
            preformDiceRoll(diceCount, sides);
            rl.close();
        });
    });
}
else 
{
  for(let diceRoll = 0 ; diceRoll < myArgs.length ; diceRoll++)
  {
    const diceRollFormat = /(\d+)d(\d+)/g; 
    const matches = [...myArgs[diceRoll].matchAll(diceRollFormat)];
    const diceCount = matches[0][1]; 
    const sides = matches[0][2];
    preformDiceRoll(diceCount,sides); 
  }
}



