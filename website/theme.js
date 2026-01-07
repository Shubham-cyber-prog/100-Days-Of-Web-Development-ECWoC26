
// Theme Toggle Functionality
(function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Icons
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

    // Function to update the button icon
    const updateIcon = (isLight) => {
        if(themeToggle) {
            themeToggle.innerHTML = isLight ? moonIcon : sunIcon;
        }
    };

    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply the theme on page load
    if (currentTheme === 'light') {
        body.classList.add('light-mode');


        updateIcon(true);
    } else {
        updateIcon(false);

    }
    
    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');

            // Save the preference
            const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
        });
    }
})();

            const isLight = body.classList.contains('light-mode');
            
            // Update Icon
            updateIcon(isLight);

            // Save the preference
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        const isWebsitePage = window.location.pathname.includes('/website/');
        const swUrl = isWebsitePage ? '../sw.js' : './sw.js';
        navigator.serviceWorker.register(swUrl).catch(() => {
            // Ignore registration errors (e.g. unsupported context).
        });
    });
}

