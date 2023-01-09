import initiateDraft from "./scripts/initiateDraft";
// import a seasons array for hall of famers
import { displayModal, closeModal } from "./scripts/modal";

document.addEventListener("DOMContentLoaded", async () => { 
  let explainButton = document.getElementById('explain-button'), close = document.getElementById('close-modal');
  let season21 = document.getElementById('season21'), season22 = document.getElementById('season22');
  let hallOfFame = document.getElementById('hallOfFame');
  let seasonSelected = document.getElementById('selectedSeason');
  
  explainButton.addEventListener('click', displayModal);
  close.addEventListener('click', closeModal);

  season21.addEventListener('click', () => initiateDraft(2021, seasonSelected));
  season22.addEventListener('click', () => initiateDraft(2022, seasonSelected));
  // hallOfFame.addEventListener('click', () => initiateDraft(hofSeasons, seasonSelected))
});
