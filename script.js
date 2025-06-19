class Stopwatch {
    constructor(displayElement, controls) {
        this.display = displayElement;
        this.startBtn = controls.startBtn;
        this.pauseBtn = controls.pauseBtn;
        this.resetBtn = controls.resetBtn;
        
        this.time = 0;
        this.isRunning = false;
        this.interval = null;

        this.init();
    }
    
    init() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
    }
    
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        const startTime = Date.now() - this.time;
        
        this.interval = setInterval(() => {
            this.time = Date.now() - startTime;
            this.updateDisplay();
        }, 10);
        
        this.toggleButtons();
    }
    
    pause() {
        if (!this.isRunning) return;
        
        clearInterval(this.interval);
        this.isRunning = false;
        this.toggleButtons();
    }
    
    reset() {
        this.pause();
        this.time = 0;
        this.updateDisplay();
        this.toggleButtons();
    }
    
    updateDisplay() {
        this.display.textContent = this.formatTime(this.time);
    }
    
    formatTime(time) {
        const date = new Date(time);
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const milliseconds = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, '0');
        
        return `${minutes}:${seconds}.${milliseconds}`;
    }
    
    toggleButtons() {
        this.startBtn.disabled = this.isRunning;
        this.pauseBtn.disabled = !this.isRunning;
        this.resetBtn.disabled = this.isRunning && this.time === 0;
    }
}

class Countdown {
    constructor(displayElement, controls) {
        this.display = displayElement;
        this.input = controls.input;
        this.setBtn = controls.setBtn;
        this.startBtn = controls.startBtn;
        this.pauseBtn = controls.pauseBtn;
        this.resetBtn = controls.resetBtn;
        this.soundToggle = controls.soundToggle;
        this.alarmSound = controls.alarmSound;
        
        this.initialTime = 0;
        this.remainingTime = 0;
        this.isRunning = false;
        this.interval = null;
        
        this.init();
    }
    
    init() {
        this.setBtn.addEventListener('click', () => this.setTime());
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.setTime();
        });
    }
    
    setTime() {
        const inputValue = this.input.value.trim();
        
        if (!this.validateInput(inputValue)) {
            alert('Formato inválido. Use mm:ss (ej. 1:30)');
            return;
        }
        
        const [minutes, seconds] = inputValue.split(':').map(Number);
        this.initialTime = (minutes * 60) + seconds;
        this.remainingTime = this.initialTime;
        
        this.updateDisplay();
        this.startBtn.disabled = false;
        this.input.disabled = true;
        this.setBtn.disabled = true;
    }
    
    validateInput(value) {
        return /^[0-9]{1,2}:[0-5][0-9]$/.test(value);
    }
    
    start() {
        if (this.isRunning || this.remainingTime <= 0) return;
        
        this.isRunning = true;
        this.interval = setInterval(() => this.tick(), 1000);
        this.toggleButtons();
    }
    
    pause() {
        if (!this.isRunning) return;
        
        clearInterval(this.interval);
        this.isRunning = false;
        this.toggleButtons();
    }
    
    reset() {
        this.pause();
        this.remainingTime = this.initialTime;
        this.updateDisplay();
        this.toggleButtons();
        this.input.disabled = false;
        this.setBtn.disabled = false;
        this.startBtn.disabled = true;
    }
    
    tick() {
        if (this.remainingTime <= 0) {
            this.complete();
            return;
        }
        
        this.remainingTime--;
        this.updateDisplay();
    }
    
    complete() {
        this.pause();
        this.remainingTime = 0;
        this.updateDisplay();
        
        if (this.soundToggle.checked) {
            this.alarmSound.currentTime = 0;
            this.alarmSound.play();
        }
        
        this.toggleButtons();
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        
        this.display.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    toggleButtons() {
        this.startBtn.disabled = this.isRunning || this.remainingTime <= 0;
        this.pauseBtn.disabled = !this.isRunning;
        this.resetBtn.disabled = !this.initialTime || this.isRunning;
    }
}

class TabManager {
    constructor() {
        this.tabButtons = document.querySelectorAll('.tab-button');
        this.tabContents = document.querySelectorAll('.tab-content');
        
        this.init();
    }
    
    init() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => this.switchTab(button.dataset.tab));
        });
    }
    
    switchTab(tabId) {
        this.tabButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.tab === tabId);
        });
        
        this.tabContents.forEach(content => {
            content.classList.toggle('active', content.id === tabId);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TabManager();
    
    const stopwatch = new Stopwatch(
        document.getElementById('stopwatch-time'),
        {
            startBtn: document.getElementById('start-stopwatch'),
            pauseBtn: document.getElementById('pause-stopwatch'),
            resetBtn: document.getElementById('reset-stopwatch')
        }
    );
    
    const countdown = new Countdown(
        document.getElementById('countdown-time'),
        {
            input: document.getElementById('countdown-input'),
            setBtn: document.getElementById('set-countdown'),
            startBtn: document.getElementById('start-countdown'),
            pauseBtn: document.getElementById('pause-countdown'),
            resetBtn: document.getElementById('reset-countdown'),
            soundToggle: document.getElementById('sound-toggle'),
            alarmSound: document.getElementById('alarm-sound')
        }
    );
});