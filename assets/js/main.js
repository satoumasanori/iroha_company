const wrapper = document.getElementById('sliderWrapper');
const totalSlides = 6;
const visibleSlides = 2;
const clones = visibleSlides;

const slideWidth = 100 / visibleSlides;


let currentIndex = clones; // Start at real first slide
const totalItems = totalSlides + clones * 2;

function updatePosition() {
  wrapper.style.transform = `translateX(-${slideWidth * currentIndex + 24.5}%)`;
}

function slideRight() {
  // if (currentIndex >= totalItems - clones) return;
  currentIndex++;
  wrapper.style.transition = 'transform 0.4s ease-in-out';
  updatePosition();

  if (currentIndex === totalItems - clones) {
    setTimeout(() => {
      wrapper.style.transition = 'none';
      currentIndex = clones;
      updatePosition();
    }, 400);
  }
}

function slideLeft() {
  // if (currentIndex <= 0) return;
  currentIndex--;
  wrapper.style.transition = 'transform 0.4s ease-in-out';
  updatePosition();

  if (currentIndex === 0) {
    setTimeout(() => {
      wrapper.style.transition = 'none';
      currentIndex = totalSlides;
      updatePosition();
    }, 400);
  }
}

// Initial position
updatePosition();

// sp slide

const track = document.getElementById('sliderTrack');
const spTotalSldes = 6;

let index = 1; 
let isAnimating = false;

function spUpdatePosition(useTransition = true) {
  track.style.transition = useTransition ? 'transform 0.4s ease' : 'none';
  track.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
  if (isAnimating) return;
  isAnimating = true;
  index++;
  spUpdatePosition(true);

  if (index === spTotalSldes + 1) {
    setTimeout(() => {
      index = 1; 
      spUpdatePosition(false);
      isAnimating = false;
    }, 400);
  } else {
    setTimeout(() => (isAnimating = false), 400);
  }
}

function prevSlide() {
  if (isAnimating) return;
  isAnimating = true;
  index--;
  spUpdatePosition(true);

  if (index === 0) {
    setTimeout(() => {
      index = spTotalSldes; 
      spUpdatePosition(false);
      isAnimating = false;
    }, 400);
  } else {
    setTimeout(() => (isAnimating = false), 400);
  }
}

// Initialize position
spUpdatePosition(false);

//service automtic slide

const slider = document.querySelector('.service-slider');
const slideTrack = document.querySelector('.service-slide-track');
const slides = document.querySelectorAll('.service-slide-ele');
const serviceSlideWidth = slides[0].offsetWidth;
let isDown = false;
let startX;
let scrollLeft;

// Clone the first and last slides and add them to the slide track
slideTrack.appendChild(slides[0].cloneNode(true));
slideTrack.insertBefore(slides[slides.length - 1].cloneNode(true), slides[0]);

// Mouse event listeners
slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
  // Snap to the nearest slide when the mouse button is released
  const currentSlide = Math.round(slider.scrollLeft / serviceSlideWidth);
  const targetSlide = currentSlide * serviceSlideWidth;
  slider.scrollTo({
    left: targetSlide,
    behavior: 'smooth'
  });
});

// Service section slider functionality
const serviceSlider = document.querySelector('.service-slider');
const serviceSlideTrack = document.querySelector('.service-slide-track');
const serviceSlides = document.querySelectorAll('.service-slide-ele');
let isServiceDragging = false;
let serviceStartX;
let serviceScrollLeft;
let animationPaused = false;
let currentSlide = 0;

// Clone first and last slides for infinite loop
const firstSlide = serviceSlides[0].cloneNode(true);
const lastSlide = serviceSlides[serviceSlides.length - 1].cloneNode(true);
serviceSlideTrack.appendChild(firstSlide);
serviceSlideTrack.insertBefore(lastSlide, serviceSlides[0]);

// Mouse events
serviceSlider.addEventListener('mousedown', (e) => {
  isServiceDragging = true;
  serviceSlider.style.cursor = 'grabbing';
  serviceStartX = e.pageX - serviceSlider.offsetLeft;
  serviceScrollLeft = serviceSlider.scrollLeft;
  pauseAnimation();
});

serviceSlider.addEventListener('mousemove', (e) => {
  if (!isServiceDragging) return;
  e.preventDefault();
  const x = e.pageX - serviceSlider.offsetLeft;
  const walk = (x - serviceStartX) * 2;
  const slideWidth = serviceSlides[0].offsetWidth;
  
  // Calculate target position
  const targetPosition = serviceScrollLeft - walk;
  const targetSlide = Math.round(targetPosition / slideWidth);
  
  // Only move if we're targeting a different slide
  if (targetSlide !== currentSlide) {
    currentSlide = targetSlide;
    serviceSlider.scrollTo({
      left: currentSlide * slideWidth,
      behavior: 'smooth'
    });
  }
});

serviceSlider.addEventListener('mouseup', () => {
  isServiceDragging = false;
  serviceSlider.style.cursor = 'grab';
  resumeAnimation();
  checkAndResetPosition();
});

serviceSlider.addEventListener('mouseleave', () => {
  if (isServiceDragging) {
    isServiceDragging = false;
    serviceSlider.style.cursor = 'grab';
    resumeAnimation();
    checkAndResetPosition();
  }
});

// Touch events
serviceSlider.addEventListener('touchstart', (e) => {
  isServiceDragging = true;
  serviceStartX = e.touches[0].clientX - serviceSlider.offsetLeft;
  serviceScrollLeft = serviceSlider.scrollLeft;
  pauseAnimation();
});

serviceSlider.addEventListener('touchmove', (e) => {
  if (!isServiceDragging) return;
  e.preventDefault();
  const x = e.touches[0].clientX - serviceSlider.offsetLeft;
  const walk = (x - serviceStartX) * 2;
  const slideWidth = serviceSlides[0].offsetWidth;
  
  // Calculate target position
  const targetPosition = serviceScrollLeft - walk;
  const targetSlide = Math.round(targetPosition / slideWidth);
  
  // Only move if we're targeting a different slide
  if (targetSlide !== currentSlide) {
    currentSlide = targetSlide;
    serviceSlider.scrollTo({
      left: currentSlide * slideWidth,
      behavior: 'smooth'
    });
  }
});

serviceSlider.addEventListener('touchend', () => {
  isServiceDragging = false;
  resumeAnimation();
  checkAndResetPosition();
});

// Prevent default drag behavior
serviceSlider.addEventListener('dragstart', (e) => {
  e.preventDefault();
});

// Add grab cursor on hover
serviceSlider.addEventListener('mouseenter', () => {
  if (!isServiceDragging) {
    serviceSlider.style.cursor = 'grab';
  }
});

serviceSlider.addEventListener('mouseleave', () => {
  serviceSlider.style.cursor = 'default';
});

function pauseAnimation() {
  if (!animationPaused) {
    serviceSlideTrack.style.animationPlayState = 'paused';
    animationPaused = true;
  }
}

function resumeAnimation() {
  if (animationPaused) {
    serviceSlideTrack.style.animationPlayState = 'running';
    animationPaused = false;
  }
}

function checkAndResetPosition() {
  const slideWidth = serviceSlides[0].offsetWidth;
  const totalWidth = slideWidth * serviceSlides.length;
  
  // Check if we're at the cloned slides
  if (serviceSlider.scrollLeft <= 0) {
    // Reset to the last real slide
    serviceSlider.scrollLeft = totalWidth - slideWidth;
  } else if (serviceSlider.scrollLeft >= totalWidth) {
    // Reset to the first real slide
    serviceSlider.scrollLeft = slideWidth;
  }
}





