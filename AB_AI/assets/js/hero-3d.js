document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.hero-3d-scroll-track');
    if (!track) return;

    // 1. Clone the cards exactly once for seamless CSS marquee
    const originalChildrenCount = track.children.length;
    for (let i = 0; i < originalChildrenCount; i++) {
        const child = track.children[i];
        const clone = child.cloneNode(true);
        track.appendChild(clone);
    }

    // 2. Apply a random negative animation delay so the start point is unpredictable
    // The total animation duration is 40s (as set in CSS).
    const randomDelay = Math.random() * -40; // e.g. -15.4s
    track.style.animationDelay = `${randomDelay}s`;

    // 3. Hover to Pause is mostly handled by CSS, but can ensure clones also respect it 
    // by keeping the CSS rule: .hero-3d-scroll-track:hover { animation-play-state: paused; }

    // Optional: Touch/drag to pause on mobile
    track.addEventListener('touchstart', () => {
        track.style.animationPlayState = 'paused';
    }, { passive: true });

    track.addEventListener('touchend', () => {
        track.style.animationPlayState = 'running';
    });
});
