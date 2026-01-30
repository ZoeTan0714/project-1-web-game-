/*-------------------------------- Constants --------------------------------*/
const newButton = document.getElementById('button')
const clock = document.getElementById('timer'); 

/*---------------------------- Variables (state) ----------------------------*/
let pieceNumber;
let gameActive = true;
let correctPiece = 0;
let selectedPiece = null;
let endTime = null;
let rafID = null; 

/*-------------------------------- Functions --------------------------------*/

/*---- timer will start once window is loade */
startTimer();


/*-----game area on the left (container // createPuzzle() // class = grid-item)-----*/
let row = 3;
let col = 3;
let piecesize = 80; 


/*------ create array to shuffle the pieces --------*/
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/*------ to create puzzle --------*/
const container = document.getElementById ("gamearea");
function createPuzzle (){
    container.innerHTML = "";
    const slots = [];
    const pieces = [];
    
for (let i=0; i<row; i++) {
    for (let y=0; y<col; y++) {
        const slot = document.createElement("div");
        slot.className = "slot-item";
        slot.style.width = piecesize + "px";
        slot.style.height = piecesize + "px";

        const piece = document.createElement("div");
        piece.className = "grid-item";
        piece.style.backgroundImage = `url("https://tse3.mm.bing.net/th/id/OIP.6sS_JyB3SI4itv46sThLMQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3")`;
        piece.style.backgroundSize = `${col * piecesize}px ${row * piecesize}px` ;
        piece.style.width = piecesize + "px";
        piece.style.height = piecesize + "px";
        const a = y * piecesize;
        const b = i * piecesize;
        piece.style.backgroundPosition = `-${a}px -${b}px`;
        
        //Note: record each piece's correct place in game area 
        piece.dataset.correctRow = i;
        piece.dataset.correctCol = y;
        
        //Note: event listener & define the selected piece 
    piece.addEventListener("click", () => {
        // if (!Piece) return;            
        if (selectedPiece) {
            selectedPiece.classList.remove("selected")
        }
        selectedPiece = piece;
        piece.className = "selected";
        message.textContent = "";
    });
    
    slots.push(slot);
    pieces.push(piece);
        }      
    } 

    shuffleArray(pieces);
    slots.forEach((slot,index) => {
        slot.appendChild(pieces[index]);
        container.appendChild(slot);
    });
}
createPuzzle();


/*-----empty area on the right(emptyContainer // createEmpty() // class = empty-item)-----*/
const emptyContainer = document.getElementById("emptyarea");
function createEmpty (){
for (let i=0; i<row; i++) {
    for (let y=0; y<col; y++) {
        const emptyPiece = document.createElement("div");
        emptyPiece.className = "empty-item";
        // emptyPiece.style.backgroundSize = `${col * piecesize}px ${row * piecesize}px` ;
        emptyPiece.style.width = piecesize + "px";
        emptyPiece.style.height = piecesize + "px";
        emptyContainer.appendChild(emptyPiece);
    
        //Note: this is to record position for each slot 
        emptyPiece.dataset.row = i;
        emptyPiece.dataset.col = y;
    
        //Note: add event lisener and check if correct 
        emptyPiece.addEventListener("click", ()=> {
            if (!selectedPiece) return;
            
            const theRow = selectedPiece.dataset.correctRow;
            const theCol = selectedPiece.dataset.correctCol;
            const targetRow = emptyPiece.dataset.row;
            const targetCol = emptyPiece.dataset.col;

            if (theRow === targetRow && theCol === targetCol) {
                emptyPiece.appendChild(selectedPiece);
                selectedPiece.classList.remove("selected");
                selectedPiece = null;
                correctPiece++; 
            
            if (correctPiece === row*col) {
               showMessage ("You win!");
                gameActive = false
            } else {
                message.style.display = "none";
            }} 
            else {
                showMessage ("Try again!");
            }
        });
        emptyContainer.appendChild(emptyPiece);
    }     
    }};
createEmpty ()

/*----------- reset game------------*/
function resetGame () {
    container.innerHTML = "";
    emptyContainer.innerHTML = "";
    
    message.textContent = "";

    selectedPiece = null;
    correctPiece = 0;

    createPuzzle();
    createEmpty();
}

/* ------- create the timer -------*/ 
  function getRemainingTime(deadline) {
    const currentTime = new Date().getTime();
    return deadline - currentTime;
  }
  
    // pad value with zero
  function pad(value) {
    return ('0' + Math.floor(value)).slice(-2);
  }

    // show time repeatedly
  function showTime() {
    if (!gameActive) return;

    const remainingTime = getRemainingTime(endTime);

    if (remainingTime <= 0) {
      clock.textContent = "00:00";
      message.textContent = "Time's up!";
      gameActive = false; 
      return;
    }

    const minutes = pad((remainingTime / (60*1000)) % 60);
    const seconds = pad((remainingTime / 1000) % 60);
    
    clock.textContent = `${minutes}:${seconds}`;
    requestAnimationFrame(showTime);
}

function startTimer() {
    if(rafID) cancelAnimationFrame(rafID);
    endTime = new Date().getTime() + 1 * 60 * 1000; 
    rafID = requestAnimationFrame(showTime);
    gameActive = true;
}
 
function resetTimer () {
    if (rafID) cancelAnimationFrame(rafID);
    clock.textContent = "01:00";
    rafID = null;
    endTime = null;
    gameActive = false;
}

/* ---- when time runs up ---- */

const timer = document.getElementById("timer");

const countdown = setInterval(() => {
    if (!gameActive) return;

    timeLeft--;
    timer.textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
        clearInterval(countdown);

    if (correctPiece !== row * col) {
            showMessage("Game Over");
            gameActive = false;
        }
    }
}, 1000);


/* ------ "new game" button ------- */
newButton.addEventListener("click",() => {
    resetTimer();
    resetGame();
    startTimer();
});   


/*----- style the message ------*/
function showMessage(text) {
    const message = document.getElementById("message");
    message.textContent = text;
    message.style.display = "block";
    setTimeout(() => {
        message.style.display = "none";
    },2000);
}

