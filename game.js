//Instance variables 
const minutes = 1;
let totalTime = minutes * 60; ; 
let score = 0; 
let moleBoxId = null; 

var moleImg = document.createElement("moleImage"); 
moleImg.src = "mole.png"; 

//Fetch HTML elements
const timerElement = document.getElementById('timer'); 
const scoreElement = document.getElementById('scoreboard'); 
const boxElement = document.querySelectorAll('.box');
const resetButtonElement = document.getElementById('reset-button'); 

//Countdown timer
function countdownTimer() { 
    let seconds = totalTime; 
    if (seconds == 0){
        clearInterval(gameTimer); 
        clearInterval(playMole);
        alert('Game over! Thanks for playing!'); 
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
        document.getElementById(randomMole.id).innerHTML = '<img src="hole.png"/>';}, 750)
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
        }
    })
})

//Reset game: reset timer, score
//Stops the current playMole, and starts a new randomizer
function resetGame() {
    clearInterval(gameTimer);
    clearInterval(playMole);
    totalTime = 60;
    score = 0;
    scoreElement.innerHTML = score; 
    gameTimer = setInterval(countdownTimer, 1000); 
    playMole = setInterval(getRandomMole, 750);
}

resetButtonElement.addEventListener('click', resetGame);

let gameTimer = setInterval(countdownTimer, 1000);
let playMole = setInterval(getRandomMole, 750); 

