// ========================================
// NAVIGATION
// ========================================

const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
  mobileMenuToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add('active');
    } else {
      navLink?.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', highlightNavigation);

// ========================================
// THEME TOGGLE
// ========================================

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  body.classList.add('dark-mode');
  themeIcon.classList.remove('fa-moon');
  themeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
});

// ========================================
// ANIMATED COUNTERS
// ========================================

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
}

// Intersection Observer for counters
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.textContent === '0') {
        animateCounter(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach(counter => counterObserver.observe(counter));

// ========================================
// SCROLL ANIMATIONS (AOS Alternative)
// ========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
      // Optionally unobserve after animation
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
  observer.observe(el);
});

// ========================================
// VIDEO PLAYERS
// ========================================

const playButtons = document.querySelectorAll('.play-button');

playButtons.forEach(button => {
  button.addEventListener('click', () => {
    const video = button.previousElementSibling;

    if (video.paused) {
      // Pause all other videos
      document.querySelectorAll('.project-video video').forEach(v => {
        if (v !== video) {
          v.pause();
          v.removeAttribute('playing');
        }
      });

      video.play();
      video.setAttribute('playing', '');
      button.style.opacity = '0';
    } else {
      video.pause();
      video.removeAttribute('playing');
      button.style.opacity = '1';
    }
  });
});

// Show play button when video ends or is paused
document.querySelectorAll('.project-video video').forEach(video => {
  video.addEventListener('ended', () => {
    video.removeAttribute('playing');
    const playButton = video.nextElementSibling;
    playButton.style.opacity = '1';
  });

  video.addEventListener('pause', () => {
    const playButton = video.nextElementSibling;
    if (playButton) {
      playButton.style.opacity = '1';
    }
  });

  video.addEventListener('play', () => {
    const playButton = video.nextElementSibling;
    if (playButton) {
      playButton.style.opacity = '0';
    }
  });
});

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // Skip if href is just '#'
    if (href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      const offsetTop = target.offsetTop - 70; // Account for fixed navbar

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// PARTICLES BACKGROUND (Simple)
// ========================================

function createParticles() {
  const particlesContainer = document.querySelector('.particles-container');
  if (!particlesContainer) return;

  const particleCount = 18;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';

    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.borderRadius = '50%';
    particle.style.background = 'rgba(255, 255, 255, 0.5)';
    particle.style.position = 'absolute';
    particle.style.pointerEvents = 'none';

    // Random animation
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;

    particlesContainer.appendChild(particle);
  }
}

// Add float animation
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    50% {
      transform: translateY(-100px) translateX(50px);
    }
  }
`;
document.head.appendChild(style);

createParticles();

// ========================================
// LAZY LOADING FOR VIDEOS
// ========================================

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const video = entry.target;
      const source = video.querySelector('source');
      if (source && !video.src) {
        video.src = source.src;
        video.load();
      }
      videoObserver.unobserve(video);
    }
  });
}, { rootMargin: '100px' });

document.querySelectorAll('.project-video video').forEach(video => {
  videoObserver.observe(video);
});

// ========================================
// PAGE LOAD ANIMATION
// ========================================

window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// Prevent FOUC (Flash of Unstyled Content)
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease';

// ========================================
// FORM VALIDATION (if contact form is added)
// ========================================

// Add this if you implement a contact form later
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add form validation and submission logic here
    console.log('Form submitted');
  });
}

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%cðŸ‘‹ Hi there!', 'font-size: 20px; font-weight: bold; color: #0d394e;');
console.log('%cInterested in the code? Check out the repository!', 'font-size: 14px; color: #546e7a;');
console.log('%cðŸ”— https://github.com/yucel-yavuz', 'font-size: 14px; color: #00bcd4;');

// ========================================
// PERFORMANCE MONITORING
// ========================================

// Log performance metrics in development
if (window.performance) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`Page loaded in ${pageLoadTime}ms`);
    }, 0);
  });
}


