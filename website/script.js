const projects = [
    // BEGINNER (Days 1-30) - Updated to match your actual Day XX folders
    { day: 1, title: "Animated Landing Page", folder: "Day 01", level: "Beginner" },
    { day: 2, title: "Advanced To-Do List", folder: "Day 02", level: "Beginner" },
    { day: 3, title: "Weather Forecast App", folder: "Day 03", level: "Beginner" },
    { day: 4, title: "Jewellery-company landing page", folder: "Day 04", level: "Beginner" },
    { day: 5, title: "Random Image Generator", folder: "Day 05", level: "Beginner" },
    { day: 6, title: "New Year Countdown", folder: "Day 06", level: "Beginner" },
    { day: 7, title: "Stylish Animated loginpage", folder: "Day 07", level: "Beginner" },
    { day: 8, title: "BMI Calculator", folder: "Day 08", level: "Beginner" },
    { day: 9, title: "QR Generator", folder: "Day 09", level: "Beginner" },
    { day: 10, title: "Rock Paper Scissors Game", folder: "Day 10", level: "Beginner" },
    { day: 11, title: "Reading Journal", folder: "Day 11", level: "Beginner" },
    { day: 12, title: "Pong Game", folder: "Day 12", level: "Beginner" },
    { day: 13, title: "Colour Picker", folder: "Day 13", level: "Beginner" },
    { day: 14, title: "Drawing Canvas", folder: "Day 14", level: "Beginner" },
    { day: 15, title: "Nasa Astronomy Picture of the day", folder: "Day 15", level: "Beginner" },
    { day: 16, title: "World Clock", folder: "Day 16", level: "Beginner" },
    { day: 17, title: "Mood Timer", folder: "Day 17", level: "Beginner" },
    { day: 18, title: "text to PDF Convertor", folder: "Day 18", level: "Beginner" },
    { day: 19, title: "Memory Card Game", folder: "Day 19", level: "Beginner" },
    { day: 20, title: "Email Validator", folder: "Day 20", level: "Beginner" },
    { day: 21, title: "Snake And Ladder Game", folder: "Day 21", level: "Beginner" },
    { day: 22, title: "Space Jumper Game", folder: "Day 22", level: "Beginner" },
    { day: 23, title: "Smart Calculator 2.0", folder: "Day 23", level: "Beginner" },
    { day: 24, title: "Promodoro Timer", folder: "Day 24", level: "Beginner" },
    { day: 25, title: "Temperature Converter", folder: "Day 25", level: "Beginner" },
    { day: 26, title: "Space War Game", folder: "Day 26", level: "Beginner" },
    { day: 27, title: "CHESS GAME", folder: "Day 27", level: "Beginner" },
    { day: 28, title: "Coming Soon", folder: "Day 28", level: "Beginner" },
    { day: 29, title: "Coming Soon", folder: "Day 29", level: "Beginner" },
    { day: 30, title: "Coming Soon", folder: "Day 30", level: "Beginner" },

    // INTERMEDIATE (Days 31-60)
    { day: 31, title: "Bubble Shooter Game", folder: "Day 31", level: "Intermediate" },
    { day: 32, title: "Animated Login Form", folder: "Day 32", level: "Intermediate" },
    { day: 33, title: "Guess the Number Game", folder: "Day 33", level: "Intermediate" },
    { day: 34, title: "Typing Speed Test webapp", folder: "Day 34", level: "Intermediate" },
    { day: 35, title: "Startup Name Generator Web App", folder: "Day 35", level: "Intermediate" },
    { day: 36, title: "Coming Soon", folder: "Day 36", level: "Intermediate" },
    { day: 37, title: "Recipe Finder", folder: "Day 37", level: "Intermediate" },
    { day: 38, title: "Snake Game", folder: "Day 38", level: "Intermediate" },
    { day: 39, title: "Hangman Game", folder: "Day 39", level: "Intermediate" },
    { day: 40, title: "Simon Say Game", folder: "Day 40", level: "Intermediate" },
    // Continue pattern for remaining days...
    { day: 60, title: "Coming Soon", folder: "Day 60", level: "Intermediate" },

    // ADVANCED & CAPSTONE - Follow same pattern
    { day: 61, title: "Doodle Jump Game", folder: "Day 61", level: "Advanced" },
    // ... add more as you complete them
    { day: 100, title: "Master Project", folder: "Day 100", level: "Capstone" }
];

const grid = document.getElementById('projects-grid');
const tabs = document.querySelectorAll('.tab-btn');
const repoBaseUrl = "https://github.com/Shubham-cyber-prog/100-days-of-web-development/tree/main/public/";
const liveBaseUrl = "../public/";

function renderProjects(category = 'All') {
    grid.innerHTML = '';

    const filteredProjects = category === 'All'
        ? projects
        : projects.filter(p => p.level === category);

    filteredProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="card-header">
                <span class="badge ${project.level.toLowerCase()}">${project.level}</span>
                <span class="day-number">Day ${project.day}</span>
            </div>
            <h3>${project.title}</h3>
            <p>A ${project.level} level project.</p>
            <div class="card-actions">
                <a href="${liveBaseUrl}${project.folder}/index.html" target="_blank" class="btn-small">Live Demo</a>
                <a href="${repoBaseUrl}${project.folder}" target="_blank" class="btn-small outline">View Code</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Tab Switching Logic
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderProjects(tab.dataset.category);
    });
});

// Initial Render
renderProjects();
