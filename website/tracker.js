document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('progressGrid');
    const countSpan = document.getElementById('completedCount');
    const barFill = document.getElementById('progressBarFill');
    const totalDays = 100;

    // 1. Load progress from localStorage (or initialize empty array)
    let progress = JSON.parse(localStorage.getItem('webDev100Progress')) || [];

    // 2. Function to update stats (text and progress bar)
    function updateStats() {
        const completed = progress.length;
        countSpan.textContent = completed;
        
        const percentage = (completed / totalDays) * 100;
        barFill.style.width = `${percentage}%`;
    }

    // 3. Function to toggle a day's status
    function toggleDay(dayNumber, boxElement) {
        if (progress.includes(dayNumber)) {
            // Remove from progress
            progress = progress.filter(d => d !== dayNumber);
            boxElement.classList.remove('completed');
        } else {
            // Add to progress
            progress.push(dayNumber);
            boxElement.classList.add('completed');
            
            // Optional: Add a little confetti effect or log here
        }

        // Save to Local Storage
        localStorage.setItem('webDev100Progress', JSON.stringify(progress));
        updateStats();
    }

    // 4. Render the 100 boxes
    if (grid) {
        grid.innerHTML = ''; // Clear existing content if any

        for (let i = 1; i <= totalDays; i++) {
            const box = document.createElement('div');
            box.className = 'day-box';
            box.textContent = i;
            
            // Check if this day is already completed
            if (progress.includes(i)) {
                box.classList.add('completed');
            }

            // Add click event
            box.addEventListener('click', () => toggleDay(i, box));
            
            grid.appendChild(box);
        }
        
        // Initial stats update
        updateStats();
    }
});