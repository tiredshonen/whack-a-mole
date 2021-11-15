//Instance variables for timer 
const minutes = 1;
let totalTime = minutes * 60;  

//Fetch HTML elements for update
const timerElement = document.getElementById('timer'); 

setInterval(countdownTimer, 1000);

function countdownTimer() { 
    while (totalTime >= 0) {
        let seconds = totalTime; 
        timerElement.innerHTML = `${seconds}`; 
        totalTime--; 
        return totalTime;
    }
}

