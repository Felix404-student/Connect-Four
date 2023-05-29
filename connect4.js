/**
 * Author: Justin Brown
 * Assignment: Connect Four OO for UMass/Springboard Bootcamp
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 * 
 * In this exercise, you’ll turn a non-OO-designed version of the game Connect Four into a more featureful, OO version.

Instead of using your own code for non-OO Connect Four, start with the starter code in our zip file!

Part One: Make Game Into a Class
Right now, our Connect Four is a bunch of disconnected functions and a few global variables.

This can make it hard to see how things work, and would make it hard to restart a game (quick—which variables would you have to reset to start a game?)

Let’s move this to being a class.

Initially, we’ll start with one class, Game. The players will still just be numbers for player #1 and #2.

What are the instance variables you’ll need on the Game?
for example: height, width, and the board will move from global variables to instance attributes on the class. What else should move?
Make a constructor that sets default values for these
Move the current functions onto the class as methods
This will require mildly rewriting some of these to change how you access variables and call other methods
You should end up with all of the code being in the Game class, with the only other code being a single line at the bottom:

new Game(6, 7);   // assuming constructor takes height, width
Part Two: Small Improvements
Make it so that you have a button to “start the game” — it should only start the game when this is clicked, and you should be able to click this to restart a new game.

Add a property for when the game is over, and make it so that you can’t continue to make moves after the game has ended.

Part Three: Make Player a Class
Right now, the players are just numbers, and we have hard-coded player numbers and colors in the CSS.

Make it so that there is a Player class. It should have a constructor that takes a string color name (eg, “orange” or “#ff3366”) and store that on the player instance.

The Game should keep track of the current player object, not the current player number.

Update the code so that the player pieces are the right color for them, rather than being hardcoded in CSS as red or blue.

Add a small form to the HTML that lets you enter the colors for the players, so that when you start a new game, it uses these player colors.

Further Study
If you have more time and would like more tasks, here are some things to play with:

Make it so that you can have more than two players
The look-and-feel is very sparse: add animations, better graphics for the board or pieces, and other CSS ideas. You could even use bootstrap for things like modals for the start-new-game form.
 */

class Game {
  constructor(p1, p2, height, width) {
    this.HEIGHT = height;
    this.WIDTH = width;
    this.currPlayer = 1; // active player: 1 or 2
    this.board = []; // array of rows, each row is array of cells  (board[y][x])
    this.player1Color = p1;
    this.player2Color = p2;
    this.makeBoard();
    this.makeHtmlBoard();
    this.gameOver = false;
  }

  // makeBoard: create in-JS board structure, a matrix
  // board = array of rows, each row is array of cells  (board[y][x])
  makeBoard() {
    for (let i = 0; i < this.HEIGHT; i++) {
      this.board[i] = new Array(this.WIDTH);
    }
  }

  // makeHtmlBoard: make HTML table and row of column tops.
  makeHtmlBoard() {
    let htmlGame = document.getElementById("game");
    let htmlBoard = document.getElementById("board");

    // creates clickable header row above the board for piece placing
    let top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", this.handleClick.bind(this));

    // creates cells within header row
    for (let x = 0; x < this.WIDTH; x++) {
      let headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      headCell.innerHTML =
        "<img alt='arrow' src='arrow.png' height='100%' width='100%'>";
      top.append(headCell);
    }
    htmlGame.prepend(top);

    // makes HTML grid of TDs based on Height/Width consts to mimic board matrix
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement("tr");
      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`); // labels each square with (y,x) id
        row.append(cell);
      }
      htmlBoard.append(row);
    }

    // set displayed player color
    let display = document.querySelector("h3");
    display.innerHTML = `<strong><span id="currentPlayer" class="player1">Red</span> Player's Turn</strong>`;
    let dispPlayer = document.getElementById("currentPlayer");
    dispPlayer.firstChild.data = this.player1Color;
    dispPlayer.style.color = this.player1Color;
  }

  // findSpotForCol: given column x, return top empty y (null if column full)
  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  // placeInTable: place piece into board matrix and HTML table
  placeInTable(y, x) {
    this.board[y][x] = this.currPlayer;

    const piece = document.createElement("div");
    piece.classList.add("piece", `player${this.currPlayer}piece`);
    piece.style.backgroundColor = `${
      this.currPlayer === 1 ? this.player1Color : this.player2Color
    }`;

    // find correct TD for piece
    const cell = document.getElementById(`${y}-${x}`);

    cell.append(piece);
  }

  // endGame: announce game end, which player won, reset game
  endGame(msg) {
    setTimeout(function () {
      alert(msg);
      location.reload();
    }, 100);
  }

  // handleClick: handle click of column top to play piece
  handleClick(evt) {
    let dispPlayer = document.getElementById("currentPlayer");

    // get x from ID of clicked cell
    let x = +evt.target.parentElement.id;

    // get next spot in column (if none, ignore click)
    let y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    this.placeInTable(y, x);

    // check for a win for either player, display message for winning player
    if (this.checkForWin()) {
      this.endGame(
        `${
          this.currPlayer === 1 ? this.player1Color : this.player2Color
        } player won!`
      );
    }

    // check for tie: check if all cells in board are filled; if so call, call endGame
    if (this.checkForTie()) {
      this.endGame("Game Over. It's a tie!");
    }

    // switch players and change player displayed
    if (this.currPlayer === 1) {
      this.currPlayer = 2;
      dispPlayer.firstChild.data = this.player2Color;
      dispPlayer.style.color = this.player2Color;
    } else {
      this.currPlayer = 1;
      dispPlayer.firstChild.data = this.player1Color;
      dispPlayer.style.color = this.player1Color;
    }
  }

  // checkForWin: check board cell-by-cell for "does a win start here?"
  checkForWin() {
    let height = this.HEIGHT;
    let width = this.WIDTH;
    let board = this.board;
    let currPlayer = this.currPlayer;
    function _win(cells) {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
      return cells.every(function callback([y, x]) {
        return (
          y >= 0 &&
          y < height &&
          x >= 0 &&
          x < width &&
          board[y][x] === currPlayer
        );
      });
    }

    // loops over matrix by row and column, checking from every given (y,x)
    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
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
  checkForTie() {
    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        if (this.board[y][x] !== 1 && this.board[y][x] !== 2) {
          return false;
        }
      }
    }
    return true;
  }
}

// starts the game on click
const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let p1 = document.getElementById("p1-color").value;
  let p2 = document.getElementById("p2-color").value;

  // validate color
  const isColor = (strColor) => {
    const s = new Option().style;
    s.color = strColor;
    return s.color !== "";
  };

  if (isColor(p1) && isColor(p2)) {
    // clear board if there was a previous one
    let board = document.getElementById("board");
    let topRow = document.getElementById("column-top");
    board.textContent = "";
    if (topRow) {
      topRow.remove();
    }
    new Game(p1, p2, 6, 7);
    form.reset();
  } else {
    alert("Invalid color");
  }
});
