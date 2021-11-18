//Fetch HTML elements
const timerElement = document.getElementById('timer'); 
const scoreElement = document.getElementById('scoreboard'); 
const resetButtonElement = document.getElementById('reset-button'); 
const gridElement = document.getElementById('grid');
let boxElement = document.querySelectorAll('.box');

//Instance variables 
const minutes = 1;
let totalTime = minutes * 60; ; 
let score = 0; 
scoreElement.innerHTML = score;
let moleBoxId = null; 

//Countdown timer
function countdownTimer() { 
    let seconds = totalTime; 
    if (seconds == 0){
        clearInterval(gameTimer); 
        clearInterval(playMole);
        gridElement.innerHTML = '<div class="game-over">Game Over!</div>'; 
    }
    else{
        totalTime--; 
        timerElement.innerHTML = `${seconds}`; 
    }
}

//Update scoreboard on each mole whack
function updateScore() {
    score = score + 10; 
}

//Randomize mole appearances
function getRandomMole() {
    boxElement.forEach(box => {box.classList.remove('mole')});
    boxElement.forEach(box => {boxElement.innerHTML='<img src="hole.png"/>'} );
    let randomMole = boxElement[Math.floor(Math.random() * 9)]; 
    randomMole.classList.add('mole');
    document.getElementById(randomMole.id).innerHTML = '<img src="mole.png"/>'
    
    //After a certain amount of time, clear mole for the next mole
    setTimeout(() => {
        document.getElementById(randomMole.id).innerHTML = '<img src="hole.png"/>';}, 750);
    moleBoxId = randomMole.id;
    return moleBoxId; 
}

//Event listener for click to simulate mole whacking 
boxElement.forEach(box => {
    box.addEventListener('click', () => {
        if (box.classList.contains('mole')) {
            document.getElementById(moleBoxId).innerHTML = '<img src="hole.png"/>';
            updateScore(); 
            scoreElement.innerHTML = score; 
            moleBoxId = null;
            console.log('I was clicked!'); 
        }
    })
})

//Reset game: reset timer, score
//Stops the current playMole, and starts a new randomizer
function resetGame() {
    //Regrab new boxes, add event listeners to each one 
    gridElement.innerHTML = '<div class="box" id="1"><img src="hole.png"></div><div class="box" id="2"><img src="hole.png"></div><div class="box" id="3"><img src="hole.png"></div><div class="box" id="4"><img src="hole.png"></div><div class="box" id="5"><img src="hole.png"></div><div class="box" id="6"><img src="hole.png"></div><div class="box" id="7"><img src="hole.png"></div><div class="box" id="8"><img src="hole.png"></div><div class="box" id="9"><img src="hole.png"></div>'
    boxElement = document.querySelectorAll('.box');
    boxElement.forEach(box => {
        box.addEventListener('click', () => {
            if (box.classList.contains('mole')) {
                document.getElementById(moleBoxId).innerHTML = '<img src="hole.png"/>';
                updateScore(); 
                scoreElement.innerHTML = score; 
                moleBoxId = null;
                console.log('I was clicked!'); 
            }
        })
    })
    clearInterval(gameTimer);
    clearInterval(playMole);
    totalTime = 60;
    score = 0;
    scoreElement.innerHTML = score; 
    gameTimer = setInterval(countdownTimer, 1000); 
    playMole = setInterval(getRandomMole, 750);
}

//Event listener for reset button, invokes resetGame()
resetButtonElement.addEventListener('click', resetGame);

let gameTimer = setInterval(countdownTimer, 1000);
let playMole = setInterval(getRandomMole, 750); 

