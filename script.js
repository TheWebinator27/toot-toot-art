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

// Music

const audio = document.createElement('audio');
audio.src = 'music/All The Time Go.mp3'; 

const record = document.getElementById('record');
const clickPrompt = document.querySelector('.click-prompt');
let isPlaying = false;

audio.addEventListener('ended', () => {
  audio.currentTime = 0;
  audio.play();
});

record.addEventListener('click', () => {

  clickPrompt.style.display = "none";

  if (isPlaying) {
    audio.pause();
    record.style.animationPlayState = 'paused';
  } else {
    audio.play();
    record.style.animation = 'recordRotate 6s linear infinite';
  }
  isPlaying = !isPlaying; 
});

// Slider

const slider = document.getElementById('slider');
let isDown = false;
let startX;
let scrollLeft;

// Enable smooth drag-to-scroll for mobile and desktop
slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  e.preventDefault(); // Prevent default dragging behavior
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5; // Adjust scroll sensitivity
  slider.scrollLeft = scrollLeft - walk;
});