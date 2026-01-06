/**
 * 3D Tilt Effect
 * Adds a 3D tilt interaction to elements on mousemove.
 */

class TiltEffect {
    constructor(selector) {
        this.elements = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        this.elements.forEach(element => {
            element.addEventListener('mousemove', this.handleMouseMove);
            element.addEventListener('mouseenter', this.handleMouseEnter);
            element.addEventListener('mouseleave', this.handleMouseLeave);
        });
    }

    handleMouseEnter(e) {
        const el = e.currentTarget;
        // Remove transition for instant response during movement
        el.style.transition = 'none';
    }

    handleMouseMove(e) {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        
        // Calculate mouse position relative to the element center
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation values (limit max rotation to 10deg)
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        // Apply transform
        el.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(1.05, 1.05, 1.05)
        `;
    }

    handleMouseLeave(e) {
        const el = e.currentTarget;
        // Add smooth transition for reset
        el.style.transition = 'transform 0.5s ease-out';
        el.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            scale3d(1, 1, 1)
        `;
    }
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    // Target common interactive elements
    new TiltEffect('.btn'); 
    new TiltEffect('.feature-card');
    new TiltEffect('.contributor-card');
    new TiltEffect('.stat-box');
    new TiltEffect('.node-card');
    new TiltEffect('.project-card');
    
    // Also target the new tracker progress pill if desired
    new TiltEffect('.progress-stat-pill');

    
    // Target the main tracker container
    new TiltEffect('.tracker-container');

});
