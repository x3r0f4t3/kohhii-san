document.addEventListener('DOMContentLoaded', () => {
    // Optimized loader with faster transition
    const loader = document.querySelector('.loader-wrapper');
    loader.style.display = 'flex'; // Ensure loader is visible initially
    
    // Remove loader as soon as DOM is ready (no need to wait for window.load)
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300); // Faster fade-out
    }, 500); // Shorter initial delay

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a:not(.logo)').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animation for main elements
    const animateElements = (elements, delayFactor = 100) => {
        elements.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `all 0.8s ease ${i * delayFactor}ms`;
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 50); // Small delay to ensure styles are applied
        });
    };

    // Animate main heading elements
    animateElements([
        document.querySelector('.main-headings'),
        document.querySelector('.primary-headings'),
        document.querySelector('.main')
    ], 200);

    // Intersection Observer for scroll animations
    const createObserver = (options, callback) => {
        return new IntersectionObserver((entries) => {
            entries.forEach(entry => callback(entry));
        }, options);
    };

    // Card animations
    const cardObserver = createObserver({ threshold: 0.2 }, (entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });

    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        cardObserver.observe(card);

        // Hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 20px rgba(222, 171, 95, 0.2)';
            const img = card.querySelector('.class-img');
            if (img) img.style.transform = 'scale(1.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
            const img = card.querySelector('.class-img');
            if (img) img.style.transform = 'scale(1)';
        });
    });

    // Section animations
    const sectionObserver = createObserver({ threshold: 0.2 }, (entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });

    document.querySelectorAll('#our-story, .coffee-container').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateX(-50px)';
        section.style.transition = 'all 0.8s ease';
        sectionObserver.observe(section);
    });

    // Button hover effects
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.1)';
            button.style.boxShadow = '0 5px 15px rgba(222, 171, 95, 0.3)';
        });

        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = 'none';
        });
    });

    // Image slider functionality
    const header = document.querySelector('.header');
    const images = [
        'new bg 1.jpg',
        'new bg 2.jpg',
        'new bg 3.jpg',
        'new bg 4.webp',
        'new bg 4.jpg'
    ];
    let currentImageIndex = 0;

    // Create slider
    const initSlider = () => {
        // Create images
        images.forEach((src, i) => {
            const img = document.createElement('div');
            img.className = `header-image ${i === 0 ? 'active' : ''}`;
            img.style.backgroundImage = `url('${src}')`;
            header.appendChild(img);
        });

        // Create dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        images.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => changeImage(i));
            dotsContainer.appendChild(dot);
        });
        header.appendChild(dotsContainer);

        // Auto-rotate
        setInterval(() => changeImage((currentImageIndex + 1) % images.length), 5000);
    };

    const changeImage = (newIndex) => {
        const images = document.querySelectorAll('.header-image');
        const dots = document.querySelectorAll('.slider-dot');
        
        images[currentImageIndex].classList.remove('active');
        dots[currentImageIndex].classList.remove('active');
        
        currentImageIndex = newIndex;
        
        images[currentImageIndex].classList.add('active');
        dots[currentImageIndex].classList.add('active');
    };

    initSlider();

    // Mobile menu toggle
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<div></div><div></div><div></div>';
    
    const nav = document.querySelector('nav');
    nav.insertBefore(hamburger, nav.querySelector('ul'));

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Footer animations
    const footerObserver = createObserver({ threshold: 0.1 }, (entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });

    document.querySelectorAll('footer .container, .para, hr').forEach(el => {
        if (el.tagName === 'HR') {
            el.style.width = '0';
            el.style.transition = 'all 1s ease';
        } else {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s ease';
        }
        footerObserver.observe(el);
    });
});
