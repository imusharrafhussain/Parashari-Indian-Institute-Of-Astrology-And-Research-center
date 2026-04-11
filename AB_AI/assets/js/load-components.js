document.addEventListener("DOMContentLoaded", function () {
    const pathParts = window.location.pathname.replace(/\\/g, '/').split('/');
    const isCoursePage = pathParts.includes('courses');
    const basePath = isCoursePage ? '../' : '';

    function rewritePaths(html) {
        if (!isCoursePage) return html;
        // Rewrite relative href="..." and src="..." but NOT absolute URLs
        return html.replace(/(href|src)="([^"]+)"/g, function(match, attr, val) {
            if (val.startsWith('http') || val.startsWith('//') || val.startsWith('tel:') || 
                val.startsWith('mailto:') || val.startsWith('javascript:') || val.startsWith('#') ||
                val.startsWith('../') || val.startsWith('data:')) {
                return match;
            }
            return attr + '="' + basePath + val + '"';
        });
    }

    function injectComponent(id, componentHTML) {
        const el = document.getElementById(id);
        if (el) {
            el.innerHTML = rewritePaths(componentHTML);
        }
    }

    Promise.all([
        fetch(basePath + 'components/navbar.html').then(res => res.text()),
        fetch(basePath + 'components/marquee.html').then(res => res.text()),
        fetch(basePath + 'components/footer.html').then(res => res.text())
    ]).then(([navHTML, marqueeHTML, footerHTML]) => {
        injectComponent('navbar-placeholder', navHTML);
        injectComponent('marquee-placeholder', marqueeHTML);
        injectComponent('footer-placeholder', footerHTML);

        // Re-initialize navbar (mega menu, mobile nav, active states)
        if (typeof window.initNavbar === 'function') {
            window.initNavbar();
        }

        // Re-initialize search on the newly injected search bars
        if (typeof window.initSearch === 'function') {
            window.initSearch();
        }

        // Initialize marquee timer logic
        initMarqueeTimer();

        // Fix chatbot image paths on course pages
        if (isCoursePage) {
            fixChatbotPaths();
        }
    }).catch(err => console.error("Error loading components:", err));
});

function initMarqueeTimer() {
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 2);
    endDate.setHours(23, 59, 59);
    const timerElements = document.querySelectorAll('.marquee-timer-val');
    if (timerElements.length > 0) {
        setInterval(function () {
            const now = new Date().getTime();
            const distance = endDate.getTime() - now;
            if (distance < 0) {
                endDate = new Date();
                endDate.setDate(endDate.getDate() + 2);
                return;
            }
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            const timeString =
            (hours < 10 ? "0" + hours : hours) + ":" +
            (minutes < 10 ? "0" + minutes : minutes) + ":" +
            (seconds < 10 ? "0" + seconds : seconds);
            timerElements.forEach(el => { el.innerText = timeString; });
        }, 250);
    }
}

function fixChatbotPaths() {
    // The chatbot injects its HTML with relative paths like "assets/images-optimized/..."
    // On course pages inside /courses/, these need to be "../assets/..."
    // We use a MutationObserver to catch when chatbot.js injects its elements
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) {
                    // Fix img src attributes
                    const imgs = node.querySelectorAll ? node.querySelectorAll('img[src^="assets/"]') : [];
                    imgs.forEach(function(img) {
                        img.src = '../' + img.getAttribute('src');
                    });
                    // Fix the node itself if it's an img
                    if (node.tagName === 'IMG' && node.getAttribute('src') && node.getAttribute('src').startsWith('assets/')) {
                        node.src = '../' + node.getAttribute('src');
                    }
                }
            });
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Stop observing after 5 seconds (chatbot should be loaded by then)
    setTimeout(function() { observer.disconnect(); }, 5000);
}
