
document.addEventListener("DOMContentLoaded", function () {
    const squares = document.querySelectorAll("#board div");
    const status = document.querySelector("#status");
    const newGameButton = document.querySelector(".btn");

    const originalMessage =
        "Move your mouse over a square and click to play an X or an O.";

    // Add the square class to each space on the board
    squares.forEach(function (square) {
        square.classList.add("square");
    });

    // Keep track of the moves made in the game
    const gameState = ["", "", "", "", "", "", "", "", ""];

    // X plays first
    let currentPlayer = "X";

    // Keep track of whether the game has been won
    let gameOver = false;

    // All possible winning combinations
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Check whether a player has won
    function checkWinner() {
        for (let i = 0; i < winningCombinations.length; i++) {
            const combination = winningCombinations[i];

            const a = combination[0];
            const b = combination[1];
            const c = combination[2];

            if (
                gameState[a] !== "" &&
                gameState[a] === gameState[b] &&
                gameState[a] === gameState[c]
            ) {
                status.textContent =
                    "Congratulations! " + gameState[a] + " is the Winner!";

                status.classList.add("you-won");

                return true;
            }
        }

        return false;
    }

    // Add events to each square
    squares.forEach(function (square, index) {

        // Change the style when the mouse enters the square
        square.addEventListener("mouseover", function () {
            square.classList.add("hover");
        });

        // Return to the original style when the mouse leaves
        square.addEventListener("mouseout", function () {
            square.classList.remove("hover");
        });

        // Handle clicks on the square
        square.addEventListener("click", function () {

            // Do not allow moves after someone has won
            if (gameOver) {
                return;
            }

            // Only allow a move if the square is empty
            if (gameState[index] === "") {
                square.textContent = currentPlayer;
                square.classList.add(currentPlayer);

                // Record the move
                gameState[index] = currentPlayer;

                // Check whether the current player has won
                if (checkWinner()) {
                    gameOver = true;
                } else {
                    // Switch to the other player
                    if (currentPlayer === "X") {
                        currentPlayer = "O";
                    } else {
                        currentPlayer = "X";
                    }
                }
            }
        });
    });

    // Restart the game when the New Game button is clicked
    newGameButton.addEventListener("click", function () {

        // Clear every square
        squares.forEach(function (square, index) {
            square.textContent = "";
            square.classList.remove("X", "O", "hover");
            gameState[index] = "";
        });

        // Reset the game
        currentPlayer = "X";
        gameOver = false;

        // Restore the original status message
        status.textContent = originalMessage;
        status.classList.remove("you-won");
    });
});