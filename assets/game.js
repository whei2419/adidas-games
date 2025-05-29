var movesNum; // number of moves initiated by user
var movescell = document.getElementById("movesnum"); // where # of moves are displayed
let gameTimerInterval; // Declare gameTimerInterval here

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
// Easier shuffle: only a few random moves from solved
var randomizePuzzle = function (easyMoves = 12) {
  removeCompletePuzzleImage(); // Remove the 9th tile if it's displayed
  solvePuzzle(); // Start from solved state (will set emptyRow, emptyCol to [3,3])
  let lastTile = null;

  for (let i = 0; i < easyMoves; i++) {
    // Find movable tiles next to the empty slot
    let movableTiles = getMovableTiles();
    // Avoid immediately undoing last move
    if (lastTile) {
      movableTiles = movableTiles.filter(tile => tile !== lastTile);
    }
    // Pick a random movable tile
    let tile = movableTiles[Math.floor(Math.random() * movableTiles.length)];
    // Simulate a move (slide)
    tile.click();
    lastTile = tile;
  }
  movesNum = 0;
  movescell.innerHTML = movesNum;
  removeCompletePuzzleImage(); // Remove 9th tile if it got displayed from solvePuzzle
};

function getMovableTiles() {
  let movable = [];
  let emptyRowInt = parseInt(emptyRow);
  let emptyColInt = parseInt(emptyCol);

  // Check each direction (up, down, left, right)
  let positions = [
    [emptyRowInt - 1, emptyColInt], // Up
    [emptyRowInt + 1, emptyColInt], // Down
    [emptyRowInt, emptyColInt - 1], // Left
    [emptyRowInt, emptyColInt + 1]  // Right
  ];

  let tiles = [tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8];
  positions.forEach(pos => {
    let [row, col] = pos;
    let found = tiles.find(tile =>
      parseInt(tile.style.gridRow) === row &&
      parseInt(tile.style.gridColumn) === col
    );
    if (found) movable.push(found);
  });

  return movable;
}

//------------------------------------------------------
// Option 2. Ordered initial positions (a solved puzzle)
// Renamed from solvePuzzle, and without displaying the complete image initially
var setupPuzzleInSolvedState = function () {
  removeCompletePuzzleImage(); // Remove if any previous one was shown
  movesNum = 0;
  movescell.innerHTML = movesNum; // update # of moves displayed
  tile1.style.gridRow = "1";
  tile1.style.gridColumn = "1";
  tile2.style.gridRow = "1";
  tile2.style.gridColumn = "2";
  tile3.style.gridRow = "1";
  tile3.style.gridColumn = "3";
  tile4.style.gridRow = "2";
  tile4.style.gridColumn = "1";
  tile5.style.gridRow = "2";
  tile5.style.gridColumn = "2";
  tile6.style.gridRow = "2";
  tile6.style.gridColumn = "3";
  tile7.style.gridRow = "3";
  tile7.style.gridColumn = "1";
  tile8.style.gridRow = "3";
  tile8.style.gridColumn = "2"; // Tile 8 position: (Row 3, Column 2)
  [emptyRow, emptyCol] = ["3", "3"]; // Position of the empty cell for solved state is 3,3
  // DO NOT CALL displayCompletePuzzleImage() here
};

// New function for the custom layout: empty, 2, 3, 1, 8, 4, 7, 5, 6
var setupCustomLayout = function () {
  removeCompletePuzzleImage();
  movesNum = 0;
  movescell.innerHTML = movesNum;
  tile1.style.gridRow = "2"; tile1.style.gridColumn = "1";
  tile2.style.gridRow = "1"; tile2.style.gridColumn = "2";
  tile3.style.gridRow = "1"; tile3.style.gridColumn = "3";
  tile4.style.gridRow = "2"; tile4.style.gridColumn = "3";
  tile5.style.gridRow = "3"; tile5.style.gridColumn = "2";
  tile6.style.gridRow = "3"; tile6.style.gridColumn = "3";
  tile7.style.gridRow = "3"; tile7.style.gridColumn = "1";
  tile8.style.gridRow = "2"; tile8.style.gridColumn = "2";
  [emptyRow, emptyCol] = ["1", "1"]; // Empty is at (1,1)
  // DO NOT CALL displayCompletePuzzleImage() here
};

