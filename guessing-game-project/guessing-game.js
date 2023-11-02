const readline = require("readline");

const rl = readline.createInterface( {
    input: process.stdin,
    output: process.stdout
});

const randomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function askGuess(tries) {

    const recurseGuess = () => {
        rl.question(`Enter a guess: `, (number) => {
            if (tries === 0) {
                console.log(`You Lose`);
                rl.close();
                return false;
            }

            const isEqual = checkGuess(Number(number));

            if (isEqual)  {
                console.log(`You win!`);
                rl.close();
            } else {
                tries--;
                recurseGuess();
            }

        });

    };

    let result = recurseGuess();
    return result;
}

let checkGuess = number => {
    if (number > secretNumber) {
        console.log("Too high.")
        return false;
    } else if ( number < secretNumber) {
        console.log("Too low.");
        return false;
    } else {
        console.log("Correct!");
        return true;
    }
};

function askRange() {
    rl.question(`Enter total attempts: `, askAttempts)
}

function askAttempts(maxAttempts) {
    console.log(`You have a total of ${maxAttempts} attempts.`);

    rl.question(`Enter a minimum number: `, (minNumber) => {
        askMin(minNumber, maxAttempts);
    });
}

function askMin(minNumber, maxAttempts) {
    rl.question(`Enter a maximum number: `, (maxNumber) => {
        askMax(maxNumber, minNumber, maxAttempts);
    })
}

function askMax(maxNumber, minNumber, maxAttempts) {
    console.log(`I'm thinking of a number between ${minNumber} and ${maxNumber}...`);

    secretNumber = randomInRange(Number(minNumber), Number(maxNumber));
    askGuess(maxAttempts - 1);
}

askRange();
