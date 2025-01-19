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

// Music

document.addEventListener("DOMContentLoaded", () => {
  const audioElement = document.getElementById("current-audio");
  const audioSource = audioElement.querySelector("source");
  const songs = document.querySelectorAll(".song");
  const record = document.getElementById("record");
  const clickPrompt = document.querySelector(".click-prompt");
  let currentlyPlayingSong = null;

  // song selection
  songs.forEach(song => {
    song.addEventListener("click", () => {
      const newAudioSrc = song.getAttribute("data-audio-src");
      const newImageSrc = song.querySelector("img").src;

      // Check if a new song is selected
      if (audioSource.src !== window.location.origin + "/" + newAudioSrc) {
        // Reset animation for all song images
        songs.forEach(s => {
          s.classList.remove("song-selected");
          const img = s.querySelector("img");
          if (img) {
            img.style.animation = ""; // Reset animation
          }
        });

        // Add 'song-selected' to the clicked song
        song.classList.add("song-selected");

        // Update the audio source and play the new song
        audioSource.src = newAudioSrc;
        audioElement.load();
        audioElement.play();

        // Reset and sync the record position with the new song image
        record.src = newImageSrc;
        record.style.animation = ""; // Reset animation first
        setTimeout(() => {
          record.style.animation = "recordRotate 6s linear infinite";
        }, 10);

        // Apply rotation animation to the new song's image
        const currentSongImage = song.querySelector("img");
        if (currentSongImage) {
          currentSongImage.style.animation = "recordRotate 6s linear infinite";
        }

        // Update currently playing song reference
        currentlyPlayingSong = song;

        // Hide click prompt if visible
        if (clickPrompt) {
          clickPrompt.style.display = "none";
        }
      }
    });
  });

  //pause functionality
  audioElement.addEventListener("pause", () => {
    if (currentlyPlayingSong) {
      record.style.animationPlayState = "paused"; // Pause record rotation
      const currentSongImage = currentlyPlayingSong.querySelector("img");
      if (currentSongImage) {
        currentSongImage.style.animationPlayState = "paused"; // Pause song image rotation
      }
    }
  });

  // play functionality
  audioElement.addEventListener("play", () => {
    if (currentlyPlayingSong) {
      record.style.animationPlayState = "running"; // Resume record rotation
      const currentSongImage = currentlyPlayingSong.querySelector("img");
      if (currentSongImage) {
        currentSongImage.style.animationPlayState = "running"; // Resume song image rotation
      }
    }
  });

  // ended functionality
  audioElement.addEventListener("ended", () => {
    if (currentlyPlayingSong) {
      const currentSongImage = currentlyPlayingSong.querySelector("img");
      if (currentSongImage) {
        currentSongImage.style.animationPlayState = "paused"; // Stop song image rotation
      }
    }
    record.style.animationPlayState = "paused"; // Stop record rotation
  });

  // click prompt
  record.addEventListener("click", () => {
    if (clickPrompt) {
      clickPrompt.style.display = "none";
    }
  });
});