// This function is for the "Solve It" button or similar actions
// where the user explicitly wants to see the fully solved puzzle.
var showAndSolvePuzzle = function() {
  setupPuzzleInSolvedState(); // Set up the board
  displayCompletePuzzleImage(); // Then show the 9th tile
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
  img.src = "assets/images/tile/9.webp"; 
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

document.getElementById("newgame").onclick = setupCustomLayout; // Changed to custom layout
document.getElementById("solveit").onclick = showAndSolvePuzzle; // Stays as showAndSolvePuzzle

setupCustomLayout(); // Changed to custom layout for initial setup

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
    location.reload(); // This will re-run setupCustomLayout() on page load due to the call above.
                     // If location.reload() is removed, ensure setupCustomLayout() and startGameTimer() are called.
    // The lines below are effectively not reached if location.reload() is active.
    // tryAgain.classList.add("hidden");
    // game.classList.remove("hidden");
    // game.style.backgroundImage =
    //     "url('assets/images/count_down_background.webp')";
    // setupCustomLayout(); 
    // startGameTimer();
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
      setupCustomLayout(); // Changed to custom layout
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
    qr.classList.add("qr-code");
    qr.src = "assets/images/qr.png";
    qr.alt = "QR Code"; // Changed alt text for clarity

    const message = document.createElement("p");
    message.classList.add("congrats-message");
    message.textContent = "Congrats!";

    // Display time left as the "score"
    const scoreText = document.createElement("p");
    scoreText.classList.add("score-text");
    // Get the current timer value, default to "00" if not available
    let timeLeft = gameTimerDisplay && gameTimerDisplay.innerHTML && !isNaN(parseInt(gameTimerDisplay.innerHTML))
        ? parseInt(gameTimerDisplay.innerHTML)
        : 0;
    // Always display as two digits, e.g., "03 sec"
    scoreText.textContent = timeLeft.toString().padStart(2, '0') + " sec";

    const scoreLabel = document.createElement("p");
    scoreLabel.classList.add("score-label");
    scoreLabel.textContent = "Time left";

    const finishbtn = document.createElement("button");
    finishbtn.textContent = "Finish";
    finishbtn.classList.add("finish-btn");

    const scan = document.createElement("p");
    scan.classList.add("scan");
    scan.textContent = "Scan to check in";

    // Append elements to the container in the desired order (no solved puzzle image)
    container.appendChild(scoreLabel);
    container.appendChild(scoreText);
    container.appendChild(qr);
    container.appendChild(scan);
    container.appendChild(finishbtn);

    // Append the main message and the container to the 'end' div
    end.appendChild(message);
    end.appendChild(container);

    finishbtn.addEventListener("click", function () {
    location.reload();

        end.classList.add("hidden");
        start.classList.remove("hidden");
        startbtn.classList.remove("hidden");         // Show Play Now button
      instructionBtn.classList.add("hidden");      // Hide Instructions button
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
  if (gameTimerInterval) {
    clearInterval(gameTimerInterval); // Clear existing interval
  }
  let gameTimeLeft = timerInSeconds;
  gameTimerDisplay.classList.remove("hidden");
  gameTimerDisplay.innerHTML = gameTimeLeft; // Ensure timer display is reset to initial time
  gameTimerInterval = setInterval(() => { // Assign to the global variable
    if (gameTimeLeft <= 0) {
      clearInterval(gameTimerInterval);
      gameTimerDisplay.innerHTML = "Time's up!";
      setTimeout(() => {
        if (checkIfSolved()) {
            if (movesNum > 0) { // Player made moves and solved it
                congrats();
            } else {
                // Puzzle is in solved state, but no moves were made.
                showTryAgain(); 
            }
        } else { // Puzzle not solved
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
