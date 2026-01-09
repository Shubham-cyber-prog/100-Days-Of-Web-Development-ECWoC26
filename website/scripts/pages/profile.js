/**
 * Profile Page Logic
 * Generates the 100-day mission log grid with interactivity.
 */

// Auth Guard (Simplified for static view)
const authToken = sessionStorage.getItem('authToken');
if (!authToken && window.location.hostname !== 'localhost' && !window.location.protocol.includes('file')) {
    // window.location.href = '../pages/login.html';
}

const gridContainer = document.getElementById('missionGrid');
const percentageDisplay = document.querySelector('.text-flame'); // The "45%" text

// Initialize Progress
// Try to load from storage, otherwise default to 0 (all false)
const savedProgress = localStorage.getItem('zenith_mission_progress');
let progressData = savedProgress ? JSON.parse(savedProgress) : new Array(100).fill(false);

// Ensure data integrity (if resized or old format)
if (progressData.length !== 100) {
    progressData = new Array(100).fill(false);
}

function updateStats() {
    const completedCount = progressData.filter(Boolean).length;
    if (percentageDisplay) {
        percentageDisplay.textContent = `${completedCount}%`;
    }
}

function toggleDay(index) {
    progressData[index] = !progressData[index];
    saveProgress();
    renderGrid(); // Re-render to update state
    updateStats();
}

function saveProgress() {
    localStorage.setItem('zenith_mission_progress', JSON.stringify(progressData));
}

function renderGrid() {
    if (!gridContainer) return;

    gridContainer.innerHTML = '';

    progressData.forEach((isCompleted, index) => {
        const dayNumber = index + 1;
        const cell = document.createElement('div');

        // Base class + completed state
        cell.className = `mission-cell ${isCompleted ? 'completed' : ''}`;

        // Tooltip
        cell.title = `Day ${dayNumber}: ${isCompleted ? 'Mission Accomplished' : 'Pending Deployment'}`;

        // Interaction
        cell.style.cursor = 'pointer';
        cell.onclick = () => toggleDay(index);

        gridContainer.appendChild(cell);
    });

    updateStats();
}

// Run immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderGrid);
} else {
    renderGrid();
}
