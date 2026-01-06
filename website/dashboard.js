document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userEmail = localStorage.getItem('userEmail');

    if (!isAuthenticated || !userEmail) {
        window.location.href = 'login.html';
        return;
    }

    // Set user name
    const userNameElement = document.getElementById('userName');
    userNameElement.textContent = userEmail.split('@')[0];

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('completedDays');
        window.location.href = 'login.html';
    });

    // Load completed days from localStorage
    let completedDays = JSON.parse(localStorage.getItem('completedDays') || '[]');

    // Render progress grid
    renderProgressGrid();

    // Update stats
    updateStats();

    // Render recommendations
    renderRecommendations();

    function renderProgressGrid() {
        const progressGrid = document.getElementById('progressGrid');
        progressGrid.innerHTML = '';

        for (let day = 1; day <= 100; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = `progress-day ${completedDays.includes(day) ? 'completed' : ''}`;
            dayElement.textContent = day;
            dayElement.addEventListener('click', () => toggleDay(day));
            progressGrid.appendChild(dayElement);
        }
    }

    function toggleDay(day) {
        if (completedDays.includes(day)) {
            completedDays = completedDays.filter(d => d !== day);
        } else {
            completedDays.push(day);
        }
        localStorage.setItem('completedDays', JSON.stringify(completedDays));
        renderProgressGrid();
        updateStats();
        renderRecommendations();
    }

    function updateStats() {
        const completedCount = completedDays.length;
        document.getElementById('completedDays').textContent = completedCount;

        // Calculate current streak
        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;

        for (let day = 1; day <= 100; day++) {
            if (completedDays.includes(day)) {
                tempStreak++;
                currentStreak = tempStreak;
            } else {
                if (tempStreak > longestStreak) longestStreak = tempStreak;
                tempStreak = 0;
            }
        }
        if (tempStreak > longestStreak) longestStreak = tempStreak;

        document.getElementById('currentStreak').textContent = currentStreak;
        document.getElementById('longestStreak').textContent = longestStreak;
    }

    function renderRecommendations() {
        const recommendationsGrid = document.getElementById('recommendationsGrid');
        recommendationsGrid.innerHTML = '';

        // Get next incomplete days
        const nextDays = [];
        for (let day = 1; day <= 100; day++) {
            if (!completedDays.includes(day)) {
                nextDays.push(day);
                if (nextDays.length >= 6) break;
            }
        }

        // Get project details for recommendations
        nextDays.forEach(day => {
            const project = projects.find(p => p.day === day);
            if (project) {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
                    <div class="card-header">
                        <span class="day-number">Day ${project.day}</span>
                        <span class="badge">${project.level}</span>
                    </div>
                    <h3>${project.title}</h3>
                    <p>${project.tech ? project.tech.join(', ') : 'HTML, CSS, JS'}</p>
                    <div class="card-actions">
                        <a href="../public/${project.folder}/index.html" target="_blank" class="btn-small">Live Demo</a>
                        <a href="https://github.com/Shubham-cyber-prog/100-days-of-web-development/tree/main/public/${project.folder}" target="_blank" class="btn-small outline">View Code</a>
                    </div>
                `;
                recommendationsGrid.appendChild(card);
            }
        });
    }
});
