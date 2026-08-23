const loader = document.getElementById("loader");
const invitation = document.getElementById("invitation");
const enterBtn = document.getElementById("enterBtn");
const openingVideo = document.getElementById("ganeshOpeningVideo");
const ganeshReveal = document.getElementById("ganeshReveal");
const music = document.getElementById("weddingMusic");
const musicToggle = document.getElementById("musicToggle");

let openingStarted = false;
let invitationStarted = false;

function openInvitation(){
  if(invitationStarted) return;
  invitationStarted = true;
  if(ganeshReveal){
    ganeshReveal.classList.remove("show");
    ganeshReveal.setAttribute("aria-hidden","true");
  }
  loader.classList.add("closed");
  invitation.classList.remove("hidden");
  document.body.style.overflow = "auto";
  window.scrollTo({top:0,behavior:"smooth"});
}

function showGaneshReveal(){
  loader.classList.add("closed");
  if(ganeshReveal){
    ganeshReveal.classList.add("show");
    ganeshReveal.setAttribute("aria-hidden","false");
  }
  const revealTitle=document.getElementById("revealTitle");
  const viewTitle=document.getElementById("viewTitle");
  if(revealTitle && viewTitle) revealTitle.textContent=viewTitle.textContent;

  // No Continue button: automatically open the wedding invitation.
  setTimeout(openInvitation, 2200);
}

function startOpening(){
  if(openingStarted) return;
  openingStarted=true;
  loader.classList.add("started");

  // IMPORTANT: mute the video's original audio so it does not clash with the wedding music.
  if(openingVideo){
    openingVideo.muted=true;
    openingVideo.volume=0;
    openingVideo.setAttribute("muted","");
    openingVideo.currentTime=0;
    openingVideo.play().catch(()=>{});
  }

  // Play ONLY the supplied wedding music.
  if(music){
    music.volume=0.24;
    music.play().then(()=>{
      if(musicToggle) musicToggle.textContent="🔊";
    }).catch(()=>{});
  }
}

if(enterBtn) enterBtn.addEventListener("click",startOpening,{once:true});
if(openingVideo) openingVideo.addEventListener("ended",showGaneshReveal);

if(musicToggle){
  musicToggle.addEventListener("click",()=>{
    if(music.paused){
      music.play().then(()=>musicToggle.textContent="🔊").catch(()=>{});
    }else{
      music.pause();
      musicToggle.textContent="🔇";
    }
  });
}

window.addEventListener("load",()=>{
  document.body.style.overflow="hidden";
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

// Final viewport sizing fallback for desktop/mobile browsers.
function sizeOpeningVideo(){
  const loader = document.getElementById("loader");
  const video = document.getElementById("ganeshOpeningVideo");
  if(!loader || !video) return;
  loader.style.width = window.innerWidth + "px";
  loader.style.height = window.innerHeight + "px";
  video.style.width = window.innerWidth + "px";
  video.style.height = window.innerHeight + "px";
}
sizeOpeningVideo();
window.addEventListener("resize", sizeOpeningVideo);
