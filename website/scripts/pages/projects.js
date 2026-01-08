/**
 * Zenith Project Loader
 * Dynamically loads project cards based on the full 100-day curriculum.
 */

const REPO_URL = "https://github.com/Shubham-cyber-prog/100-Days-Of-Web-Development-ECWoC26/tree/main/public";

// Map of existing folders found in public/ to handle inconsistencies
const folderMap = {
    1: "Day 01", 2: "Day 02", 3: "Day 03", 4: "Day 04", 5: "Day 05",
    6: "Day 06", 7: "Day 07", 8: "Day 08", 9: "Day 09", 11: "Day 11",
    13: "Day 13", 14: "Day 14", 15: "Day 15", 16: "Day 16", 20: "Day 20",
    21: "Day 21", 23: "Day 23", 24: "Day 24", 25: "Day 25", 26: "DAY 26",
    27: "Day 27", 28: "Day 28", 29: "Day 29", 30: "Day 30", 36: "Day 36",
    37: "Day 37", 42: "Day 42", 50: "Day 50", 53: "Day 53", 54: "Day 54",
    56: "Day 56", 58: "Day 58", 59: "Day 59", 60: "Day 60", 61: "Day 61",
    63: "Day 63", 64: "Day 64", 68: "Day 68", 70: "Day 70", 72: "Day 72",
    73: "Day 73", 76: "Day 76", 77: "Day 77", 84: "Day 84", 88: "Day 88",
    100: "Day100"
};

// Full 100-Day Project List
const allProjects = [
    // BEGINNER (Days 1-30)
    { day: 1, title: "Personal Portfolio" }, { day: 2, title: "Responsive Landing Page" }, { day: 3, title: "Todo List" },
    { day: 4, title: "Weather App" }, { day: 5, title: "Calculator" }, { day: 6, title: "Quiz App" },
    { day: 7, title: "Expense Tracker" }, { day: 8, title: "Pomodoro Timer" }, { day: 9, title: "Note Taking App" },
    { day: 10, title: "Recipe Book" }, { day: 11, title: "Blog Website" }, { day: 12, title: "Ecommerce Product Page" },
    { day: 13, title: "Chat UI" }, { day: 14, title: "Music Player" }, { day: 15, title: "Drawing App" },
    { day: 16, title: "Password Generator" }, { day: 17, title: "Unit Converter" }, { day: 18, title: "Countdown Timer" },
    { day: 19, title: "Tip Calculator" }, { day: 20, title: "QR Code Generator" }, { day: 21, title: "Flashcards App" },
    { day: 22, title: "Markdown Previewer" }, { day: 23, title: "Currency Converter" }, { day: 24, title: "BMI Calculator" },
    { day: 25, title: "Random Quote Generator" }, { day: 26, title: "Image Gallery" }, { day: 27, title: "Dice Roller" },
    { day: 28, title: "Rock Paper Scissors" }, { day: 29, title: "Memory Game" }, { day: 30, title: "Tic Tac Toe" },

    // INTERMEDIATE (Days 31-60)
    { day: 31, title: "Job Board" }, { day: 32, title: "Social Media Dashboard" }, { day: 33, title: "Real Estate Website" },
    { day: 34, title: "Hotel Booking System" }, { day: 35, title: "Food Delivery App" }, { day: 36, title: "Fitness Tracker" },
    { day: 37, title: "Event Management" }, { day: 38, title: "Booking Appointment System" }, { day: 39, title: "Online Learning Platform" },
    { day: 40, title: "Movie Database" }, { day: 41, title: "Github Profile Finder" }, { day: 42, title: "Stock Market Tracker" },
    { day: 43, title: "News Aggregator" }, { day: 44, title: "Chat Application" }, { day: 45, title: "Project Management Tool" },
    { day: 46, title: "Ecommerce Cart" }, { day: 47, title: "Banking Dashboard" }, { day: 48, title: "Flight Booking System" },
    { day: 49, title: "Recipe Sharing Platform" }, { day: 50, title: "Blog with CMS" }, { day: 51, title: "Portfolio with Blog" },
    { day: 52, title: "Task Management Board" }, { day: 53, title: "File Uploader" }, { day: 54, title: "Code Editor" },
    { day: 55, title: "Voice Notes App" }, { day: 56, title: "Expense Splitter" }, { day: 57, title: "Habit Tracker" },
    { day: 58, title: "Budget Planner" }, { day: 59, title: "Meal Planner" }, { day: 60, title: "Travel Planner" },

    // ADVANCED (Days 61-90)
    { day: 61, title: "Fullstack Ecommerce" }, { day: 62, title: "Social Network" }, { day: 63, title: "Video Conferencing" },
    { day: 64, title: "Online Code Editor" }, { day: 65, title: "Real Time Collaboration" }, { day: 66, title: "Stock Trading Simulator" },
    { day: 67, title: "Multiplayer Game" }, { day: 68, title: "AI Chatbot" }, { day: 69, title: "Blockchain Explorer" },
    { day: 70, title: "Data Visualization Dashboard" }, { day: 71, title: "Crypto Wallet" }, { day: 72, title: "IoT Dashboard" },
    { day: 73, title: "Machine Learning UI" }, { day: 74, title: "Voice Assistant" }, { day: 75, title: "AR Web App" },
    { day: 76, title: "PWA News App" }, { day: 77, title: "Real Time Analytics" }, { day: 78, title: "Document Editor" },
    { day: 79, title: "Email Client" }, { day: 80, title: "Project Management SaaS" }, { day: 81, title: "Healthcare Portal" },
    { day: 82, title: "E-learning Platform" }, { day: 83, title: "Recruitment Platform" }, { day: 84, title: "Real Time Chat Support" },
    { day: 85, title: "Auction Platform" }, { day: 86, title: "Freelance Marketplace" }, { day: 87, title: "Music Streaming" },
    { day: 88, title: "Video Streaming" }, { day: 89, title: "Smart Home Dashboard" }, { day: 90, title: "Enterprise CRM" },

    // CAPSTONE (Days 91-100)
    { day: 91, title: "Microservices Project", endDay: 92 },
    { day: 93, title: "Open Source Contribution", endDay: 94 },
    { day: 95, title: "Fullstack Application", endDay: 96 },
    { day: 97, title: "Complex Dashboard", endDay: 98 },
    { day: 99, title: "Master Project", endDay: 100 }
];

