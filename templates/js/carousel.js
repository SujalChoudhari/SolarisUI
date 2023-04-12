// // Get the DOM elements
// const carousel = document.querySelector('#solaris-template-carousel');
// const slides = Array.from(carousel.children);


// // Define the carousel settings
// const settings = {
//   // Set the speed of the animation in milliseconds
//   speed: 500,
//   // Set the time between slide transitions in milliseconds
//   timeout: 3000,
//   // Set whether the carousel should automatically cycle
//   autoplay: true,
//   // Set whether the carousel should pause on hover
//   hoverpause: true,
//   // Set the initial slide index
//   startslide: 0,
//   // Set the class name of the active slide
//   activeclass: 'active',
//   // Set the class name of the previous slide
//   prevclass: 'prev',
//   // Set the class name of the next slide
//   nextclass: 'next'
// };

// let currentIndex = settings.startslide;
// let intervalId;

// // Add the active class to the initial slide
// slides[currentIndex].classList.add(settings.activeclass);

// // Define a function to move to the next slide
// function nextSlide() {
//   // Find the active slide and remove the active class
//   const activeSlide = slides[currentIndex];
//   activeSlide.classList.remove(settings.activeclass);

//   // Find the next slide index and add the active class
//   currentIndex = (currentIndex + 1) % slides.length;
//   const nextSlide = slides[currentIndex];
//   nextSlide.classList.add(settings.activeclass);
//   nextSlide.classList.add(settings.nextclass);

//   // Animate the slides
//   activeSlide.style.left = '-100%';
//   nextSlide.style.left = '0';
//   setTimeout(() => {
//     activeSlide.classList.remove(settings.prevclass);
//     nextSlide.classList.remove(settings.nextclass);
//     activeSlide.style.left = '';
//     nextSlide.style.left = '';
//   }, settings.speed);
// }

// // Define a function to move to the previous slide
// function prevSlide() {
//   // Find the active slide and remove the active class
//   const activeSlide = slides[currentIndex];
//   activeSlide.classList.remove(settings.activeclass);

//   // Find the previous slide index and add the active class
//   currentIndex = (currentIndex - 1 + slides.length) % slides.length;
//   const prevSlide = slides[currentIndex];
//   prevSlide.classList.add(settings.activeclass);
//   prevSlide.classList.add(settings.prevclass);

//   // Animate the slides
//   activeSlide.style.left = '100%';
//   prevSlide.style.left = '0';
//   setTimeout(() => {
//     activeSlide.classList.remove(settings.prevclass);
//     prevSlide.classList.remove(settings.nextclass);
//     activeSlide.style.left = '';
//     prevSlide.style.left = '';
//   }, settings.speed);
// }

// // Start the carousel autoplay
// if (settings.autoplay) {
//   intervalId = setInterval(nextSlide, settings.timeout);
// }

// // Pause the carousel on hover
// if (settings.hoverpause) {
//   carousel.addEventListener('mouseover', () => clearInterval(intervalId));
//   carousel.addEventListener('mouseleave', () => intervalId = setInterval(nextSlide, settings.timeout));
// }

// // Find the prev and next buttons and add click event listeners
// const prevButton = document.querySelector('.absolute.left-0');
// const nextButton = document.querySelector('#next');
// prevButton.addEventListener('click', prevSlide);
// nextButton.addEventListener('click', nextSlide);





const repeat = true;
const noArrows = false;
const noBullets = false;


const container = document.querySelector('.slider-container');
var slide = document.querySelectorAll('.slider-single');
var slideTotal = slide.length - 1;
var slideCurrent = -1;

function initBullets() {
    if (noBullets) {
        return;
    }
    const bulletContainer = document.createElement('div');
    bulletContainer.classList.add('bullet-container')
    slide.forEach((elem, i) => {
        const bullet = document.createElement('div');
        bullet.classList.add('bullet')
        bullet.id = `bullet-index-${i}`
        bullet.addEventListener('click', () => {
            goToIndexSlide(i);
        })
        bulletContainer.appendChild(bullet);
        elem.classList.add('proactivede');
    })
    container.appendChild(bulletContainer);
}

function initArrows() {
    if (noArrows) {
        return;
    }
    const leftArrow = document.createElement('a')
    leftArrow.innerText = "⬅️"
    leftArrow.classList.add('slider-left')
    leftArrow.style.cursor = "pointer"
    leftArrow.addEventListener('click', () => {
        slideLeft();
    })
    const rightArrow = document.createElement('a')
    rightArrow.innerText = "➡️"
    rightArrow.classList.add('slider-right')
    rightArrow.style.cursor = "pointer"
    rightArrow.addEventListener('click', () => {
        slideRight();
    })
    container.appendChild(leftArrow);
    container.appendChild(rightArrow);
}

function slideInitial() {
    initBullets();
    initArrows();
    setTimeout(function () {
        slideRight();
    }, 500);
}

function updateBullet() {
    if (!noBullets) {
        document.querySelector('.bullet-container').querySelectorAll('.bullet').forEach((elem, i) => {
            elem.classList.remove('active');
            if (i === slideCurrent) {
                elem.classList.add('active');
            }
        })
    }
    checkRepeat();
}

