// Top message

const marqueeContent = document.querySelector('.marquee-content');
const clonedMarquee = marqueeContent.cloneNode(true);
marqueeContent.parentElement.appendChild(clonedMarquee);

// rainbow text shadow array

const colors = ["#FFF100", "#31D2F7", "#F394BE"];
const headings = document.querySelectorAll(".rainbow-text-shadow");

for (let heading of headings) {
  const text = heading.textContent;
  heading.innerHTML = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const color = colors[i % colors.length];
    const p = document.createElement("p");

    p.style.display = "inline-block";
    p.style.margin = 0;
    p.style.padding = 0;
    p.style.textShadow = `2px 2px ${color}`;

    if (char === " ") {
      p.innerHTML = "&nbsp;";
    } else {
      p.textContent = char;
    }

    heading.appendChild(p);
  }
}

// make slides wooosh!

// 1) Reference to slider container
const slider = document.getElementById("slider");

// 2) image count in "images/elli-art"
const totalImages = 117; 
// (Change to however many Elli-img (x).jpg files)

// 3) Dynamically create .slide elements and append them
for (let i = 1; i <= totalImages; i++) {

  const slideDiv = document.createElement("div");
  slideDiv.classList.add("slide");

  const img = document.createElement("img");
  img.src = `images/elli-art/Elli-img (${i}).jpg`;
  img.alt = `Slide ${i}`;

  // Put img inside the slide
  slideDiv.appendChild(img);

  // Add slide to the slider container
  slider.appendChild(slideDiv);
}

const pagination = document.getElementById("pagination");
if (pagination) {
  pagination.textContent = `1 of ${totalImages}`;
}

//slider function

const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

let currentIndex = 0;

let startX = 0;
let currentX = 0;
let isDragging = false;
let animationFrameId = 0;

const SWIPE_THRESHOLD = 50;

function updatePagination() {
  pagination.textContent = `${currentIndex + 1} of ${totalSlides}`;
}

function goToSlide(index) {
  // Keep index within valid range
  currentIndex = (index + totalSlides) % totalSlides;
  // Calculate translateX
  const offset = -currentIndex * 100;
  slider.style.transition = "transform 0.4s ease-in-out";
  slider.style.transform = `translateX(${offset}%)`;

  updatePagination();
}

// Initialize
updatePagination();
goToSlide(currentIndex);

/* -------------------------------
   Real-time dragging (lock & snap)
--------------------------------*/
function onDragStart(e) {
  isDragging = true;
  startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
  currentX = startX;

  // Disable transition during drag
  slider.style.transition = "none";
  
  // Cancel any in-progress animation
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
}

function onDragMove(e) {
  if (!isDragging) return;
  currentX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
  
  // Distance dragged
  const diff = currentX - startX;
  
  const translatePercentage = (-currentIndex * 100) + (diff / slider.offsetWidth * 100);

  // Apply transform in real-time
  slider.style.transform = `translateX(${translatePercentage}%)`;
}

function onDragEnd(e) {
  if (!isDragging) return;
  isDragging = false;

  const diff = currentX - startX;

  // Snap to next/previous if beyond threshold
  if (Math.abs(diff) > SWIPE_THRESHOLD) {
    if (diff < 0) {
      // Swiped left -> next slide
      goToSlide(currentIndex + 1);
    } else {
      // Swiped right -> previous slide
      goToSlide(currentIndex - 1);
    }
  } else {
    // Snap back to current slide
    goToSlide(currentIndex);
  }
}

// Mouse events
slider.addEventListener("mousedown", onDragStart);
slider.addEventListener("mousemove", onDragMove);
slider.addEventListener("mouseup", onDragEnd);
slider.addEventListener("mouseleave", onDragEnd);

// Touch events
slider.addEventListener("touchstart", onDragStart);
slider.addEventListener("touchmove", onDragMove);
slider.addEventListener("touchend", onDragEnd);