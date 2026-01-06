const grid = document.getElementById('showcase-grid');

async function loadShowcase() {
    try {
        const response = await fetch('showcase.json');
        const projects = await response.json();

        grid.innerHTML = ''; // Clear "Loading..." text

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card showcase-card';

            card.innerHTML = `
                <div class="showcase-img-container">
                    <img src="${project.imageLink}" alt="${project.projectName}" class="showcase-img" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                </div>
                <h3>${project.projectName}</h3>
                <p>By <span class="badge beginner">@${project.contributorName}</span></p>
                <div class="card-actions">
                    <a href="${project.projectLink}" target="_blank" class="btn-small">View Project</a>
                </div>
            `;
            grid.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading showcase:", error);
        grid.innerHTML = '<p style="color: #ef4444;">Failed to load projects. Please try again later.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadShowcase);