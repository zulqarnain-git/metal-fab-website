document.addEventListener('DOMContentLoaded', function() {
  // Initialize all scripts
  initializeNavigation();
  initializeSmoothScrolling();
  initializeBackToTop();
  initializeNewsletterForm();
});

// Header Scroll Effect
function initializeNavigation() {
  const header = document.getElementById('header');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Handle header scrolling effect
  window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });
  
  // Handle mobile menu toggle
  mobileMenuToggle.addEventListener('click', function() {
      mobileMenuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
  });
  
  // Close menu when a link is clicked
  navLinks.forEach(link => {
      link.addEventListener('click', function() {
          mobileMenuToggle.classList.remove('active');
          navMenu.classList.remove('active');
          document.body.classList.remove('no-scroll');
          
          // Update active link
          navLinks.forEach(l => l.classList.remove('active'));
          this.classList.add('active');
      });
  });
  
  // Update active nav link on scroll
  window.addEventListener('scroll', function() {
      let current = '';
      const sections = document.querySelectorAll('section');
      
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          
          if (window.scrollY >= (sectionTop - 200)) {
              current = section.getAttribute('id');
          }
      });
      
      navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) {
              link.classList.add('active');
          }
      });
  });
}

// Smooth Scrolling for Anchor Links
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              const headerHeight = document.getElementById('header').offsetHeight;
              const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
              
              window.scroll({
                  top: targetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });
}

// Back to Top Button
function initializeBackToTop() {
  const backToTopButton = document.getElementById('backToTop');
  
  window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
          backToTopButton.classList.add('visible');
      } else {
          backToTopButton.classList.remove('visible');
      }
  });
  
  backToTopButton.addEventListener('click', function() {
      window.scroll({
          top: 0,
          behavior: 'smooth'
      });
  });
}

// Newsletter Form Handling
function initializeNewsletterForm() {
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterStatus = document.getElementById('newsletterStatus');
  
  if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const emailInput = document.getElementById('newsletterEmail');
          const email = emailInput.value.trim();
          
          // Simple email validation
          if (!isValidEmail(email)) {
              showNewsletterStatus('Please enter a valid email address.', 'error');
              return;
          }
          
          // Simulate form submission (in a real project, you would send this to a backend service)
          showNewsletterStatus('Thank you for subscribing to our newsletter!', 'success');
          newsletterForm.reset();
      });
  }
  
  function showNewsletterStatus(message, type) {
      newsletterStatus.textContent = message;
      newsletterStatus.className = 'newsletter-status';
      newsletterStatus.classList.add(type);
      
      // Hide the status message after 5 seconds
      setTimeout(() => {
          newsletterStatus.classList.remove(type);
      }, 5000);
  }
  
  function isValidEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }
}

/*
* Contact Form Validation
*/

document.addEventListener('DOMContentLoaded', function() {
  initializeContactForm();
});

function initializeContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset previous error messages
      resetErrorMessages();
      
      // Get form inputs
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const phoneInput = document.getElementById('phone');
      const messageInput = document.getElementById('message');
      
      // Validate inputs
      let isValid = true;
      
      // Name validation (required, at least 2 characters)
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
          showError(nameInput, 'nameError', 'Please enter your name (at least 2 characters)');
          isValid = false;
      }
      
      // Email validation (required, valid format)
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
          showError(emailInput, 'emailError', 'Please enter a valid email address');
          isValid = false;
      }
      
      // Phone validation (optional, but if provided must be valid)
      if (phoneInput.value.trim() && !isValidPhone(phoneInput.value.trim())) {
          showError(phoneInput, 'phoneError', 'Please enter a valid phone number');
          isValid = false;
      }
      
      // Message validation (required, at least 10 characters)
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
          showError(messageInput, 'messageError', 'Please enter your message (at least 10 characters)');
          isValid = false;
      }
      
      // If the form is valid, process it
      if (isValid) {
          // In a real project, you would send this data to a server or email service
          // For this static example, we'll just show a success message
          
          // Simulate form submission with a short delay
          submitForm(contactForm);
      }
  });
  
  // Function to show error message
  function showError(inputElement, errorId, message) {
      const errorElement = document.getElementById(errorId);
      errorElement.textContent = message;
      errorElement.style.display = 'block';
      inputElement.classList.add('error');
      
      // Add event listener to clear error on input
      inputElement.addEventListener('input', function() {
          errorElement.style.display = 'none';
          inputElement.classList.remove('error');
      }, { once: true });
  }
  
  // Function to reset all error messages
  function resetErrorMessages() {
      const errorMessages = document.querySelectorAll('.error-message');
      const inputs = contactForm.querySelectorAll('input, textarea');
      
      errorMessages.forEach(error => {
          error.style.display = 'none';
      });
      
      inputs.forEach(input => {
          input.classList.remove('error');
      });
      
      formStatus.textContent = '';
      formStatus.className = 'form-status';
  }
  
  // Function to validate email
  function isValidEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }
  
  // Function to validate phone
  function isValidPhone(phone) {
      // Allow formats like: (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890
      const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      return re.test(phone);
  }
  
  // Function to simulate form submission
  function submitForm(form) {
      // Show loading state
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      // Simulate server delay
      setTimeout(function() {
          // Show success message
          formStatus.textContent = 'Thank you! Your message has been sent successfully.';
          formStatus.className = 'form-status success';
          
          // Reset form
          form.reset();
          
          // Reset button
          submitButton.disabled = false;
          submitButton.textContent = originalText;
          
          // Remove success message after 5 seconds
          setTimeout(function() {
              formStatus.className = 'form-status';
          }, 5000);
      }, 1500);
  }
}

