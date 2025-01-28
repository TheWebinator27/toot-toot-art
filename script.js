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
  const parallaxBackground = document.querySelector(".parallax-background");
  let currentlyPlayingSong = null;

  const setSongAsSelected = (song) => {
      songs.forEach(s => {
          s.classList.remove("song-selected");
          const img = s.querySelector("img");
          if (img) img.style.animation = "";
      });
      song.classList.add("song-selected");
      const newImageSrc = song.querySelector("img").src;
      record.src = newImageSrc;
      const currentSongImage = song.querySelector("img");
      if (currentSongImage) {
          currentSongImage.style.animation = "recordRotate 6s linear infinite";
      }
      record.style.animation = "recordRotate 6s linear infinite";
      currentlyPlayingSong = song;
  };

  songs.forEach(song => {
      song.addEventListener("click", () => {
          const newAudioSrc = song.getAttribute("data-audio-src");
          if (audioSource.src !== `${window.location.origin}/${newAudioSrc}`) {
              audioSource.src = newAudioSrc;
              audioElement.load();
              audioElement.play();
              setSongAsSelected(song);
              if (clickPrompt) clickPrompt.style.display = "none";
          }
      });
  });

  audioElement.addEventListener("play", () => {
      if (!currentlyPlayingSong) {
          const defaultSong = document.getElementById("feel-good-inc");
          setSongAsSelected(defaultSong);
      }
      if (currentlyPlayingSong) {
          record.style.animationPlayState = "running";
          const currentSongImage = currentlyPlayingSong.querySelector("img");
          if (currentSongImage) {
              currentSongImage.style.animationPlayState = "running";
          }
      }
  });

  audioElement.addEventListener("pause", () => {
      if (currentlyPlayingSong) {
          record.style.animationPlayState = "paused";
          const currentSongImage = currentlyPlayingSong.querySelector("img");
          if (currentSongImage) {
              currentSongImage.style.animationPlayState = "paused";
          }
      }
  });

  audioElement.addEventListener("ended", () => {
      if (currentlyPlayingSong) {
          const currentSongImage = currentlyPlayingSong.querySelector("img");
          if (currentSongImage) {
              currentSongImage.style.animation = "";
          }
      }
      record.style.animation = "";
      parallaxBackground.style.zIndex = "-1";
  });

  record.addEventListener("click", () => {
      if (clickPrompt) clickPrompt.style.display = "none";
  });

  const ouiCat = document.getElementById("oui-cat-btn");
  ouiCat.addEventListener("click", () => {
      parallaxBackground.style.backgroundImage = "url('/images/dancing-cat.gif')";
      parallaxBackground.style.zIndex = "6969";
      const newAudioSrc = "/music/oiia_spinning_cat_meme.mp3";
      if (audioSource.src !== `${window.location.origin}/${newAudioSrc}`) {
          audioSource.src = newAudioSrc;
          audioElement.load();
          audioElement.play();
          setSongAsSelected(ouiCat);
      }
      audioElement.onended = () => {
          parallaxBackground.style.backgroundImage = "url(images/pretty-desktop-flower-field-11lxn3janoe1788u.jpg)";
          parallaxBackground.style.zIndex = "-1";
      };
  });
});

const closeOuiCatButtons = document.querySelectorAll('.oui-btn');
const ouiCatModal = document.querySelector('.oui-cat-modal');
const ouiCatOpen = document.getElementById('oui-cat-activate');

closeOuiCatButtons.forEach(button => {
  button.addEventListener('click', () => {
    ouiCatModal.classList.remove("active");
  });
});

ouiCatOpen.addEventListener('click', () => {
  ouiCatModal.classList.add("active"); 
});