function checkRepeat() {
    if (!repeat) {
        if (slideCurrent === slide.length - 1) {
            slide[0].classList.add('not-visible');
            slide[slide.length - 1].classList.remove('not-visible');
            if (!noArrows) {
                document.querySelector('.slider-right').classList.add('not-visible')
                document.querySelector('.slider-left').classList.remove('not-visible')
            }
        }
        else if (slideCurrent === 0) {
            slide[slide.length - 1].classList.add('not-visible');
            slide[0].classList.remove('not-visible');
            if (!noArrows) {
                document.querySelector('.slider-left').classList.add('not-visible')
                document.querySelector('.slider-right').classList.remove('not-visible')
            }
        } else {
            slide[slide.length - 1].classList.remove('not-visible');
            slide[0].classList.remove('not-visible');
            if (!noArrows) {
                document.querySelector('.slider-left').classList.remove('not-visible')
                document.querySelector('.slider-right').classList.remove('not-visible')
            }
        }
    }
}

function slideRight() {
    if (slideCurrent < slideTotal) {
        slideCurrent++;
    } else {
        slideCurrent = 0;
    }

    if (slideCurrent > 0) {
        var preactiveSlide = slide[slideCurrent - 1];
    } else {
        var preactiveSlide = slide[slideTotal];
    }
    var activeSlide = slide[slideCurrent];
    if (slideCurrent < slideTotal) {
        var proactiveSlide = slide[slideCurrent + 1];
    } else {
        var proactiveSlide = slide[0];

    }

    slide.forEach((elem) => {
        var thisSlide = elem;
        if (thisSlide.classList.contains('preactivede')) {
            thisSlide.classList.remove('preactivede');
            thisSlide.classList.remove('preactive');
            thisSlide.classList.remove('active');
            thisSlide.classList.remove('proactive');
            thisSlide.classList.add('proactivede');
        }
        if (thisSlide.classList.contains('preactive')) {
            thisSlide.classList.remove('preactive');
            thisSlide.classList.remove('active');
            thisSlide.classList.remove('proactive');
            thisSlide.classList.remove('proactivede');
            thisSlide.classList.add('preactivede');
        }
    });
    preactiveSlide.classList.remove('preactivede');
    preactiveSlide.classList.remove('active');
    preactiveSlide.classList.remove('proactive');
    preactiveSlide.classList.remove('proactivede');
    preactiveSlide.classList.add('preactive');

    activeSlide.classList.remove('preactivede');
    activeSlide.classList.remove('preactive');
    activeSlide.classList.remove('proactive');
    activeSlide.classList.remove('proactivede');
    activeSlide.classList.add('active');

    proactiveSlide.classList.remove('preactivede');
    proactiveSlide.classList.remove('preactive');
    proactiveSlide.classList.remove('active');
    proactiveSlide.classList.remove('proactivede');
    proactiveSlide.classList.add('proactive');

    updateBullet();
}

function slideLeft() {
    if (slideCurrent > 0) {
        slideCurrent--;
    } else {
        slideCurrent = slideTotal;
    }

    if (slideCurrent < slideTotal) {
        var proactiveSlide = slide[slideCurrent + 1];
    } else {
        var proactiveSlide = slide[0];
    }
    var activeSlide = slide[slideCurrent];
    if (slideCurrent > 0) {
        var preactiveSlide = slide[slideCurrent - 1];
    } else {
        var preactiveSlide = slide[slideTotal];
    }
    slide.forEach((elem) => {
        var thisSlide = elem;
        if (thisSlide.classList.contains('proactive')) {
            thisSlide.classList.remove('preactivede');
            thisSlide.classList.remove('preactive');
            thisSlide.classList.remove('active');
            thisSlide.classList.remove('proactive');
            thisSlide.classList.add('proactivede');
        }
        if (thisSlide.classList.contains('proactivede')) {
            thisSlide.classList.remove('preactive');
            thisSlide.classList.remove('active');
            thisSlide.classList.remove('proactive');
            thisSlide.classList.remove('proactivede');
            thisSlide.classList.add('preactivede');
        }
    });

    preactiveSlide.classList.remove('preactivede');
    preactiveSlide.classList.remove('active');
    preactiveSlide.classList.remove('proactive');
    preactiveSlide.classList.remove('proactivede');
    preactiveSlide.classList.add('preactive');

    activeSlide.classList.remove('preactivede');
    activeSlide.classList.remove('preactive');
    activeSlide.classList.remove('proactive');
    activeSlide.classList.remove('proactivede');
    activeSlide.classList.add('active');

    proactiveSlide.classList.remove('preactivede');
    proactiveSlide.classList.remove('preactive');
    proactiveSlide.classList.remove('active');
    proactiveSlide.classList.remove('proactivede');
    proactiveSlide.classList.add('proactive');

    updateBullet();
}

function goToIndexSlide(index) {
    const sliding = (slideCurrent > index) ? () => slideRight() : () => slideLeft();
    while (slideCurrent !== index) {
        sliding();
    }
}

slideInitial();