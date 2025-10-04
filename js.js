class Slideshow {
  constructor(container) {
    this.container = container;
    this.slides = container.getElementsByClassName("slide");
    this.index = 0;
    this.timer = null;
    this.showSlide(this.index);

    const prev = container.querySelector(".prev");
    const next = container.querySelector(".next");
    if (prev) prev.addEventListener("click", () => this.plusSlide(-1));
    if (next) next.addEventListener("click", () => this.plusSlide(1));

    this.container.addEventListener('mouseenter', () => this.pause());
    this.container.addEventListener('mouseleave', () => this.resume());

    this.resume();
  }

  plusSlide(n) {
    this.index = (this.index + n + this.slides.length) % this.slides.length;
    this.showSlide(this.index);
  }

  showSlide(n) {
    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].classList.remove("active");
    }
    this.slides[n].classList.add("active");
  }

  pause() {
    clearInterval(this.timer);
  }

  resume() {
    this.timer = setInterval(() => this.plusSlide(1), 3000);
  }
}

document.querySelectorAll('.slideshow-container').forEach(container => {
  new Slideshow(container);
});


let backToTopButton = document.getElementById("backToTopBtn");

window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (backToTopButton) { 
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}