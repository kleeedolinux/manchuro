// Manchuro Climate Accord - Interactive Elements

$(document).ready(function() {
    // Initialize animations
    initAnimations();
    
    // Initialize climate clock
    initClimateCountdown();
    
    // Initialize parallax effect
    initParallax();
    
    // Add falling leaves animation
    createFallingLeaves();
    
    // Dynamic year update in footer
    updateCopyrightYear();
});

// Initialize all animations
function initAnimations() {
    // Initial animations on page load
    $('.animate-in').css('opacity', '1');
    
    // Animate elements when they come into view on scroll
    $(window).on('scroll', function() {
        $('.animate-in').each(function() {
            const elementTop = $(this).offset().top;
            const elementHeight = $(this).outerHeight();
            const windowHeight = $(window).height();
            const windowScrollTop = $(window).scrollTop();
            
            if (windowScrollTop > elementTop - windowHeight + elementHeight/2) {
                $(this).css('opacity', '1');
            }
        });
        
        // Add parallax effect to background blobs
        $('.blob').each(function() {
            const scrollPosition = $(window).scrollTop();
            const offsetFactor = $(this).data('parallax-speed') || 0.15;
            $(this).css('transform', `translateY(${scrollPosition * offsetFactor}px)`);
        });
    });
    
    // Smooth scroll for navigation
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = $($(this).attr('href'));
        
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 800, 'easeInOutQuad', function() {
                // Add a hash to URL (default click behavior)
                window.location.hash = $(this).attr('href');
            });
        }
    });
    
    // Add hover animations to cards
    $('.card-hover').hover(
        function() {
            $(this).find('.icon-container').addClass('animate-bounce');
        },
        function() {
            $(this).find('.icon-container').removeClass('animate-bounce');
        }
    );
    
    // Add custom animation for progress bars
    animateProgressBars();
}

// Initialize climate countdown clock
function initClimateCountdown() {
    const targetDate = new Date('2029-07-22T00:11:00Z');
    $('#target-date').text(targetDate.toISOString().split('T')[0]);
    
    // Update the countdown every second
    setInterval(function() {
        const now = new Date();
        const difference = targetDate - now;
        
        // Calculate years, days, hours, minutes, seconds
        const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
        const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Update the display
        $('#years').text(years);
        $('#days').text(days);
        $('#countdown-years').text(years);
        $('#countdown-days').text(days);
        
        // Animate the clock ring
        const totalDays = (years * 365) + days;
        const totalDaysToTarget = Math.floor((targetDate - new Date('2024-01-22')) / (1000 * 60 * 60 * 24));
        const yearsFraction = totalDays / totalDaysToTarget;
        const dashOffset = 283 * (1 - yearsFraction);
        
        $('.clock-ring').css('stroke-dashoffset', dashOffset);
        
        // Add pulse animation when seconds change
        if (seconds % 10 === 0) {
            $('.clock-container').addClass('pulse-element');
            setTimeout(function() {
                $('.clock-container').removeClass('pulse-element');
            }, 1000);
        }
        
        // Update remaining time calculation display
        const remainingText = `${years} years, ${days} days, ${hours}h ${minutes}m ${seconds}s`;
        $('#remaining-time').text(remainingText);
    }, 1000);
}

// Initialize parallax effect
function initParallax() {
    $(window).on('mousemove', function(e) {
        const mouseX = e.pageX;
        const mouseY = e.pageY;
        
        $('.parallax').each(function() {
            const speed = $(this).data('speed') || 0.05;
            const x = (window.innerWidth / 2 - mouseX) * speed;
            const y = (window.innerHeight / 2 - mouseY) * speed;
            
            $(this).css('transform', `translateX(${x}px) translateY(${y}px)`);
        });
    });
}

