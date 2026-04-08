/* =============================================
   PORTFOLIO JAVASCRIPT - Nishit Davda
   ============================================= */

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('done');
  }, 2000);
});

// ===== CUSTOM CURSOR (desktop only) =====
const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

if (!isTouch) {
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();
}

const hoverables = document.querySelectorAll('a, button, .skill-category, .project-card, .ach-card, .contact-item, input, textarea');
if (!isTouch) {
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('expand');
      follower.classList.add('expand');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('expand');
      follower.classList.remove('expand');
    });
  });
}

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  // Scroll class
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  // Active link highlight
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinksContainer.classList.toggle('open');
  hamburger.classList.toggle('active');
});

navLinksContainer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksContainer.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ===== TYPED TEXT =====
const typedText = document.getElementById('typedText');
const words = ['Full-Stack Developer with AI', 'Backend Developer', 'MERN Stack Developer', 'React Developer', 'API Architect'];
let wordIndex = 0, charIndex = 0, isDeleting = false;
const typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typedText.textContent = currentWord.slice(0, charIndex--);
  } else {
    typedText.textContent = currentWord.slice(0, charIndex++);
  }

  if (!isDeleting && charIndex === currentWord.length + 1) {
    isDeleting = true;
    setTimeout(typeEffect, pauseTime);
    return;
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
}
typeEffect();

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => animateCounter(el));
      statObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObserver.observe(heroStats);

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, entry.target.dataset.delay || 0);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('[data-reveal]').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.1) + 's';
  revealObserver.observe(el);
});

// ===== SKILLS HOVER FX =====
document.querySelectorAll('.skill-category').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    card.style.transform = `translateY(-6px) rotateX(${-y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== PROJECT CARD 3D TILT =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    card.style.transform = `translateY(-10px) rotateX(${-y}deg) rotateY(${x}deg)`;
    card.style.transformStyle = 'preserve-3d';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

/*
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('span');
  
  btnText.textContent = 'Sending...';
  submitBtn.style.opacity = '0.7';
  submitBtn.style.pointerEvents = 'none';

  // Simulate API Call
  setTimeout(() => {
    formSuccess.classList.add('show');
    btnText.textContent = 'Message Sent!';
    contactForm.reset();
    
    setTimeout(() => {
      formSuccess.classList.remove('show');
      btnText.textContent = 'Send Message';
      submitBtn.style.opacity = '1';
      submitBtn.style.pointerEvents = 'all';
    }, 5000);
  }, 1500);
});
*/

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== PARTICLE / SPARKLE ON CLICK =====
document.addEventListener('click', (e) => {
  for (let i = 0; i < 6; i++) {
    const spark = document.createElement('div');
    spark.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: 6px; height: 6px;
      background: hsl(${Math.random() * 60 + 240}, 100%, 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99997;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(spark);
    const angle = (Math.PI * 2 * i) / 6;
    const distance = 40 + Math.random() * 30;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    spark.animate([
      { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
      { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`, opacity: 0 }
    ], { duration: 500, easing: 'ease-out' }).onfinish = () => spark.remove();
  }
});

// ===== GLITCH EFFECT on HERO NAME =====
const heroName = document.querySelector('.line-2');
if (heroName) {
  setInterval(() => {
    heroName.style.textShadow = `
      ${Math.random() > 0.5 ? '-' : ''}${Math.random() * 4}px 0 #FF6B6B,
      ${Math.random() > 0.5 ? '-' : ''}${Math.random() * 4}px 0 #00D9FF
    `;
    setTimeout(() => {
      heroName.style.textShadow = 'none';
    }, 80);
  }, 4000);
}

// ===== NAV LINK SMOOTH ANIMATION =====
navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.letterSpacing = '0.5px';
  });
  link.addEventListener('mouseleave', () => {
    link.style.letterSpacing = '';
  });
});

console.log(
  '%c ND Portfolio | Nishit Davda | Full-Stack Developer ',
  'background: linear-gradient(135deg, #6C63FF, #00D9FF); color: #fff; font-size: 14px; padding: 10px 20px; border-radius: 8px; font-weight: bold;'
);
