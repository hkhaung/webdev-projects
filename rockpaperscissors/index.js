let humanScore = 0;
let computerScore = 0;

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

function getHumanChoice(buttonVal) {
    switch (buttonVal) {
        case "0":
            return "Rock";
        case "1":
            return "Paper";
        case "2":
            return "Scissors";
        default:
            return "Rock";
    }
}

function compareChoices(computerChoice, humanChoice) {
    if (computerChoice == humanChoice) {
        return "Draw!";
    } else if (computerChoice == "Rock" && humanChoice == "Paper") {
        humanScore += 1;
        return "Computer chose Rock and you chose paper. You win!";
    } else if (computerChoice == "Rock" && humanChoice == "Scissors") {
        computerScore += 1;
        return "Computer chose Rock and you chose scissors. You lose!";
    } else if (computerChoice == "Paper" && humanChoice == "Rock") {
        computerScore += 1;
        return "Computer chose Paper and you chose rock. You lose!";
    } else if (computerChoice == "Paper" && humanChoice == "Scissors") {
        humanScore += 1;
        return "Computer chose Paper and you chose scissors. You win!";
    } else if (computerChoice == "Scissors" && humanChoice == "Paper") {
        computerScore += 1;
        return "Computer chose Scissors and you chose paper. You lose!";
    } else if (computerChoice == "Scissors" && humanChoice == "Rock") {
        humanScore += 1;
        return "Computer chose Scissors and you chose rock. You win!";
    }
}

function playRound(humanChoice) {
    let computerChoice = getComputerChoice();
    let result = compareChoices(computerChoice, humanChoice);

    const computerscore = document.querySelector("#computer-score");
    const humanscore = document.querySelector("#human-score");
    computerscore.textContent = `Computer: ${computerScore}`;
    humanscore.textContent = `You: ${humanScore}`;

    const container = document.querySelector("#result");
    const content = document.createElement("div");
    content.textContent = result;
    container.appendChild(content);
}

document.querySelectorAll(".choice").forEach((button) => {
    button.addEventListener("click", function () {
        const humanChoice = getHumanChoice(button.value);
        playRound(humanChoice);
    });
});
