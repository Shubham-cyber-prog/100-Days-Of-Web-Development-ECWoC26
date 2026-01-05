const projects = [
    { day: 1, title: "Animated Landing Page", folder: "Day 01", level: "Beginner" },
    { day: 2, title: "Advanced To-Do List", folder: "Day 02", level: "Beginner" },
    { day: 3, title: "Weather Forecast App", folder: "Day 03", level: "Beginner" },
    // ... keep rest same
    { day: 100, title: "Master Project", folder: "Day 100", level: "Capstone" }
];

/* ================= CONFIG ================= */

const repoBaseUrl =
  "https://github.com/Shubham-cyber-prog/100-Days-Of-Web-Development-ECWoC26/tree/main/public/";

const liveBaseUrl = "/public/"; // works on GitHub Pages

/* ================= STATE ================= */

let currentCategory = "All";
let currentSearch = "";

/* ================= HELPERS ================= */

function $(id) {
    return document.getElementById(id);
}

function encodeFolder(folder) {
    return encodeURIComponent(folder);
}

function isComingSoon(title) {
    return title.toLowerCase().includes("coming soon");
}

/* ================= RENDER ================= */

function renderProjects() {
    const grid = $("projects-grid");
    if (!grid) return;

    grid.innerHTML = "";

    let filtered = projects.filter(p =>
        currentCategory === "All" || p.level === currentCategory
    );

    if (currentSearch.trim()) {
        const q = currentSearch.toLowerCase();
        filtered = filtered.filter(p =>
            p.title.toLowerCase().includes(q) ||
            p.level.toLowerCase().includes(q) ||
            p.day.toString().includes(q)
        );
    }

    filtered.sort((a, b) => a.day - b.day);

    filtered.forEach(p => {
        const disabled = isComingSoon(p.title);

        const liveLink = disabled
            ? "#"
            : `${liveBaseUrl}${encodeFolder(p.folder)}/index.html`;

        const codeLink = disabled
            ? "#"
            : `${repoBaseUrl}${encodeFolder(p.folder)}`;

        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
            <div class="card-header">
                <span class="day-number">Day ${p.day}</span>
                <span class="badge">${p.level}</span>
            </div>
            <h3>${p.title}</h3>
            <p>Project for Day ${p.day}</p>

            <div class="card-actions">
                <a class="btn-small ${disabled ? "disabled" : ""}" 
                   href="${liveLink}" target="_blank">Live Demo</a>

                <a class="btn-small outline ${disabled ? "disabled" : ""}" 
                   href="${codeLink}" target="_blank">View Code</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

/* ================= EVENTS ================= */

function setupTabs() {
    document.querySelectorAll(".tab-btn").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".tab-btn")
                .forEach(t => t.classList.remove("active"));

            tab.classList.add("active");
            currentCategory = tab.dataset.category;
            renderProjects();
        });
    });
}

function setupSearch() {
    const input = $("projectSearch");
    if (!input) return;

    input.addEventListener("input", e => {
        currentSearch = e.target.value;
        renderProjects();
    });
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
    setupTabs();
    setupSearch();
    renderProjects();
});
