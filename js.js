// Slideshow functionality
class Slideshow {
  constructor(container) {
    this.container = container;
    this.slides = container.getElementsByClassName("slide");
    this.index = 0;
    
    // Create slide indicators
    this.createIndicators();
    
    this.showSlide(this.index);

    const prev = container.querySelector(".prev");
    const next = container.querySelector(".next");
    if (prev) prev.addEventListener("click", () => this.plusSlide(-1));
    if (next) next.addEventListener("click", () => this.plusSlide(1));

    this.autoplayInterval = setInterval(() => this.plusSlide(1), 5000);
  }

  createIndicators() {
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'slide-indicators';
    
    for (let i = 0; i < this.slides.length; i++) {
      const indicator = document.createElement('div');
      indicator.className = 'slide-indicator';
      if (i === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => {
        this.goToSlide(i);
        // Reset autoplay timer
        clearInterval(this.autoplayInterval);
        this.autoplayInterval = setInterval(() => this.plusSlide(1), 5000);
      });
      indicatorsContainer.appendChild(indicator);
    }
    
    this.container.appendChild(indicatorsContainer);
    this.indicators = indicatorsContainer.getElementsByClassName('slide-indicator');
  }

  plusSlide(n) {
    this.index = (this.index + n + this.slides.length) % this.slides.length;
    this.showSlide(this.index);
  }
  
  goToSlide(n) {
    this.index = n;
    this.showSlide(this.index);
  }

  showSlide(n) {
    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].classList.remove("active");
      if (this.indicators && this.indicators[i]) {
        this.indicators[i].classList.remove("active");
      }
    }
    this.slides[n].classList.add("active");
    if (this.indicators && this.indicators[n]) {
      this.indicators[n].classList.add("active");
    }
  }
}

document.querySelectorAll('.slideshow-container').forEach(container => {
  new Slideshow(container);
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all about sections and bot cards
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.about, .bots, .content-box');
  fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Back to top button
  const backToTop = document.createElement('div');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '↑';
  backToTop.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTop);

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Show/hide back to top button
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
});