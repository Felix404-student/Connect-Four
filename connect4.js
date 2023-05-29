/* game board table, sizes based on window */
#game td {
  width: calc(min(13vw,11vh));
  height: calc(min(13vw,11vh));
}

#board {
  background-color: navy;
}

/* background images for the "holes" */
#board td {
  background-image: url("/placeholder.png");
  background-size: cover;
}

/* pieces are div within game table cells drawn as colored circles */
.piece {
  border-radius: 50%;
  border: solid 1px darkgray;
  margin: 5%;
  width: 90%;
  height: 90%;
  animation: append-animate 0.5s linear;
}

/* makes pieces red/gold, depending on player 1/2 */
.player1piece {
  background-color: red;
  background-image: url("/red.png");
  background-size: cover;
}
.player2piece {
  background-color: gold;
  background-image: url("/yellow.png");
  background-size: cover;
}

/* makes label red/gold, depending on player 1/2 */
.player1 {
  color: red;
}
.player2 {
  color: gold;
}

/* column-top is table row of clickable areas for each column */
#column-top td {
  border: dashed 1px lightgray;
  border-radius: 50%;
}

#column-top td:hover {
  background-color: darkgrey;
}

h1 {
  margin-top: 1px;
  margin-bottom: 7px;;
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

h3 {
  line-height: 10px;
  margin-top: 5px;
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes append-animate {
	from {
		transform: translateY(-1000%);
	}
	to {
		transform: translateY(0%);
	}
}
