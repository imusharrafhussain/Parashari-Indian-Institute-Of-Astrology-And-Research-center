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

  // Adding scroll effect for search bar
  window.addEventListener('scroll', function () {
    const searchContainer = document.querySelector('.tablet-search-container');
    if (searchContainer) {
      if (window.scrollY > 50) {
        searchContainer.classList.add('scrolled');
      } else {
        searchContainer.classList.remove('scrolled');
      }
    }
  });
});

/* ============ MEGA MENU LOGIC ============ */
const crashCourseList = [
  { name: 'Past Life Regression Theory (PLRT)', meta: 'Past', url: 'plrt-6-stairs.html', icon: 'fas fa-hourglass-half' },
  { name: 'Bhoomi Vastu & Prasada Vastu', meta: 'Bhoomi', url: 'vastu.html', icon: 'fas fa-home' },
  { name: 'Modern Western Palmistry', meta: 'Modern', url: 'palmistry.html', icon: 'fas fa-hand-paper' },
  { name: 'Mobile Numerology', meta: 'Mobile', url: 'numerology.html', icon: 'fas fa-sort-numeric-up' },
  { name: '(Face Reading) Western Physiognomy', meta: '(Face', url: 'face-reading.html', icon: 'fas fa-user' },
  { name: 'Financial Astrology (Artha)', meta: 'Financial', url: 'astrology.html', icon: 'fas fa-om' },
  { name: 'Lal Kitab Basics', meta: 'Lal', url: 'lal-kitab.html', icon: 'fas fa-book' },
  { name: 'Medical Astrology', meta: 'Medical', url: 'medical-astrology.html', icon: 'fas fa-heartbeat' },
  { name: 'The BNN Intensive: A 14-Day Mastery', meta: 'The', url: 'bnn-astrology.html', icon: 'fas fa-code-branch' },
  { name: 'Modern Career Astrology', meta: 'Modern', url: 'astrology.html', icon: 'fas fa-om' },
  { name: 'Business Numerology', meta: 'Business', url: 'numerology.html', icon: 'fas fa-sort-numeric-up' },
  { name: 'Vedic Numerology', meta: 'Vedic', url: 'numerology.html', icon: 'fas fa-sort-numeric-up' },
  { name: 'Nadi Jyotish', meta: 'Nadi', url: 'nadi-jyotish.html', icon: 'fas fa-scroll' },
  { name: 'Healing', meta: 'Healing', url: 'reiki.html', icon: 'fas fa-hand-holding-medical' },
  { name: 'Feng Shui', meta: 'Feng', url: 'feng-shui.html', icon: 'fas fa-yin-yang' },
  { name: 'Gemini Jyotish', meta: 'Gemini', url: 'gemini-jyotish.html', icon: 'fas fa-users' }
];
const diplomaList = [
  { name: 'Vedic Astrology (Jyotish)', meta: 'Vedic', url: 'astrology.html', icon: 'fas fa-om' },
  { name: 'Numerology (Pythagorean & Chaldean)', meta: 'Numerology', url: 'numerology.html', icon: 'fas fa-sort-numeric-up' },
  { name: 'KP Astrology (Krishnamurti Padhdhati)', meta: 'KP', url: 'kp-astrology.html', icon: 'fas fa-star' },
  { name: 'Gemstone Science (Ratna Vigyan)', meta: 'Gemstone', url: 'gemstone.html', icon: 'fas fa-gem' },
  { name: 'Vastu Shastra', meta: 'Vastu', url: 'vastu.html', icon: 'fas fa-home' },
  { name: 'Lal Kitab', meta: 'Lal', url: 'lal-kitab.html', icon: 'fas fa-book' },
  { name: 'Face Reading (Physiognomy)', meta: 'Face', url: 'face-reading.html', icon: 'fas fa-user' },
  { name: 'Reiki Healing', meta: 'Reiki', url: 'reiki.html', icon: 'fas fa-hand-holding-medical' },
  { name: 'Tarot Reading', meta: 'Tarot', url: 'tarot.html', icon: 'fas fa-clone' },
  { name: 'Nakshatra (Lunar Mansions)', meta: 'Nakshatra', url: 'nakshatra.html', icon: 'fas fa-moon' },
  { name: 'Crystal Healing', meta: 'Crystal', url: 'crystal-healing.html', icon: 'fas fa-gem' },
  { name: 'Rudraksha', meta: 'Rudraksha', url: 'rudraksha.html', icon: 'fas fa-seedling' },
  { name: 'Palmistry (Chirognomy & Chiromancy)', meta: 'Palmistry', url: 'palmistry.html', icon: 'fas fa-hand-paper' }
];
const bachelorList = [
  { name: 'Vedic Astrology (Jyotish)', meta: 'Vedic', url: 'astrology.html', icon: 'fas fa-om' },
  { name: 'Numerology (Pythagorean & Chaldean)', meta: 'Numerology', url: 'numerology.html', icon: 'fas fa-sort-numeric-up' },
  { name: 'KP Astrology (Krishnamurti Padhdhati)', meta: 'KP', url: 'kp-astrology.html', icon: 'fas fa-star' },
  { name: 'Gemstone Science (Ratna Vigyan)', meta: 'Gemstone', url: 'gemstone.html', icon: 'fas fa-gem' },
  { name: 'Vastu Shastra', meta: 'Vastu', url: 'vastu.html', icon: 'fas fa-home' },
  { name: 'Lal Kitab', meta: 'Lal', url: 'lal-kitab.html', icon: 'fas fa-book' },
  { name: 'Face Reading (Physiognomy)', meta: 'Face', url: 'face-reading.html', icon: 'fas fa-user' },
  { name: 'Reiki Healing', meta: 'Reiki', url: 'reiki.html', icon: 'fas fa-hand-holding-medical' },
  { name: 'Tarot Reading', meta: 'Tarot', url: 'tarot.html', icon: 'fas fa-clone' },
  { name: 'Nakshatra (Lunar Mansions) 1', meta: 'Nakshatra', url: 'nakshatra.html', icon: 'fas fa-moon' },
  { name: 'Crystal Healing', meta: 'Crystal', url: 'crystal-healing.html', icon: 'fas fa-gem' },
  { name: 'Rudraksha', meta: 'Rudraksha', url: 'rudraksha.html', icon: 'fas fa-seedling' },
  { name: 'Palmistry (Chirognomy & Chiromancy)', meta: 'Palmistry', url: 'palmistry.html', icon: 'fas fa-hand-paper' }
];
const masterList = [
  { name: 'Numerology (Pythagorean & Chaldean)', meta: 'Numerology', url: 'numerology.html', icon: 'fas fa-sort-numeric-up' },
  { name: 'Vedic Astrology (Jyotish)', meta: 'Vedic', url: 'astrology.html', icon: 'fas fa-om' },
  { name: 'KP Astrology (Krishnamurti Padhdhati)', meta: 'KP', url: 'kp-astrology.html', icon: 'fas fa-star' },
  { name: 'Gemstone Science (Ratna Vigyan)', meta: 'Gemstone', url: 'gemstone.html', icon: 'fas fa-gem' },
  { name: 'Vastu Shastra', meta: 'Vastu', url: 'vastu.html', icon: 'fas fa-home' },
  { name: 'Lal Kitab', meta: 'Lal', url: 'lal-kitab.html', icon: 'fas fa-book' },
  { name: 'Face Reading (Physiognomy)', meta: 'Face', url: 'face-reading.html', icon: 'fas fa-user' },
  { name: 'Reiki Healing', meta: 'Reiki', url: 'reiki.html', icon: 'fas fa-hand-holding-medical' },
  { name: 'Tarot Reading', meta: 'Tarot', url: 'tarot.html', icon: 'fas fa-clone' },
  { name: 'Nakshatra (Lunar Mansions)', meta: 'Nakshatra', url: 'nakshatra.html', icon: 'fas fa-moon' },
  { name: 'Crystal Healing', meta: 'Crystal', url: 'crystal-healing.html', icon: 'fas fa-gem' },
  { name: 'Rudraksha', meta: 'Rudraksha', url: 'rudraksha.html', icon: 'fas fa-seedling' },
  { name: 'Palmistry (Chirognomy & Chiromancy)', meta: 'Palmistry', url: 'palmistry.html', icon: 'fas fa-hand-paper' }
];
const grandMasterList = [
  { name: 'Grand Master Program', meta: 'Lifetime Mastery', url: 'courses.html#grand-master-section', icon: 'fas fa-crown' }
];

