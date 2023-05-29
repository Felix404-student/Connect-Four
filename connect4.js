/**
 * Author: Justin Brown
 * Assignment: Connect Four for UMass/Springboard Bootcamp
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
let dispPlayer = document.getElementById("currentPlayer");

// makeBoard: create in-JS board structure, a matrix
// board = array of rows, each row is array of cells  (board[y][x])
function makeBoard() {
  for (let i = 0; i < HEIGHT; i++) {
    board[i] = new Array(WIDTH);
  }
}

// makeHtmlBoard: make HTML table and row of column tops.
function makeHtmlBoard() {
  let htmlGame = document.getElementById("game");
  let htmlBoard = document.getElementById("board");

  // creates clickable header row above the board for piece placing
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // creates cells within header row
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    headCell.innerHTML = "<img alt='arrow' src='arrow.png' height='100%' width='100%'>";
    top.append(headCell);
  }
  htmlGame.prepend(top);

  // makes HTML grid of TDs based on Height/Width consts to mimic board matrix
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`); // labels each square with (y,x) id
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

// findSpotForCol: given column x, return top empty y (null if column full)
function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

// placeInTable: place piece into board matrix and HTML table
function placeInTable(y, x) {
  board[y][x] = currPlayer;

  const piece = document.createElement("div");
  piece.classList.add("piece", `player${currPlayer}piece`);

  // find correct TD for piece
  const cell = document.getElementById(`${y}-${x}`);

  cell.append(piece);
}

// endGame: announce game end, which player won, reset game
function endGame(msg) {
  setTimeout(function () {
    alert(msg);
    location.reload();
  }, 100);
}

// handleClick: handle click of column top to play piece
function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.parentElement.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  placeInTable(y, x);

  // check for a win for either player, display message for winning player
  if (checkForWin()) {
    endGame(`${currPlayer === 1 ? 'Red' : 'Yellow'} player won!`)
  }

  // check for tie: check if all cells in board are filled; if so call, call endGame
  if (checkForTie()) {
    endGame("Game Over. It's a tie!");
  }

  // switch players and change player displayed
  if (currPlayer === 1) {
    currPlayer = 2;
    dispPlayer.firstChild.data = "Yellow";
    dispPlayer.classList.remove("player1");
    dispPlayer.classList.add("player2");
  } else {
    currPlayer = 1;
    dispPlayer.firstChild.data = "Red";
    dispPlayer.classList.remove("player2");
    dispPlayer.classList.add("player1");
  }
}

// checkForWin: check board cell-by-cell for "does a win start here?"
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // loops over matrix by row and column, checking from every given (y,x)
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ]; // checks (y,x) and 3 squares to the right ➡
      let vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ]; // checks (y,x) and 3 squares down ⬇
      let diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ]; // checks (y,x) and 3 squares down/right ↘
      let diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ]; // checks (y,x) and 3 squares down/left ↙

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

// checkForTie: check board to see if every cell is filled by a piece
function checkForTie() {
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      if (board[y][x] !== 1 && board[y][x] !== 2) {
        return false;
      }
    }
  }
  return true;
}

makeBoard();
makeHtmlBoard();
