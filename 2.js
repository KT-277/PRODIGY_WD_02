let interval;
let milliseconds = 0;
let lapCount = 0;

const timeDisplay = document.getElementById('time-display');
const secondHand = document.getElementById('second-hand');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsContainer = document.getElementById('laps');

function updateDisplay() {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);

    timeDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;

    const secondsDeg = (milliseconds % 60000) / 1000 * 6;
    secondHand.style.transform = `translateX(-50%) rotate(${secondsDeg}deg)`;
}

function startStopwatch() {
    if (interval) return;
    interval = setInterval(() => {
        milliseconds += 10;
        updateDisplay();
    }, 10);
}

function resetStopwatch() {
    clearInterval(interval);
    interval = null;
    milliseconds = 0;
    lapCount = 0;
    lapsContainer.innerHTML = '';
    updateDisplay();
}

function recordLap() {
    lapCount++;
    const lapItem = document.createElement('div');
    lapItem.classList.add('lap-item');
    lapItem.textContent = `Lap ${lapCount}: ${timeDisplay.textContent}`;
    lapsContainer.appendChild(lapItem);
}

startBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

updateDisplay(); // Initialize the display
