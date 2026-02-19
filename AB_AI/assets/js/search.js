/**
 * Global Search Functionality
 */

(function () {
    // Course Data
    const courses = [
        { title: "Vedic Astrology", url: "astrology.html", icon: "♈" },
        { title: "Nadi Jyotish", url: "nadi-jyotish.html", icon: "📜" },
        { title: "Lal Kitab Remedies", url: "lal-kitab.html", icon: "📕" },
        { title: "Remedy Course (Upaay Gyaan)", url: "remedy-course.html", icon: "🕉️" },
        { title: "KP Astrology", url: "kp-astrology.html", icon: "⭐" },
        { title: "BNN (Advanced Techniques)", url: "bnn-astrology.html", icon: "🔍" },
        { title: "Crystal Healing", url: "crystal-healing.html", icon: "💎" },
        { title: "Medical Astrology", url: "medical-astrology.html", icon: "⚕️" },
        { title: "Complete Astrology Course", url: "complete-astrology.html", icon: "🎓" },
        { title: "Rudraksha Remedies", url: "rudraksha.html", icon: "📿" },
        { title: "Vastu Shastra", url: "vastu.html", icon: "🏠" },
        { title: "Palmistry", url: "palmistry.html", icon: "✋" },
        { title: "Face Reading", url: "face-reading.html", icon: "👤" },
        { title: "Tarot Reading", url: "tarot.html", icon: "🃏" },
        { title: "Numerology", url: "numerology.html", icon: "🔢" },
        { title: "1-on-1 Mentorship", url: "mentorship.html", icon: "🤝" },
        { title: "About Us", url: "profile.html", icon: "ℹ️" },
        { title: "Contact", url: "contact.html", icon: "📞" },
        { title: "Gallery", url: "gallery.html", icon: "🖼️" }
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

                const filteredCourses = courses.filter(course =>
                    course.title.toLowerCase().includes(query)
                );

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
                    item.href = course.url;
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

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSearch);
    } else {
        initSearch();
    }
})();
