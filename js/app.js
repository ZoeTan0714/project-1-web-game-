/*-------------------------------- Constants --------------------------------*/
const startButton = document.getElementById('start')
const newButton = document.getElementById('new')

/*---------------------------- Variables (state) ----------------------------*/
let pieceNumber;
let timeLeft;
let gameActive = false;
let correctPiece;

/*-------------------------------- Functions --------------------------------*/
// startButton.addEventListener("click",() => {
//     gameActive = true;
//     createPuzzle();
// });

// newButton.addEventListener("click",()=> {
//     resetGame();
// });


const container = document.getElementById("gamearea");
let row = 3;
let col = 3;
let piecesize = 80; 

function createPuzzle (){
for (let i=0; i<row; i++) {
    for (let y=0; y<col; y++) {
        const piece = document.createElement("div");
        piece.className = "grid-item";
        piece.style.backgroundImage = `url("https://tse3.mm.bing.net/th/id/OIP.6sS_JyB3SI4itv46sThLMQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3")`;
        piece.style.backgroundSize = `${col * piecesize}px ${row * piecesize}px` ;
        piece.style.width = piecesize + "px";
        piece.style.height = piecesize + "px";
        
        const a = y * piecesize;
        const b = i * piecesize;
        piece.style.backgroundPosition = `-${a}px -${b}px`;
        container.appendChild(piece);
}}
}
container.appendChild(piece);

// function createPuzzle() {
//  correctPiece = 0;
//     for (let i = 0; i < count; i++) {
//         const piece = document.createElement ("div");
//         piece.classList.add("piece")
//         piece.dataset.index = i;
//         piece.style.left = Math.random() * 300 + "px";
//         piece.style.top = Math.random() * 300 + "px";
//         makeDraggable(piece);
//         puzzleArea.appendChild(piece);
// };


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

// function checkPosition (piece) {
//     const index = piece.dataset.index;
    
//     }

// function resetGame () {
//     //to reset the timer 
// }



// }



/*----------------------------- Event Listeners -----------------------------*/








