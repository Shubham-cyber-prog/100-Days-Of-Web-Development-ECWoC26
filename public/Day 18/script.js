
let countdownInterval = null;
let targetDateTime = null;
let startDateTime = null;

// Initialize particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Set default date to tomorrow
function setDefaultDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];
    document.getElementById('targetDate').value = dateString;
}

// Get next weekend (Friday)
function getNextWeekend() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + daysUntilFriday);
    return nextFriday.toISOString().split('T')[0];
}

// Set preset countdown
function setPreset(eventName, date, time) {
    document.getElementById('eventName').value = eventName;
    document.getElementById('targetDate').value = date;
    document.getElementById('targetTime').value = time;
    startCountdown();
}

// Start countdown
function startCountdown() {
    const eventName = document.getElementById('eventName').value;
    const targetDate = document.getElementById('targetDate').value;
    const targetTime = document.getElementById('targetTime').value;

    if (!targetDate) {
        alert('Please select a target date!');
        return;
    }

    // Clear existing interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    // Set target date time
    targetDateTime = new Date(`${targetDate}T${targetTime}`);
    startDateTime = new Date();

    // Update event title
    document.getElementById('eventTitle').textContent = eventName || 'Countdown';

    // Show reset button
    document.getElementById('resetBtn').classList.add('active');

    // Start the countdown
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

// Update countdown display
function updateCountdown() {
    const now = new Date();
    const timeRemaining = targetDateTime - now;

    if (timeRemaining <= 0) {
        // Countdown finished
        clearInterval(countdownInterval);
        showCompletionMessage();
        return;
    }

    // Calculate time units
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Update display
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // Update progress bar
    updateProgressBar(now);
}

// Update progress bar
function updateProgressBar(now) {
    const totalDuration = targetDateTime - startDateTime;
    const elapsed = now - startDateTime;
    const progress = (elapsed / totalDuration) * 100;

    document.getElementById('progressFill').style.width = Math.min(progress, 100) + '%';
}

// Show completion message
function showCompletionMessage() {
    document.getElementById('eventTitle').textContent = '🎉 Time\'s Up!';
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    document.getElementById('progressFill').style.width = '100%';

    // Play celebration sound
    playCelebrationSound();

    // Add celebration effect
    createConfetti();
}

// Play celebration sound using Web Audio API
function playCelebrationSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Create a cheerful melody
        const notes = [
            { freq: 523.25, time: 0, duration: 0.15 },    // C5
            { freq: 659.25, time: 0.15, duration: 0.15 }, // E5
            { freq: 783.99, time: 0.3, duration: 0.15 },  // G5
            { freq: 1046.5, time: 0.45, duration: 0.3 }   // C6
        ];

        notes.forEach(note => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = note.freq;
            oscillator.type = 'sine';

            // Envelope for smooth sound
            gainNode.gain.setValueAtTime(0, audioContext.currentTime + note.time);
            gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + note.time + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + note.time + note.duration);

            oscillator.start(audioContext.currentTime + note.time);
            oscillator.stop(audioContext.currentTime + note.time + note.duration);
        });
    } catch (error) {
        console.log('Audio playback not supported:', error);
    }
}

// Create confetti effect
function createConfetti() {
    const colors = ['#FF6B35', '#4ECDC4', '#FFD700', '#FF1493', '#00CED1'];
    const particlesContainer = document.getElementById('particles');

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;

        particlesContainer.appendChild(confetti);

        // Remove after animation
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Add fall animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Reset countdown
function resetCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }

    document.getElementById('eventTitle').textContent = 'Set a countdown to begin';
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('resetBtn').classList.remove('active');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setDefaultDate();
=======
const inputs = document.querySelectorAll(".inputs input");
const display = document.querySelector(".display");
const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
const resetBtn = document.querySelector(".reset");
const statusText = document.querySelector(".status");

let totalSeconds = 0;
let timer = null;
let isPaused = false;

function getInputTime() {
    const hours = parseInt(inputs[0].value) || 0;
    const minutes = parseInt(inputs[1].value) || 0;
    const seconds = parseInt(inputs[2].value) || 0;
    return hours * 3600 + minutes * 60 + seconds;
}

function updateDisplay() {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    display.textContent = 
    `${String(h).padStart(2, "0")}:` +
    `${String(m).padStart(2, "0")}:` +
    `${String(s).padStart(2, "0")}`;
}

    startBtn.addEventListener("click", () => {
        if (timer) return;

        if (!isPaused) {
            totalSeconds = getInputTime();
        }

        if (totalSeconds <= 0) {
            statusText.textContent = "Plese enter a valid time.";
            return;
        }

        statusText.textContent = "Timer running...";
        isPaused = false;

        timer = setInterval( () => {
            if (totalSeconds <= 0) {
                clearInterval(timer);
                timer = null;
                statusText.textContent = "⏰ Time's up!";
                return;
            }

            totalSeconds--;
            updateDisplay();
        }, 1000);
    });

    pauseBtn.addEventListener("click", () => {
        if (!timer) return;

        clearInterval(timer);
        timer = null;
        isPaused = true;
        statusText.textContent = "Paused";
    });

    resetBtn.addEventListener("click", () => {
        clearInterval(timer);
        timer = null;
        isPaused = false;
        totalSeconds = 0;

        inputs.forEach(input => input.value = "");
        display.textContent = "00:00:00";
        statusText.textContent = "";
    });

// Dark mode toggle
const themeToggle = document.querySelector(".theme-toggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");

});
