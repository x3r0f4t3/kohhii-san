document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader-wrapper');
    
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500); 
    });

    
    document.querySelectorAll('nav a').forEach(link => {
        if (link.querySelector('.logo')) return;
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    
    const mainHeading = document.querySelector('.main-headings');
    const primaryHeading = document.querySelector('.primary-headings');
    const shopButton = document.querySelector('.main');

    [mainHeading, primaryHeading, shopButton].forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 500 * (index + 1));
    });

    
    const cards = document.querySelectorAll('.card');
    
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    
    const sections = document.querySelectorAll('#our-story, .coffee-container');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.2 });

   
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateX(-50px)';
        section.style.transition = 'all 0.8s ease';
        sectionObserver.observe(section);
    });

    
    document.querySelectorAll('button').forEach(button => {
        button.style.transition = 'all 0.3s ease';
        
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.1)';
            button.style.boxShadow = '0 5px 15px rgba(222, 171, 95, 0.3)';
        });

        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = 'none';
        });
    });

    
    const header = document.querySelector('.header');
    
    
    const images = [
        'new bg 1.jpg',
        'new bg 2.jpg',
        'new bg 3.jpg',
        'new bg 4.webp',
        'new bg 4.jpg'
    ];

    let currentImageIndex = 0;

    
    const createImageElements = () => {
        images.forEach((src, index) => {
            const img = document.createElement('div');
            img.className = `header-image ${index === 0 ? 'active' : ''}`;
            img.style.backgroundImage = `url('${src}')`;
            img.style.position = 'absolute';
            img.style.top = '0';
            img.style.left = '0';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.backgroundSize = 'cover';
            img.style.backgroundPosition = 'center';
            img.style.opacity = index === 0 ? '1' : '0';
            img.style.transition = 'opacity 1s ease-in-out';
            header.appendChild(img);
        });
    };

    
    const changeImage = () => {
        const imageElements = document.querySelectorAll('.header-image');
        imageElements[currentImageIndex].style.opacity = '0';
        currentImageIndex = (currentImageIndex + 1) % images.length;
        imageElements[currentImageIndex].style.opacity = '1';
    };

    
    createImageElements();
    setInterval(changeImage, 5000); 

    
    const createNavigationDots = () => {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        dotsContainer.style.position = 'absolute';
        dotsContainer.style.bottom = '20px';
        dotsContainer.style.left = '50%';
        dotsContainer.style.transform = 'translateX(-50%)';
        dotsContainer.style.zIndex = '10';
        dotsContainer.style.display = 'flex';
        dotsContainer.style.gap = '10px';

        images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
            dot.style.width = '12px';
            dot.style.height = '12px';
            dot.style.borderRadius = '50%';
            dot.style.backgroundColor = index === 0 ? '#deab5f' : 'rgba(255, 255, 255, 0.5)';
            dot.style.cursor = 'pointer';
            dot.style.transition = 'all 0.3s ease';

            dot.addEventListener('click', () => {
                const imageElements = document.querySelectorAll('.header-image');
                imageElements[currentImageIndex].style.opacity = '0';
                currentImageIndex = index;
                imageElements[currentImageIndex].style.opacity = '1';
                updateDots();
            });

            dotsContainer.appendChild(dot);
        });

        header.appendChild(dotsContainer);
    };

    
    const updateDots = () => {
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.style.backgroundColor = index === currentImageIndex ? 
                '#deab5f' : 'rgba(255, 255, 255, 0.5)';
        });
    };

    
    createNavigationDots();

    
    setInterval(updateDots, 5000);

    
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
        <div></div>
        <div></div>
        <div></div>
    `;
    
    const nav = document.querySelector('nav');
    nav.insertBefore(hamburger, nav.querySelector('ul'));

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        const bars = hamburger.querySelectorAll('div');
        if (nav.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            const bars = hamburger.querySelectorAll('div');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

   
    const productsTitle = document.querySelector('.title-three');
    const productsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    
    productsTitle.style.opacity = '0';
    productsTitle.style.transform = 'translateY(30px)';
    productsTitle.style.transition = 'all 1s ease';
    productsObserver.observe(productsTitle);

    
    const footerContainers = document.querySelectorAll('footer .container');
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200); // Stagger the animations
            }
        });
    }, { threshold: 0.2 });

    
    footerContainers.forEach(container => {
        container.style.opacity = '0';
        container.style.transform = 'translateY(30px)';
        container.style.transition = 'all 0.8s ease';
        footerObserver.observe(container);
    });

    
    const footerHrs = document.querySelectorAll('hr');
    const hrObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = '500px';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.2 });

    
    footerHrs.forEach(hr => {
        hr.style.width = '0';
        hr.style.opacity = '0';
        hr.style.transition = 'all 1s ease';
        hrObserver.observe(hr);
    });

    
    const productCards = document.querySelectorAll('.card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 20px rgba(222, 171, 95, 0.2)';
            card.style.border = '2px solid #deab5f';
            
            
            const cardImg = card.querySelector('.class-img');
            if (cardImg) {
                cardImg.style.transform = 'scale(1.1)';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
            card.style.border = '2px solid #deab5f';
            
            
            const cardImg = card.querySelector('.class-img');
            if (cardImg) {
                cardImg.style.transform = 'scale(1)';
            }
        });

        
        card.style.transition = 'all 0.3s ease';
        const cardImg = card.querySelector('.class-img');
        if (cardImg) {
            cardImg.style.transition = 'all 0.3s ease';
        }
    });

    
    const copyright = document.querySelector('.para');
    copyright.style.opacity = '0';
    copyright.style.transform = 'translateY(20px)';
    copyright.style.transition = 'all 0.8s ease';

    const copyrightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    copyrightObserver.observe(copyright);
});
