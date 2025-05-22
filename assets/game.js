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

// Assigning the positions of tiles.
var emptyRow, emptyCol;
// Run the option you need below:
//------------------------------------------------------
// Option 1. Random initial positions
var randomizePuzzle = function () {
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
  movesNum = 0;
  movescell.innerHTML = movesNum; // update # of moves displayed
  [emptyRow, emptyCol] = [3, 2]; // position of the empty cell
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
  tile8.style.gridColumn = 3;
};
//------------------------------------------------------

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

const timerInSeconds = 15;
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
  game.classList.add("hidden");
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

    // Add the completed puzzle image
    const solvedPuzzleImage = document.createElement("img");
    solvedPuzzleImage.src = "/assets/images/tile/9.webp"; // Updated to be root-relative
    solvedPuzzleImage.alt = "Completed Puzzle";
    solvedPuzzleImage.classList.add("completed-puzzle-image"); // For styling (optional)

    // Debugging logs for image loading
    console.log("Creating completed puzzle image element with src:", solvedPuzzleImage.src);
    solvedPuzzleImage.onload = function() {
        console.log("Completed puzzle image loaded successfully:", solvedPuzzleImage.src);
        // Optional: You might want to ensure the image has some dimensions if CSS doesn't provide them
        // e.g., if (!solvedPuzzleImage.style.width) solvedPuzzleImage.style.width = "300px"; 
        // e.g., if (!solvedPuzzleImage.style.height) solvedPuzzleImage.style.height = "auto";
    };
    solvedPuzzleImage.onerror = function() {
        console.error("Error loading completed puzzle image:", solvedPuzzleImage.src);
    };

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
  if (
    tile1.style.gridRow == 1 &&
    tile1.style.gridColumn == 1 &&
    tile2.style.gridRow == 1 &&
    tile2.style.gridColumn == 2 &&
    tile3.style.gridRow == 1 &&
    tile3.style.gridColumn == 3 &&
    tile4.style.gridRow == 2 &&
    tile4.style.gridColumn == 1 &&
    tile5.style.gridRow == 2 &&
    tile5.style.gridColumn == 2 &&
    tile6.style.gridRow == 2 &&
    tile6.style.gridColumn == 3 &&
    tile7.style.gridRow == 3 &&
    tile7.style.gridColumn == 1 &&
    tile8.style.gridRow == 3 &&
    tile8.style.gridColumn == 3
  ) {
   return true;
  } else {
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
