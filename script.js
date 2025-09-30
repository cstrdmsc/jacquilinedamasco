// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});



// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

// Form handling
function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    // Simple form validation
    const name = formData.get('name') || form.querySelector('input[type="text"]').value;
    const email = formData.get('email') || form.querySelector('input[type="email"]').value;
    const message = formData.get('message') || form.querySelector('textarea').value;
    
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Here you would typically send the form data to a server
    alert('Thank you for your message! I\'ll get back to you soon.');
    form.reset();
}

// Initialize animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    // Experience tab functionality
    const jobTabs = document.querySelectorAll('.job-tab');
    const jobPanels = document.querySelectorAll('.job-panel');

    jobTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetJob = this.getAttribute('data-job');
            
            // Remove active class from all tabs and panels
            jobTabs.forEach(t => t.classList.remove('active'));
            jobPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            document.getElementById(targetJob).classList.add('active');
        });
    });


    
    // Observe fade-in sections
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    fadeInSections.forEach(section => {
        observer.observe(section);
    });
    
    // Add form submit handler
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Carousel functionality
    let slideIndex = 1;
    
    window.moveSlide = function(n) {
        showSlide(slideIndex += n);
    }
    
    window.currentSlide = function(n) {
        showSlide(slideIndex = n);
    }
    
    function showSlide(n) {
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.dot');
        
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (slides[slideIndex - 1]) {
            slides[slideIndex - 1].classList.add('active');
        }
        if (dots[slideIndex - 1]) {
            dots[slideIndex - 1].classList.add('active');
        }
    }
    
    // Auto-advance carousel
    setInterval(() => {
        moveSlide(1);
    }, 5000);
    
    // Typewriter animation
    const typewriter = document.getElementById('typewriter');
    if (typewriter) {
        const parts = [
            { text: "hi, i'm ", color: null },
            { text: "jacq", color: "#64ffda" },
            { text: ".", color: null }
        ];
        
        let partIndex = 0;
        let charIndex = 0;
        let currentHTML = "";
        
        function typeText() {
            if (partIndex < parts.length) {
                const currentPart = parts[partIndex];
                
                if (charIndex < currentPart.text.length) {
                    if (charIndex === 0 && currentPart.color) {
                        currentHTML += `<span style="color: ${currentPart.color}; font-weight: bold;">`;
                    }
                    
                    currentHTML += currentPart.text.charAt(charIndex);
                    
                    if (charIndex === currentPart.text.length - 1 && currentPart.color) {
                        currentHTML += '</span>';
                    }
                    
                    typewriter.innerHTML = currentHTML;
                    charIndex++;
                } else {
                    partIndex++;
                    charIndex = 0;
                }
                
                setTimeout(typeText, 100);
            } else {
                // Add cursor after typing is complete
                typewriter.innerHTML = currentHTML + '<span class="Cursor Cursor--blinking">|</span>';
            }
        }
        
        typeText();
    }
});