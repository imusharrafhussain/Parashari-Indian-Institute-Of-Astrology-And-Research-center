document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.hero-3d-scroll-track');
    if (!track) return;

    // --- Configuration ---
    const AUTO_SPEED = 0.4; // Slowed down for smoother motion
    let isPaused = false;

    // --- State ---
    let currentTranslate = 0;
    let prevTranslate = 0;
    let startPos = 0;
    let isDragging = false;
    let animationID;

    // --- Setup Clones for Infinite Scroll ---
    // Ensure we have enough cards to verify the "edge-to-edge" look and smooth loop.
    // If the window is 1920px wide, we need ~10 cards visible.
    // Current HTML has 2 sets (Total ~12 cards). 
    // We will clone them until we have at least 4x the window width to be safe for "infinite" feeling.

    const originalChildren = Array.from(track.children);
    const cardWidthWithGap = 220 + 32; // Card width + margin/gap (approx)
    const requiredWidth = window.innerWidth * 3; // buffer
    let currentScrollWidth = track.scrollWidth;

    // Clone untill we have enough buffer
    while (currentScrollWidth < requiredWidth) {
        originalChildren.forEach(child => {
            const clone = child.cloneNode(true);
            track.appendChild(clone);
        });
        currentScrollWidth = track.scrollWidth;
    }

    // Recalculate dimensions
    let totalWidth = track.scrollWidth;
    // We treat the "reset point" as the point where we have scrolled past a significant chunk.
    // A simple approach for infinite scroll without "sets" logic:
    // When we scroll past -totalWidth/2, we jump back to 0 (or vice versa).
    let resetPoint = totalWidth / 2;

    window.addEventListener('resize', () => {
        // Re-calculate on resize
        totalWidth = track.scrollWidth;
        resetPoint = totalWidth / 2;
        // If track is now too small, we might need more clones, but for now let's assume initial setup covers it.
    });

    // --- Animation Loop ---
    function animate() {
        if (!isDragging && !isPaused) {
            currentTranslate -= AUTO_SPEED; // Move Left
        }

        // Infinite Scroll Logic
        // The track moves left (negative TranslateX).
        // When we have moved LEFT by 'resetPoint' pixels (e.g. -2000px),
        // we snap back to 0 (or adding resetPoint).
        // Conversely, if we drag RIGHT (positive), and go > 0, we snap to -resetPoint.

        if (currentTranslate <= -resetPoint) {
            currentTranslate += resetPoint;
        } else if (currentTranslate > 0) {
            currentTranslate -= resetPoint;
        }

        setSliderPosition();
        animationID = requestAnimationFrame(animate);
    }

    function setSliderPosition() {
        track.style.transform = `translateY(-50%) translateX(${currentTranslate}px)`;
    }

    // --- Interaction ---

    // Hover to Pause
    const cards = document.querySelectorAll('.hero-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => { isPaused = true; });
        card.addEventListener('mouseleave', () => { isPaused = false; });
    });

    // Touch / Drag events
    track.addEventListener('touchstart', touchStart, { passive: true });
    track.addEventListener('touchend', touchEnd);
    track.addEventListener('touchmove', touchMove, { passive: true });

    track.addEventListener('mousedown', touchStart);
    track.addEventListener('mouseup', touchEnd);
    track.addEventListener('mouseleave', () => {
        isDragging = false;
        track.style.cursor = 'grab';
    });
    track.addEventListener('mousemove', touchMove);

    function touchStart(event) {
        isDragging = true;
        startPos = getPositionX(event);
        prevTranslate = currentTranslate;
        track.style.cursor = 'grabbing';
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            const currentMove = currentPosition - startPos;
            currentTranslate = prevTranslate + currentMove;
        }
    }

    function touchEnd() {
        isDragging = false;
        track.style.cursor = 'grab';
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    animate();
});
