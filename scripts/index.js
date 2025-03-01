document.addEventListener("DOMContentLoaded", function() {
    // Collect all elements that use one of our fade/slide classes
    const animatedElements = document.querySelectorAll(
      '.fade-in, .fade-in-up, .fade-in-left, .fade-in-right'
    );

    const appearOptions = {
      threshold: 0.1, // Trigger when 10% of the element is visible
      rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        // Add 'appear' class to start animation
        entry.target.classList.add('appear');
        // Stop observing once the animation has been triggered
        observer.unobserve(entry.target);
      });
    }, appearOptions);

    // Observe each element
    animatedElements.forEach(el => {
      appearOnScroll.observe(el);
    });
  }); 


  //Script for navbar collapse
  document.addEventListener('DOMContentLoaded', function() {
    // Select all nav links within your .navbar-nav
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    // Reference the collapse element
    const navCollapse = document.getElementById('mainNavbar');

    // Loop through each link
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        // Check if the navbar is currently expanded (mobile view)
        // i.e. if the toggler is visible
        const isTogglerVisible = window.getComputedStyle(
          document.querySelector('.navbar-toggler')
        ).display !== 'none';

        // If we’re in mobile mode, collapse the menu
        if (isTogglerVisible) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          bsCollapse.hide();
        }
      });
    });
  });
