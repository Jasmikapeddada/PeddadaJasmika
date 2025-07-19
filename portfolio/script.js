// Navigation and scrolling functionality
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Projects carousel functionality
let currentProjectIndex = 0;
const totalProjects = 4;

function scrollProjects(direction) {
    const container = document.getElementById('projects-container');
    if (!container) return;
    
    const cardWidth = 400;
    const gap = 24;
    const scrollAmount = cardWidth + gap;
    
    if (direction === 'right' && currentProjectIndex < totalProjects - 2) {
        currentProjectIndex++;
        container.scrollTo({
            left: currentProjectIndex * scrollAmount,
            behavior: 'smooth'
        });
    } else if (direction === 'left' && currentProjectIndex > 0) {
        currentProjectIndex--;
        container.scrollTo({
            left: currentProjectIndex * scrollAmount,
            behavior: 'smooth'
        });
    }
}

// Intersection Observer for fade-in animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach((section) => observer.observe(section));
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    
    // Initialize Lucide icons if available
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Optional: Add smooth scrolling behavior for older browsers
if (!CSS.supports('scroll-behavior', 'smooth')) {
    const links = document.querySelectorAll('button[onclick*="scrollToSection"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add keyboard navigation for projects carousel
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        scrollProjects('left');
    } else if (e.key === 'ArrowRight') {
        scrollProjects('right');
    }
});

// Add touch/swipe functionality for mobile devices
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            scrollProjects('left');
        } else {
            scrollProjects('right');
        }
    }
}

const projectsContainer = document.getElementById('projects-container');
if (projectsContainer) {
    projectsContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    projectsContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Optional: Add navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.8)';
    }
});

const btn = document.querySelector('#sendMessageButton');
  btn?.addEventListener('click', () => {
    window.location.href = 'contact.html';
  });