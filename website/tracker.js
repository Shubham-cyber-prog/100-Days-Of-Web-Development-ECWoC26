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

    // 4. Render the 100 boxes in 4 columns (Quarters) of 25
    if (grid) {
        grid.innerHTML = ''; // Clear existing content

        // Create 4 Quarter Containers
        for (let q = 0; q < 4; q++) {
            const quarterBlock = document.createElement('div');
            quarterBlock.className = 'quarter-block';

            // Add 25 days to this quarter
            for (let i = 1; i <= 25; i++) {
                const dayNum = (q * 25) + i;
                const box = document.createElement('div');
                box.className = 'day-cell';
                box.setAttribute('data-tooltip', `Day ${dayNum}`);

                // Check if completed
                if (progress.includes(dayNum)) {
                    box.classList.add('completed');
                }

                // Add click event
                box.addEventListener('click', () => toggleDay(dayNum, box));
                quarterBlock.appendChild(box);
            }

            grid.appendChild(quarterBlock);
        }

        // Initial stats update
        updateStats();
    }
});