function getDifficulty(day) {
    if (day <= 30) return "BEGINNER";
    if (day <= 60) return "INTERMEDIATE";
    if (day <= 90) return "ADVANCED";
    return "CAPSTONE";
}

function renderProjects(filter = 'All') {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';

    let delay = 0;

    allProjects.forEach(project => {
        const difficulty = getDifficulty(project.day);

        // Filter Logic
        if (filter !== 'All' && difficulty.toLowerCase() !== filter.toLowerCase()) return;

        // Determine link and status
        let folderName = folderMap[project.day];
        // Handle Capstone ranges if mapped individually (e.g. Day 91-92 might map to Day 91 folder if it existed)

        let liveLink = '#';
        let codeLink = '#';
        let isDisabled = false;

        if (folderName) {
            liveLink = `../../public/${folderName}/index.html`;
            codeLink = `${REPO_URL}/${folderName}`;
        } else {
            isDisabled = true;
            codeLink = REPO_URL; // Fallback to repo root
        }

        // Display "Day X" or "Day X-Y"
        const dayLabel = project.endDay ? `DAYS ${project.day}-${project.endDay}` : `DAY ${project.day}`;

        // Card Construction
        const card = document.createElement('div');
        card.className = 'card project-card animate-enter';
        card.style.animationDelay = `${Math.min(delay, 1000)}ms`; // Cap delay to avoid waiting too long

        // Stagger animation
        delay += 30;

        card.innerHTML = `
            <div class="card-header">
                <span class="text-flame" style="font-size: var(--text-xs); font-weight: bold; letter-spacing: 1px;">
                    ${difficulty} • ${dayLabel}
                </span>
            </div>
            
            <h3 style="font-size: var(--text-xl); margin-bottom: var(--space-4); min-height: 60px;">
                ${project.title}
            </h3>

            <div class="flex gap-4 mt-auto">
                <a href="${liveLink}" class="btn btn-primary ${isDisabled ? 'disabled' : ''}" 
                   style="flex: 1; justify-content: center; font-size: 0.9rem; opacity: ${isDisabled ? '0.5' : '1'}; pointer-events: ${isDisabled ? 'none' : 'auto'};">
                    ${isDisabled ? 'Pending' : 'Live Demo'}
                </a>
                <a href="${codeLink}" target="_blank" class="btn btn-social" style="flex: 1; justify-content: center; font-size: 0.9rem;">
                    View Code
                </a>
            </div>
        `;

        setupTiltEffect(card); // Attach 3D Tilt Logic
        grid.appendChild(card);
    });

    if (grid.children.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-secondary);">
                <h3>No signals detected for this frequency.</h3>
            </div>
        `;
    }
}

/**
 * Applies a 3D Tilt effect based on cursor position.
 * Uses CSS variables --rx and --ry to control rotation.
 */
function setupTiltEffect(card) {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate percentage (0 to 1)
        const xPct = x / rect.width;
        const yPct = y / rect.height;

        // Calculate rotation (Max tilt: 10deg)
        // Y-axis rotation is based on X position (left/right)
        // X-axis rotation is based on Y position (up/down) - Reversed for natural feel
        const rotateY = (xPct - 0.5) * 12;
        const rotateX = (0.5 - yPct) * 12;

        card.style.setProperty('--rx', `${rotateX}deg`);
        card.style.setProperty('--ry', `${rotateY}deg`);
        card.style.setProperty('--tx', `${(xPct - 0.5) * 5}px`); // Subtle translation
        card.style.setProperty('--ty', `${(yPct - 0.5) * 5}px`);
    });

    card.addEventListener('mouseleave', () => {
        // Reset to center
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--tx', '0px');
        card.style.setProperty('--ty', '0px');
    });
}

// Search Functionality
document.getElementById('projectSearch').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(term)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

// Tab Filtering
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.category);
    });
});

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    // Small timeout to ensure styles load
    setTimeout(() => renderProjects(), 50);
});
