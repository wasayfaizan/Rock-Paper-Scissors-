document.addEventListener("DOMContentLoaded", function() {
    const startGameBtn = document.getElementById("start-game-btn");
    const leaderboardBtn = document.getElementById("leaderboard-btn");

    startGameBtn.addEventListener("click", function() {
        const playerName = prompt("Please enter your name:");
        if (playerName === null || playerName.trim() === "") {
            alert("Name cannot be empty. Please try again.");
            return;
        }
        // Store player name and start the game
        localStorage.setItem("playerName", playerName.trim());
        window.location.href = "index.html"; // Change to the appropriate URL for the game page
    });

    leaderboardBtn.addEventListener("click", function() {
        // Navigate directly to the leaderboard page
        window.location.href = "leaderboard.html"; // Change to the appropriate URL for the leaderboard page
    });
});


document.addEventListener("DOMContentLoaded", function() {
    let playerScore = 0;
    let computerScore = 0;
    let roundsPlayed = 0; // Variable to track the number of rounds played

    const buttons = document.querySelectorAll('button');
    const resultDiv = document.getElementById('result');
    const playerScoreSpan = document.getElementById('playerScore');
    const computerScoreSpan = document.getElementById('computerScore');
    const resetBtn = document.getElementById('reset');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (roundsPlayed < 7) { // Limit the game to 7 rounds
                const playerChoice = this.id;
                const computerChoice = getComputerChoice();
                const result = getResult(playerChoice, computerChoice);
                displayResult(result, computerChoice);
                updateScore(result);
                roundsPlayed++;
                if (roundsPlayed === 7) {
                    disableButtons(); // Disable buttons after 7 rounds
                    displayWinner(); // Display winner after 7 rounds
                }
            }
        });
    });

    resetBtn.addEventListener('click', function() {
        resetGame();
    });

    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        return choices[Math.floor(Math.random() * choices.length)];
    }

    function getResult(player, computer) {
        if (player === computer) return 'draw';
        if ((player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')) {
            return 'win';
        }
        return 'lose';
    }

    function displayResult(result, computerChoice) {
        let resultString = '';
        if (result === 'win') {
            resultString = 'You win!';
        } else if (result === 'lose') {
            resultString = 'You lose!';
        } else {
            resultString = 'It\'s a draw!';
        }
        resultString += ` Computer chose ${computerChoice}.`;
        resultDiv.textContent = resultString;
    }

    function updateScore(result) {
        if (result === 'win') {
            playerScore++;
        } else if (result === 'lose') {
            computerScore++;
        }
        playerScoreSpan.textContent = playerScore;
        computerScoreSpan.textContent = computerScore;
    }

    function disableButtons() {
        buttons.forEach(button => {
            button.disabled = true;
        });
    }

    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        roundsPlayed = 0;
        playerScoreSpan.textContent = playerScore;
        computerScoreSpan.textContent = computerScore;
        resultDiv.textContent = '';
        buttons.forEach(button => {
            button.disabled = false;
        });
    }

    function displayWinner() {
        let winner;
        if (playerScore > computerScore) {
            winner = playerName + "Wins";
        } else if (computerScore > playerScore) {
            winner = "Computer Wins";
        } else {
            winner = "It's a draw";
        }
        alert(winner);
        saveToLeaderboard(winner);
        promptUser();
    }
    

    function saveToLeaderboard(winner) {
        const playerName = localStorage.getItem("playerName");
        const score = (winner === "Player") ? playerScore : computerScore;
    
        // Retrieve existing leaderboard data or initialize an empty array
        const leaderboardData = JSON.parse(localStorage.getItem("leaderboardData")) || [];
    
        // Add the new entry to the leaderboard data array
        leaderboardData.push({ name: playerName, score: score });
    
        // Store the updated leaderboard data back to localStorage
        localStorage.setItem("leaderboardData", JSON.stringify(leaderboardData));
    }
    

    function promptUser() {
        const choice = prompt("Game Over! Do you want to reset the game, go back to the start page, or view the leaderboard? Enter 'reset', 'start', or 'leaderboard'.");
        if (choice === 'reset') {
            resetGame();
        } else if (choice === 'start') {
            window.location.href = "index.html"; // Navigate to the start page
        } else if (choice === 'leaderboard') {
            window.location.href = "leaderboard.html"; // Navigate to the leaderboard page
        } else {
            alert("Invalid choice. Please enter 'reset', 'start', or 'leaderboard'.");
            promptUser(); // Ask again if choice is invalid
        }
    }
});






document.addEventListener("DOMContentLoaded", function() {
    // Retrieve leaderboard data from localStorage
    const leaderboardData = JSON.parse(localStorage.getItem("leaderboardData")) || [];

    // Get the leaderboard table body element
    const leaderboardTableBody = document.querySelector("#leaderboard-table tbody");

    // Clear the existing rows in the leaderboard table
    leaderboardTableBody.innerHTML = "";

    // Iterate through the leaderboard data and create a row for each player
    leaderboardData.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.score}</td>
        `;
        leaderboardTableBody.appendChild(row);
    });
});
