class Slideshow {
  constructor(container) {
    this.container = container;
    this.slides = container.getElementsByClassName("slide");
    this.index = 0;
    this.showSlide(this.index);

    const prev = container.querySelector(".prev");
    const next = container.querySelector(".next");
    if (prev) prev.addEventListener("click", () => this.plusSlide(-1));
    if (next) next.addEventListener("click", () => this.plusSlide(1));

    setInterval(() => this.plusSlide(1), 3000);
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
}

document.querySelectorAll('.slideshow-container').forEach(container => {
  new Slideshow(container);
});