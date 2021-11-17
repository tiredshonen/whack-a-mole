//Instance variables 
const minutes = 1;
let totalTime = minutes * 60; 
let score = 0; 
let clickedBox = null; 


//Fetch HTML elements
const timerElement = document.getElementById('timer'); 
const scoreElement = document.getElementById('scoreboard'); 
const boxElement = document.querySelectorAll('.box');

//Countdown timer
setInterval(countdownTimer, 1000);
function countdownTimer() { 
    while (totalTime >= 0) {
        let seconds = totalTime; 
        timerElement.innerHTML = `${seconds}`; 
        totalTime--; 
        return totalTime;
    }
}

//Update scoreboard on each mole whack
function updateScore() {
    score = score + 10; 
}

//Randomize mole appearances
function getRandomMole() {
    boxElement.forEach(box => {box.classList.remove('mole')});
    let randomMole = boxElement[Math.floor(Math.random() * 9)]; 
    randomMole.classList.add('mole');
    clickedBox = randomMole.id
}

function moveMole() {
    let movingMoles = setInterval(getRandomMole, 750);
}
moveMole(); 

boxElement.forEach(box => {
    box.addEventListener('click', ()=> {
        if (box.id = clickedBox) {
            updateScore(); 
            scoreElement.innerHTML = score; 
            clickedBox = null;
        }
    })
})