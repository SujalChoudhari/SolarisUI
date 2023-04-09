// Get the DOM elements
const carousel = document.querySelector('.flex');
const slides = Array.from(carousel.children);

// Define the carousel settings
const settings = {
  // Set the speed of the animation in milliseconds
  speed: 500,
  // Set the time between slide transitions in milliseconds
  timeout: 3000,
  // Set whether the carousel should automatically cycle
  autoplay: true,
  // Set whether the carousel should pause on hover
  hoverpause: true,
  // Set the initial slide index
  startslide: 0,
  // Set the class name of the active slide
  activeclass: 'active',
  // Set the class name of the previous slide
  prevclass: 'prev',
  // Set the class name of the next slide
  nextclass: 'next'
};

let currentIndex = settings.startslide;
let intervalId;

// Add the active class to the initial slide
slides[currentIndex].classList.add(settings.activeclass);

// Define a function to move to the next slide
function nextSlide() {
  // Find the active slide and remove the active class
  const activeSlide = slides[currentIndex];
  activeSlide.classList.remove(settings.activeclass);

  // Find the next slide index and add the active class
  currentIndex = (currentIndex + 1) % slides.length;
  const nextSlide = slides[currentIndex];
  nextSlide.classList.add(settings.activeclass);
  nextSlide.classList.add(settings.nextclass);

  // Animate the slides
  activeSlide.style.left = '-100%';
  nextSlide.style.left = '0';
  setTimeout(() => {
    activeSlide.classList.remove(settings.prevclass);
    nextSlide.classList.remove(settings.nextclass);
    activeSlide.style.left = '';
    nextSlide.style.left = '';
  }, settings.speed);
}

// Define a function to move to the previous slide
function prevSlide() {
  // Find the active slide and remove the active class
  const activeSlide = slides[currentIndex];
  activeSlide.classList.remove(settings.activeclass);

  // Find the previous slide index and add the active class
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  const prevSlide = slides[currentIndex];
  prevSlide.classList.add(settings.activeclass);
  prevSlide.classList.add(settings.prevclass);

  // Animate the slides
  activeSlide.style.left = '100%';
  prevSlide.style.left = '0';
  setTimeout(() => {
    activeSlide.classList.remove(settings.prevclass);
    prevSlide.classList.remove(settings.nextclass);
    activeSlide.style.left = '';
    prevSlide.style.left = '';
  }, settings.speed);
}

// Start the carousel autoplay
if (settings.autoplay) {
  intervalId = setInterval(nextSlide, settings.timeout);
}

// Pause the carousel on hover
if (settings.hoverpause) {
  carousel.addEventListener('mouseover', () => clearInterval(intervalId));
  carousel.addEventListener('mouseleave', () => intervalId = setInterval(nextSlide, settings.timeout));
}

// Find the prev and next buttons and add click event listeners
const prevButton = document.querySelector('.absolute.left-0');
const nextButton = document.querySelector('#next');
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);
