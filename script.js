const loader = document.getElementById("loader");
const invitation = document.getElementById("invitation");
const enterBtn = document.getElementById("enterBtn");
const openingVideo = document.getElementById("ganeshOpeningVideo");
const ganeshReveal = document.getElementById("ganeshReveal");
const continueBtn = document.getElementById("continueBtn");
const music = document.getElementById("weddingMusic");
const musicToggle = document.getElementById("musicToggle");

let invitationStarted = false;
let openingStarted = false;

function startOpening(){
  if(openingStarted) return;
  openingStarted = true;
  loader.classList.add("started");
  music.volume = 0.28;
  music.play().then(() => {
    musicToggle.textContent = "🔊";
  }).catch(() => {});
  openingVideo.currentTime = 0;
  openingVideo.play().catch(() => {});
}

function showGaneshReveal(){
  loader.classList.add("closed");
  ganeshReveal.classList.add("show");
  ganeshReveal.setAttribute("aria-hidden","false");
  document.getElementById("revealTitle").textContent =
    document.getElementById("viewTitle").textContent;
}

function openInvitation(){
  if(invitationStarted) return;
  invitationStarted = true;
  ganeshReveal.classList.remove("show");
  ganeshReveal.setAttribute("aria-hidden","true");
  invitation.classList.remove("hidden");
  document.body.style.overflow = "auto";
  window.scrollTo({top:0,behavior:"smooth"});
}

enterBtn.addEventListener("click", startOpening);
continueBtn.addEventListener("click", openInvitation);

openingVideo.addEventListener("ended", showGaneshReveal);

musicToggle.addEventListener("click", () => {
  if (music.paused) {
    music.play().then(() => musicToggle.textContent = "🔊").catch(() => {});
  } else {
    music.pause();
    musicToggle.textContent = "🔇";
  }
});

