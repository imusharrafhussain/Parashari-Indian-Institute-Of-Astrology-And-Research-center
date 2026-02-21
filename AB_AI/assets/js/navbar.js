/* ============================================
   NAVBAR JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelectorAll('.nav-item a');

  // Toggle mobile menu
  if (hamburger) {
    hamburger.addEventListener('click', function () {
      this.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  }

  // Close mobile menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      if (hamburger) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (event) {
    if (hamburger && !hamburger.contains(event.target) && !mobileMenu.contains(event.target)) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
    }
  });

  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});

/* ============ MEGA MENU LOGIC ============ */
const allCoursesList = [
  { name: 'Vedic Astrology', meta: 'Vedic Analysis', url: 'astrology.html', icon: 'fas fa-om' },
  { name: 'Nadi Jyotish', meta: 'Precision Timing', url: 'nadi-jyotish.html', icon: 'fas fa-om' },
  { name: 'Lal Kitab Remedies', meta: 'Practical Solutions', url: 'lal-kitab.html', icon: 'fas fa-book' },
  { name: 'Remedy Course', meta: 'Upaay Gyaan', url: 'remedy-course.html', icon: 'fas fa-hand-holding-heart' },
  { name: 'KP Astrology', meta: 'Stellar Astrology', url: 'kp-astrology.html', icon: 'fas fa-star' },
  { name: 'BNN (Advanced)', meta: 'Bhrigu Nandi Nadi', url: 'bnn-astrology.html', icon: 'fas fa-code-branch' },
  { name: 'Crystal Healing', meta: 'Energy Balancing', url: 'crystal-healing.html', icon: 'fas fa-gem' },
  { name: 'Medical Astrology', meta: 'Health & Wellness', url: 'medical-astrology.html', icon: 'fas fa-heartbeat' },
  { name: 'Complete Astrology', meta: 'Comprehensive Mastery', url: 'complete-astrology.html', icon: 'fas fa-globe' },
  { name: 'Rudraksha Remedies', meta: 'Sacred Beads', url: 'rudraksha.html', icon: 'fas fa-seedling' },
  { name: 'Vastu Shastra', meta: 'Space Harmony', url: 'vastu.html', icon: 'fas fa-home' },
  { name: 'Palmistry', meta: 'Hand Analysis', url: 'palmistry.html', icon: 'fas fa-hand-paper' },
  { name: 'Face Reading', meta: 'Physiognomy', url: 'face-reading.html', icon: 'fas fa-user' },
  { name: 'Tarot Reading', meta: 'Card Divination', url: 'tarot.html', icon: 'fas fa-clone' },
  { name: 'Numerology', meta: 'Number Science', url: 'numerology.html', icon: 'fas fa-sort-numeric-up' },
  { name: '1-on-1 Mentorship', meta: 'Personal Guidance', url: 'mentorship.html', icon: 'fas fa-chalkboard-teacher' }
];

const courseDomains = [
  {
    id: 'level-intro',
    label: 'Intro Course',
    icon: 'fas fa-seedling',
    description: 'Beginner foundations and awareness across all our core disciplines.',
    courses: allCoursesList
  },
  {
    id: 'level-diploma',
    label: 'Diploma',
    icon: 'fas fa-graduation-cap',
    description: 'Professional entry-level certification for aspiring astrological practitioners.',
    courses: allCoursesList
  },
  {
    id: 'level-bachelor',
    label: 'Bachelor',
    icon: 'fas fa-user-graduate',
    description: 'Career specialist training for in-depth mastery, calculations, and consulting.',
    courses: allCoursesList
  },
  {
    id: 'level-master',
    label: 'Master',
    icon: 'fas fa-award',
    description: 'Advanced programs for experts and those planning to teach these sciences.',
    courses: allCoursesList
  },
  {
    id: 'level-grandmaster',
    label: 'Grand Master',
    icon: 'fas fa-crown',
    description: 'Elite visionary training establishing you as a global authority in astrology.',
    courses: allCoursesList
  }
];

document.addEventListener('DOMContentLoaded', function () {
  initMegaMenu();
});

