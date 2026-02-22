// PSFree index.js — Clean Version

const ckbaj = document.getElementById("ckbaj");
const ckbdc = document.getElementById("ckbdc");
const consoleDev = document.getElementById("console");

window.addEventListener("DOMContentLoaded", loadsettings);

document.getElementById("jailbreak").addEventListener("click", jailbreak);
document.getElementById("binloader").addEventListener("click", binloader);

document.querySelectorAll("button[data-func]").forEach(btn => {
  btn.addEventListener("click", () => Loadpayloads(btn.dataset.func));
});

async function loadMultipleModules(files){
  return Promise.all(files.map(f => import(f)));
}

function showpayloads(){
  const jb = document.getElementById("jailbreak-page");
  const pl = document.getElementById("payloads-page");
  const fw = document.getElementById("PS4FW");
  const btn = document.getElementById("payloadsbtn");

  if(btn.textContent === "Payloads"){
    jb.style.display = "none";
    fw.style.display = "none";
    pl.style.display = "block";
    btn.textContent = "Jailbreak";
  } else {
    jb.style.display = "block";
    fw.style.display = "flex";
    pl.style.display = "none";
    btn.textContent = "Payloads";
  }
}

async function jailbreak(){
  try{
    const modules = await loadMultipleModules([
      "./payloads/Jailbreak.js",
      "./psfree/alert.mjs"
    ]);

    const JailbreakModule = modules[0];

    if(localStorage.getItem("HEN")){
      JailbreakModule.HEN();
    } else {
      JailbreakModule.GoldHEN();
    }

  } catch(e){
    console.error("Jailbreak failed:", e);
  }
}

async function binloader(){
  try{
    const modules = await loadMultipleModules(["./psfree/alert.mjs"]);
    modules[0].runBinLoader();
  } catch(e){
    console.error("Binloader failed:", e);
  }
}

async function Loadpayloads(payload){
  try{
    const modules = await loadMultipleModules(["./payloads/payloads.js"]);
    const payloadModule = modules[0];

    if(typeof payloadModule[payload] === "function"){
      payloadModule[payload]();
    } else {
      console.error("Payload not found:", payload);
    }

  } catch(e){
    console.error("Payload load failed:", e);
  }
}

function loadsettings(){
  ckbdc.checked ? DebugConsole.style.display = "flex" : DebugConsole.style.display = "none";
}
