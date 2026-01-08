/**
 * Liquid Cursor Trail
 * A fluid, multi-segment snake trail that follows the mouse with drag physics.
 */

(function initLiquidTrail() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function isTouchDevice() {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    }

    if (prefersReducedMotion || isTouchDevice()) return;

    // 1. Singleton Enforcement
    const existing = document.getElementById('cursor-trail-container');
    if (existing) existing.remove();

    // 2. Create Trail Container
    const container = document.createElement('div');
    container.id = 'cursor-trail-container';
    document.body.appendChild(container);

    // 3. Configuration
    const SEGMENT_COUNT = 20;
    const segments = [];
    let mouse = { x: 0, y: 0 };
    let isActive = false;

    // 4. Initialize Segments
    for (let i = 0; i < SEGMENT_COUNT; i++) {
        const segElement = document.createElement('div');
        segElement.classList.add('trail-segment');

        // Heat Gradient Classes (0: head -> 4: tail)
        const heatLevel = Math.min(4, Math.floor((i / SEGMENT_COUNT) * 5));
        segElement.classList.add(`heat-${heatLevel}`);

        container.appendChild(segElement);

        // Store state for physics
        segments.push({
            element: segElement,
            x: 0,
            y: 0,
            // Drag increases down the chain for weight/lag
            drag: 0.25 + (i * 0.02)
        });
    }

    // 5. Global Mouse Tracking
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        // Wake up animation if needed
        if (!isActive) {
            isActive = true;
            container.style.opacity = '1';
        }
    }, { passive: true });

    // 6. Animation Loop (The "Liquid" Engine)
    const animate = () => {
        if (!isActive) {
            requestAnimationFrame(animate);
            return;
        }

        // Move the head (first segment) towards mouse
        // High lerp for responsiveness
        let firstSeg = segments[0];
        firstSeg.x += (mouse.x - firstSeg.x) * 0.4;
        firstSeg.y += (mouse.y - firstSeg.y) * 0.4;

        // Propagate movement down the chain
        for (let i = 1; i < SEGMENT_COUNT; i++) {
            const current = segments[i];
            const prev = segments[i - 1];

            // Calculate distance to previous segment
            const dx = prev.x - current.x;
            const dy = prev.y - current.y;

            // Move current towards previous with its specific drag
            current.x += dx * current.drag;
            current.y += dy * current.drag;

            // Optional: Squeeze/Stretch based on velocity (Visual Polish)
            const velocity = Math.sqrt(dx * dx + dy * dy);
            const stretch = Math.min(velocity * 0.05, 0.4); // Cap stretch

            // Apply Transform
            // Rotate segment to face direction of movement
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            current.element.style.transform = `
                translate3d(${current.x}px, ${current.y}px, 0) 
                rotate(${angle}deg) 
                scale(${1 + stretch}, ${1 - stretch * 0.3})
            `;
        }

        // First segment transform
        firstSeg.element.style.transform = `translate3d(${firstSeg.x}px, ${firstSeg.y}px, 0)`;

        requestAnimationFrame(animate);
    };

    // Start loop
    animate();

    // 7. Interactive State Handling
    const interactiveSelectors = 'a, button, input, textarea, select, .card, .project-card, .profile-avatar-lg, .nav-link, label';

    const handleMouseEnter = () => container.classList.add('boost');
    const handleMouseLeave = () => container.classList.remove('boost');

    document.body.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveSelectors)) handleMouseEnter();
    }, { passive: true });

    document.body.addEventListener('mouseout', (e) => {
        const related = e.relatedTarget;
        if (!related || !related.closest(interactiveSelectors)) {
            handleMouseLeave();
        }
    }, { passive: true });

    // 8. Hide when mouse leaves window
    document.addEventListener('mouseleave', () => {
        container.style.opacity = '0';
        isActive = false;
    });

    document.addEventListener('mouseenter', () => {
        container.style.opacity = '1';
        isActive = true;
    });
})();
