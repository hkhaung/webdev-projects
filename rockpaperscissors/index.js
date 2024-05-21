let humanScore = 0;
let computerScore = 0;
let rounds = 5;

function getComputerChoice() {
    const max = 3;
    let choice = Math.floor(Math.random() * max);
    switch (choice) {
        case 0:
            return "Rock";
        case 1:
            return "Paper";
        case 2:
            return "Scissors";
        default:
            return "Rock";
    }
}

function getHumanChoice() {
    let choice = window.prompt("Rock, paper, or scissors?").toLowerCase();
    console.log(choice);
    if (choice == "rock") {
        return "Rock";
    } else if (choice == "paper") {
        return "Paper";
    } else if (choice == "scissors") {
        return "Scissors";
    }
    return "invalid answer";
}

function compareChoices(computerChoice, humanChoice) {
    if (computerChoice == humanChoice) {
        return "Draw!";
    } else if (computerChoice == "Rock" && humanChoice == "Paper") {
        return "Computer chose Rock and you chose paper. You win!";
    } else if (computerChoice == "Rock" && humanChoice == "Scissors") {
        return "Computer chose Rock and you chose scissors. You lose!";
    } else if (computerChoice == "Paper" && humanChoice == "Rock") {
        return "Computer chose Paper and you chose rock. You lose!";
    } else if (computerChoice == "Paper" && humanChoice == "Scissors") {
        return "Computer chose Paper and you chose scissors. You win!";
    } else if (computerChoice == "Scissors" && humanChoice == "Paper") {
        return "Computer chose Scissors and you chose paper. You lose!";
    } else if (computerChoice == "Scissors" && humanChoice == "Rock") {
        return "Computer chose Scissors and you chose rock. You win!";
    }
}

function playRound(rounds) {
    while (rounds > 0) {
        let computerChoice = getComputerChoice();
        let humanChoice = getHumanChoice();
        let result = compareChoices(computerChoice, humanChoice);
        alert(result);

        rounds -= 1;
    }
}

playRound(rounds);
