import selectSeason from "./selectSeason"; 
import { playerIDs2021, playerIDs2022 } from "./playerIDs";
import { players2021, players2022 } from "./players";
import sortIDs from "./sortIDs";
import playerVitals from "./playerVitals";
import returnInput from "./userInput";
import connectPlayerInfo from "./connectPlayerInfo";
import fullDetails from "./fullDetails";
import { startCountdown, switchForm } from "./cooldown";


async function initiateDraft(season, seasonSelected) {
  let scores = [], nameAndID = [];
  seasonSelected.innerHTML = typeof season === 'number' ? `${season} - ${season + 1}` : `Hall of Fame`;
  document.getElementById("draft-button").disabled = true;
  document.getElementById("draft-button").value = "Loading...";
  let loader = document.getElementById("loader");
  let countdown = document.getElementById('countdown');
  loader.style.visibility = 'visible';
  countdown.style.display = 'block';

  selectSeason();
  
  if (typeof season === 'number') { // dont need if condition, array logic needs to be adapted in connectPlayerInfo
    await connectPlayerInfo(playerIDs2021, fullDetails, nameAndID, scores, players2021, season);
    startCountdown();
  } 
  // else {
  //   await connectPlayerInfo(playerIDs2022, fullDetails, nameAndID, scores, players2022, 2022);
  //   startCountdown();
  // }

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
    document.getElementById("draft-button").disabled = false;
    document.getElementById("draft-button").value = "Draft!";
  } else {
    alert('Due to the nature of the API, please refresh the page at the end of the countdown :)');
    document.getElementById("draft-button").value = "Dx";
    let prompt = document.getElementById('countdownPrompt');
    prompt.innerHTML = 'Refresh page in'
  }

  loader.style.visibility = "hidden";

  return userInput;
}

export default initiateDraft;