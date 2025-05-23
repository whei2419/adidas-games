var movesNum; // number of moves initiated by user
var movescell = document.getElementById("movesnum"); // where # of moves are displayed

// tiles DOM objects
var tile1 = document.getElementsByClassName("Tile Tile1")[0];
var tile2 = document.getElementsByClassName("Tile Tile2")[0];
var tile3 = document.getElementsByClassName("Tile Tile3")[0];
var tile4 = document.getElementsByClassName("Tile Tile4")[0];
var tile5 = document.getElementsByClassName("Tile Tile5")[0];
var tile6 = document.getElementsByClassName("Tile Tile6")[0];
var tile7 = document.getElementsByClassName("Tile Tile7")[0];
var tile8 = document.getElementsByClassName("Tile Tile8")[0];

var displayedEmptyTile = null; // To keep track of the 9th tile element

// Assigning the positions of tiles.
// Run the option you need below:
//------------------------------------------------------
// Option 1. Random initial positions
var randomizePuzzle = function () {
  removeCompletePuzzleImage(); // Remove the 9th tile if it's displayed
  movesNum = 0;
  movescell.innerHTML = movesNum; // update # of moves displayed
  [emptyRow, emptyCol] = [2, 2]; // position of the empty cell
  var positions = [
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 1],
    [2, 3],
    [3, 1],
    [3, 2],
    [3, 3],
  ]; // [2,2] is center, it's not in this array, and will be empty cell
  var tiles = [tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8];
  for (let i = 7; i >= 0; i--) {
    let r = Math.round(Math.random() * i); // random integer from 0 to i
    let poppedPos = positions.splice(r, 1); // removes an element from "positions" array at "r" position
    tiles[i].style.gridRow = poppedPos[0][0];
    tiles[i].style.gridColumn = poppedPos[0][1];
  }
};
//------------------------------------------------------
// Option 2. Ordered initial positions (a solved puzzle)
var solvePuzzle = function () {
  removeCompletePuzzleImage(); // Remove if any previous one was shown
  movesNum = 0;
  movescell.innerHTML = movesNum; // update # of moves displayed
  tile1.style.gridRow = 1;
  tile1.style.gridColumn = 1;
  tile2.style.gridRow = 1;
  tile2.style.gridColumn = 2;
  tile3.style.gridRow = 1;
  tile3.style.gridColumn = 3;
  tile4.style.gridRow = 2;
  tile4.style.gridColumn = 1;
  tile5.style.gridRow = 2;
  tile5.style.gridColumn = 2;
  tile6.style.gridRow = 2;
  tile6.style.gridColumn = 3;
  tile7.style.gridRow = 3;
  tile7.style.gridColumn = 1;
  tile8.style.gridRow = 3;
  tile8.style.gridColumn = 2; // Tile 8 position: (Row 3, Column 2)
  [emptyRow, emptyCol] = [3, 3]; // Position of the empty cell for solved state is 3,3

  displayCompletePuzzleImage(); // Show the 9th tile
};
//------------------------------------------------------

// Function to display the 9th tile (completed puzzle image)
function displayCompletePuzzleImage() {
  if (displayedEmptyTile) { // If one already exists, remove it first
    removeCompletePuzzleImage();
  }
  const puzzleContainer = document.querySelector(".SlidingPuzzle");
  if (!puzzleContainer) return;

  const emptyCellLi = document.createElement("li");
  emptyCellLi.classList.add("Tile", "EmptyTileDisplay"); // Add a specific class for easy removal
  // Ensure emptyRow and emptyCol are correctly set for the solved state (e.g., 3,3)
  emptyCellLi.style.gridRow = emptyRow.toString();
  emptyCellLi.style.gridColumn = emptyCol.toString();

  const img = document.createElement("img");
  img.src = "/assets/images/tile/9.webp"; 
  img.alt = "Final puzzle piece";

  emptyCellLi.appendChild(img);
  puzzleContainer.appendChild(emptyCellLi);
  displayedEmptyTile = emptyCellLi;
}

// Function to remove the displayed 9th tile
function removeCompletePuzzleImage() {
  if (displayedEmptyTile && displayedEmptyTile.parentNode) {
    displayedEmptyTile.parentNode.removeChild(displayedEmptyTile);
  }
  displayedEmptyTile = null;
}

