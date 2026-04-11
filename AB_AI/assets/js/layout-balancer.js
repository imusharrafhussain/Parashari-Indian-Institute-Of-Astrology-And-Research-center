document.addEventListener("DOMContentLoaded", function() {
    // Only apply on desktop where the two columns exist side by side
    if (window.innerWidth < 992) return;

    window.addEventListener("load", balanceLayout);
    // Also re-balance if window is resized
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(balanceLayout, 200);
    });

    function balanceLayout() {
        if (window.innerWidth < 992) return;

        const mainContent = document.querySelector('.cvd-main-content');
        const sidebar = document.querySelector('.cvd-sidebar');
        const layoutWrapper = document.querySelector('.cvd-layout-container');

        if (!mainContent || !sidebar || !layoutWrapper) return;

        // Reset elements back into the main container first in case of a resize event
        const movedOutElements = Array.from(document.querySelectorAll('.cvd-dynamically-moved'));
        movedOutElements.forEach(el => {
            el.classList.remove('cvd-dynamically-moved');
            mainContent.appendChild(el);
        });

        const movableSelectors = [
            '.cvd-ba-container',
            '#cvd-learn-section',
            '.cvd-strip',
            '.cvd-faq',
            '.course-progression-ladder'
        ];

        // We wrap standalone elements like cvd-faq in its section if necessary
        const chunks = [];
        movableSelectors.forEach(sel => {
            const el = mainContent.querySelector(sel);
            if(el) {
                const wrapper = el.closest('section') || el.closest('.cvd-strip') || el;
                // Avoid duplicates if multiple selectors hit the same section
                if(!chunks.includes(wrapper)) {
                    chunks.push(wrapper);
                }
            }
        });
        
        let sidebarHeight = sidebar.getBoundingClientRect().height;

        // Accumulate heights to find the breaking point
        let overflowIndex = -1;
        
        // We know mainContent starts fully loaded with all chunks inside it!
        // So we must remove chunks from BOTTOM to TOP until the mainContent fits alongside the sidebar!
        
        for(let i = chunks.length - 1; i >= 0; i--) {
            let mainHeight = mainContent.getBoundingClientRect().height;
            if(mainHeight > sidebarHeight + 100) {
                const chunk = chunks[i];
                chunk.classList.add('cvd-dynamically-moved');
                
                // Remove it from flow calculation
                chunk.style.display = 'none'; 
            } else {
                break; // Stop removing once it fits!
            }
        }
        
        // Now, any chunk with 'cvd-dynamically-moved' needs to be rendered full width AT THE BOTTOM
        // in their natural order!
        const marquee = document.getElementById('marquee-placeholder');
        chunks.forEach(chunk => {
            if(chunk.classList.contains('cvd-dynamically-moved')) {
                chunk.style.display = ''; // Restore display
                if(!chunk.style.maxWidth) {
                    chunk.style.margin = "40px auto";
                    chunk.style.maxWidth = "1100px"; 
                }
                if(marquee) {
                    marquee.parentNode.insertBefore(chunk, marquee);
                } else {
                    document.getElementById('ld-main').appendChild(chunk);
                }
            }
        });
    }
});
