let countdownInterval = null;
let targetDateTime = null;
let startDateTime = null;

// Initialize background particles
function createParticles() {
    const particlesContainer = document.getElementById("particles");
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        particle.style.animationDelay = Math.random() * 10 + "s";
        particle.style.animationDuration = Math.random() * 10 + 10 + "s";
        particlesContainer.appendChild(particle);
    }
}

// Set default date to tomorrow
function setDefaultDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById("targetDate").value =
        tomorrow.toISOString().split("T")[0];
}

// Set preset countdown
function setPreset(eventName, date, time) {
    document.getElementById("eventName").value = eventName;
    document.getElementById("targetDate").value = date;
    document.getElementById("targetTime").value = time;
    startCountdown();
}

// Start countdown
function startCountdown() {
    const eventName = document.getElementById("eventName").value;
    const targetDate = document.getElementById("targetDate").value;
    const targetTime = document.getElementById("targetTime").value || "00:00";

    if (!targetDate) {
        alert("Please select a target date!");
        return;
    }

    targetDateTime = new Date(`${targetDate}T${targetTime}`);
    const now = new Date();

    // Prevent past date selection
    if (targetDateTime <= now) {
        alert("Please select a future date and time");
        return;
    }

    // Clear existing countdown
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    startDateTime = now;

    document.getElementById("eventTitle").textContent =
        eventName || "Countdown";
    document.getElementById("resetBtn").classList.add("active");

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

// Update countdown display
function updateCountdown() {
    const now = new Date();
    const timeRemaining = targetDateTime - now;

    if (timeRemaining <= 0) {
        clearInterval(countdownInterval);
        showCompletionMessage();
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");

    updateProgressBar(now);
}

// Update progress bar safely
function updateProgressBar(now) {
    const totalDuration = targetDateTime - startDateTime;
    const elapsed = now - startDateTime;

    let progress = (elapsed / totalDuration) * 100;
    progress = Math.max(0, Math.min(progress, 100));

    document.getElementById("progressFill").style.width = progress + "%";
}

// Show completion message
function showCompletionMessage() {
    document.getElementById("eventTitle").textContent = "🎉 Time's Up!";
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    document.getElementById("progressFill").style.width = "100%";

    playCelebrationSound();
    createConfetti();
}

// Celebration sound
function playCelebrationSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [
            { freq: 523.25, time: 0, duration: 0.15 },
            { freq: 659.25, time: 0.15, duration: 0.15 },
            { freq: 783.99, time: 0.3, duration: 0.15 },
            { freq: 1046.5, time: 0.45, duration: 0.3 }
        ];

        notes.forEach(note => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();

            osc.connect(gain);
            gain.connect(audioContext.destination);

            osc.frequency.value = note.freq;
            osc.type = "sine";

            gain.gain.setValueAtTime(0, audioContext.currentTime + note.time);
            gain.gain.linearRampToValueAtTime(
                0.3,
                audioContext.currentTime + note.time + 0.01
            );
            gain.gain.exponentialRampToValueAtTime(
                0.01,
                audioContext.currentTime + note.time + note.duration
            );

            osc.start(audioContext.currentTime + note.time);
            osc.stop(audioContext.currentTime + note.time + note.duration);
        });
    } catch (err) {
        console.log("Audio not supported", err);
    }
}

// Confetti effect
function createConfetti() {
    const colors = ["#FF6B35", "#4ECDC4", "#FFD700", "#FF1493", "#00CED1"];
    const container = document.getElementById("particles");

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.style.position = "absolute";
        confetti.style.width = "10px";
        confetti.style.height = "10px";
        confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.top = "-10px";
        confetti.style.borderRadius = "50%";
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;

        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Fall animation
const style = document.createElement("style");
style.textContent = `
@keyframes fall {
    to {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
    }
}`;
document.head.appendChild(style);

// Reset countdown
function resetCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }

    document.getElementById("eventTitle").textContent =
        "Set a countdown to begin";
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    document.getElementById("progressFill").style.width = "0%";
    document.getElementById("resetBtn").classList.remove("active");
}

// Page init
document.addEventListener("DOMContentLoaded", () => {
    createParticles();
    setDefaultDate();

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
});
