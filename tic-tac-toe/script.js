const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = Array(9).fill("");

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8], // Rows
  [0,3,6], [1,4,7], [2,5,8], // Columns
  [0,4,8], [2,4,6]           // Diagonals
];

// Function to check winner
function checkWinner() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      gameState[a] && 
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      statusText.textContent = `Player ${currentPlayer} Wins!`;
      cells.forEach(cell => cell.removeEventListener('click', handleClick));
      return;
    }
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a Draw!";
  }
}

// Function to handle cell clicks
function handleClick(e) {
  const index = e.target.dataset.index;

  if (gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkWinner();

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (statusText.textContent.includes("Wins") || statusText.textContent.includes("Draw")) return;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Reset game
function resetGame() {
  gameState = Array(9).fill("");
  currentPlayer = 'X';
  statusText.textContent = "Player X's Turn";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.addEventListener('click', handleClick);
  });
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
