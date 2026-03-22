/* ============================================================
   JINGYU HE - PORTFOLIO WEBSITE
   script.js — Main JavaScript File

   Contents:
   1. Mobile Navigation Toggle (hamburger menu)
   2. Navbar scroll shadow effect
   3. Contact form submit handler (front-end only, no backend)
   4. Skill bar animation on scroll
============================================================ */


/* =============================================
   1. MOBILE NAVIGATION TOGGLE
   Opens and closes the mobile dropdown menu
   when the hamburger button is clicked.
============================================= */
document.addEventListener("DOMContentLoaded", function () {

  var navToggle = document.getElementById("navToggle");
  var navMenu   = document.getElementById("navMenu");

  if (navToggle && navMenu) {

    // Toggle the menu open/closed on button click
    navToggle.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("open");

      // Update aria-expanded for accessibility
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

      // Animate hamburger into an X shape when open
      animateHamburger(navToggle, isOpen);
    });

    // Close the menu if the user clicks a link inside it
    var navLinks = navMenu.querySelectorAll(".nav-link");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        animateHamburger(navToggle, false);
      });
    });

    // Close the menu if the user clicks anywhere outside the navbar
    document.addEventListener("click", function (event) {
      var navbar = document.querySelector(".navbar");
      if (navbar && !navbar.contains(event.target)) {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        animateHamburger(navToggle, false);
      }
    });
  }

});


/**
 * Animate the hamburger button bars into an X shape when open,
 * and back to three horizontal lines when closed.
 *
 * @param {HTMLElement} button - The hamburger button element.
 * @param {boolean} isOpen     - Whether the menu is currently open.
 */
function animateHamburger(button, isOpen) {
  var spans = button.querySelectorAll("span");
  if (spans.length < 3) return;

  if (isOpen) {
    spans[0].style.transform = "translateY(7px) rotate(45deg)";
    spans[1].style.opacity   = "0";
    spans[2].style.transform = "translateY(-7px) rotate(-45deg)";
  } else {
    spans[0].style.transform = "";
    spans[1].style.opacity   = "";
    spans[2].style.transform = "";
  }
}


/* =============================================
   2. NAVBAR SCROLL SHADOW EFFECT
   Adds a stronger shadow to the navbar
   when the user scrolls down from the top.
============================================= */
window.addEventListener("scroll", function () {
  var navbar = document.querySelector(".navbar");
  if (!navbar) return;

  if (window.scrollY > 10) {
    navbar.style.boxShadow = "0 4px 16px rgba(0,0,0,0.25)";
  } else {
    navbar.style.boxShadow = "0 2px 8px rgba(0,0,0,0.20)";
  }
});


/* =============================================
   3. CONTACT FORM SUBMIT HANDLER
   Handles the contact form submission.
   This is front-end only — no data is sent
   to a server. A success message is shown.

   To make it functional, connect it to a
   service like Formspree or EmailJS.
============================================= */

/**
 * Called when the contact form is submitted.
 * Prevents the default browser form action,
 * validates the fields, and shows a success message.
 *
 * @param {Event} event - The form submit event.
 */
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent page reload

  var form       = document.getElementById("contactForm");
  var successBox = document.getElementById("formSuccess");

  if (!form || !successBox) return;

  // Basic validation: check that all fields have a value
  var name    = document.getElementById("name");
  var email   = document.getElementById("email");
  var subject = document.getElementById("subject");
  var message = document.getElementById("message");

  if (!name.value.trim() || !email.value.trim() ||
      !subject.value.trim() || !message.value.trim()) {
    alert("Please fill in all required fields before submitting.");
    return;
  }

  // Show success message
  successBox.style.display = "block";

  // Reset the form fields
  form.reset();

  // Scroll the success message into view
  successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });

  // Hide the success message after 6 seconds
  setTimeout(function () {
    successBox.style.display = "none";
  }, 6000);
}


/* =============================================
   4. SKILL BAR ANIMATION ON SCROLL
   Animates the skill bars on the About page
   when they become visible in the viewport.
   Uses the Intersection Observer API.
============================================= */
document.addEventListener("DOMContentLoaded", function () {

  var skillFills = document.querySelectorAll(".skill-fill");

  // If there are no skill bars, exit
  if (skillFills.length === 0) return;

  // Store original widths and set to 0 initially
  skillFills.forEach(function (fill) {
    var targetWidth = fill.style.width;
    fill.setAttribute("data-width", targetWidth);
    fill.style.width = "0%";
  });

  // Create an Intersection Observer to trigger animation
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var fill = entry.target;
        var targetWidth = fill.getAttribute("data-width");

        // Short delay so the animation is noticeable
        setTimeout(function () {
          fill.style.width = targetWidth;
        }, 150);

        // Stop observing once animated
        observer.unobserve(fill);
      }
    });
  }, {
    threshold: 0.3 // Trigger when 30% of the element is visible
  });

  // Observe each skill fill bar
  skillFills.forEach(function (fill) {
    observer.observe(fill);
  });

});
