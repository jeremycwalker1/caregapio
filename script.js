// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Sticky Header
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('bg-white', 'shadow-md');
    } else {
        header.classList.add('bg-white', 'shadow-md');
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        }
    });
});

// Add hover effect to service boxes
document.querySelectorAll('.service-box').forEach(box => {
    box.addEventListener('mouseenter', () => {
        box.style.transform = 'translateY(-5px)';
    });
    
    box.addEventListener('mouseleave', () => {
        box.style.transform = 'translateY(0)';
    });
});

// Calendly Modal Functionality
const modal = document.getElementById('calendly-modal');
const closeModal = document.getElementById('close-modal');
const calendlyContainer = document.getElementById('calendly-container');

// Function to open the modal and load Calendly
function openCalendlyModal() {
    modal.classList.remove('hidden');
    // Initialize Calendly widget
    Calendly.initInlineWidget({
        url: 'https://calendly.com/caregap/caregap-demo',
        parentElement: calendlyContainer,
        prefill: {},
        utm: {}
    });
}

// Function to close the modal
function closeCalendlyModal() {
    modal.classList.add('hidden');
    // Clear the Calendly container
    calendlyContainer.innerHTML = '';
}

// Event listeners for modal
closeModal.addEventListener('click', closeCalendlyModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeCalendlyModal();
    }
});

// Update all "Book a Demo" buttons to use the modal
document.querySelectorAll('a[href*="calendly.com"]').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        openCalendlyModal();
    });
});

// ===== Who We Work With: marquee duplication & responsiveness =====
(function initLogoMarquee() {
  const track = document.querySelector('[data-logo-track]');
  if (!track) return;

  // Duplicate the initial set of logos once to create a continuous loop
  const firstSet = Array.from(track.children);
  const cloneFragment = document.createDocumentFragment();
  firstSet.forEach(node => cloneFragment.appendChild(node.cloneNode(true)));
  track.appendChild(cloneFragment);

  // Optional: adjust speed based on viewport (more logos visible -> faster)
  const setSpeed = () => {
    const base = 40; // seconds
    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const speed = vw >= 1280 ? base : vw >= 768 ? base * .8 : base * .6;
    track.style.setProperty('--logo-speed', `${speed}s`);
  };
  setSpeed();
  window.addEventListener('resize', setSpeed);
})();