var moveTile = function () {
  thisRow = this.style.gridRow.charAt(0);
  thisCol = this.style.gridColumn.charAt(0);
  //console.log("thisRow: "+thisRow+", thisCol: "+thisCol+", emptyRow: "+emptyRow+", emptyCol: "+emptyCol);
  if (emptyRow == thisRow) {
    if (
      parseInt(thisCol) + 1 == emptyCol ||
      parseInt(thisCol) - 1 == emptyCol
    ) {
      let tmpCol = thisCol; // current block scope variable
      this.style.gridColumn = emptyCol.toString(); // move it horizontally
      emptyCol = tmpCol;
      movesNum++;
      document.getElementById("tileMoveSound").play(); // Play tile move sound
    }
  } else if (emptyCol == thisCol) {
    if (
      parseInt(thisRow) + 1 == emptyRow ||
      parseInt(thisRow) - 1 == emptyRow
    ) {
      let tmpRow = thisRow; // current block scope variable
      this.style.gridRow = emptyRow.toString(); // move it vertically
      emptyRow = tmpRow;
      movesNum++;
      document.getElementById("tileMoveSound").play(); // Play tile move sound
    }
  }
  movescell.innerHTML = movesNum; // update # of moves displayed

  // check if the puzzle is solved
  if (checkIfSolved()) {
    displayCompletePuzzleImage(); // Show the 9th tile
    gameSuccess();
    setTimeout(() => {
      congrats();
    }, 2000);
  }
};

tile1.onclick = moveTile;
tile2.onclick = moveTile;
tile3.onclick = moveTile;
tile4.onclick = moveTile;
tile5.onclick = moveTile;
tile6.onclick = moveTile;
tile7.onclick = moveTile;
tile8.addEventListener("click", moveTile); // alternative way to write it

document.getElementById("newgame").onclick = randomizePuzzle;
document.getElementById("solveit").onclick = solvePuzzle;

randomizePuzzle();

const timerInSeconds = 60;
const countdownInseconds = 3;
const score = 0;
const start = document.getElementById("start");
const instructionBtn = document.getElementById("instructionBtn");
const startbtn = document.getElementById("startbtn");
const countDown = document.querySelector(".count-down");
const game = document.getElementById("game");
const countdownText = document.querySelector(".count-down-timer");
const gameTimerDisplay = document.querySelector(".timer"); // Get the new timer element
const tryAgain = document.getElementById("tryAgain");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const end = document.getElementById("end");
const backgroundMusic = document.getElementById("backgroundMusic");
const countdownSound = document.getElementById("countdownSound");

startbtn.addEventListener("click", function () {
  instructionBtn.classList.remove("hidden");
  startbtn.classList.add("hidden");
  start.style.backgroundImage = "url('assets/images/instruction.webp')";
  backgroundMusic.play(); // Play background music
});

instructionBtn.addEventListener("click", function () {
  instructionBtn.classList.add("hidden");
  countDown.classList.remove("hidden");
  start.style.backgroundImage =
    "url('assets/images/count_down_background.webp')";
  setTimeout(function() { // Add a delay
    countdownSound.play(); // Play countdown sound
  }, 1000); // Delay in milliseconds (1 second)
  countDownTimer(); // Call the countdown timer function
});

tryAgainBtn.addEventListener("click", function () {
    //restart game
    tryAgain.classList.add("hidden");
    game.classList.remove("hidden");
    game.style.backgroundImage =
        "url('assets/images/count_down_background.webp')";
    randomizePuzzle();
    startGameTimer();
});

function initGame() {
  // add start background
  start.style.backgroundImage = "url('assets/images/start.webp')";
}

function countDownTimer() {
  let timeLeft = countdownInseconds;
  const initialCountdownTimer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(initialCountdownTimer);
      start.classList.add("hidden"); // Hide the start container
      game.classList.remove("hidden");
      countDown.classList.add("hidden");
      game.style.backgroundImage =
        "url('assets/images/count_down_background.webp')";
      randomizePuzzle();
      startGameTimer();
    } else {
      countdownText.innerHTML = timeLeft;
      timeLeft--;
    }
  }, 1000);
}

function showTryAgain() {
  game.classList.add("hidden");
  tryAgain.classList.remove("hidden");
  tryAgain.style.backgroundImage =
    "url('assets/images/try_again.webp')";
}

function gameSuccess() {
  // game.classList.add("hidden"); // Don't hide the game board immediately
  console.log("Game success, puzzle solved!");
}