window.addEventListener("load", () => {
  document.body.style.overflow = "hidden";
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

/* ---------------- Editor ---------------- */
const editorModal = document.getElementById("editorModal");
const editOpen = document.getElementById("editOpen");
const editorClose = document.getElementById("editorClose");
const editorSave = document.getElementById("editorSave");
const editorReset = document.getElementById("editorReset");
const editorPreview = document.getElementById("editorPreview");

const defaultData = {
  title:"Palai's Wedding Invitation",
  blessing:"With the blessings of the Almighty",
  groom:"Manoj Kumar",
  groomJob:"Scientist, NRSC, ISRO",
  bride:"Sujitha",
  brideJob:"M.B.A.",
  date:"2026-08-30",
  time:"11:23",
  lagna:"Thula Lagnam",
  venue:"G.R.B. Gardens",
  address:"Girnibavi, Duggondi, Warangal, Telangana",
  map:"https://maps.app.goo.gl/1YCqvG3BT1rrkJj7A",
  lunch:"Follows..",
  invited:"Smt. & Sri Palai Srinivas – Amaravathi",
  compliments:"With Best Compliments from Near & Dear",
  english:"We solicit your gracious presence with your family & friends on the auspicious occasion of the marriage of",
  telugu:"తమ సకుటుంబ సపరివార సమేతముగా విచ్చేసి నూతన వధూవరులను ఆశీర్వదించి మా ఆతిథ్యము స్వీకరించి మమ్మానందింపజేయ ప్రార్థన.",
  theme:"maroon",
  opening:"mandapam"
};

function getSavedData(){
  try{
    return {...defaultData, ...(JSON.parse(localStorage.getItem("palaiWeddingData")) || {})};
  }catch(e){ return {...defaultData}; }
}
function setField(id, value){ const el=document.getElementById(id); if(el) el.value=value; }
function getField(id){ const el=document.getElementById(id); return el ? el.value : ""; }

function loadEditorFields(){
  const d=getSavedData();
  setField("eTitle",d.title); setField("eBlessing",d.blessing);
  setField("eGroom",d.groom); setField("eGroomJob",d.groomJob);
  setField("eBride",d.bride); setField("eBrideJob",d.brideJob);
  setField("eDate",d.date); setField("eTime",d.time); setField("eLagna",d.lagna);
  setField("eVenue",d.venue); setField("eAddress",d.address); setField("eMap",d.map);
  setField("eLunch",d.lunch); setField("eInvited",d.invited); setField("eCompliments",d.compliments);
  setField("eEnglish",d.english); setField("eTelugu",d.telugu);
  setField("eTheme",d.theme); setField("eOpening",d.opening);
}
function readEditorData(){
  return {
    title:getField("eTitle"), blessing:getField("eBlessing"),
    groom:getField("eGroom"), groomJob:getField("eGroomJob"),
    bride:getField("eBride"), brideJob:getField("eBrideJob"),
    date:getField("eDate"), time:getField("eTime"), lagna:getField("eLagna"),
    venue:getField("eVenue"), address:getField("eAddress"), map:getField("eMap"),
    lunch:getField("eLunch"), invited:getField("eInvited"), compliments:getField("eCompliments"),
    english:getField("eEnglish"), telugu:getField("eTelugu"),
    theme:getField("eTheme"), opening:getField("eOpening")
  };
}
function formatDate(dateString){
  if(!dateString) return "";
  const d=new Date(dateString+"T00:00:00");
  return d.toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"});
}
function applyData(d){
  document.getElementById("viewTitle").textContent=d.title;
  document.getElementById("viewBlessing").textContent=d.blessing;
  document.getElementById("viewGroom").textContent=d.groom.split(" ")[0] || d.groom;
  document.getElementById("viewBride").textContent=d.bride.split(" ")[0] || d.bride;
  document.getElementById("viewGroomFull").textContent=d.groom;
  document.getElementById("viewGroomJob").textContent=d.groomJob;
  document.getElementById("viewBrideFull").textContent=d.bride;
  document.getElementById("viewBrideJob").textContent=d.brideJob;
  document.getElementById("viewHeroDate").textContent=`${formatDate(d.date)} · ${d.time}`;
  document.getElementById("viewHeroPlace").textContent=d.venue+" · "+d.address.split(",").slice(0,3).join(" · ");
  document.getElementById("viewEnglish").innerHTML=d.english.replace(/\n/g,"<br>");
  document.getElementById("viewLagna").textContent=`“${d.lagna}”`;
  document.getElementById("viewVenue").textContent=d.venue;
  document.getElementById("viewAddress").textContent=d.address;
  document.getElementById("viewLunch").textContent=d.lunch;
  document.getElementById("viewInvited").textContent=d.invited;
  document.getElementById("viewCompliments").textContent=d.compliments;
  document.getElementById("mapButton").href=d.map;

  document.documentElement.style.setProperty("--maroon",
    d.theme==="green" ? "#24543d" : d.theme==="royal" ? "#5a1730" : "#6b1d1d");
  document.documentElement.style.setProperty("--deep",
    d.theme==="green" ? "#123426" : d.theme==="royal" ? "#310c1b" : "#3d1111");

  if(d.opening==="temple") document.body.classList.add("temple-opening");
  else document.body.classList.remove("temple-opening");
}

function openEditor(){
  loadEditorFields();
  editorModal.classList.add("show");
  editorModal.setAttribute("aria-hidden","false");
}
function closeEditor(){
  editorModal.classList.remove("show");
  editorModal.setAttribute("aria-hidden","true");
}
function saveEditor(){
  const d=readEditorData();
  localStorage.setItem("palaiWeddingData",JSON.stringify(d));
  applyData(d);
  closeEditor();
}
editOpen.addEventListener("click",openEditor);
editorClose.addEventListener("click",closeEditor);
editorSave.addEventListener("click",saveEditor);
editorReset.addEventListener("click",()=>{
  localStorage.removeItem("palaiWeddingData");
  loadEditorFields();
  applyData(defaultData);
});
editorPreview.addEventListener("click",()=>applyData(readEditorData()));

document.querySelectorAll(".editor-tab").forEach(tab=>{
  tab.addEventListener("click",()=>{
    document.querySelectorAll(".editor-tab").forEach(t=>t.classList.remove("active"));
    document.querySelectorAll(".editor-section").forEach(p=>p.classList.remove("active"));
    tab.classList.add("active");
    document.querySelector(`[data-panel="${tab.dataset.tab}"]`).classList.add("active");
  });
});

window.addEventListener("click",(e)=>{
  if(e.target===editorModal) closeEditor();
});

applyData(getSavedData());
