let totalSeconds = 0;
let timerInterval = null;
let isRunning = false;
let startTime = null;
let pausedTime = 0;

const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const mainBtn = document.getElementById('mainBtn');
const resetBtn = document.getElementById('resetBtn');
const minimizeBtn = document.getElementById('minimizeBtn');
const closeBtn = document.getElementById('closeBtn');

function updateDisplay() {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  hoursDisplay.textContent = String(hours).padStart(2, '0');
  minutesDisplay.textContent = String(minutes).padStart(2, '0');
  secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
  if (timerInterval) return;
  
  isRunning = true;
  startTime = Date.now() - (pausedTime * 1000);
  
  updateTimerFromElapsed();
  
  timerInterval = setInterval(() => {
    updateTimerFromElapsed();
  }, 50);
  
  mainBtn.textContent = 'Stop';
  mainBtn.classList.add('running');
}

function updateTimerFromElapsed() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  if (elapsed !== totalSeconds) {
    totalSeconds = elapsed;
    updateDisplay();
  }
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  isRunning = false;
  pausedTime = totalSeconds;
  mainBtn.textContent = 'Resume';
  mainBtn.classList.remove('running');
}

function resetTimer() {
  stopTimer();
  totalSeconds = 0;
  pausedTime = 0;
  startTime = null;
  updateDisplay();
  mainBtn.textContent = 'Start';
  mainBtn.classList.remove('running');
}

//main button does both start/stop 
mainBtn.addEventListener('click', () => {
  if (!isRunning) {
    startTimer();
  } else {
    stopTimer();
  }
});

//resets everything
resetBtn.addEventListener('click', () => {
  resetTimer();
});

//window controls
minimizeBtn.addEventListener('click', () => {
  window.electronAPI.minimizeWindow();
});

closeBtn.addEventListener('click', () => {
  window.electronAPI.closeWindow();
});


updateDisplay();