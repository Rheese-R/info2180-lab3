
document.addEventListener("DOMContentLoaded", function () {
    const squares = document.querySelectorAll("#board div");

    // Add the square class to each space on the board
    squares.forEach(function (square) {
        square.classList.add("square");
    });

    // Keep track of the moves made in the game
    const gameState = ["", "", "", "", "", "", "", "", ""];

    // X plays first
    let currentPlayer = "X";

    // Add a click event to each square
    squares.forEach(function (square, index) {
        square.addEventListener("click", function () {

            // Only allow a move if the square is empty
            if (gameState[index] === "") {

                // Display the current player's mark
                square.textContent = currentPlayer;

                // Add the class for the appropriate colour
                square.classList.add(currentPlayer);

                // Record the move
                gameState[index] = currentPlayer;

                // Switch to the other player
                if (currentPlayer === "X") {
                    currentPlayer = "O";
                } else {
                    currentPlayer = "X";
                }
            }
        });
    });
});