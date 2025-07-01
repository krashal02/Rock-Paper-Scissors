const buttons = document.querySelectorAll(".choice-btn");
const resultEl = document.querySelector(".result");
const roundEl = document.getElementById("round");
const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");
const winnerOverlay = document.getElementById("winnerOverlay");
const winnerText = document.getElementById("winnerText");
const playAgainBtn = document.getElementById("playAgainBtn");

let playerScore = 0;
let computerScore = 0;
let roundsPlayed = 0;
const totalRounds = 5;

function computerPlay() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(player, computer) {
  if (player === computer) return "tie";

  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "win";
  }
  return "lose";
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function updateUI(result, playerChoice, computerChoice) {
  let msg = `You chose ${capitalize(playerChoice)}.\nComputer chose ${capitalize(computerChoice)}.\n`;

  if (result === "win") msg += "🎉 You win this round!";
  else if (result === "lose") msg += "😞 You lose this round!";
  else msg += "😐 It's a tie!";

  resultEl.textContent = msg;
  if (result === "win") {
    resultEl.style.color = "#66ff99";
  } else if (result === "lose") {
    resultEl.style.color = "#ff6666";
  } else {
    resultEl.style.color = "#ffd54f"; 
  }

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  roundEl.textContent = roundsPlayed;
}

function checkGameEnd() {
  if (roundsPlayed === totalRounds) {
   
    let finalMsg = "";
    if (playerScore > computerScore) {
      finalMsg = `🎉 You won the game!\nFinal score: ${playerScore} - ${computerScore}`;
    } else if (computerScore > playerScore) {
      finalMsg = `😞 Computer won the game!\nFinal score: ${computerScore} - ${playerScore}`;
    } else {
      finalMsg = `🤝 It's a draw!\nFinal score: ${playerScore} - ${computerScore}`;
    }

    winnerText.textContent = finalMsg;
    winnerOverlay.style.display = "flex";

    
    buttons.forEach((btn) => (btn.disabled = true));
  }
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  roundsPlayed = 0;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  roundEl.textContent = roundsPlayed;
  resultEl.textContent = "";
  winnerOverlay.style.display = "none";
  buttons.forEach((btn) => (btn.disabled = false));
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const playerChoice = button.getAttribute("data-choice");
    const computerChoice = computerPlay();
    const result = determineWinner(playerChoice, computerChoice);

    if (result !== "tie") {
      if (result === "win") playerScore++;
      else if (result === "lose") computerScore++;

      roundsPlayed++;
      updateUI(result, playerChoice, computerChoice);
      checkGameEnd();
    } else {
      
      resultEl.textContent = `Both chose ${capitalize(playerChoice)}. It's a tie! No round counted.`;
      resultEl.style.color = "#ffd54f";
    }
  });
});

playAgainBtn.addEventListener("click", resetGame);
