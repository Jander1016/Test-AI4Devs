// Cronómetro
let stopwatchInterval;
let stopwatchSeconds = 0;
const stopwatchDisplay = document.getElementById('stopwatch-display');
const startStopwatchBtn = document.getElementById('stopwatch-start');
const pauseStopwatchBtn = document.getElementById('stopwatch-pause');
const resetStopwatchBtn = document.getElementById('stopwatch-reset');

function updateStopwatchDisplay() {
    const hours = Math.floor(stopwatchSeconds / 3600);
    const minutes = Math.floor((stopwatchSeconds % 3600) / 60);
    const seconds = stopwatchSeconds % 60;
    stopwatchDisplay.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

startStopwatchBtn.addEventListener('click', () => {
    stopwatchInterval = setInterval(() => {
        stopwatchSeconds++;
        updateStopwatchDisplay();
    }, 1000);
    startStopwatchBtn.disabled = true;
    pauseStopwatchBtn.disabled = false;
    resetStopwatchBtn.disabled = false;
});

pauseStopwatchBtn.addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    startStopwatchBtn.disabled = false;
    pauseStopwatchBtn.disabled = true;
});

resetStopwatchBtn.addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchSeconds = 0;
    updateStopwatchDisplay();
    startStopwatchBtn.disabled = false;
    pauseStopwatchBtn.disabled = true;
    resetStopwatchBtn.disabled = true;
});

// Cuenta Atrás
let countdownInterval;
let countdownTime = 0;
const countdownDisplay = document.getElementById('countdown-display');
const countdownInput = document.getElementById('countdown-input');
const startCountdownBtn = document.getElementById('countdown-start');
const pauseCountdownBtn = document.getElementById('countdown-pause');
const resetCountdownBtn = document.getElementById('countdown-reset');

function updateCountdownDisplay() {
    const hours = Math.floor(countdownTime / 3600);
    const minutes = Math.floor((countdownTime % 3600) / 60);
    const seconds = countdownTime % 60;
    countdownDisplay.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

startCountdownBtn.addEventListener('click', () => {
    if (countdownTime <= 0) {
        countdownTime = parseInt(countdownInput.value) || 0;
        if (countdownTime <= 0) return;
    }
    updateCountdownDisplay();
    countdownInterval = setInterval(() => {
        if (countdownTime <= 0) {
            clearInterval(countdownInterval);
            countdownDisplay.textContent = "00:00:00";
            startCountdownBtn.disabled = false;
            pauseCountdownBtn.disabled = true;
            resetCountdownBtn.disabled = false;
            return;
        }
        countdownTime--;
        updateCountdownDisplay();
    }, 1000);
    startCountdownBtn.disabled = true;
    pauseCountdownBtn.disabled = false;
    resetCountdownBtn.disabled = false;
});

pauseCountdownBtn.addEventListener('click', () => {
    clearInterval(countdownInterval);
    startCountdownBtn.disabled = false;
    pauseCountdownBtn.disabled = true;
});

resetCountdownBtn.addEventListener('click', () => {
    clearInterval(countdownInterval);
    countdownTime = 0;
    countdownDisplay.textContent = "00:00:00";
    startCountdownBtn.disabled = false;
    pauseCountdownBtn.disabled = true;
    resetCountdownBtn.disabled = true;
});