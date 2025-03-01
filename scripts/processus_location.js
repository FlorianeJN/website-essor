//Without local storage

document.addEventListener("DOMContentLoaded", function () {
  // --------------------------------------------------
  // Intersection Observer for fade/slide animations
  // --------------------------------------------------
  const animatedEls = document.querySelectorAll(
    ".fade-in, .fade-in-up, .fade-in-left, .fade-in-right"
  );
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };
  const onScrollObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      obs.unobserve(entry.target);
    });
  }, observerOptions);
  animatedEls.forEach((el) => onScrollObserver.observe(el));

  // --------------------------------------------------
  // Quiz: Criteria step-by-step
  // --------------------------------------------------
  const criteres = [
    {
      title: "1 - Stabilité professionnelle",
      content: "Avez-vous un emploi stable et un revenu régulier ?",
    },
    {
      title: "2 - Historique locatif",
      content:
        "Avez-vous un historique de paiements de loyers sans incidents majeurs ?",
    },
    {
      title: "3 - Situation financière",
      content:
        "Votre dossier financier est-il exempt de dettes impayées ou d'incidents judiciaires en cours, y compris des jugements ou des saisies ?",
    },
    {
      title: "4 - Entretien du bien",
      content:
        "Êtes-vous prêt à maintenir le bon état du bien immobilier et à respecter les règles de la communauté ?",
    },
    {
      title: "5 - Documents justificatifs",
      content:
        "Êtes-vous disposé à fournir les documents nécessaires (comme des fiches de paie, attestations d'emploi, relevés bancaires, documents judiciaires, etc.) pour vérifier votre stabilité professionnelle, votre historique locatif et vos antécédents ?",
    },
  ];

  console.log(criteres);
  let currentIndex = 0;

  // HTML element references
  const questionTitleElem = document.getElementById("questionTitle");
  const questionDescriptionElem = document.getElementById(
    "questionDescription"
  );
  const criteriaWizard = document.getElementById("criteriaWizard");
  const felicitations = document.getElementById("felicitations");
  const notEligible = document.getElementById("notEligible");
  const detailedCriteres = document.getElementById("detailedCriteres");
  const restOfPage = document.getElementById("restOfPage");
  const contactSection = document.getElementById("contact");
  const contactCoordinates = document.getElementById("contactCoordinates");
  const contactForm = document.getElementById("contactForm");
  const criterionContainer = document.getElementById("criterionQuestion");

  // Function to display the current criterion
  function displayCurrentCriterion() {
    questionTitleElem.textContent = criteres[currentIndex].title;
    questionDescriptionElem.textContent = criteres[currentIndex].content;
    // Ensure the container is visible (for fade-in effect)
    criterionContainer.style.opacity = 1;
  }

  // Display the first criterion on page load
  displayCurrentCriterion();

  // Global function to handle answers (accessible from inline onclick)
  window.handleAnswer = function (isYes) {
    // Start fade-out transition
    criterionContainer.style.opacity = 0;

    // Wait for the transition to complete before updating the content
    setTimeout(function () {
      if (isYes) {
        currentIndex++;
        if (currentIndex < criteres.length) {
          // Display the next criterion
          displayCurrentCriterion();
        } else {
          // All criteria have been validated
          criteriaWizard.style.display = "none";
          notEligible.style.display = "none";
          felicitations.style.display = "block";
          detailedCriteres.style.display = "block";
          restOfPage.style.display = "block";
          contactSection.style.display = "block";
          contactCoordinates.style.display = "block";
          contactForm.style.display = "block";
        }
      } else {
        // User answered "Non" — not eligible
        criteriaWizard.style.display = "none";
        felicitations.style.display = "none";
        notEligible.style.display = "block";
        detailedCriteres.style.display = "block";
        restOfPage.style.display = "none";
        contactSection.style.display = "block";
        contactCoordinates.style.display = "none";
        contactForm.style.display = "block";
      }
      // Fade the container back in for the next question if needed
      criterionContainer.style.opacity = 1;
    }, 500); // Transition duration in ms
  };

  // --------------------------------------------------
  // Navbar collapse script
  // --------------------------------------------------
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navCollapse = document.getElementById("mainNavbar");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      // Check if the navbar toggler is visible (i.e. mobile view)
      const isTogglerVisible =
        window.getComputedStyle(document.querySelector(".navbar-toggler"))
          .display !== "none";
      if (isTogglerVisible) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        bsCollapse.hide();
      }
    });
  });
});

