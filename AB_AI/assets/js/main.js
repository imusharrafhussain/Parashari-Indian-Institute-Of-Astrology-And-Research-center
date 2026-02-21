/* ============================================
   MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  // Smooth scrolling for anchor links
  initSmoothScroll();

  // Initialize lazy loading for images
  initLazyLoading();

  // Scroll animations
  initScrollAnimations();

  // Tab functionality
  initTabs();

  // Accordion functionality
  initAccordion();

  // Number Counter Animation
  initCounterAnimation();
});

// ============ SMOOTH SCROLLING ============
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        const offset = 80; // Adjust based on sticky header height
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============ LAZY LOADING ============
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
    });
  }
}

// ============ SCROLL ANIMATIONS ============
function initScrollAnimations() {
  if ('IntersectionObserver' in window) {
    const elementObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          elementObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-animate]').forEach(element => {
      elementObserver.observe(element);
    });
  }
}

// ============ TABS ============
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', function () {
      const tabId = this.getAttribute('data-tab');

      // Remove active class from all buttons and panes
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));

      // Add active class to clicked button and corresponding pane
      this.classList.add('active');
      const activePane = document.querySelector(`#${tabId}`);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });
}

// ============ ACCORDION ============
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    if (header) {
      header.addEventListener('click', function () {
        // Close other accordion items
        accordionItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherContent = otherItem.querySelector('.accordion-content');
            if (otherContent) {
              otherContent.style.maxHeight = null;
            }
          }
        });

        // Toggle current accordion item
        item.classList.toggle('active');

        if (item.classList.contains('active')) {
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          content.style.maxHeight = null;
        }
      });
    }
  });
}

// ============ COUNTER ANIMATION ============
function initCounterAnimation() {
  const counters = document.querySelectorAll('.count-up');

  if (!counters.length) return;

  const observerOptions = {
    threshold: 0.5 // Start animation when 50% of the element is visible
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

function animateCounter(counter) {
  const target = +counter.getAttribute('data-target');
  const duration = 2000; // Total animation time (2 seconds)
  const steps = 60; // Total frames assuming roughly 30fps
  const increment = target / steps;
  let current = 0;

  // Safely extract optional suffix from data attribute
  const suffix = counter.getAttribute('data-suffix') || '';

  const updateCounter = setInterval(() => {
    current += increment;
    if (current >= target) {
      clearInterval(updateCounter);
      current = target; // Ensure exact final value
    }

    // Format large numbers with commas and add the suffix
    counter.innerText = Math.floor(current).toLocaleString('en-US') + suffix;
  }, duration / steps);
}

// ============ UTILITY FUNCTIONS ============

// Get query parameter from URL
function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

// Format currency
function formatCurrency(amount, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

// Format phone number
function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (!match) return phone;

  const [, p1, p2, p3] = match;
  if (p3) return `${p1} ${p2} ${p3}`;
  if (p2) return `${p1} ${p2}`;
  return p1;
}

// Debounce function
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Add CSS animation classes
const animationStyle = document.createElement('style');
animationStyle.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  [data-animate] {
    opacity: 0;
  }

  [data-animate].animate-in {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  .accordion-item .accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
  }

  .accordion-item.active .accordion-content {
    max-height: 500px;
  }

  .tab-pane {
    display: none;
  }

  .tab-pane.active {
    display: block;
  }
`;
document.head.appendChild(animationStyle);

console.log('✓ Main JavaScript initialized');
