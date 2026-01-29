/*-------------------------------- Constants --------------------------------*/
const newButton = document.getElementById('button')

/*---------------------------- Variables (state) ----------------------------*/
let pieceNumber;
// let timeLeft;
let gameActive = false;
let correctPiece = 0;
let selectedPiece = null;

/*-------------------------------- Functions --------------------------------*/

// newButton.addEventListener("click",()=> {
//     resetGame();
// });

/*-----game area on the left (container // createPuzzle() // class = grid-item)-----*/
let row = 3;
let col = 3;
let piecesize = 80; 

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
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
                message.textContent = "You win!"
            } else {
                message.textContent = "";
            }} 
            else {
                message.textContent = "Try again";
            }
        });
        emptyContainer.appendChild(emptyPiece);
    }     
    }};
createEmpty ()


function resetGame () {
    container.innerHTML = "";
    emptyContainer.innerHTML = "";
    
    message.textContent = "";

    selectedPiece = null;
    correctPiece = 0;

    createPuzzle();
    createEmpty();
}
newButton.addEventListener("click", resetGame);   


(function() {
  const clock = document.getElementById('timer'); 
  const endTime = new Date().getTime() + 3*60*1000;

  // store clock div to avoid repeatedly querying the DOM
  const clock = document.getElementById('clock');
  
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
    const remainingTime = getRemainingTime(endTime);
    const seconds = pad((remainingTime / 1000) % 60);
    const minutes = pad((remainingTime / (60 * 1000)) % 60);
    const hours = pad((remainingTime / (60 * 60 * 1000)) % 24);
    const days = pad(remainingTime / (24 * 60 * 60 * 1000));

    clock.innerHTML = `${days}:${hours}:${minutes}:${seconds}`;

    // ensure clock only updates if a second or more is remaining
    if (remainingTime >= 1000) {
      requestAnimationFrame(showTime);
    }
  }
  
  // kick it all off
  requestAnimationFrame(showTime);
})();





// function makeDraggable (piece) {
//     let offsetX = 0;
//     let offsetY = 0;

//     piece.addEventListener ("mousedown", (event) => {
//         if (!gameActive) return;

//         offsetX = event.offsetX;
//         offsetY = event.offsetY;

//         document.onmousemove = (moveEvent) => {
//             piece.style.left = moveEvent.pageX - offsetX + "px";
//             piece.style.right = moveEvent.pageY - offsetY + "px";
//         };

//         document.onmouseup = () => {
//             document.onmouseup = null;
//             document.onmousemove = null;
//             checkPosition(piece);
//         };
//     });
//  }


// function startTimer() {
//     //to start the timer

