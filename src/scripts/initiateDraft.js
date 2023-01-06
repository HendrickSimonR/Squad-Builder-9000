import selectSeason from "./selectSeason"; 
import { playerIDs2021, playerIDs2022 } from "./playerIDs";
import { players2021, players2022 } from "./players";
import sortIDs from "./sortIDs";
import playerVitals from "./playerVitals";
import returnInput from "./userInput";
import connectPlayerInfo from "./connectPlayerInfo";
import fullDetails from "./fullDetails";
import startCountdown from "./cooldown";


async function initiateDraft(season, seasonSelected) {
  let scores = [], nameAndID = [];
  seasonSelected.innerHTML = `${season} - ${season + 1}`;
  
  selectSeason();
  
  if (season === 2021) {
    await connectPlayerInfo(playerIDs2021, fullDetails, nameAndID, scores, players2021, 2021);
    startCountdown();
  } else {
    await connectPlayerInfo(playerIDs2022, fullDetails, nameAndID, scores, players2022, 2022);
    startCountdown();
  }

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
    alert('Please refresh the page! :)');
    document.getElementById("draft-button").value = ":O";
    let prompt = document.getElementById('countdownPrompt');
    prompt.innerHTML = 'Refresh page in'
  }

  let loader = document.getElementById("loader");
  loader.style.display = "none";

  console.log('fullDetails', fullDetails)
  console.log('total players', Object.size(fullDetails));
  console.log('sortedScores', sortedScores)
  return userInput;
}

export default initiateDraft;