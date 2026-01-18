# Contributing to ECWoC ’26  
## 100 Days Of Web Development

Welcome to **100 Days Of Web Development**, an open-source initiative under **ECWoc ’26** aimed at helping beginners and intermediates grow their web development skills through daily challenges and real-world projects.

We’re excited to have you here! 🎉  
Every contribution—big or small—matters.

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Who Can Contribute?](#who-can-contribute)
- [Ways to Contribute](#ways-to-contribute)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Contribution Workflow](#contribution-workflow)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Issue Guidelines](#issue-guidelines)
- [Code & Content Standards](#code--content-standards)
- [Commit Message Convention](#commit-message-convention)
- [Review Process](#review-process)
- [Code of Conduct](#code-of-conduct)
- [Need Help?](#need-help)
- [Acknowledgements](#acknowledgements)

---

## 📖 About the Project

**100 Days Of Web Development** is a structured learning challenge designed to cover:

- HTML, CSS, JavaScript
- Responsive Design
- Git & GitHub
- Frontend Projects
- Beginner-friendly concepts with hands-on practice

This repository is **community-driven**, beginner-friendly, and open to everyone participating in **ECWoc ’26**.

---

## 👥 Who Can Contribute?

Anyone can contribute!  
You don’t need to be an expert.

✔ Beginners  
✔ Students  
✔ Open-source enthusiasts  
✔ ECWoc ’26 participants  
✔ Frontend developers  

If you can **learn**, you can **contribute** 💙
> First-time contributors are welcome and encouraged to start with documentation or small fixes.

---

## 🛠 Ways to Contribute

> Documentation, content, and small improvements are as valuable as code contributions.
You can help in many ways:

### 📚 Content Contributions
- Add new daily challenges
- Improve explanations
- Add examples or diagrams
- Fix typos or grammar

### 💻 Code Contributions
- Add mini projects
- Improve existing code
- Optimize HTML/CSS/JS
- Improve responsiveness
- **Authentication**: The current Login/Signup page is a static placeholder. Contributors are encouraged to implement actual authentication using any **BaaS (Backend as a Service)** like Firebase, Supabase, or Appwrite.

### 📄 Documentation
- Improve README files
- Add learning resources
- Write guides or tutorials

### 🐞 Bug Fixes
- Fix broken links
- Resolve UI issues
- Correct code errors

### 💡 Ideas & Suggestions
- Suggest new challenge ideas
- Propose project improvements

---



> Please follow the existing structure when adding new content.

---

## 🏗 Project Structure

To maintain consistency across the repository, please adhere to the following file naming and structure conventions:

### Daily Projects (public/Day XX/)
Each daily challenge or project should be placed in its own directory under `public/`, named `Day XX/` (e.g., `Day 01/`, `Day 02/`, etc.).

**Required Files:**
- `index.html`: The main HTML file for the project.
- `style.css`: The CSS file for styling (use `style.css`, not `styles.css` for consistency).
- `script.js`: The JavaScript file for functionality.
- `README.md`: A brief description of the project, what it demonstrates, and any instructions.

**Optional Files:**
- `images/`: A directory for any images used in the project.

**Example Structure:**
```
public/
├── Day 01/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── README.md
├── Day 02/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── images/
│   │   └── example.png
│   └── README.md
└── ...
```

### Main Website (website/)
The main website files are organized in the `website/` directory with subdirectories for better maintainability.

**Key Directories:**
- `styles/`: Organized CSS files (e.g., `index.css`, `components/`, `pages/`, etc.).
- `scripts/`: JavaScript files, including `core/`, `components/`, `pages/`, etc.
- `pages/`: HTML pages for different sections.
- `assets/`: Static assets like images.

**Naming Conventions:**
- Use lowercase with hyphens for multi-word names (e.g., `about-us.css`).
- For CSS files in daily projects, always use `style.css`.

### General Guidelines
- Ensure all file references in HTML/JS are relative and correct.
- Use consistent indentation and formatting.
- Follow semantic HTML and accessible practices.

---

## Getting Started
> New contributors are advised to read this file completely before starting their first contribution.

1. **Fork** this repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/<your-username>/100-Days-Of-Web-Development.git

