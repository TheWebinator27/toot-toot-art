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

// modal

const openSongControls = document.getElementById('record-container');
const closeModalBtn = document.getElementById('close-modal');
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modal-overlay');

openSongControls.addEventListener('click', () => {
  modal.classList.add('active');
  modalOverlay.classList.add('active');
});

closeModalBtn.addEventListener('click', () => {
  modal.classList.remove('active');
  modalOverlay.classList.remove('active');
});

modalOverlay.addEventListener('click', () => {
  modal.classList.remove('active');
  modalOverlay.classList.remove('active');
});

//songs

document.addEventListener("DOMContentLoaded", () => {
  const audioElement = document.getElementById("current-audio");
  const audioSource = audioElement.querySelector("source");
  const songs = document.querySelectorAll(".song");

  songs.forEach(song => {
      song.addEventListener("click", () => {
          // Remove the 'song-selected' class from all songs
          songs.forEach(s => s.classList.remove("song-selected"));

          // Add the 'song-selected' class to the clicked song
          song.classList.add("song-selected");

          // Get the new audio source
          const newAudioSrc = song.getAttribute("data-audio-src");

          // Check if the new source is different from the current source
          if (audioSource.src !== window.location.origin + "/" + newAudioSrc) {
              audioSource.src = newAudioSrc; // Update the source
              audioElement.load();          // Reload the audio element
              audioElement.play();          // Play the new song
          }
      });
  });
});

// Music

document.addEventListener("DOMContentLoaded", () => {
  const record = document.getElementById('record');
  const clickPrompt = document.querySelector('.click-prompt');
  const audioElement = document.getElementById('current-audio');

  if (clickPrompt) {
    clickPrompt.style.display = "block";
  }

  record.addEventListener('click', () => {
    if (clickPrompt) {
      clickPrompt.style.display = "none";
    }
  });

  audioElement.addEventListener('play', () => {
    record.style.animation = 'recordRotate 6s linear infinite';
    record.style.animationPlayState = 'running';
  });

  audioElement.addEventListener('pause', () => {
    record.style.animationPlayState = 'paused';
  });

  audioElement.addEventListener('ended', () => {
    record.style.animationPlayState = 'paused';
  });
});