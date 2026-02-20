document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.hero-3d-scroll-track');
    if (!track) return;

    // --- Configuration ---
    const AUTO_SPEED = 0.5; // Adjusted speed
    let isPaused = false;

    // --- State ---
    let currentTranslate = 0;
    let prevTranslate = 0;
    let startPos = 0;
    let isDragging = false;
    let animationID;

    // Store original children count for reset calculation
    const originalChildrenCount = track.children.length;

    // --- Cloning Logic ---
    // We need enough duplicates to fill the screen multiple times for smooth infinite scroll.
    // Calculate how many sets we need.

    function setupClones() {
        const requiredWidth = window.innerWidth * 3; // 3x screen width buffer
        let currentScrollWidth = track.scrollWidth;

        // Clone sets until we have enough buffer
        while (currentScrollWidth < requiredWidth) {
            for (let i = 0; i < originalChildrenCount; i++) {
                const child = track.children[i];
                const clone = child.cloneNode(true);
                track.appendChild(clone);
            }
            currentScrollWidth = track.scrollWidth;
        }
    }

    setupClones();

    // --- Metrics ---
    let singleSetWidth = 0;

    function updateMetrics() {
        if (track.children.length < 2) return;

        // Calculate the width of a single item including gap/margin
        const item0 = track.children[0].getBoundingClientRect();
        const item1 = track.children[1].getBoundingClientRect();
        const itemWidth = item1.left - item0.left;

        // Total width of one original set
        singleSetWidth = itemWidth * originalChildrenCount;
    }

    // Initial calculation
    // We need to wait for layout? RequestAnimationFrame or setTimeout usually safer for strict measurements
    // but synchronous should work if styles are applied.
    updateMetrics();

    window.addEventListener('resize', () => {
        updateMetrics();
    });

    // --- Animation Loop ---
    function animate() {
        if (!isDragging && !isPaused) {
            currentTranslate -= AUTO_SPEED; // Move Left
        }

        // Infinite Scroll Logic
        // When we have scrolled past `singleSetWidth` (one full set of original cards),
        // we snap back to 0. This creates the seamless loop.

        if (singleSetWidth > 0) {
            if (currentTranslate <= -singleSetWidth) {
                currentTranslate += singleSetWidth;
            } else if (currentTranslate > 0) {
                currentTranslate -= singleSetWidth;
            }
        }

        setSliderPosition();
        animationID = requestAnimationFrame(animate);
    }

    function setSliderPosition() {
        track.style.transform = `translateY(-50%) translateX(${currentTranslate}px)`;
    }

    // --- Interaction ---

    // Hover to Pause (Desktop)
    try {
        const itemSelector = '.hero-card, .zodiac-card';
        // Delegate event for performance and to handle clones
        track.addEventListener('mouseenter', (e) => {
            if (e.target.closest(itemSelector)) isPaused = true;
        }, true);

        track.addEventListener('mouseleave', (e) => {
            if (e.target.closest(itemSelector)) isPaused = false;
        }, true);
    } catch (e) {
        console.log("Hover interaction setup error", e);
    }

    // Touch / Drag events
    track.addEventListener('touchstart', touchStart, { passive: true });
    track.addEventListener('touchend', touchEnd);
    track.addEventListener('touchmove', touchMove, { passive: true });

    track.addEventListener('mousedown', touchStart);
    track.addEventListener('mouseup', touchEnd);
    track.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            track.style.cursor = 'grab';
        }
    });
    track.addEventListener('mousemove', touchMove);

    function touchStart(event) {
        isDragging = true;
        startPos = getPositionX(event);
        prevTranslate = currentTranslate;
        track.style.cursor = 'grabbing';
        // Pause animation during drag
        isPaused = true;
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
        isPaused = false;
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    animate();
});
