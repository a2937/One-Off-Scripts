const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
  
console.log("Simple DND dice roll generator\n");

rl.question('Enter how many dice to roll : ', (diceCount) => {
    rl.question('Enter how many sides on each dice: ', (sides) => {
        let diceTotal = 0;
        let rolledNumbers = []; 
        for(let i = 0; i < diceCount;i++)
        {
           const rolled = Math.floor(Math.random() * sides) + 1; 
           rolledNumbers.push(rolled); 
           diceTotal += rolled; 
        }       
        console.log("") // Blank like for formatting
        console.log("Amount of Dice Rolled: " + diceCount);        
        console.log("Sides present: " + sides);        
        console.log("Rolled Numbers: " + JSON.stringify(rolledNumbers));
        console.log("Total rolled: " + diceTotal);
        rl.close();
    });
});

