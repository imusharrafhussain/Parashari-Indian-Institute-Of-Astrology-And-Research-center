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
    link.addEventListener('click', function (e) {
      // Don't close if it's the accordion toggle
      if (this.getAttribute('href') === 'javascript:void(0)') {
        return;
      }
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
    specialContent: {
      title: "Foundations & Awareness",
      whoItIsFor: "Beginners, seekers, and curious learners",
      objective: "Build clarity, remove superstition, and introduce logic-based understanding",
      whatYouWillLearn: [
        "Fundamentals of Core subject mastery (Astrology / Numerology / Vastu / Healing – as selected)",
        "Basic concepts of planets, numbers, directions, and human energy systems",
        "Logical explanation of remedies, gemstones, and spiritual practices",
        "Ethical awareness: what to do and what to avoid"
      ],
      learningOutcome: [
        "Strong conceptual foundation",
        "Ability to understand consultations logically",
        "Confidence to move into professional learning paths"
      ]
    },
    courses: allCoursesList
  },
  {
    id: 'level-diploma',
    label: 'Diploma',
    icon: 'fas fa-graduation-cap',
    description: 'Professional entry-level certification for aspiring astrological practitioners.',
    specialContent: {
      title: "Professional Entry Level",
      whoItIsFor: "Aspiring practitioners and serious learners",
      objective: "Enable structured practice with confidence",
      whatYouWillLearn: [
        "Core subject mastery (Astrology / Numerology / Vastu / Healing – as selected)",
        "Practical tools: charts, grids, layouts, symbols, and indicators",
        "Introduction to KP logic, Lal Kitab actions, and validation methods",
        "Case studies and beginner-level consultation report writing"
      ],
      learningOutcome: [
        "Entry-level professional competency",
        "Ability to conduct basic client consultations",
        "Industry-ready certification"
      ]
    },
    courses: allCoursesList
  },
  {
    id: 'level-bachelor',
    label: 'Bachelor',
    icon: 'fas fa-user-graduate',
    description: 'Career specialist training for in-depth mastery, calculations, and consulting.',
    specialContent: {
      title: "Career-Focused Specialist",
      whoItIsFor: "Learners aiming for consulting as a career",
      objective: "Develop depth, accuracy, and specialization",
      whatYouWillLearn: [
        "Advanced interpretation techniques and combinations",
        "Cross-validation (Astrology + Face Reading + Palmistry + Numerology)",
        "Event timing logic, predictive rules, and situational judgment",
        "Structured consultation workflows and ethical advisory practices"
      ],
      learningOutcome: [
        "Specialist-level expertise",
        "Career-ready consulting skills",
        "Ability to deliver detailed professional-grade reports"
      ]
    },
    courses: allCoursesList
  },
  {
    id: 'level-master',
    label: 'Master',
    icon: 'fas fa-award',
    description: 'Advanced programs for experts and those planning to teach these sciences.',
    specialContent: {
      title: "Expert, Researcher & Teacher",
      whoItIsFor: "Experts, mentors, and future faculty members",
      objective: "Create authority, mastery, and leadership",
      whatYouWillLearn: [
        "Rule-based mastery (KP Astrology, Lal Kitab, Nakshatra logic)",
        "Research-oriented analysis and advanced case audits",
        "Complex problem-solving (career, health, relationships, karmic patterns)",
        "Teaching methodology, mentoring skills, and faculty evaluation"
      ],
      learningOutcome: [
        "Expert-level authority",
        "Eligibility for Astrobharatai Faculty Panel (post-evaluation)",
        "Leadership in consultation, research, and education"
      ]
    },
    courses: allCoursesList
  },
  {
    id: 'level-grandmaster',
    label: 'Grand Master',
    icon: 'fas fa-crown',
    description: 'Elite visionary training establishing you as a global authority in astrology.',
    specialContent: {
      title: "ASTROBHARATAI Grand Master Pass \u2013 Complete Syllabus",
      whoItIsFor: "Dedicated individuals seeking an All-in-One Lifetime Mastery Program",
      objective: "Includes \u2705 All 10 Diploma Programs | \u2705 All Mastery Bundles | \u2705 All future courses & upgrades",
      whatYouWillLearn: [
        "<b>Comprehensive Knowledge:</b> Vedic & KP Astrology, Lal Kitab, Numerology, Vastu",
        "<b>Specialized Sciences:</b> Gemstones, Face Reading, Palmistry, Tarot, Reiki",
        "<b>Advanced Mysticism:</b> Nakshatra Analysis, Remedies, Yantra, Mantra, Chakras, PLRT",
        "<b>Master Training:</b> Rule-based prediction & cross-validation systems",
        "<b>Professional Audits:</b> Complex case studies (career, marriage, health, karma)",
        "<b>Leadership:</b> Research-driven models, teaching methodology & mentoring"
      ],
      learningOutcome: [
        "Expert-level authority as a Modern Occult Scientist",
        "Faculty eligibility (post evaluation)",
        "Priority Live Q&A (\u201cFirst-Row Access\u201d)",
        "Lifetime alumni & professional network"
      ]
    },
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
    let html = '';

    if (domain.specialContent) {
      html += `
                <div class="mega-domain-title">${domain.specialContent.title}</div>
                <p class="mega-domain-desc" style="margin-bottom: 5px;"><strong>Who it is for:</strong> ${domain.specialContent.whoItIsFor}</p>
                <p class="mega-domain-desc"><strong>Objective:</strong> ${domain.specialContent.objective}</p>
                
                <div class="special-content-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; margin-bottom: 20px;">
                    <div class="special-box" style="background: rgba(89, 28, 33, 0.05); padding: 15px; border-radius: 8px; border: 1px solid rgba(89, 28, 33, 0.1);">
                        <h4 style="color: var(--primary-color); margin-bottom: 10px; font-size: 1rem;">What You Will Learn</h4>
                        <ul style="list-style: none; padding: 0;">
                            ${domain.specialContent.whatYouWillLearn.map(point => `
                                <li style="margin-bottom: 8px; font-size: 0.85rem; display: flex; gap: 8px;">
                                    <span style="color: var(--secondary-color);">•</span>
                                    <span>${point}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <div class="special-box" style="background: rgba(240, 165, 0, 0.05); padding: 10px 15px; border-radius: 8px; border: 1px solid rgba(240, 165, 0, 0.1);">
                            <h4 style="color: var(--primary-color); margin-bottom: 8px; font-size: 0.95rem;">Learning Outcome</h4>
                            <ul style="list-style: none; padding: 0;">
                                ${domain.specialContent.learningOutcome.map(outcome => `
                                    <li style="margin-bottom: 5px; font-size: 0.8rem; display: flex; gap: 8px;">
                                        <span style="color: var(--secondary-color);">✓</span>
                                        <span>${outcome}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        <div style="display: flex; justify-content: flex-start; margin-top: 10px;">
                            <button class="btn btn-primary btn-sm mega-scroll-btn" style="border-radius: 6px; padding: 8px 16px; font-weight: 600;">
                                View All Courses \u2193
                            </button>
                        </div>
                    </div>
                </div>
            `;

      // Set timeout to ensure DOM is updated before adding listener
      setTimeout(() => {
        const scrollBtn = contentArea.querySelector('.mega-scroll-btn');
        if (scrollBtn) {
          scrollBtn.addEventListener('click', () => {
            const grid = contentArea.querySelector('.mega-courses-grid');
            if (grid) {
              grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          });
        }
      }, 0);
    } else {
      html += `
                <div class="mega-domain-title">${domain.label}</div>
                <p class="mega-domain-desc">${domain.description}</p>
            `;
    }

    if (domain.courses) {
      html += `
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

    contentArea.innerHTML = html;
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

    if (domain.specialContent) {
      const specialDiv = document.createElement('div');
      specialDiv.style.padding = '15px';
      specialDiv.style.fontSize = '0.9rem';
      specialDiv.innerHTML = `
                <p style="margin-bottom: 10px; color: #555;">${domain.specialContent.objective}</p>
                <h5 style="margin: 10px 0 5px; color: var(--primary-color); font-size: 0.9rem;">What You Will Learn:</h5>
                <ul style="list-style: none; padding-left: 0; margin-bottom: 15px;">
                    ${domain.specialContent.whatYouWillLearn.map(p => `<li style="margin-bottom: 5px; font-size: 0.8rem; display: flex; gap: 8px;">
                        <span style="color: var(--secondary-color);">•</span> <span>${p}</span>
                    </li>`).join('')}
                </ul>
            `;
      courseList.appendChild(specialDiv);
    }

    if (domain.courses) {
      domain.courses.forEach(course => {
        const courseLink = document.createElement('a');
        courseLink.href = course.url;
        courseLink.className = 'mobile-course-link';
        courseLink.innerHTML = `<i class="${course.icon || domain.icon}"></i> <span>${course.name}</span>`;
        courseList.appendChild(courseLink);
      });
    }

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