const courseDomains = [
  {
    id: 'level-intro',
    label: 'Crash Course',
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
    courses: crashCourseList
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
    courses: diplomaList
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
    courses: bachelorList
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
    courses: masterList
  },
  {
    id: 'level-grandmaster',
    label: 'Grand Master',
    icon: 'fas fa-crown',
    description: 'The ultimate 48-week mastery journey covering all 12 core disciplines plus the exclusive 6 Spiritual Stairs pathway.',
    specialContent: {
      title: "ASTROBHARATAI Grand Master Pass",
      whoItIsFor: "Dedicated individuals seeking the Ultimate 48 Weeks of Access",
      objective: "Includes ✅ All 12 Core Disciplines | ✅ Ultimate 48 Weeks of Access | ✅ Free 6 Spiritual Stairs",
      whatYouWillLearn: [
        "<b>Comprehensive Knowledge:</b> Vedic & KP Astrology, Lal Kitab, Numerology, Vastu",
        "<b>Specialized Sciences:</b> Gemstones, Face Reading, Palmistry, Tarot, Reiki",
        "<b>Advanced Mysticism:</b> Nakshatra Analysis, Remedies, Yantra, Mantra, Chakras, PLRT",
        "<b>Master Training:</b> Rule-based prediction & cross-validation systems",
        "<b>Professional Audits:</b> Complex case studies (career, marriage, health, karma)",
        "<b>Leadership:</b> Research-driven models, teaching methodology & mentoring"
      ],
      learningOutcome: [
        "Expert-level authority across 12 disciplines",
        "Mastery of the 6 Spiritual Stairs",
        "Priority Live Q&A (\"First-Row Access\")",
        "Elite Certification & 1-on-1 Mentorship support"
      ]
    },
    courses: grandMasterList
  },
  {
    id: 'level-6stairs',
    label: '6 Stairs',
    icon: 'fas fa-om',
    description: 'Explore Yantra, Mantra, Tantra, Chakra Balancing, Remedies, and PLRT.',
    specialContent: {
      title: "6 Stairs to Mastery",
      whoItIsFor: "Seekers of mystic and energetic sciences",
      objective: "Master the profound practices to achieve spiritual and life elevation",
      whatYouWillLearn: [
        "<b>Yantra:</b> Sacred geometrical diagrams for worship and cosmic energy",
        "<b>Mantra:</b> Science of sacred sounds and vibrations",
        "<b>Tantra:</b> Ancient esoteric practices for expanding consciousness",
        "<b>Chakra Balancing:</b> Cleansing and aligning the 7 vital energy centers",
        "<b>Remedies:</b> Astrological and spiritual solutions for complex problems",
        "<b>PLRT:</b> Healing present traumas via past lives"
      ],
      learningOutcome: [
        "Deep understanding of spiritual and occult practices",
        "Ability to practically apply remedies for healing",
        "Elevation of personal consciousness"
      ]
    },
    courses: [
      { name: 'Yantra', meta: 'Sacred Geometry', url: 'yantra.html', icon: 'fas fa-star-of-david' },
      { name: 'Mantra', meta: 'Vibrational Science', url: 'mantra.html', icon: 'fas fa-om' },
      { name: 'Tantra', meta: 'Esoteric Practices', url: 'tantra.html', icon: 'fas fa-pray' },
      { name: 'Chakra Balancing', meta: 'Energy Centers', url: 'chakra-balancing.html', icon: 'fas fa-yin-yang' },
      { name: 'Remedies', meta: 'Astrological Solutions', url: '6-stairs-remedies.html', icon: 'fas fa-leaf' },
      { name: 'PLRT', meta: 'Past Life Regression', url: 'plrt-6-stairs.html', icon: 'fas fa-hourglass-half' }
    ]
  },
  {
    id: 'level-mentorship',
    label: '<span style="color: #D4AF37; font-weight: 800;">1-on-1 Mentorship <i class="fas fa-star" style="color: #D4AF37; font-size: 0.85em; margin-left: 4px;"></i></span>',
    icon: 'fas fa-star',
    description: 'Accelerate your mastery with personalized, dedicated guidance from our top experts.',
    specialContent: {
      title: "1-on-1 Vedic Mentorship",
      whoItIsFor: "Dedicated learners seeking a personalized pace and deep insights",
      objective: "Provide exclusive, tailored guidance with direct expert Q&A",
      whatYouWillLearn: [
        "<b>Personalized Syllabus:</b> Adapted to your specific astrological goals",
        "<b>Direct Q&A:</b> Live doubt clearing and practical chart-reading sessions",
        "<b>Advanced Techniques:</b> Predictive secrets from top mentors",
        "<b>Consultation Practice:</b> Real-time career and case study guidance"
      ],
      learningOutcome: [
        "Accelerated learning curve and practical confidence",
        "Direct access to 24x7 expert support",
        "Priority guidance for professional consulting"
      ]
    },
    courses: [
      { name: 'Discover Mentorship Program', meta: 'Exclusive 1-on-1 Access', url: 'mentorship.html', icon: 'fas fa-arrow-right' }
    ]
  }
];

