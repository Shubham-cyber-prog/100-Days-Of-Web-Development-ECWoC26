/**
 * Navigation Component
 * Handles Mobile Menu, User Dropdown and Logout
 */

/* Mobile Menu */
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('open');
}

/* User Dropdown */
function toggleUserMenu() {
    const dropdown = document.querySelector('.user-dropdown');
    dropdown.classList.toggle('show');
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const wrapper = document.querySelector('.user-avatar-wrapper');
    if (wrapper && !wrapper.contains(e.target)) {
        document.querySelector('.user-dropdown')?.classList.remove('show');
    }
});

// Highlight active link & Check Guest Mode
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        // Simple heuristic for active state
        if (currentPath.includes(link.getAttribute('href'))) {
            // Remove from all others just in case
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });

    // GUEST MODE CHECK
    if (sessionStorage.getItem('authGuest') === 'true') {
        const avatarImg = document.querySelector('.user-avatar img');
        if (avatarImg) {
            // Use the rocket logo for guests
            // Accessing from pages/, so ../assets is correct
            avatarImg.src = '../assets/images/logo.png';
            avatarImg.style.padding = '2px'; // Adjust fitting
        }
    }
});

/* Logout Logic */
function handleLogout() {
    // Only simple confirm for now
    if (confirm('Abort mission and logout?')) {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('authGuest');
        // assume root redirect handles it
        window.location.href = '../pages/login.html';
    }
}
