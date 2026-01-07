const projects = [
    // BEGINNER (Days 1-30) - Updated to match your actual Day XX folders

    { day: 1, title: "Animated Landing Page", folder: "Day 02", level: "Beginner" },
    { day: 2, title: "Advanced To-Do List", folder: "Day 03", level: "Beginner" },
    { day: 3, title: "Weather Forecast App", folder: "Day 04", level: "Beginner" },
    { day: 4, title: "Jewellery-company landing page", folder: "Day 04", level: "Beginner" },
    { day: 5, title: "Random Image Generator", folder: "Day 05", level: "Beginner" },
    { day: 6, title: "New Year Countdown", folder: "Day 06", level: "Beginner" },
    { day: 7, title: "Stylish Animated loginpage", folder: "Day 07", level: "Beginner" },
    { day: 8, title: "Pomodoro Timer", folder: "Day 08", level: "Beginner" },
    { day: 9, title: "QR Generator", folder: "Day 20", level: "Beginner", source: "index1.html" },
    { day: 10, title: "Rock Paper Scissors Game", folder: "Day 28", level: "Beginner" },
    { day: 11, title: "Reading Journal", folder: "Day 11", level: "Beginner" },
    { day: 12, title: "Pong Game", folder: "Day 12", level: "Beginner" },
    { day: 13, title: "Colour Picker", folder: "Day 13", level: "Beginner" },
    { day: 14, title: "Drawing Canvas", folder: "Day 15", level: "Beginner" },
    { day: 15, title: "Nasa Astronomy Picture of the day", folder: "Day 15", level: "Beginner" },
    { day: 16, title: "World Clock", folder: "Day 16", level: "Beginner" },
    { day: 17, title: "Mood Timer", folder: "Day 17", level: "Beginner" },
    { day: 18, title: "text to PDF Convertor", folder: "Day 18", level: "Beginner" },
    { day: 19, title: "Memory Card Game", folder: "Day 29", level: "Beginner" },
    { day: 20, title: "Email Validator", folder: "Day 20", level: "Beginner" },
    { day: 21, title: "Snake And Ladder Game", folder: "Day 21", level: "Beginner" },
    { day: 22, title: "Space Jumper Game", folder: "Day 22", level: "Beginner" },
    { day: 23, title: "Smart Calculator 2.0", folder: "Day 05", level: "Beginner", source: "index1.html" },
    { day: 24, title: "BMI Calculator", folder: "Day 24", level: "Beginner" },
    { day: 25, title: "Temperature Converter", folder: "Day 25", level: "Beginner" },
    { day: 26, title: "Space War Game", folder: "Day 26", level: "Beginner" },
    { day: 27, title: "CHESS GAME", folder: "Day 27", level: "Beginner" },
    { day: 28, title: "Coming Soon", folder: "Day 28", level: "Beginner" },
    { day: 29, title: "Coming Soon", folder: "Day 29", level: "Beginner" },
    { day: 30, title: "Coming Soon", folder: "Day 30", level: "Beginner" },

       { day: 1, title: "Personal Portfolio", folder: "Day 01", level: "Beginner" },
    { day: 2, title: "Responsive Landing Page", folder: "Day 02", level: "Beginner" },
    { day: 3, title: "To-Do List", folder: "Day 03", level: "Beginner" },
    { day: 4, title: "Weather App", folder: "Day 04", level: "Beginner" },
    { day: 5, title: "Calculator", folder: "Day 05", level: "Beginner" },
    { day: 6, title: "Quiz App", folder: "Day 06", level: "Beginner" },
    { day: 7, title: "Expense Tracker", folder: "Day 07", level: "Beginner" },
    { day: 8, title: "Pomodoro Timer", folder: "Day 08", level: "Beginner" },
    { day: 9, title: "Note Taking App", folder: "Day 09", level: "Beginner" },
    { day: 10, title: "Recipe Book", folder: "Day 10", level: "Beginner" },
    { day: 11, title: "Blog Website", folder: "Day 11", level: "Beginner" },
    { day: 12, title: "Ecommerce Product Page", folder: "Day 12", level: "Beginner" },
    { day: 13, title: "Chat Ui", folder: "Day 13", level: "Beginner" },
    { day: 14, title: "Music Player", folder: "Day 14", level: "Beginner" },
    { day: 15, title: "Drawing App", folder: "Day 15", level: "Beginner" },
    { day: 16, title: "Password Generator", folder: "Day 16", level: "Beginner" },
    { day: 17, title: "Unit Converter", folder: "Day 17", level: "Beginner" },
    { day: 18, title: "Countdown Timer", folder: "Day 18", level: "Beginner" },
    { day: 19, title: "Tip Calculator", folder: "Day 19", level: "Beginner" },

    { day: 20, title: "Qr Code Generator", folder: "Day 20", level: "Beginner" },
    { day: 21, title: "flashcards App", folder: "Day 21", level: "Beginner" },
    { day: 22, title: "Markdown Previewer", folder: "Day 22", level: "Beginner" },
    { day: 23, title: "Currency Converter", folder: "Day 23", level: "Beginner" },
    { day: 24, title: "Bmi Calculator", folder: "Day 24", level: "Beginner" },
    { day: 25, title: "Random Quote Generator", folder: "Day 25", level: "Beginner" },
    { day: 26, title: "Image Gallery", folder: "Day 26", level: "Beginner" },
    { day: 27, title: "Dice Roller", folder: "Day 27", level: "Beginner" },
    { day: 28, title: "Rock Paper Scissors", folder: "Day 28", level: "Beginner" },
    { day: 29, title: "Memory Game", folder: "Day 29", level: "Beginner" },
    { day: 30, title: "Tic Tac Toe", folder: "Day 30", level: "Beginner" },


    // INTERMEDIATE (Days 31-60)
    { day: 31, title: "Bubble Shooter Game", folder: "Day 31", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
    { day: 32, title: "Animated Login Form", folder: "Day 32", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
    { day: 33, title: "Guess the Number Game", folder: "Day 33", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
    { day: 34, title: "Typing Speed Test webapp", folder: "Day 34", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
    { day: 35, title: "Startup Name Generator Web App", folder: "Day 35", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
    { day: 36, title: "Coming Soon", folder: "Day 36", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
    { day: 37, title: "Recipe Finder", folder: "Day 37", level: "Intermediate", tech: ["HTML", "CSS", "JS", "API"] },
    { day: 38, title: "Snake Game", folder: "Day 38", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
    { day: 39, title: "Hangman Game", folder: "Day 39", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
    { day: 40, title: "Simon Say Game", folder: "Day 40", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
    // Continue pattern for remaining days...
    { day: 60, title: "Coming Soon", folder: "Day 60", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },

    // ADVANCED & CAPSTONE - Follow same pattern
    { day: 61, title: "Doodle Jump Game", folder: "Day 61", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
    // ... add more as you complete them
    { day: 100, title: "Master Project", folder: "Day 100", level: "Capstone", tech: ["HTML", "CSS", "JS", "React"] }
];

const repoBaseUrl = "https://github.com/Shubham-cyber-prog/100-days-of-web-development/tree/main/public/";
const liveBaseUrl = "../public/";

// Get DOM elements safely
function getGrid() {
    return document.getElementById('projects-grid');
}

function getTabs() {
    return document.querySelectorAll('.tab-btn');
}

// Storage keys for preserving context
const STORAGE_KEYS = {
    SCROLL_POSITION: 'projects_scroll_position',
    ACTIVE_CATEGORY: 'projects_active_category',
    SEARCH_QUERY: 'projects_search_query'
};


let currentCategory = 'All';
let currentSearchQuery = '';


function saveScrollPosition() {
    const grid = getGrid();
    if (grid && window.location.pathname.includes('projects.html')) {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        sessionStorage.setItem(STORAGE_KEYS.SCROLL_POSITION, scrollPosition.toString());
    }
}


function restoreScrollPosition() {
    const savedPosition = sessionStorage.getItem(STORAGE_KEYS.SCROLL_POSITION);
    const grid = getGrid();
    if (savedPosition && grid) {
        
        const restoreScroll = () => {
            window.scrollTo({
                top: parseInt(savedPosition, 10),
                behavior: 'auto' 
            });
        };
        
        
        requestAnimationFrame(() => {
            if (document.readyState === 'complete') {
                restoreScroll();
            } else {
                
                window.addEventListener('load', restoreScroll, { once: true });
            }
        });
    }
}


function saveContext() {
    saveScrollPosition();
    sessionStorage.setItem(STORAGE_KEYS.ACTIVE_CATEGORY, currentCategory);
    sessionStorage.setItem(STORAGE_KEYS.SEARCH_QUERY, currentSearchQuery);
}


function restoreContext() {
    const savedCategory = sessionStorage.getItem(STORAGE_KEYS.ACTIVE_CATEGORY);
    const savedSearch = sessionStorage.getItem(STORAGE_KEYS.SEARCH_QUERY);
    
    if (savedCategory) {
        currentCategory = savedCategory;
        const tabs = getTabs();
        if (tabs.length > 0) {
            tabs.forEach(t => {
                if (t.dataset.category === savedCategory) {
                    t.classList.add('active');
                } else {
                    t.classList.remove('active');
                }
            });
        }
    }
    
    if (savedSearch) {
        currentSearchQuery = savedSearch;
        const searchInput = document.getElementById('projectSearch');
        if (searchInput) {
            searchInput.value = savedSearch;
        }
    }
}

let isInitialLoad = true;
let shouldRestoreScroll = false;

function renderProjects(category = 'All', searchQuery = '', preserveScroll = false) {
    const grid = getGrid();
    if (!grid) return;
    
    
    if (!preserveScroll && !isInitialLoad) {
        saveScrollPosition();
    }
    
    grid.innerHTML = '';

    let filteredProjects = category === 'All'
        ? projects
        : projects.filter(p => p.level === category);

   
    if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filteredProjects = filteredProjects.filter(p => 
            p.title.toLowerCase().includes(query) ||
            p.level.toLowerCase().includes(query) ||
            p.day.toString().includes(query) ||
            p.folder.toLowerCase().includes(query)
        );
    }

    filteredProjects.sort((a, b) => a.day - b.day);
    if (filteredProjects.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <h3>No matching projects found</h3>
                <p>Try a different keyword or clear the search.</p>
            </div>
        `;
        return;
    }
    filteredProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        if (project.day === 100) card.classList.add('special-day-100');
        card.innerHTML = `
            <div class="card-header">
                <span class="day-number">Day ${project.day}</span>
                <span class="badge">${project.level}</span>
            </div>
            <h3>${project.title}</h3>
            <p>${project.tech ? project.tech.join(', ') : 'HTML, CSS, JS'}</p>
            <div class="card-actions">

                <a href="${liveBaseUrl}${project.folder}/${project.source || 'index.html'}" target="_blank" class="btn-small">Live Demo</a>
                <a href="${repoBaseUrl}${project.folder}" target="_blank" class="btn-small outline">View Code</a>

                <a href="${liveBaseUrl}${project.folder}/index.html" target="_blank" class="btn-small" 
                style="background: rgba(0, 255, 0, 0.3);
                border: 1px solid rgba(0, 255, 0, 0.6);
                box-shadow: 0 4px 30px rgba(0, 255, 0, 0.5);
                backdrop-filter: blur(5px);
                -webkit-backdrop-filter: blur(5px);
                color: white;">
                Live Demo</a>
                <a href="${repoBaseUrl}${project.folder}" target="_blank" class="btn-small outline" 
                style="background: rgba(0, 0, 255, 0.3);
                border: 1px solid rgba(0, 0, 255, 0.6);
                box-shadow: 0 4px 30px rgba(0, 0, 255, 0.5);
                backdrop-filter: blur(5px);
                -webkit-backdrop-filter: blur(5px);
                color: white;
                ">
                View Code</a>

            </div>
        `;
        grid.appendChild(card);
    });
    
    if (preserveScroll || shouldRestoreScroll) {
        
        setTimeout(() => {
            restoreScrollPosition();
            shouldRestoreScroll = false;
        }, 100);
    } else if (!isInitialLoad) {
     
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    isInitialLoad = false;
}

// Tab Switching Logic - wait for DOM
function setupTabs() {
    const tabs = getTabs();
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.dataset.category || 'All';
            
            renderProjects(currentCategory, currentSearchQuery, false);
           
            saveContext();
        });
    });
}

const searchInput = document.getElementById('projectSearch');
const clearBtn = document.getElementById('clearSearch');

if (searchInput) {
    let searchTimeout;

    searchInput.addEventListener('input', (e) => {
        const value = e.target.value;

        // Toggle clear button visibility
        if (clearBtn) {
            clearBtn.style.display = value ? 'block' : 'none';
        }

        // Debounced search logic
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            currentSearchQuery = value;
            renderProjects(currentCategory, currentSearchQuery, false);
            saveContext();
        }, 300);
    });
}
// Initialize clear button visibility on page load / restored context
if (searchInput && clearBtn && searchInput.value) {
    clearBtn.style.display = 'block';
}

// Toggle clear button visibility while typing
if (searchInput && clearBtn) {
    searchInput.addEventListener('input', () => {
        clearBtn.style.display = searchInput.value ? 'block' : 'none';
    });

    // Clear search on click
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        currentSearchQuery = '';
        clearBtn.style.display = 'none';

        renderProjects(currentCategory, '', false);
        saveContext();
    });
}
const clearBtn = document.getElementById('clearSearch');

if (searchInput && clearBtn) {
    searchInput.addEventListener('input', () => {
        clearBtn.style.display = searchInput.value ? 'block' : 'none';
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        currentSearchQuery = '';
        clearBtn.style.display = 'none';

        renderProjects(currentCategory, '', false);
        saveContext();
    });
}



let scrollTimeout;
window.addEventListener('scroll', () => {
    if (window.location.pathname.includes('projects.html')) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            saveScrollPosition();
        }, 100);
    }
});


window.addEventListener('beforeunload', () => {
    saveContext();
});


window.addEventListener('popstate', () => {
    restoreContext();
    shouldRestoreScroll = true; 
    renderProjects(currentCategory, currentSearchQuery, true);
});


document.addEventListener('click', (e) => {
    const link = e.target.closest('a.btn-small');
    if (link && link.href && link.href.includes('index.html')) {
        saveContext();
    }
}, true);


// Initial setup
function initialize() {
    restoreContext();
    setupTabs();
    shouldRestoreScroll = !!sessionStorage.getItem(STORAGE_KEYS.SCROLL_POSITION);
    renderProjects(currentCategory, currentSearchQuery, shouldRestoreScroll);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}
