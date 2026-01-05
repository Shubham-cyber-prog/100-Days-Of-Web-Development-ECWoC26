// Contact Page Interactions

document.addEventListener('DOMContentLoaded', () => {
    // 1. Copy to Clipboard Functionality
    window.copyToClipboard = (type, text) => {
        navigator.clipboard.writeText(text).then(() => {
            // Show toast or temporary feedback
            showToast(`${type === 'email' ? 'Email' : 'ID'} copied to clipboard!`);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            showToast('Failed to copy to clipboard', 'error');
        });
    };

    // 2. Form Handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic Validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email-input').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                showToast('Please fill in all required fields.', 'error');
                return;
            }

            // Simulate sending (Frontend Demo Only)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';

            setTimeout(() => {
                submitBtn.innerHTML = 'Message Sent!';
                submitBtn.classList.add('success');
                showToast('Message sent successfully! We\'ll get back to you soon.');
                contactForm.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.classList.remove('success');
                }, 3000);
            }, 1500);
        });
    }

    // 3. Simple Toast Notifier
    function showToast(message, type = 'success') {
        // Check if toast container exists, if not create it
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;

        toastContainer.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Remove after 3s
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
});