function congrats() {
    game.classList.add("hidden");
    end.classList.remove("hidden");
    end.style.backgroundImage =
        "url('assets/images/congrats_page.webp')";

    // Clear previous elements from 'end' div
    while (end.firstChild) {
        end.removeChild(end.firstChild);
    }

    const container = document.createElement("div");
    container.classList.add("congrats-container");

    const qr = document.createElement("img");
    qr.src = "assets/images/qr.png";
    qr.alt = "QR Code"; // Changed alt text for clarity

    const message = document.createElement("p");
    message.classList.add("congrats-message");
    message.textContent = "Congrats!";

    const scoreText = document.createElement("p");
    scoreText.classList.add("score-text");
    scoreText.textContent = `${score}`; // score is currently hardcoded to 0

    const scoreLabel = document.createElement("p");
    scoreLabel.classList.add("score-label");
    scoreLabel.textContent = "Points scored: ";

    const finishbtn = document.createElement("button");
    finishbtn.textContent = "Finish";
    finishbtn.classList.add("finish-btn");

    const scan = document.createElement("p");
    scan.classList.add("scan");
    scan.textContent = "Scan to check in";

    // Append elements to the container in the desired order
    container.appendChild(solvedPuzzleImage); // Image first
    container.appendChild(scoreLabel);
    container.appendChild(scoreText);
    container.appendChild(qr);
    container.appendChild(scan);
    container.appendChild(finishbtn);

    // Append the main message and the container to the 'end' div
    end.appendChild(message);
    end.appendChild(container);

    finishbtn.addEventListener("click", function () {
        removeCompletePuzzleImage(); // Remove the 9th tile
        end.classList.add("hidden");
        start.classList.remove("hidden");
        start.style.backgroundImage =
            "url('assets/images/start.webp')";
        backgroundMusic.pause(); // Pause background music
        backgroundMusic.currentTime = 0; // Reset music to the beginning
        // Clear the container and message from end div to prevent duplication on next congrats
        while (end.firstChild) {
            end.removeChild(end.firstChild);
        }
        initGame();
    });
}


function checkIfSolved() {
  console.log("Checking solved state:");
  console.log("Tile 1:", tile1.style.gridRow, tile1.style.gridColumn);
  console.log("Tile 2:", tile2.style.gridRow, tile2.style.gridColumn);
  console.log("Tile 3:", tile3.style.gridRow, tile3.style.gridColumn);
  console.log("Tile 4:", tile4.style.gridRow, tile4.style.gridColumn);
  console.log("Tile 5:", tile5.style.gridRow, tile5.style.gridColumn);
  console.log("Tile 6:", tile6.style.gridRow, tile6.style.gridColumn);
  console.log("Tile 7:", tile7.style.gridRow, tile7.style.gridColumn);
  console.log("Tile 8:", tile8.style.gridRow, tile8.style.gridColumn);

  if (
    tile1.style.gridRow === "1" &&
    tile1.style.gridColumn === "1" &&
    tile2.style.gridRow === "1" &&
    tile2.style.gridColumn === "2" &&
    tile3.style.gridRow === "1" &&
    tile3.style.gridColumn === "3" &&
    tile4.style.gridRow === "2" &&
    tile4.style.gridColumn === "1" &&
    tile5.style.gridRow === "2" &&
    tile5.style.gridColumn === "2" &&
    tile6.style.gridRow === "2" &&
    tile6.style.gridColumn === "3" &&
    tile7.style.gridRow === "3" &&
    tile7.style.gridColumn === "1" &&
    tile8.style.gridRow === "3" &&
    tile8.style.gridColumn === "2" // Updated to check for Tile 8 at (3,2)
  ) {
   console.log("Puzzle is SOLVED");
   return true;
  } else {
    console.log("Puzzle is NOT SOLVED");
    return false;
  }
}

function startGameTimer() {
  let gameTimeLeft = timerInSeconds;
  gameTimerDisplay.classList.remove("hidden"); 
  const gameTimerInterval = setInterval(() => {
    if (gameTimeLeft <= 0) {
      clearInterval(gameTimerInterval);
      gameTimerDisplay.innerHTML = "Time's up!";
      setTimeout(() => {

        if (checkIfSolved()) {
            congrats();
        } else {
          showTryAgain();
        }
      }, 2000); 
    } else {
      gameTimerDisplay.innerHTML = gameTimeLeft;
      gameTimeLeft--;
    }
  }, 1000);
}

initGame();
