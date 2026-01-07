document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('progressGrid');
    const countSpan = document.getElementById('completedCount');
    const barFill = document.getElementById('progressBarFill');
    const totalDays = 100;

    // 1. Auto-sync progress from projects array if available
    let progress = [];
    
    if (typeof projects !== 'undefined') {
        // Filter projects that are NOT "Coming Soon"
        const completedProjects = projects.filter(p => 
            p.title !== "Coming Soon" && 
            p.title.length > 0
        );
        progress = completedProjects.map(p => p.day);
        
        // Update localStorage to match reality
        localStorage.setItem('webDev100Progress', JSON.stringify(progress));
    } else {
        // Fallback for when script.js isn't loaded or projects is undefined
        progress = JSON.parse(localStorage.getItem('webDev100Progress')) || [];
    }

    // 2. Function to update stats (text and progress bar)
    function updateStats() {
        const completed = progress.length;
        countSpan.textContent = completed;
        
        // Update circular progress or bar if they exist
        if (barFill) {
             const percentage = (completed / totalDays) * 100;
             barFill.style.width = `${percentage}%`;
        }
    }

    // 3. Toggle disabled for auto-mode, or purely for visual play (doesn't save)
    function toggleDay(dayNumber, boxElement) {
       // Optional: Make it read-only or just a visual effect
       // For now, we'll keep it read-only to reflect the "Auto Update" request
       // console.log("Tracker is in auto-mode based on repo contents.");
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
                
                // Check if completed
                if (progress.includes(dayNum)) {
                    box.classList.add('completed');
                }

                // Add click event
                box.textContent = dayNum; // Show number inside
                box.addEventListener('click', () => toggleDay(dayNum, box));
                quarterBlock.appendChild(box);
            }

            grid.appendChild(quarterBlock);
        }

        // Initial stats update
        updateStats();
    }
});