import selectSeason from "./selectSeason"; 
import { playerIDs2021, playerIDs2022 } from "./playerIDs";
import { players2021, players2022 } from "./players";
import sortIDs from "./sortIDs";
import playerVitals from "./playerVitals";
import returnInput from "./userInput";
import connectPlayerInfo from "./connectPlayerInfo";

async function initiateDraft(season, seasonSelected) {
  let fullDetails = {}, scores = [], nameAndID = [];
  seasonSelected.innerHTML = `${season} - ${season + 1}`;
  
  selectSeason();
  
  if (season === 2021) {
    await connectPlayerInfo(playerIDs2021, fullDetails, nameAndID, scores, players2021, 2021);
  } else {
    await connectPlayerInfo(playerIDs2022, fullDetails, nameAndID, scores, players2022, 2022);
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
  }

  return userInput;
}

export default initiateDraft;