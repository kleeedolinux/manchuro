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