// Create animated falling leaves
function createFallingLeaves() {
    const container = $('header');
    const leafCount = 8;
    
    for (let i = 0; i < leafCount; i++) {
        const leaf = $('<div class="falling-leaf"></div>');
        const randomLeft = Math.random() * 100;
        const randomDelay = Math.random() * 10;
        const randomDuration = 10 + Math.random() * 20;
        
        leaf.css({
            left: `${randomLeft}%`,
            animationDelay: `${randomDelay}s`,
            animationDuration: `${randomDuration}s`
        });
        
        container.append(leaf);
    }
}

// Animate progress bars with counter
function animateProgressBars() {
    $('.progress-bar').each(function() {
        const bar = $(this);
        const target = parseInt(bar.data('target'));
        const duration = 1500;
        const counter = bar.find('.counter');
        
        $({ value: 0 }).animate({ value: target }, {
            duration: duration,
            step: function() {
                const value = Math.round(this.value);
                counter.text(value + '%');
                bar.css('width', value + '%');
            },
            complete: function() {
                counter.text(target + '%');
            }
        });
    });
}

// Update copyright year dynamically
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    $('.copyright-year').text(currentYear);
}

// Add jQuery easing for smoother animations
$.extend($.easing, {
    easeInOutQuad: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }
});

// Create a typing effect for the hero heading
function typeEffect(element, text, speed) {
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.text(element.text() + text.charAt(i));
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Handle form submission
$('#signup-form').on('submit', function(e) {
    e.preventDefault();
    
    // Simple validation
    const name = $('#name-input').val();
    const email = $('#email-input').val();
    
    if (name && email && email.includes('@')) {
        // Show success message
        $(this).slideUp();
        $('#success-message').fadeIn();
    } else {
        // Show error message
        $('#error-message').fadeIn().delay(3000).fadeOut();
    }
});

// Counter animation for statistics
$('.stat-counter').each(function() {
    const $this = $(this);
    const countTo = parseInt($this.text());
    
    $({ countNum: 0 }).animate({
        countNum: countTo
    }, {
        duration: 2000,
        easing: 'linear',
        step: function() {
            $this.text(Math.floor(this.countNum));
        },
        complete: function() {
            $this.text(this.countNum);
        }
    });
});

// Initialize AOS animation library
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  AOS.init({
    duration: 800,
    once: false,
    mirror: true,
    offset: 50
  });

  // Initialize counters for stats
  initCounters();
  
  // Initialize particles background
  createParticles();

  // Update countdown
  updateCountdown();

  // Initialize the scrolling animation observer
  initScrollObserver();
});

// Countdown timer functionality
function updateCountdown() {
  // Target date (2028-04-22)
  const targetDate = new Date('2028-04-22');
  const currentDate = new Date();
  
  // Calculate time remaining
  const totalSeconds = (targetDate - currentDate) / 1000;
  const days = Math.floor(totalSeconds / 3600 / 24);
  const years = Math.floor(days / 365);
  const remainingDays = days % 365;
  
  // Update the DOM
  const yearsDisplay = document.getElementById('years');
  const daysDisplay = document.getElementById('days');
  const countdownYears = document.getElementById('countdown-years');
  const countdownDays = document.getElementById('countdown-days');
  
  if (yearsDisplay) yearsDisplay.textContent = years;
  if (daysDisplay) daysDisplay.textContent = remainingDays;
  if (countdownYears) countdownYears.textContent = years;
  if (countdownDays) countdownDays.textContent = remainingDays;
  
  // Update countdown every day
  setTimeout(updateCountdown, 24 * 60 * 60 * 1000);
}

