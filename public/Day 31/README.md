# Job Board – Modern Job Listing Platform

A fully responsive, modern **Job Board web application** built using **HTML, CSS, and Vanilla JavaScript**.  
It allows users to browse jobs, apply filters, sort listings, save jobs, and switch between light & dark themes — all without any backend.

---

## Features

### Job Search & Filters
- Search jobs by **title, company, description, or skills**
- Filter by:
  - Location
  - Job Type (Full Time, Part Time, Internship, Contract)
- Clear all filters instantly

### Sorting Options
- Newest First
- Salary (High → Low / Low → High)
- Experience (Low → High / High → Low)
- Title (A–Z / Z–A)

### Save Jobs (LocalStorage)
- Save & remove jobs using bookmarks
- View saved jobs anytime
- Persistent data using browser `localStorage`

### Dark / Light Mode
- One-click theme toggle
- Theme preference stored in `localStorage`
- Smooth animated transitions

### Layout Controls
- Grid View & List View toggle
- Fully responsive (mobile, tablet & desktop)

### Notifications
- Custom toast notifications for:
  - Save / remove job
  - Apply job action
  - Saved jobs view

### Empty State Handling
- Clean UI when no jobs match filters
- Reset search option provided

---

## 🛠️ Tech Stack

- **HTML5** – Structure  
- **CSS3** – Styling, variables, dark mode, responsiveness  
- **JavaScript (ES6)** – Logic, filtering, sorting, localStorage  
- **Font Awesome** – Icons

---

## 📂 Project Structure
job-board/
├── assets
├   ├── dark.png
├   ├── light.png
├── index.html
├── README.md
├── script.js
└── style.css