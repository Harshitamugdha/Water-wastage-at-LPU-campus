document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Form handling
const reportForm = document.getElementById('report-form');
const formMessage = document.getElementById('form-message');

reportForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;
    const email = document.getElementById('email').value;

    // Validate form
    if (location.trim() === '' || description.trim() === '') {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }

    // Simulate form submission
    showLoadingState();
    
    // Simulate API call
    setTimeout(() => {
        showMessage('Thank you for your report! We will investigate the issue.', 'success');
        reportForm.reset();
        hideLoadingState();
    }, 1500);
});

// Show message function
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = type;
    
    // Auto-hide message after 5 seconds
    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = '';
    }, 5000);
}

// Loading state functions
function showLoadingState() {
    const submitButton = reportForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
}

function hideLoadingState() {
    const submitButton = reportForm.querySelector('button[type="submit"]');
    submitButton.disabled = false;
    submitButton.textContent = 'Submit Report';
}

// Intersection Observer for section animations
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Set initial state and observe sections
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});

// Navigation highlight on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active class styles
const style = document.createElement('style');
style.textContent = `
    nav a.active {
        background-color: rgba(255, 255, 255, 0.2);
        font-weight: bold;
    }
`;
document.head.appendChild(style);