/*
* Project Gallery Filtering
*/

document.addEventListener('DOMContentLoaded', function() {
  initializeProjectFilters();
});

function initializeProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  
  if (!filterButtons.length || !projectItems.length) return;
  
  // Add click event to each filter button
  filterButtons.forEach(button => {
      button.addEventListener('click', function() {
          // Get filter value
          const filterValue = this.getAttribute('data-filter');
          
          // Update active button
          filterButtons.forEach(btn => {
              btn.classList.remove('active');
          });
          this.classList.add('active');
          
          // Filter projects
          filterProjects(filterValue, projectItems);
      });
  });
  
  // Initialize with "all" projects visible
  filterProjects('all', projectItems);
}

function filterProjects(filterValue, projects) {
  projects.forEach(project => {
      // Get project category
      const projectCategory = project.getAttribute('data-category');
      
      // Apply filtering
      if (filterValue === 'all' || filterValue === projectCategory) {
          // Show project with animation
          project.style.display = 'block';
          
          // Apply fade-in animation
          setTimeout(() => {
              project.style.opacity = '1';
              project.style.transform = 'translateY(0)';
          }, 50);
      } else {
          // Hide project with animation
          project.style.opacity = '0';
          project.style.transform = 'translateY(20px)';
          
          // Remove from DOM after animation completes
          setTimeout(() => {
              project.style.display = 'none';
          }, 300);
      }
  });
}

/*
* Testimonial Slider JavaScript
*/

document.addEventListener('DOMContentLoaded', function() {
  initializeTestimonialSlider();
});

function initializeTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (!slides.length) return;
  
  let currentSlide = 0;
  let slideInterval;
  const autoSlideDelay = 5000; // 5 seconds
  
  // Start auto-sliding
  startAutoSlide();
  
  // Initialize slider positions
  updateSlider();
  
  // Previous button click
  prevBtn.addEventListener('click', function() {
      currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
      updateSlider();
      resetAutoSlide();
  });
  
  // Next button click
  nextBtn.addEventListener('click', function() {
      currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
      updateSlider();
      resetAutoSlide();
  });
  
  // Dot navigation
  dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
          currentSlide = index;
          updateSlider();
          resetAutoSlide();
      });
  });
  
  // Pause auto-sliding on hover
  const sliderContainer = document.querySelector('.testimonial-slider');
  sliderContainer.addEventListener('mouseenter', function() {
      clearInterval(slideInterval);
  });
  
  sliderContainer.addEventListener('mouseleave', function() {
      startAutoSlide();
  });
  
  // Touch events for mobile swipe
  let touchStartX = 0;
  let touchEndX = 0;
  
  const sliderElement = document.querySelector('.slider-container');
  
  sliderElement.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  sliderElement.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
      // If swipe distance is significant enough (more than 50px)
      if (touchStartX - touchEndX > 50) {
          // Swiped left, go to next slide
          currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
          updateSlider();
          resetAutoSlide();
      }
      
      if (touchEndX - touchStartX > 50) {
          // Swiped right, go to previous slide
          currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
          updateSlider();
          resetAutoSlide();
      }
  }
  
  function updateSlider() {
      // Update slides
      slides.forEach(slide => {
          slide.classList.remove('active');
      });
      slides[currentSlide].classList.add('active');
      
      // Update dots
      dots.forEach(dot => {
          dot.classList.remove('active');
      });
      dots[currentSlide].classList.add('active');
  }
  
  function startAutoSlide() {
      slideInterval = setInterval(function() {
          currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
          updateSlider();
      }, autoSlideDelay);
  }
  
  function resetAutoSlide() {
      clearInterval(slideInterval);
      startAutoSlide();
  }
}