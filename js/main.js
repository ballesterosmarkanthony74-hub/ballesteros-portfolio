/**
 * main.js
 * Enhances the portfolio with smooth scrolling, dynamic header changes,
 * and intersection observer-based fade-in effects for sections.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Smooth Scrolling for Navigation Links
    // This provides a smooth transition when clicking a link to an internal section.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Exclude links that are just hash signs without an actual section ID
        if (anchor.getAttribute('href') === '#') return;

        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Use scrollIntoView for a native, smooth scroll effect
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Optional: Focus the element for accessibility (can be noisy)
                // targetElement.focus();
            }
        });
    });

    // 2. Interactive Header Change (Shrinking on Scroll)
    // Makes the header less prominent once the user scrolls past the top section.
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', () => {
        if (window.scrollY > headerHeight) {
            // Add a class to reduce padding or change background/shadow (define in CSS)
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Fade-In Transition for Sections (Intersection Observer)
    // Elements will smoothly fade in as they come into the viewport.

    // A. Define the CSS class that applies the transition effect
    //    You should add the following to your 'style.css' file:
    //
    //    /* CSS for Fade-In effect */
    //    .fade-in {
    //        opacity: 0;
    //        transform: translateY(20px);
    //        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    //    }
    //    .fade-in.appear {
    //        opacity: 1;
    //        transform: translateY(0);
    //    }

    const observerOptions = {
        root: null, // relative to viewport
        rootMargin: '0px',
        threshold: 0.2 // trigger when 20% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When element enters the viewport
                entry.target.classList.add('appear');
                // Stop observing once it has appeared
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply the fade-in class to all major sections
    document.querySelectorAll('main > section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // 4. Update Footer Year (Best practice way)
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});