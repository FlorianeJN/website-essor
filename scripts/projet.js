document.addEventListener("DOMContentLoaded", function() {
    // Grab all elements using one of our fade/slide classes
    const animatedElements = document.querySelectorAll(
      '.fade-in, .fade-in-up, .fade-in-left, .fade-in-right'
    );

    const options = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(function(entries, obs) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        // Add 'appear' class to start the CSS animation
        entry.target.classList.add('appear');
        // Stop watching once animated
        obs.unobserve(entry.target);
      });
    }, options);

    animatedElements.forEach(el => {
      observer.observe(el);
    });
  });