document.addEventListener('DOMContentLoaded', function () {
  initMegaMenu();
  initMobileBottomNav();
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

/* ============ MOBILE BOTTOM NAVIGATION BAR ============ */
function initMobileBottomNav() {
  // Bottom nav items: Home, Fee Structure, Explore, 6 Stairs, Contact
  const bottomNavItems = [
    { label: 'Home', icon: 'fas fa-home', href: 'index.html' },
    { label: 'Fee Structure', icon: 'fas fa-indian-rupee-sign', href: 'fee-structure.html' },
    { label: 'Explore', icon: 'fas fa-compass', href: 'courses.html' },
    { label: '6 Stairs', icon: 'fas fa-stairs', href: '6-stairs.html' },
    { label: 'Contact', icon: 'fas fa-envelope', href: 'contact.html' }
  ];

  // Compact top nav items (remaining from hamburger menu)
  const compactNavItems = [
    { label: 'About Us', href: 'profile.html' },
    { label: 'All Courses', href: 'courses.html' },
    { label: 'Blog', href: 'blog.html' },
    { label: 'Gallery', href: 'gallery.html' }
  ];

  // Detect current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // === 1. Create bottom nav bar ===
  const bottomNav = document.createElement('nav');
  bottomNav.className = 'mobile-bottom-nav';
  bottomNav.setAttribute('aria-label', 'Mobile bottom navigation');

  bottomNavItems.forEach(item => {
    const link = document.createElement('a');
    link.href = item.href;
    link.className = 'mobile-bottom-nav-item';

    // Mark active based on current page
    if (currentPage === item.href || (currentPage === '' && item.href === 'index.html')) {
      link.classList.add('active');
    }

    link.innerHTML = `<i class="${item.icon}"></i><span>${item.label}</span>`;
    bottomNav.appendChild(link);
  });

  document.body.appendChild(bottomNav);

  // === 2. Create compact top nav row (replaces hamburger) ===
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const compactNav = document.createElement('div');
    compactNav.className = 'mobile-compact-nav';

    // Links section
    const linksDiv = document.createElement('div');
    linksDiv.className = 'mobile-compact-links';

    compactNavItems.forEach(item => {
      const link = document.createElement('a');

      if (item.label === 'All Courses') {
        // Make "All Courses" toggle the courses dropdown panel
        link.href = 'javascript:void(0)';
        link.textContent = item.label;
        link.innerHTML += ' <i class="fas fa-chevron-down" style="font-size:0.6em; margin-left:2px; transition:transform 0.3s;"></i>';

        link.addEventListener('click', (e) => {
          e.preventDefault();
          const panel = document.querySelector('.mobile-courses-panel');
          const icon = link.querySelector('i');
          if (panel) {
            const isOpen = panel.classList.contains('open');
            panel.classList.toggle('open');
            icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
          }
        });
      } else {
        link.href = item.href;
        link.textContent = item.label;
      }

      // Mark active
      if (currentPage === item.href) {
        link.classList.add('active');
      }

      linksDiv.appendChild(link);
    });

    compactNav.appendChild(linksDiv);

    // CTA buttons section
    const ctaDiv = document.createElement('div');
    ctaDiv.className = 'mobile-compact-cta';
    ctaDiv.innerHTML = `
      <a href="login.html" class="btn btn-outline btn-sm">Login</a>
      <a href="register.html" class="btn btn-primary btn-sm">Register</a>
    `;
    compactNav.appendChild(ctaDiv);

    navbar.appendChild(compactNav);

    // === 3. Create courses dropdown panel ===
    const coursesPanel = document.createElement('div');
    coursesPanel.className = 'mobile-courses-panel';

    courseDomains.forEach(domain => {
      const domainGroup = document.createElement('div');
      domainGroup.className = 'mcp-domain-group';

      // Domain header
      const domainHeader = document.createElement('div');
      domainHeader.className = 'mcp-domain-header';
      domainHeader.innerHTML = `<i class="${domain.icon}"></i> <span>${domain.label}</span> <i class="fas fa-chevron-right mcp-arrow"></i>`;

      // Domain courses list
      const courseList = document.createElement('div');
      courseList.className = 'mcp-course-list';

      // Add category description if available
      if (domain.specialContent) {
        const descDiv = document.createElement('div');
        descDiv.className = 'mcp-category-desc';
        descDiv.innerHTML = `
          <div class="mcp-desc-title">${domain.specialContent.title}</div>
          <p class="mcp-desc-meta"><strong>Who it's for:</strong> ${domain.specialContent.whoItIsFor}</p>
          <p class="mcp-desc-meta"><strong>Objective:</strong> ${domain.specialContent.objective}</p>
        `;
        courseList.appendChild(descDiv);
      }

      if (domain.courses && domain.courses.length > 0) {
        domain.courses.forEach(course => {
          const courseLink = document.createElement('a');
          courseLink.href = course.url;
          courseLink.className = 'mcp-course-link';
          courseLink.innerHTML = `<i class="${course.icon || domain.icon}"></i> <span>${course.name}</span>`;
          courseList.appendChild(courseLink);
        });
      } else {
        const emptyMsg = document.createElement('p');
        emptyMsg.style.cssText = 'padding:8px 15px; color:#999; font-size:0.8rem; font-style:italic;';
        emptyMsg.textContent = 'Coming soon';
        courseList.appendChild(emptyMsg);
      }

      // Toggle accordion
      domainHeader.addEventListener('click', () => {
        const isOpen = courseList.classList.contains('open');
        // Close all others
        coursesPanel.querySelectorAll('.mcp-course-list').forEach(cl => cl.classList.remove('open'));
        coursesPanel.querySelectorAll('.mcp-domain-header').forEach(hdr => hdr.classList.remove('active'));

        if (!isOpen) {
          courseList.classList.add('open');
          domainHeader.classList.add('active');
        }
      });

      domainGroup.appendChild(domainHeader);
      domainGroup.appendChild(courseList);
      coursesPanel.appendChild(domainGroup);
    });

    // Insert panel right after the header element
    const headerEl = document.querySelector('header');
    if (headerEl) {
      headerEl.appendChild(coursesPanel);
    }

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
      const panel = document.querySelector('.mobile-courses-panel');
      const allCoursesLink = document.querySelector('.mobile-compact-links a[href="javascript:void(0)"]');
      if (panel && panel.classList.contains('open')) {
        if (!panel.contains(e.target) && !allCoursesLink.contains(e.target)) {
          panel.classList.remove('open');
          const icon = allCoursesLink.querySelector('i');
          if (icon) icon.style.transform = 'rotate(0deg)';
        }
      }
    });
  }

  // === 4. Clean up: hide hamburger menu items (no longer needed) ===
  const mobileMenuNav = document.querySelector('.mobile-menu-nav');
  if (mobileMenuNav) {
    // Remove all items since we've moved everything
    const allNavItems = mobileMenuNav.querySelectorAll('.nav-item');
    allNavItems.forEach(navItem => navItem.remove());
  }
}

