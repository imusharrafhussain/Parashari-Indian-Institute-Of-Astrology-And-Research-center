/**
 * Global Search Functionality
 */

(function () {
    // Course Data – Complete list across all tiers
    const courses = [
        // === CRASH COURSES ===
        { title: "Past Life Regression Theory (PLRT)", url: "archive/plrt.html", icon: "🕰️", aliases: ["plrt", "past life"] },
        { title: "Bhoomi Vastu & Prasada Vastu", url: "crash-courses/cc-bhoomi-vastu.html", icon: "🏠", aliases: ["bhoomi", "prasada"] },
        { title: "Palmistry (Crash Course)", url: "crash-courses/cc-modern-western-palmistry.html", icon: "✋", aliases: ["palmistry", "western palmistry", "hand reading"] },
        { title: "Mobile Numerology", url: "crash-courses/cc-mobile-numerology.html", icon: "📱", aliases: ["mobile number"] },
        { title: "Face Reading (Crash Course)", url: "crash-courses/cc-face-reading.html", icon: "👤", aliases: ["face reading", "physiognomy", "character analysis"] },
        { title: "Financial Astrology (Artha)", url: "crash-courses/cc-financial-astrology.html", icon: "📈", aliases: ["artha", "financial"] },
        { title: "Lal Kitab Basics", url: "crash-courses/cc-lal-kitab.html", icon: "📕", aliases: ["lal kitab basics"] },
        { title: "Medical Astrology", url: "crash-courses/cc-medical-astrology.html", icon: "⚕️", aliases: ["medical"] },
        { title: "The BNN Intensive", url: "crash-courses/cc-bnn-intensive.html", icon: "🔍", aliases: ["bnn", "bhrigu nandi nadi"] },
        { title: "Modern Career Astrology", url: "crash-courses/cc-modern-career-astrology.html", icon: "💼", aliases: ["career astrology"] },
        { title: "Business Numerology", url: "crash-courses/cc-business-numerology.html", icon: "🏢", aliases: ["business number"] },
        { title: "Vedic Numerology (Crash Course)", url: "crash-courses/cc-vedic-numerology.html", icon: "🔢", aliases: ["vedic number"] },
        { title: "Nadi Jyotish (Crash Course)", url: "crash-courses/cc-nadi-astrology.html", icon: "📜", aliases: ["nadi", "nadi jyotish"] },
        { title: "Healing (Crash Course)", url: "crash-courses/cc-healing.html", icon: "🙌", aliases: ["healing"] },
        { title: "Feng Shui", url: "crash-courses/cc-feng-shui.html", icon: "⛩️", aliases: ["feng shui"] },
        { title: "Jaimini Astrology", url: "crash-courses/cc-jaimini-astrology.html", icon: "🔮", aliases: ["jaimini", "jamini", "jaimini jyotish", "jamini jyotishi", "jaimini jyotishi", "gemini jyotishi"] },

        // === DIPLOMA COURSES ===
        { title: "Vedic Astrology (Jyotish) (Diploma)", url: "astrology.html", icon: "♈", aliases: ["vedic astrology", "jyotish"] },
        { title: "Numerology (Pythagorean & Chaldean) (Diploma)", url: "numerology.html", icon: "🔢", aliases: ["numerology"] },
        { title: "KP Astrology (Krishnamurti Padhdhati) (Diploma)", url: "kp-astrology.html", icon: "⭐", aliases: ["kp astrology", "krishnamurti"] },
        { title: "Gemstone Science (Ratna Vigyan) (Diploma)", url: "gemstone.html", icon: "💎", aliases: ["gemstone", "ratna vigyan"] },
        { title: "Vastu Shastra (Diploma)", url: "vastu.html", icon: "🏠", aliases: ["vastu"] },
        { title: "Lal Kitab (Diploma)", url: "lal-kitab.html", icon: "📕", aliases: ["lal kitab"] },
        { title: "Face Reading (Physiognomy) (Diploma)", url: "face-reading.html", icon: "👤", aliases: ["face reading"] },
        { title: "Reiki Healing (Diploma)", url: "reiki.html", icon: "🙌", aliases: ["reiki"] },
        { title: "Tarot Reading (Diploma)", url: "tarot.html", icon: "🃏", aliases: ["tarot"] },
        { title: "Nakshatra (Lunar Mansions) (Diploma)", url: "nakshatra.html", icon: "✨", aliases: ["nakshatra"] },
        { title: "Crystal Healing (Diploma)", url: "crystal-healing.html", icon: "🔮", aliases: ["crystal"] },
        { title: "Rudraksha (Diploma)", url: "rudraksha.html", icon: "📿", aliases: ["rudraksha"] },
        { title: "Palmistry (Chirognomy & Chiromancy) (Diploma)", url: "palmistry.html", icon: "✋", aliases: ["palmistry", "chirognomy"] },
        { title: "Remedy Course (Upaay Gyaan)", url: "remedy-course.html", icon: "🕉️", aliases: ["remedy", "upaay"] },

        // === BACHELOR COURSES ===
        { title: "Vedic Astrology (Jyotish) (Bachelor)", url: "astrology.html", icon: "♈", aliases: [] },
        { title: "Numerology (Pythagorean & Chaldean) (Bachelor)", url: "numerology.html", icon: "🔢", aliases: [] },
        { title: "KP Astrology (Krishnamurti Padhdhati) (Bachelor)", url: "kp-astrology.html", icon: "⭐", aliases: [] },
        { title: "Gemstone Science (Ratna Vigyan) (Bachelor)", url: "gemstone.html", icon: "💎", aliases: [] },
        { title: "Vastu Shastra (Bachelor)", url: "vastu.html", icon: "🏠", aliases: [] },
        { title: "Lal Kitab (Bachelor)", url: "lal-kitab.html", icon: "📕", aliases: [] },
        { title: "Face Reading (Physiognomy) (Bachelor)", url: "face-reading.html", icon: "👤", aliases: [] },
        { title: "Reiki Healing (Bachelor)", url: "reiki.html", icon: "🙌", aliases: [] },
        { title: "Tarot Reading (Bachelor)", url: "tarot.html", icon: "🃏", aliases: [] },
        { title: "Nakshatra (Lunar Mansions) (Bachelor)", url: "nakshatra.html", icon: "✨", aliases: [] },
        { title: "Crystal Healing (Bachelor)", url: "crystal-healing.html", icon: "🔮", aliases: [] },
        { title: "Rudraksha (Bachelor)", url: "rudraksha.html", icon: "📿", aliases: [] },
        { title: "Palmistry (Chirognomy & Chiromancy) (Bachelor)", url: "palmistry.html", icon: "✋", aliases: [] },

        // === MASTER COURSES ===
        { title: "Vedic Astrology (Jyotish) (Master)", url: "astrology.html", icon: "♈", aliases: [] },
        { title: "Numerology (Pythagorean & Chaldean) (Master)", url: "numerology.html", icon: "🔢", aliases: [] },
        { title: "KP Astrology (Krishnamurti Padhdhati) (Master)", url: "kp-astrology.html", icon: "⭐", aliases: [] },
        { title: "Gemstone Science (Ratna Vigyan) (Master)", url: "gemstone.html", icon: "💎", aliases: [] },
        { title: "Vastu Shastra (Master)", url: "vastu.html", icon: "🏠", aliases: [] },
        { title: "Lal Kitab (Master)", url: "lal-kitab.html", icon: "📕", aliases: [] },
        { title: "Face Reading (Physiognomy) (Master)", url: "face-reading.html", icon: "👤", aliases: [] },
        { title: "Reiki Healing (Master)", url: "reiki.html", icon: "🙌", aliases: [] },
        { title: "Tarot Reading (Master)", url: "tarot.html", icon: "🃏", aliases: [] },
        { title: "Nakshatra (Lunar Mansions) (Master)", url: "nakshatra.html", icon: "✨", aliases: [] },
        { title: "Crystal Healing (Master)", url: "crystal-healing.html", icon: "🔮", aliases: [] },
        { title: "Rudraksha (Master)", url: "rudraksha.html", icon: "📿", aliases: [] },
        { title: "Palmistry (Chirognomy & Chiromancy) (Master)", url: "palmistry.html", icon: "✋", aliases: [] },

        // === OTHER ===
        { title: "Complete Astrology Course", url: "complete-astrology.html", icon: "🎓", aliases: ["complete"] },
        { title: "BNN (Advanced Techniques)", url: "bnn-astrology.html", icon: "🔍", aliases: ["bnn advanced"] },
        { title: "1-on-1 Mentorship", url: "mentorship.html", icon: "🤝", aliases: ["mentorship", "1 on 1"] },
        { title: "About Us", url: "profile.html", icon: "ℹ️", aliases: ["about", "profile"] },
        { title: "Contact", url: "contact.html", icon: "📞", aliases: ["contact"] },
        { title: "Gallery", url: "gallery.html", icon: "🖼️", aliases: ["gallery"] },
        { title: "Fee Structure", url: "fee-structure.html", icon: "💰", aliases: ["fee", "price", "pricing"] },
        { title: "Blog", url: "blog.html", icon: "📝", aliases: ["blog"] },
        { title: "6 Stairs", url: "6-stairs.html", icon: "🕉️", aliases: ["6 stairs", "yantra", "mantra", "tantra", "chakra"] }
    ];

    // Initialize Search
    function initSearch() {
        const searchContainers = document.querySelectorAll('.search-container');

        searchContainers.forEach(container => {
            const searchInput = container.querySelector('input');
            const resultsContainer = container.querySelector('.search-results');

            if (!searchInput || !resultsContainer) return;

            // Event Listeners
            searchInput.addEventListener('input', function (e) {
                const query = e.target.value.toLowerCase().trim();

                if (query.length === 0) {
                    resultsContainer.classList.remove('active');
                    resultsContainer.innerHTML = '';
                    return;
                }

                // Search both title and aliases
                const filteredCourses = courses.filter(course => {
                    if (course.title.toLowerCase().includes(query)) return true;
                    if (course.aliases && course.aliases.some(alias => alias.toLowerCase().includes(query))) return true;
                    return false;
                });

                renderResults(filteredCourses, resultsContainer);
            });

            // Close when clicking outside
            document.addEventListener('click', function (e) {
                if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
                    resultsContainer.classList.remove('active');
                }
            });

            // Open when clicking input if there's text
            searchInput.addEventListener('focus', function (e) {
                if (searchInput.value.trim().length > 0) {
                    searchInput.dispatchEvent(new Event('input'));
                }
            });
        });

        function renderResults(results, container) {
            container.innerHTML = '';

            if (results.length === 0) {
                container.innerHTML = '<div class="no-results">No courses found</div>';
            } else {
                results.forEach(course => {
                    const item = document.createElement('a');
                    // Detect if we're in a subdirectory like /courses/
                    const p = window.location.pathname.replace(/\\\\/g, '/');
                    const parts = p.split('/').filter(Boolean);
                    const depth = Math.max(0, parts.length - 1);
                    const _searchBasePath = '../'.repeat(depth);
                    item.href = _searchBasePath + course.url;
                    item.className = 'search-result-item';
                    item.innerHTML = `
                        <span class="search-result-icon">${course.icon}</span>
                        <span>${course.title}</span>
                    `;
                    container.appendChild(item);
                });
            }

            container.classList.add('active');
        }
    }

    // Expose globally so load-components.js can re-init after dynamic injection
    window.initSearch = initSearch;

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSearch);
    } else {
        initSearch();
    }
})();