// Create the particle effect for the background
function createParticles() {
  const particlesContainer = document.querySelector('.particles-container');
  if (!particlesContainer) return;
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 5 + 2;
    
    particle.style.position = 'absolute';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = i % 2 === 0 ? '#3B82F6' : '#34D399';
    particle.style.borderRadius = '50%';
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.opacity = `${Math.random() * 0.5 + 0.1}`;
    particle.style.filter = 'blur(1px)';
    
    // Set animation properties
    particle.style.animation = `
      floatParticle ${Math.random() * 10 + 10}s infinite linear,
      pulsate ${Math.random() * 4 + 2}s infinite ease-in-out
    `;
    
    // Set animation delay
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    // Set transform origin
    particle.style.transformOrigin = 'center center';
    
    particlesContainer.appendChild(particle);
  }

  // Add CSS for the particle animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatParticle {
      0% { transform: translate(0, 0) rotate(0deg); }
      25% { transform: translate(${Math.random() * 100}px, ${Math.random() * 100}px) rotate(90deg); }
      50% { transform: translate(${Math.random() * -100}px, ${Math.random() * 100}px) rotate(180deg); }
      75% { transform: translate(${Math.random() * -100}px, ${Math.random() * -100}px) rotate(270deg); }
      100% { transform: translate(0, 0) rotate(360deg); }
    }
    
    @keyframes pulsate {
      0%, 100% { transform: scale(1); opacity: 0.5; }
      50% { transform: scale(1.2); opacity: 0.8; }
    }
  `;
  document.head.appendChild(style);
}

// Initialize counters and animated progress bars
function initCounters() {
  // Animate the progress bars
  const progressBars = document.querySelectorAll('.progress-bar');
  progressBars.forEach(bar => {
    const target = parseInt(bar.getAttribute('data-target') || '0');
    const counter = bar.querySelector('.counter');
    
    // Animate the width
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = `${target}%`;
    }, 500);
    
    // Animate the counter
    if (counter) {
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        counter.textContent = `${count}%`;
        if (count >= target) clearInterval(interval);
      }, 20);
    }
  });
  
  // Animate stat counters
  const statCounters = document.querySelectorAll('.stat-counter');
  statCounters.forEach(counter => {
    const target = parseInt(counter.textContent || '0');
    const duration = 2000; // 2 seconds
    const steps = 50;
    const stepTime = duration / steps;
    const increment = target / steps;
    
    let current = 0;
    let counterInterval = setInterval(() => {
      current += increment;
      if (current > target) current = target;
      counter.textContent = Math.floor(current);
      if (current >= target) clearInterval(counterInterval);
    }, stepTime);
  });
}

// Initialize scroll animation observer
function initScrollObserver() {
  // Get all sections
  const sections = document.querySelectorAll('section');
  
  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Add 'active' class when section is in viewport
      if (entry.isIntersecting) {
        entry.target.classList.add('section-active');
        
        // Refresh AOS animations when section becomes visible
        setTimeout(() => {
          AOS.refresh();
        }, 100);
      }
    });
  }, { threshold: 0.1 }); // Trigger when 10% of the section is visible
  
  // Observe all sections
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Update copyright year
  const copyrightYear = document.querySelector('.copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
}

// Dark mode toggle 
document.addEventListener('DOMContentLoaded', function() {
  // Check for dark mode preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedDarkMode = localStorage.getItem('darkMode');
  
  // If there's no saved preference, use system preference
  if (savedDarkMode === null) {
    localStorage.setItem('darkMode', prefersDark.toString());
    
    // Set initial state without Alpine.js (as a fallback)
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  } else if (savedDarkMode === 'true') {
    // Set initial state without Alpine.js (as a fallback)
    document.documentElement.classList.add('dark');
  }
  
  // Handle dark mode toggle when Alpine.js isn't loaded yet
  const darkModeToggle = document.querySelector('[aria-label="Toggle dark mode"]');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      }
    });
  }
});

// Alpine.js initialization
document.addEventListener('alpine:init', () => {
  // Initialize dark mode if Alpine.js is available
  Alpine.data('darkModeData', () => ({
    darkMode: localStorage.getItem('darkMode') === 'true',
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      localStorage.setItem('darkMode', this.darkMode);
      document.documentElement.classList.toggle('dark', this.darkMode);
    }
  }));
}); 