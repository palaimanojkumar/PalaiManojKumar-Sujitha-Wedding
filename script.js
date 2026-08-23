const loader = document.getElementById("loader");
const scene = document.querySelector(".temple-scene");
const invitation = document.getElementById("invitation");
const enterBtn = document.getElementById("enterBtn");

function openInvitation(){
  scene.classList.add("open");

  // Browsers generally allow audio after a user click.
  const music = document.getElementById("weddingMusic");
  music.volume = 0.28;
  music.play().then(() => {
    document.getElementById("musicToggle").textContent = "🔊";
  }).catch(() => {});

  setTimeout(() => {
    loader.classList.add("closed");
    invitation.classList.remove("hidden");
    document.body.style.overflow = "auto";
  }, 1700);
}

enterBtn.addEventListener("click", openInvitation);

window.addEventListener("load", () => {
  document.body.style.overflow = "hidden";
  setTimeout(() => scene.classList.add("open"), 550);
});

const weddingDate = new Date("2026-08-30T11:23:00+05:30").getTime();

function updateCountdown(){
  const now = Date.now();
  let diff = weddingDate - now;

  if(diff <= 0){
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    return;
  }

  const day = 86400000;
  const hour = 3600000;
  const minute = 60000;

  const days = Math.floor(diff/day);
  diff %= day;
  const hours = Math.floor(diff/hour);
  diff %= hour;
  const minutes = Math.floor(diff/minute);
  document.getElementById("days").textContent = String(days).padStart(2,"0");
  document.getElementById("hours").textContent = String(hours).padStart(2,"0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown,1000);

const music = document.getElementById("weddingMusic");
const musicToggle = document.getElementById("musicToggle");

musicToggle.addEventListener("click", () => {
  if (music.paused) {
    music.play().then(() => musicToggle.textContent = "🔊").catch(() => {});
  } else {
    music.pause();
    musicToggle.textContent = "🔇";
  }
});
