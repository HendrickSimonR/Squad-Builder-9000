import initiateDraft from "./scripts/initiateDraft";
// import { displayInfo } from "./scripts/displayInfo";
import { displayModal, closeModal } from "./scripts/modal";

document.addEventListener("DOMContentLoaded", async () => { 
  let explainButton = document.getElementById('explain-button');
  let season21 = document.getElementById('season21'), season22 = document.getElementById('season22');
  let legends = document.getElementById('legends'), infoButton = document.getElementById('info-button');
  // let infoModal = document.getElementById('info-modal'), descriptionModal = document.getElementById('description-modal');
  let seasonSelected = document.getElementById('selectedSeason');
  
  infoButton.addEventListener('click', () => displayModal('info'));
  explainButton.addEventListener('click', () => displayModal('description'));
  // close.addEventListener('click', closeModal);

  season21.addEventListener('click', () => initiateDraft(2021, seasonSelected));
  season22.addEventListener('click', () => initiateDraft(2022, seasonSelected));
  legends.addEventListener('click', () => initiateDraft('legends', seasonSelected))
});