function initMegaMenu() {
  // 1. Locate the 'Courses' dropdown
  const navItems = document.querySelectorAll('.nav-item.dropdown');
  let coursesNavItem = null;

  navItems.forEach(item => {
    const link = item.querySelector('a');
    if (link && link.innerText.includes('Courses')) {
      coursesNavItem = item;
      // Update Text to "All Courses"
      link.childNodes[0].nodeValue = "All Courses ";
    }
  });

  if (!coursesNavItem) return;

  // 2. Remove existing dropdown menu
  const existingMenu = coursesNavItem.querySelector('.dropdown-menu');
  if (existingMenu) existingMenu.remove();

  // 3. Create Mega Menu Container
  const megaMenu = document.createElement('div');
  megaMenu.className = 'mega-menu';

  // 4. Create Sidebar (Left)
  const sidebar = document.createElement('div');
  sidebar.className = 'mega-sidebar';

  // 5. Create Content Area (Right)
  const contentArea = document.createElement('div');
  contentArea.className = 'mega-content';

  // Helper to render content
  function renderContent(domain) {
    contentArea.innerHTML = `
            <div class="mega-domain-title">${domain.label}</div>
            <p class="mega-domain-desc">${domain.description}</p>
            <div class="mega-courses-grid">
                ${domain.courses.map(course => `
                    <a href="${course.url || '#'}" class="mega-course-card">
                        <div class="mega-course-icon">
                            <i class="${course.icon || domain.icon}"></i>
                        </div>
                        <div class="mega-course-info">
                            <div class="mega-course-name">${course.name}</div>
                            <div class="mega-course-meta">${course.meta}</div>
                        </div>
                    </a>
                `).join('')}
            </div>
        `;
  }

  // 6. Populate Sidebar
  courseDomains.forEach((domain, index) => {
    const item = document.createElement('div');
    item.className = 'domain-item';
    if (index === 0) item.classList.add('active'); // Default active

    item.innerHTML = `
            <span>${domain.label}</span>
            <i class="fas fa-chevron-right"></i>
        `;

    // Interaction: Hover
    item.addEventListener('mouseenter', () => {
      // Update Active State
      sidebar.querySelectorAll('.domain-item').forEach(el => el.classList.remove('active'));
      item.classList.add('active');

      // Render Content
      renderContent(domain);
    });

    sidebar.appendChild(item);
  });

  // Initial Render (First Domain)
  if (courseDomains.length > 0) {
    renderContent(courseDomains[0]);
  }

  // Assemble
  megaMenu.appendChild(sidebar);
  megaMenu.appendChild(contentArea);
  coursesNavItem.appendChild(megaMenu);

  /* ============ MOBILE MENU ACCORDION LOGIC ============ */
  initMobileMegaMenu();
}

function initMobileMegaMenu() {
  const mobileMenu = document.querySelector('.mobile-menu-nav');
  if (!mobileMenu) return;

  // 1. Locate "Explore" or "Courses" in mobile menu to replace/append to
  // For safety, we will find the first "Courses" link and turn it into an accordion
  const mobileNavItems = mobileMenu.querySelectorAll('.nav-item a');
  let mobileCoursesLink = null;

  mobileNavItems.forEach(link => {
    if (link.innerText.includes('Courses') && !link.innerText.includes('All Courses')) {
      mobileCoursesLink = link;
    }
  });

  if (!mobileCoursesLink) return;

  // 2. Update Link text and prevent default navigation
  mobileCoursesLink.innerText = "All Courses";
  mobileCoursesLink.setAttribute('href', 'javascript:void(0)');
  mobileCoursesLink.innerHTML += ' <i class="fas fa-chevron-down" style="float:right; margin-top:4px; font-size:12px; transition:transform 0.3s;"></i>';

  // 3. Create the accordion container
  const accordionContainer = document.createElement('div');
  accordionContainer.className = 'mobile-courses-accordion';
  accordionContainer.style.display = 'none'; // Hidden by default

  // 4. Populate accordion
  courseDomains.forEach(domain => {
    const domainGroup = document.createElement('div');
    domainGroup.className = 'mobile-domain-group';

    // Domain Header (e.g., Diploma)
    const domainHeader = document.createElement('div');
    domainHeader.className = 'mobile-domain-header';
    domainHeader.innerHTML = `<i class="${domain.icon}"></i> <span>${domain.label}</span>`;

    // Domain Courses List
    const courseList = document.createElement('div');
    courseList.className = 'mobile-course-list';
    courseList.style.display = 'none';

    domain.courses.forEach(course => {
      const courseLink = document.createElement('a');
      courseLink.href = course.url;
      courseLink.className = 'mobile-course-link';
      courseLink.innerHTML = `<i class="${course.icon || domain.icon}"></i> <span>${course.name}</span>`;
      courseList.appendChild(courseLink);
    });

    // Toggle logic for Domain
    domainHeader.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = courseList.style.display === 'block';
      // Close all other lists first (optional accordion behavior)
      accordionContainer.querySelectorAll('.mobile-course-list').forEach(list => list.style.display = 'none');
      accordionContainer.querySelectorAll('.mobile-domain-header').forEach(hdr => hdr.classList.remove('active'));

      if (!isOpen) {
        courseList.style.display = 'block';
        domainHeader.classList.add('active');
      }
    });

    domainGroup.appendChild(domainHeader);
    domainGroup.appendChild(courseList);
    accordionContainer.appendChild(domainGroup);
  });

  // Insert accordion directly after the "All Courses" link
  mobileCoursesLink.parentElement.appendChild(accordionContainer);

  // Toggle accordion when clicking "All Courses"
  mobileCoursesLink.addEventListener('click', (e) => {
    e.preventDefault();
    const icon = mobileCoursesLink.querySelector('i');
    if (accordionContainer.style.display === 'none') {
      accordionContainer.style.display = 'block';
      icon.style.transform = 'rotate(180deg)';
    } else {
      accordionContainer.style.display = 'none';
      icon.style.transform = 'rotate(0deg)';
    }
  });
}