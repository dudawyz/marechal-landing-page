// SMOOTH SCROLL - highlights the active link in the nav
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul a');

let ticking = false;

function updateActiveLink() {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#c8a96e';
    }
  });

  ticking = false;
}

// Throttle with requestAnimationFrame: runs at most once per frame
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateActiveLink);
    ticking = true;
  }
});

// ANIMATION - elements appear on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.prato, #about .container, #contact .container').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// FORM - confirmation message
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Reservation received! We will be in touch shortly. 🍽️');
  e.target.reset();
});

// MENU TABS
function showTab(id, e) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  document.getElementById(id).classList.add('active');
  e.currentTarget.classList.add('active');
  e.currentTarget.setAttribute('aria-selected', 'true');
}
