let timer;
let seconds = 0;
let minutes = 0;
let hours = 0;

const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');

function startTimer() {
    timer = setInterval(updateTime, 1000);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
}

function pauseTimer() {
    clearInterval(timer);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetTimer() {
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateTimeDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
}

function updateTime() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }
    updateTimeDisplay();
}

function updateTimeDisplay() {
    const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    timeDisplay.textContent = formattedTime;
}

function pad(number) {
    return number.toString().padStart(2, '0');
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);