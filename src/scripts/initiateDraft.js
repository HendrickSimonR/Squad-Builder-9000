import selectSeason from "./selectSeason"; 
import { playerIDs2021, playerIDs2022 } from "./playerIDs";
import { players2021, players2022, legendPlayers } from "./players";
import { legendIDs, legendSeasons } from "./legends";
import { displayModal } from "./modal";
import sortIDs from "./sortIDs";
import playerVitals from "./playerVitals";
import returnInput from "./userInput";
import connectPlayerInfo from "./connectPlayerInfo";
import fullDetails from "./fullDetails";
import { startCountdown, switchForm } from "./cooldown";


async function initiateDraft(season, seasonSelected) {
  let scores = [], nameAndID = [];
  seasonSelected.innerHTML = typeof season === 'number' ? `${season} - ${season + 1}` : `NBA Legends`;
  let draftButton = document.getElementById('draft-button');
  draftButton.disabled = true;
  draftButton.value = "Loading...";
  draftButton.style.cursor = 'wait';
  
  let loader = document.getElementById("loader"), countdown = document.getElementById('countdown');
  loader.style.visibility = 'visible';
  countdown.style.display = 'block';

  selectSeason();

  if (season === 'legends') {
    displayModal(season);
    seasonSelected.setAttribute('class', 'legends-season')
  } else {
    seasonSelected.setAttribute('class', '');
  }

  season = typeof season === 'number' ? season : legendSeasons;
  
  let playerIDs = season === 2021 ? playerIDs2021 : season === 2022 ? playerIDs2022 : legendIDs;
  let players = season === 2021 ? players2021 : season === 2022 ? players2022 : legendPlayers;
  await connectPlayerInfo(playerIDs, fullDetails, nameAndID, scores, players, season);
  startCountdown();

  let sortedScores = scores.sort().reverse();
  let sortedIDs = sortIDs(sortedScores, playerIDs2021, fullDetails);
  let playerInfo = playerVitals(sortedIDs, fullDetails);
  let userInput = returnInput(fullDetails, sortedScores, playerInfo);

  Object.size = (obj) => {
    var size = 0, key;
    for (key in obj) if (obj.hasOwnProperty(key)) size++;
    return size;
  };
  
  if (Object.size(fullDetails) >= 50) {
    draftButton.disabled = false;
    draftButton.value = "Draft!";
    draftButton.style.cursor = "pointer";
  } else {
    alert('Due to the nature of the API, please refresh the page at the end of the countdown :)');
    draftButton.value = "Dx";
    draftButton.style.cursor = 'default';
    let prompt = document.getElementById('countdownPrompt');
    prompt.innerHTML = 'Refresh page in'
  }

  loader.style.visibility = "hidden";
  return userInput;
}

export default initiateDraft;