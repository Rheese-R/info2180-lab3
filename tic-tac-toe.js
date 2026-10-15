
document.addEventListener("DOMContentLoaded", function () {
    const squares = document.querySelectorAll("#board div");
    const status = document.querySelector("#status");

    // Add the square class to each space on the board
    squares.forEach(function (square) {
        square.classList.add("square");
    });

    // Keep track of the moves made in the game
    const gameState = ["", "", "", "", "", "", "", "", ""];

    // X plays first
    let currentPlayer = "X";

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

        // Add a click event to the square
        square.addEventListener("click", function () {

            // Only allow a move if the square is empty
            if (gameState[index] === "") {

                // Display the current player's mark
                square.textContent = currentPlayer;

                // Add the class for the appropriate colour
                square.classList.add(currentPlayer);

                // Record the move
                gameState[index] = currentPlayer;

                // Check whether the current player has won
                const winner = checkWinner();

                // Switch to the other player if nobody has won
                if (!winner) {
                    if (currentPlayer === "X") {
                        currentPlayer = "O";
                    } else {
                        currentPlayer = "X";
                    }
                }
            }
        });
    });
});