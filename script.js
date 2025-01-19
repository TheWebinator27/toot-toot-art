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

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");

  // Add the 'ready' class to make the modal render properly
  requestAnimationFrame(() => {
    modal.classList.add("ready");
  });

  const openSongControls = document.getElementById("record-container");
  const closeModalBtn = document.getElementById("close-modal");
  const modalOverlay = document.getElementById("modal-overlay");

  // Open modal
  openSongControls.addEventListener("click", () => {
    modal.classList.add("active");
    modalOverlay.classList.add("active");
  });

  // Close modal
  closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    modalOverlay.classList.remove("active");
  });

  modalOverlay.addEventListener("click", () => {
    modal.classList.remove("active");
    modalOverlay.classList.remove("active");
  });
});

// Music

document.addEventListener("DOMContentLoaded", () => {
  const audioElement = document.getElementById("current-audio");
  const audioSource = audioElement.querySelector("source");
  const songs = document.querySelectorAll(".song");
  const record = document.getElementById("record");
  const clickPrompt = document.querySelector(".click-prompt");
  let currentlyPlayingSong = null;

  // Set a song as selected
  const setSongAsSelected = (song) => {
    // Reset all songs
    songs.forEach(s => {
      s.classList.remove("song-selected");
      const img = s.querySelector("img");
      if (img) {
        img.style.animation = ""; // Reset animation for song images
      }
    });

    // Mark selected song
    song.classList.add("song-selected");

    // Update record image
    const newImageSrc = song.querySelector("img").src;
    record.src = newImageSrc;

    // Apply rotation animation to the song image
    const currentSongImage = song.querySelector("img");
    if (currentSongImage) {
      currentSongImage.style.animation = "recordRotate 6s linear infinite";
    }

    // Set the record's rotation animation
    record.style.animation = "recordRotate 6s linear infinite";

    // Update currently playing song reference
    currentlyPlayingSong = song;
  };

  // Handle song selection
  songs.forEach(song => {
    song.addEventListener("click", () => {
      const newAudioSrc = song.getAttribute("data-audio-src");

      // Check if a new song is selected
      if (audioSource.src !== window.location.origin + "/" + newAudioSrc) {
        // Update audio source and play
        audioSource.src = newAudioSrc;
        audioElement.load();
        audioElement.play();

        // Set the selected song
        setSongAsSelected(song);

        // Hide click prompt
        if (clickPrompt) {
          clickPrompt.style.display = "none";
        }
      }
    });
  });

  // Handle play (default song selection)
  audioElement.addEventListener("play", () => {
    if (!currentlyPlayingSong) {
      // Default to 'Feel Good Inc' if no song is selected
      const defaultSong = document.getElementById("feel-good-inc");
      setSongAsSelected(defaultSong);
    }

    // Resume animation if already set
    if (currentlyPlayingSong) {
      record.style.animationPlayState = "running";
      const currentSongImage = currentlyPlayingSong.querySelector("img");
      if (currentSongImage) {
        currentSongImage.style.animationPlayState = "running";
      }
    }
  });

  // Pause SONG
  audioElement.addEventListener("pause", () => {
    if (currentlyPlayingSong) {
      record.style.animationPlayState = "paused"; // Pause record rotation
      const currentSongImage = currentlyPlayingSong.querySelector("img");
      if (currentSongImage) {
        currentSongImage.style.animationPlayState = "paused"; // Pause song image rotation
      }
    }
  });

  // End song
  audioElement.addEventListener("ended", () => {
    if (currentlyPlayingSong) {
      const currentSongImage = currentlyPlayingSong.querySelector("img");
      if (currentSongImage) {
        currentSongImage.style.animationPlayState = "paused"; // Stop song image rotation
      }
    }
    record.style.animationPlayState = "paused"; // Stop record rotation
  });

  // Click prompt
  record.addEventListener("click", () => {
    if (clickPrompt) {
      clickPrompt.style.display = "none";
    }
  });
});