/*
    WITH LOCAL STORAGE

    document.addEventListener("DOMContentLoaded", function () {
  // --------------------------------------------------
  // Intersection Observer for fade/slide animations
  // --------------------------------------------------
  const animatedEls = document.querySelectorAll(
    ".fade-in, .fade-in-up, .fade-in-left, .fade-in-right"
  );
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };
  const onScrollObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      obs.unobserve(entry.target);
    });
  }, observerOptions);
  animatedEls.forEach((el) => onScrollObserver.observe(el));

  // --------------------------------------------------
  // Local Storage: Eligibility Handling
  // --------------------------------------------------
  const STORAGE_KEY = "eligibilityResult";
  
  // Helper function: Retrieve eligibility if stored and valid (within 24h)
  function getStoredEligibility() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        const now = Date.now();
        // 24 hours = 86,400,000 ms
        if (now - data.timestamp < 86400000) {
          return data.status; // "eligible" or "notEligible"
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    return null;
  }
  
  // Helper function: Store eligibility with current timestamp
  function storeEligibilityResult(status) {
    const data = {
      status: status, // "eligible" or "notEligible"
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
  
  // Check stored eligibility and update display if available
  const eligibility = getStoredEligibility();
  const criteriaWizard = document.getElementById("criteriaWizard");
  const felicitations = document.getElementById("felicitations");
  const notEligible = document.getElementById("notEligible");
  const detailedCriteres = document.getElementById("detailedCriteres");
  const restOfPage = document.getElementById("restOfPage");
  const contactSection = document.getElementById("contact");
  const contactCoordinates = document.getElementById("contactCoordinates");
  const contactForm = document.getElementById("contactForm");
  
  if (eligibility !== null) {
    // We already have a stored result; skip the quiz.
    criteriaWizard.style.display = "none";
    if (eligibility === "eligible") {
      felicitations.style.display = "block";
      notEligible.style.display = "none";
      detailedCriteres.style.display = "block";
      restOfPage.style.display = "block";
      contactSection.style.display = "block";
      contactCoordinates.style.display = "block";
      contactForm.style.display = "block";
    } else {
      felicitations.style.display = "none";
      notEligible.style.display = "block";
      detailedCriteres.style.display = "block";
      restOfPage.style.display = "none";
      contactSection.style.display = "block";
      contactCoordinates.style.display = "none";
      contactForm.style.display = "block";
    }
  } else {
    // --------------------------------------------------
    // Quiz: Criteria step-by-step
    // --------------------------------------------------
    const criteres = [
      {
        title: "1 - Stabilité professionnelle",
        content: "Avez-vous un emploi stable et un revenu régulier ?",
      },
      {
        title: "2 - Historique locatif",
        content: "Avez-vous un historique de paiements de loyers sans incidents majeurs ?",
      },
      {
        title: "3 - Situation financière",
        content: "Votre dossier financier est-il exempt de dettes impayées ou d'incidents judiciaires en cours, y compris des jugements ou des saisies ?",
      },
      {
        title: "4 - Entretien du bien",
        content: "Êtes-vous prêt à maintenir le bon état du bien immobilier et à respecter les règles de la communauté ?",
      },
      {
        title: "5 - Documents justificatifs",
        content: "Êtes-vous disposé à fournir les documents nécessaires (fiches de paie, attestations d'emploi, relevés bancaires, documents judiciaires, etc.) pour vérifier votre stabilité et votre historique ?",
      },
    ];

    console.log(criteres);
    let currentIndex = 0;

    // HTML element references for quiz questions
    const questionTitleElem = document.getElementById("questionTitle");
    const questionDescriptionElem = document.getElementById("questionDescription");
    const criterionContainer = document.getElementById("criterionQuestion");

    // Function to display the current criterion
    function displayCurrentCriterion() {
      questionTitleElem.textContent = criteres[currentIndex].title;
      questionDescriptionElem.textContent = criteres[currentIndex].content;
      // Ensure the container is visible (for fade-in effect)
      criterionContainer.style.opacity = 1;
    }

    // Display the first criterion on page load
    displayCurrentCriterion();

    // Global function to handle answers (accessible from inline onclick)
    window.handleAnswer = function (isYes) {
      // Start fade-out transition
      criterionContainer.style.opacity = 0;
      setTimeout(function () {
        if (isYes) {
          currentIndex++;
          if (currentIndex < criteres.length) {
            // Display the next criterion
            displayCurrentCriterion();
          } else {
            // All criteria have been validated – store eligibility and show success screen
            storeEligibilityResult("eligible");
            criteriaWizard.style.display = "none";
            notEligible.style.display = "none";
            felicitations.style.display = "block";
            detailedCriteres.style.display = "block";
            restOfPage.style.display = "block";
            contactSection.style.display = "block";
            contactCoordinates.style.display = "block";
            contactForm.style.display = "block";
          }
        } else {
          // Client is not eligible – store result and update display
          storeEligibilityResult("notEligible");
          criteriaWizard.style.display = "none";
          felicitations.style.display = "none";
          notEligible.style.display = "block";
          detailedCriteres.style.display = "block";
          restOfPage.style.display = "none";
          contactSection.style.display = "block";
          contactCoordinates.style.display = "none";
          contactForm.style.display = "block";
        }
        // Fade the container back in (if necessary)
        criterionContainer.style.opacity = 1;
      }, 500); // Transition duration in ms
    };
  }

  // --------------------------------------------------
  // Navbar collapse script
  // --------------------------------------------------
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navCollapse = document.getElementById("mainNavbar");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      const isTogglerVisible = window.getComputedStyle(document.querySelector(".navbar-toggler")).display !== "none";
      if (isTogglerVisible) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        bsCollapse.hide();
      }
    });
  });
});




*/
