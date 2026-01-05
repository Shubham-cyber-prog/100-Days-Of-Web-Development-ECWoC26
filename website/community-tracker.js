document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('community-grid');
    const totalDays = 100;

    async function loadCommunityProgress() {
        try {
            // Replace with an API endpoint later
            const response = await fetch('community.json'); 
            const contributors = await response.json();

            grid.innerHTML = '';

            contributors.sort((a, b) => b.completedDays.length - a.completedDays.length);

            contributors.forEach(user => {
                const progressCount = user.completedDays.length;
                const percentage = (progressCount / totalDays) * 100;
                
                const card = document.createElement('div');
                card.className = 'project-card contributor-progress-card';

                card.innerHTML = `
                    <div class="card-header">
                        <div class="user-info" style="display: flex; align-items: center; gap: 1rem;">
                            <img src="${user.avatar}" alt="${user.username}" class="contributor-img" style="width: 50px; height: 50px; border-width: 2px; margin:0;">
                            <div>
                                <h3 style="margin: 0; font-size: 1.1rem;">${user.username}</h3>
                                <a href="${user.profileUrl}" target="_blank" style="font-size: 0.8rem; color: var(--accent-primary); text-decoration: none;">@${user.username}</a>
                            </div>
                        </div>
                        <span class="badge ${getBadgeClass(progressCount)}">${progressCount} Days</span>
                    </div>
                    
                    <div class="progress-section" style="margin: 1rem 0;">
                        <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                            <span>Progress</span>
                            <span>${Math.round(percentage)}%</span>
                        </div>
                        <div class="progress-bar-container" style="height: 8px;">
                            <div class="progress-bar-fill" style="width: ${percentage}%;"></div>
                        </div>
                    </div>

                    <div class="latest-activity">
                        <p style="font-size: 0.9rem; margin-bottom: 0.5rem; color: var(--text-secondary);">
                            Working on: <strong style="color: var(--text-primary);">${user.currentProject || 'N/A'}</strong>
                        </p>
                    </div>

                    <div class="card-actions">
                        <a href="${user.profileUrl}" target="_blank" class="btn-small outline">View Profile</a>
                    </div>
                `;
                
                grid.appendChild(card);
            });

        } catch (error) {
            console.error("Error loading community progress:", error);
            grid.innerHTML = '<p style="color: #ef4444;">Unable to load community data.</p>';
        }
    }

    function getBadgeClass(count) {
        if (count >= 90) return 'capstone';
        if (count >= 60) return 'advanced';
        if (count >= 30) return 'intermediate';
        return 'beginner';
    }

    loadCommunityProgress();
});