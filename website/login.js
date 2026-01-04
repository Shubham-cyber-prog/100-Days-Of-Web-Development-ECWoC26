document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const authForm = document.getElementById('authForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
    const submitBtn = document.getElementById('submitBtn');
    const tabs = document.querySelectorAll('.auth-tab');
    const authTitle = document.getElementById('authTitle');
    const authSubtitle = document.getElementById('authSubtitle');
    const socialBtns = document.querySelectorAll('.social-btn');

    // --- State ---
    let isLogin = true;

    // --- Tab Switching Logic ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const mode = tab.dataset.tab;
            if ((mode === 'login' && isLogin) || (mode === 'signup' && !isLogin)) return;

            // Update State
            isLogin = mode === 'login';

            // Update UI tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Animate Text Change
            const headerText = document.querySelector('.auth-header');
            headerText.style.opacity = '0';

            setTimeout(() => {
                // Update Text Content
                if (isLogin) {
                    authTitle.textContent = 'Welcome Back';
                    authSubtitle.textContent = 'Enter your credentials to access your account.';
                    confirmPasswordGroup.classList.add('collapsed'); // Use animation class
                    submitBtn.textContent = 'Sign In';
                    confirmPasswordInput.removeAttribute('required');
                } else {
                    authTitle.textContent = 'Create Account';
                    authSubtitle.textContent = 'Join the challenge and track your progress.';
                    confirmPasswordGroup.classList.remove('collapsed'); // Use animation class
                    submitBtn.textContent = 'Sign Up';
                    confirmPasswordInput.setAttribute('required', 'true');
                }

                headerText.style.transition = 'opacity 200ms ease';
                headerText.style.opacity = '1';

                // Reset Errors cleanly
                resetFormState();
            }, 150);
        });
    });

    function resetFormState() {
        // Reset inputs and error styles
        document.querySelectorAll('.form-input').forEach(input => {
            input.value = ''; // Optional: clear val on switch? Usually better UX to keep email/pass
            input.classList.remove('error');
        });
    }

    // --- Form Submission & Validation ---
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Reset errors
        resetErrors();

        // Validation
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        let isValid = true;

        if (!validateEmail(email)) {
            showError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        }

        if (password.length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters.');
            isValid = false;
        }

        if (!isLogin && password !== confirmPassword) {
            showError(confirmPasswordInput, 'Passwords do not match.');
            isValid = false;
        }

        if (isValid) {
            // Mock Loading State
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;

            // Simulate API Call
            setTimeout(() => {
                // Success
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userEmail', email);

                // Redirect
                window.location.href = '../index.html';
            }, 1500);
        }
    });

    // --- Mock Social Auth ---
    socialBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Mock Loading State
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Connecting...';
            btn.classList.add('loading');

            setTimeout(() => {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userEmail', 'social_user@example.com');
                window.location.href = '../index.html';
            }, 1000);
        });
    });


    // --- Helpers ---
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(inputElement, message) {
        inputElement.classList.add('error');
        // Ideally we'd append a message below, but for now we'll rely on the red border/browser feedback or just shake
        // Adding a sophisticated shake effect
        inputElement.parentElement.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-5px)' },
            { transform: 'translateX(5px)' },
            { transform: 'translateX(0)' }
        ], { duration: 300 });

        // Optional: Tooltip or toast could be added here
    }

    function resetErrors() {
        document.querySelectorAll('.form-input').forEach(input => input.classList.remove('error'));
    }
});
